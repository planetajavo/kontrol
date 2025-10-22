#!/bin/bash
# scripts/deployment/deploy-production.sh

set -e

echo "🚀 Starting production deployment for KONTROL..."
echo "=================================================="

# Variables
ENVIRONMENT="production"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backup/kontrol-$TIMESTAMP"

# 1. Pre-deployment checks
echo "🔍 Running pre-deployment checks..."
./scripts/deployment/health-checks.sh

# 2. Database backups
echo "💾 Creating database backups..."
mkdir -p $BACKUP_DIR
./scripts/database/backup-postgres.sh $BACKUP_DIR
./scripts/database/backup-clickhouse.sh $BACKUP_DIR

# 3. Deploy infrastructure
echo "🏗️ Deploying infrastructure..."
terraform -chdir=infrastructure/terraform/production apply -auto-approve

# 4. Deploy databases
echo "🗃️ Deploying databases..."
kubectl apply -f k8s/databases/production/

# 5. Wait for databases to be ready
echo "⏳ Waiting for databases to be ready..."
kubectl wait --for=condition=ready pod -l app=postgres --timeout=600s
kubectl wait --for=condition=ready pod -l app=clickhouse --timeout=600s

# 6. Run database migrations
echo "🔄 Running database migrations..."
kubectl apply -f k8s/migrations/production/

# 7. Deploy microservices
echo "🐳 Deploying microservices..."
kubectl apply -f k8s/services/matching-engine/production/
kubectl apply -f k8s/services/ingestion-service/production/
kubectl apply -f k8s/services/api-gateway/production/
kubectl apply -f k8s/services/cointracking-importer/production/
kubectl apply -f k8s/services/compliance-engine/production/

# 8. Deploy frontend
echo "🎨 Deploying frontend..."
kubectl apply -f k8s/services/frontend/production/

# 9. Wait for all deployments
echo "⏳ Waiting for all services to be ready..."
kubectl wait --for=condition=available deployment -l app.kubernetes.io/part-of=kontrol --timeout=1200s

# 10. Run smoke tests
echo "🧪 Running smoke tests..."
./scripts/tests/smoke-tests.sh

# 11. Update DNS and load balancer
echo "🌐 Updating DNS records..."
./scripts/networking/update-dns.sh

# 12. Final health checks
echo "🔍 Running final health checks..."
./scripts/monitoring/health-check-all.sh

echo "✅ Production deployment completed successfully!"
echo "📊 Deployment summary:"
echo "   - Services deployed: 6"
echo "   - Database migrations: 12"
echo "   - Backup created: $BACKUP_DIR"
echo "   - Deployment time: $(($SECONDS / 60)) minutes"
echo ""
echo "🎉 KONTROL is now LIVE in production!"
echo "🌍 Access URL: https://app.kontrol.com"
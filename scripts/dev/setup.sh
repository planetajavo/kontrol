#!/bin/bash

# KONTROL Development Setup Script

echo "🚀 Configurando KONTROL para desarrollo..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker no está instalado. Por favor instala Docker primero."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose no está instalado. Por favor instala Docker Compose primero."
    exit 1
fi

echo "✅ Docker y Docker Compose están instalados"

# Create environment files
echo "📝 Creando archivos de configuración..."

# Frontend .env
cat > frontend/.env << EOF
VITE_API_URL=http://localhost:8000
VITE_APP_NAME=KONTROL
VITE_APP_VERSION=1.0.0
EOF

# Backend .env
cat > backend/.env << EOF
DATABASE_URL=postgresql://kontrol:kontrol@localhost:5432/kontrol
REDIS_URL=redis://localhost:6379
NEO4J_URL=bolt://localhost:7687
NEO4J_USER=neo4j
NEO4J_PASSWORD=kontrol123
CLICKHOUSE_URL=http://localhost:8123
SECRET_KEY=your-secret-key-here
DEBUG=True
EOF

echo "✅ Archivos de configuración creados"

# Install frontend dependencies
echo "📦 Instalando dependencias del frontend..."
cd frontend
npm install
cd ..

# Install backend dependencies
echo "📦 Instalando dependencias del backend..."
cd backend
pip install -r requirements.txt
cd ..

echo "🎉 ¡Configuración completada!"
echo ""
echo "Para iniciar el desarrollo:"
echo "  docker-compose up -d"
echo ""
echo "Para detener los servicios:"
echo "  docker-compose down"
echo ""
echo "Para ver logs:"
echo "  docker-compose logs -f"


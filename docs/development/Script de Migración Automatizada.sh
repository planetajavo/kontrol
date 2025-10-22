#!/bin/bash
# scripts/migration/run_migration.sh

echo "🚀 Iniciando migración desde Cointracking..."

# Variables
USER_ID="$1"
BACKUP_FILE="$2"
LOG_FILE="migration_${USER_ID}_$(date +%Y%m%d_%H%M%S).log"

# Verificar pre-requisitos
python3 -c "import pandas, sqlalchemy, neo4j" || {
    echo "❌ Dependencias Python no satisfechas"
    exit 1
}

# Ejecutar migración
python3 scripts/migration/cointracking_migration.py \
    --user-id "$USER_ID" \
    --backup-file "$BACKUP_FILE" \
    --log-file "$LOG_FILE"

# Verificar resultados
if [ $? -eq 0 ]; then
    echo "✅ Migración completada exitosamente"
    echo "📊 Estadísticas guardadas en: $LOG_FILE"
else
    echo "❌ Error en la migración"
    exit 1
fi
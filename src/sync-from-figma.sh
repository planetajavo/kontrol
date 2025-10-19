#!/bin/bash

# ============================================
# SCRIPT: Sincronizar desde Figma Make
# ============================================
# 
# Uso:
#   1. Descarga ZIP desde Figma Make
#   2. Ejecuta: bash sync-from-figma.sh ~/Downloads/kontrol-*.zip
#

set -e

# Colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  🔄 Sincronización Figma Make → Local${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# ============================================
# 1. Verificar que se pasó el archivo ZIP
# ============================================
if [ -z "$1" ]; then
    echo -e "${RED}❌ Error: Debes proporcionar la ruta al archivo ZIP${NC}"
    echo ""
    echo "Uso:"
    echo "  bash sync-from-figma.sh ~/Downloads/kontrol-20250119.zip"
    echo ""
    exit 1
fi

ZIP_FILE="$1"

if [ ! -f "$ZIP_FILE" ]; then
    echo -e "${RED}❌ Error: Archivo no encontrado: $ZIP_FILE${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Archivo ZIP encontrado: $ZIP_FILE${NC}"

# ============================================
# 2. Verificar que estamos en el directorio del proyecto
# ============================================
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: No estás en el directorio del proyecto KONTROL${NC}"
    echo "Por favor, ejecuta este script desde la raíz del proyecto."
    exit 1
fi

echo -e "${GREEN}✅ Directorio del proyecto verificado${NC}"

# ============================================
# 3. Verificar estado de Git
# ============================================
if [ -n "$(git status --porcelain)" ]; then
    echo -e "${YELLOW}⚠️  Advertencia: Tienes cambios sin commitear${NC}"
    echo ""
    git status --short
    echo ""
    read -p "¿Deseas continuar? Los cambios locales se perderán. (y/N): " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo -e "${YELLOW}Operación cancelada${NC}"
        exit 0
    fi
fi

# ============================================
# 4. Crear carpeta temporal
# ============================================
TEMP_DIR="/tmp/kontrol-sync-$(date +%s)"
mkdir -p "$TEMP_DIR"
echo -e "${GREEN}✅ Carpeta temporal creada: $TEMP_DIR${NC}"

# ============================================
# 5. Extraer ZIP
# ============================================
echo ""
echo -e "${BLUE}📦 Extrayendo ZIP...${NC}"
unzip -q "$ZIP_FILE" -d "$TEMP_DIR"
echo -e "${GREEN}✅ ZIP extraído${NC}"

# ============================================
# 6. Sincronizar archivos
# ============================================
echo ""
echo -e "${BLUE}🔄 Sincronizando archivos...${NC}"
echo -e "${YELLOW}Excluyendo: node_modules, .git, dist, .env${NC}"
echo ""

# Encontrar la carpeta extraída (por si tiene subcarpeta)
SOURCE_DIR="$TEMP_DIR"
if [ -d "$TEMP_DIR/kontrol" ]; then
    SOURCE_DIR="$TEMP_DIR/kontrol"
elif [ -d "$TEMP_DIR/KONTROL" ]; then
    SOURCE_DIR="$TEMP_DIR/KONTROL"
fi

# Sincronizar con rsync
rsync -av --delete \
  --exclude='node_modules' \
  --exclude='.git' \
  --exclude='dist' \
  --exclude='.env' \
  --exclude='.env.local' \
  --exclude='*.log' \
  "$SOURCE_DIR/" ./

echo ""
echo -e "${GREEN}✅ Archivos sincronizados${NC}"

# ============================================
# 7. Ver cambios
# ============================================
echo ""
echo -e "${BLUE}📊 Cambios detectados:${NC}"
echo ""
git status --short

# ============================================
# 8. Mostrar diferencias (primeros archivos)
# ============================================
echo ""
echo -e "${BLUE}📝 Diferencias (primeros 20 líneas):${NC}"
echo ""
git diff | head -n 20

# ============================================
# 9. Preguntar si hacer commit
# ============================================
echo ""
read -p "¿Deseas hacer commit de estos cambios? (Y/n): " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]] || [[ -z $REPLY ]]; then
    echo ""
    read -p "Mensaje de commit (Enter para usar mensaje por defecto): " COMMIT_MSG
    
    if [ -z "$COMMIT_MSG" ]; then
        COMMIT_MSG="sync: actualización desde Figma Make $(date +%Y-%m-%d)"
    fi
    
    git add .
    git commit -m "$COMMIT_MSG"
    echo -e "${GREEN}✅ Commit realizado${NC}"
    
    # Preguntar si hacer push
    echo ""
    read -p "¿Deseas hacer push a GitHub? (Y/n): " -n 1 -r
    echo ""
    
    if [[ $REPLY =~ ^[Yy]$ ]] || [[ -z $REPLY ]]; then
        git push origin main
        echo -e "${GREEN}✅ Push realizado a GitHub${NC}"
        echo -e "${BLUE}🚀 Vercel detectará el cambio y hará deploy automáticamente${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  No se hizo commit. Cambios listos para revisar manualmente.${NC}"
fi

# ============================================
# 10. Limpiar
# ============================================
echo ""
echo -e "${BLUE}🧹 Limpiando archivos temporales...${NC}"
rm -rf "$TEMP_DIR"
echo -e "${GREEN}✅ Limpieza completada${NC}"

# ============================================
# 11. Resumen final
# ============================================
echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✅ SINCRONIZACIÓN COMPLETADA${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${YELLOW}Próximos pasos:${NC}"
echo "  1. Revisa los cambios: ${BLUE}git status${NC}"
echo "  2. Ver diferencias: ${BLUE}git diff${NC}"
echo "  3. Si necesitas deshacer: ${BLUE}git reset --hard HEAD${NC}"
echo ""

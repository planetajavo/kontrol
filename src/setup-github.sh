#!/bin/bash

# =============================================================================
# 🚀 Kontrol - GitHub Setup Script
# =============================================================================
# Este script prepara el proyecto Kontrol para ser subido a GitHub
# Ejecutar: bash setup-github.sh
# =============================================================================

set -e  # Exit on error

echo "🚀 Iniciando preparación de Kontrol para GitHub..."
echo ""

# =============================================================================
# 1. BACKUP DEL PROYECTO
# =============================================================================
echo "📦 Paso 1/7: Creando backup del proyecto..."
BACKUP_DIR="../kontrol-backup-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$BACKUP_DIR"
cp -r . "$BACKUP_DIR" 2>/dev/null || true
echo "✅ Backup creado en: $BACKUP_DIR"
echo ""

# =============================================================================
# 2. CREAR CARPETA DOCS Y MOVER ARCHIVOS .MD
# =============================================================================
echo "📁 Paso 2/7: Organizando documentación..."

# Crear carpeta docs si no existe
mkdir -p docs

# Lista de archivos .md a mover a docs/
MD_FILES=(
    "AML_KYT_SECTION.md"
    "ANIMATION_IMPLEMENTATION.md"
    "ARCHITECTURE.md"
    "ARCHIVOS_CONFIGURACION.md"
    "ASSETS_DEFI_POSITIONS.md"
    "ASSETS_WALLETS_COLLAPSIBLE.md"
    "BANKS_SECTION.md"
    "COLOR_SYSTEM.md"
    "COMPONENT_REUSABILITY_GUIDE.md"
    "CRYPTO_ICONS_README.md"
    "DOCS_CONTENT_COMPLETE.md"
    "DOCS_DEPLOYMENT.md"
    "DOCS_NAVIGATION_SETUP.md"
    "DOCS_QUICK_SETUP.md"
    "DOCS_SEPARATION_SUMMARY.md"
    "EMPEZAR_AQUI.md"
    "EXIT_STRATEGY_PLANNER_V2.md"
    "EXIT_STRATEGY_TAX_BRACKETS_UPDATE.md"
    "FIGMA_TO_CODE_WORKFLOW.md"
    "GITHUB_SETUP.md"
    "GIT_COMMANDS_CHEATSHEET.md"
    "INVESTMENT_PERFORMANCE_MODULE.md"
    "INVESTMENT_PERFORMANCE_V2.md"
    "MIGRATION_GUIDE.md"
    "PORTFOLIO_DISTRIBUTION_REVAMP.md"
    "PORTFOLIO_DISTRIBUTION_V2.md"
    "QUICK_START.md"
    "QUICK_START_GITHUB.md"
    "REFACTOR_SUMMARY.md"
    "RESUMEN_FISCAL_REDESIGN.md"
    "SHARED_COMPONENTS_USAGE.md"
    "STYLING_GUIDE.md"
    "TAX_BRACKET_OPTIMIZER.md"
    "TAX_FISCAL_RESTRUCTURE.md"
    "TOOLTIPS_GUIDE.md"
    "TRANSACTIONS_COLOR_GUIDE.md"
    "TRANSACTIONS_UI_UNIFIED.md"
    "TRANSACTION_TYPES_PALETTE.md"
    "UX_IMPROVEMENTS.md"
    "VISIBILITY_TOGGLE_IMPLEMENTATION.md"
)

# Mover archivos .md a docs/
for file in "${MD_FILES[@]}"; do
    if [ -f "$file" ]; then
        mv "$file" "docs/" 2>/dev/null || true
        echo "  ✓ Movido: $file → docs/"
    fi
done

echo "✅ Documentación organizada en /docs"
echo ""

# =============================================================================
# 3. CORREGIR LICENSE
# =============================================================================
echo "📄 Paso 3/7: Corrigiendo archivo LICENSE..."

# Eliminar LICENSE si es una carpeta
if [ -d "LICENSE" ]; then
    echo "  ⚠️  LICENSE es una carpeta, eliminando..."
    rm -rf LICENSE
fi

# Crear archivo LICENSE correcto (MIT)
cat > LICENSE << 'EOF'
MIT License

Copyright (c) 2025 Kontrol Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
EOF

echo "✅ LICENSE creado correctamente"
echo ""

# =============================================================================
# 4. CREAR .GITIGNORE
# =============================================================================
echo "🚫 Paso 4/7: Creando .gitignore..."

cat > .gitignore << 'EOF'
# Dependencies
node_modules/
.pnp
.pnp.js

# Testing
coverage/

# Production
dist/
build/
*.tsbuildinfo

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

# Editor directories and files
.vscode/*
!.vscode/extensions.json
!.vscode/settings.json
.idea
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# OS
.DS_Store
Thumbs.db

# Temporary files
*.tmp
*.temp
.cache/

# Vercel
.vercel

# Turbo
.turbo

# Backups
*-backup-*/
EOF

echo "✅ .gitignore creado"
echo ""

# =============================================================================
# 5. CREAR ARCHIVOS ADICIONALES
# =============================================================================
echo "📝 Paso 5/7: Creando archivos de configuración adicionales..."

# .nvmrc
echo "18.18.0" > .nvmrc
echo "  ✓ .nvmrc creado"

# .prettierrc
cat > .prettierrc << 'EOF'
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "arrowParens": "avoid",
  "endOfLine": "lf"
}
EOF
echo "  ✓ .prettierrc creado"

# .prettierignore
cat > .prettierignore << 'EOF'
node_modules
dist
build
.cache
.vercel
.turbo
*.md
package-lock.json
pnpm-lock.yaml
yarn.lock
EOF
echo "  ✓ .prettierignore creado"

# .editorconfig
cat > .editorconfig << 'EOF'
root = true

[*]
charset = utf-8
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
indent_style = space
indent_size = 2

[*.md]
trim_trailing_whitespace = false

[*.{json,yml,yaml}]
indent_size = 2
EOF
echo "  ✓ .editorconfig creado"

echo "✅ Archivos de configuración creados"
echo ""

# =============================================================================
# 6. VERIFICAR PACKAGE.JSON
# =============================================================================
echo "📦 Paso 6/7: Verificando package.json..."

if [ -f "package.json" ]; then
    echo "  ✓ package.json existe"
else
    echo "  ⚠️  package.json no encontrado - Por favor créalo manualmente"
fi
echo ""

# =============================================================================
# 7. CREAR .ENV.EXAMPLE
# =============================================================================
echo "🔐 Paso 7/7: Creando .env.example..."

cat > .env.example << 'EOF'
# Kontrol - Environment Variables Example
# Copy this file to .env and fill in your values

# API Configuration (if needed in the future)
# VITE_API_URL=https://api.example.com

# Supabase (if you decide to integrate)
# VITE_SUPABASE_URL=your-supabase-url
# VITE_SUPABASE_ANON_KEY=your-anon-key

# Analytics (optional)
# VITE_GA_TRACKING_ID=UA-XXXXXXXXX-X

# Feature Flags
# VITE_ENABLE_EXPERIMENTAL_FEATURES=false
EOF

echo "✅ .env.example creado"
echo ""

# =============================================================================
# RESUMEN FINAL
# =============================================================================
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ PREPARACIÓN COMPLETADA"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📁 Estructura del proyecto:"
echo "   ✓ Documentación movida a /docs"
echo "   ✓ LICENSE corregido"
echo "   ✓ .gitignore creado"
echo "   ✓ Archivos de configuración añadidos"
echo "   ✓ .env.example creado"
echo ""
echo "📋 PRÓXIMOS PASOS:"
echo ""
echo "1️⃣  Inicializar Git (si no está inicializado):"
echo "    git init"
echo ""
echo "2️⃣  Añadir archivos al staging:"
echo "    git add ."
echo ""
echo "3️⃣  Crear commit inicial:"
echo "    git commit -m \"🚀 Initial commit - Kontrol v1.0\""
echo ""
echo "4️⃣  Crear repositorio en GitHub:"
echo "    https://github.com/new"
echo "    Nombre sugerido: kontrol-crypto-dashboard"
echo ""
echo "5️⃣  Conectar con GitHub:"
echo "    git remote add origin https://github.com/TU-USUARIO/kontrol-crypto-dashboard.git"
echo "    git branch -M main"
echo "    git push -u origin main"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🎉 ¡Listo para GitHub!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

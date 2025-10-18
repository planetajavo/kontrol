#!/bin/bash

echo "🚀 Iniciando organización de archivos para GitHub..."

1. Crear estructura .github
mkdir -p .github/ISSUE_TEMPLATE
echo "✅ Carpeta .github creada"

2. Mover templates
if [ -f "PULL_REQUEST_TEMPLATE.md" ]; then
    mv PULL_REQUEST_TEMPLATE.md .github/
    echo "✅ PULL_REQUEST_TEMPLATE.md movido"
fi

if [ -d "ISSUE_TEMPLATE" ]; then
    if [ -f "ISSUE_TEMPLATE/bug_report.md" ]; then
        mv ISSUE_TEMPLATE/bug_report.md .github/ISSUE_TEMPLATE/
        echo "✅ bug_report.md movido"
    fi
    if [ -f "ISSUE_TEMPLATE/feature_request.md" ]; then
        mv ISSUE_TEMPLATE/feature_request.md .github/ISSUE_TEMPLATE/
        echo "✅ feature_request.md movido"
    fi
    rmdir ISSUE_TEMPLATE 2>/dev/null
    echo "✅ ISSUE_TEMPLATE limpiado"
fi

3. Eliminar LICENSE incorrecto (carpeta con .tsx)
rm -rf LICENSE
echo "✅ LICENSE incorrecto eliminado"

4. Crear LICENSE correcto
cat > LICENSE << 'EOF'
MIT License

Copyright (c) 2025 Kontrol Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to so as to do so, subject to the following conditions:

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

5. Crear carpeta docs
mkdir -p docs

6. Mover archivos .md a docs/
for file in \
    AML_KYT_SECTION.md \
    ANIMATION_IMPLEMENTATION.md \
    ARCHITECTURE.md \
    ARCHIVOS_CONFIGURACION.md \
    ASSETS_DEFI_POSITIONS.md \
    ASSETS_WALLETS_COLLAPSIBLE.md \
    BANKS_SECTION.md \
    COLOR_SYSTEM.md \
    COMPONENT_REUSABILITY_GUIDE.md \
    CRYPTO_ICONS_README.md \
    DOCS_CONTENT_COMPLETE.md \
    DOCS_DEPLOYMENT.md \
    DOCS_NAVIGATION_SETUP.md \
    DOCS_QUICK_SETUP.md \
    DOCS_SEPARATION_SUMMARY.md \
    EMPEZAR_AQUI.md \
    EXIT_STRATEGY_PLANNER_V2.md \
    EXIT_STRATEGY_TAX_BRACKETS_UPDATE.md \
    FIGMA_TO_CODE_WORKFLOW.md \
    GITHUB_READY.md \
    GITHUB_SETUP.md \
    GIT_COMMANDS_CHEATSHEET.md \
    INVESTMENT_PERFORMANCE_MODULE.md \
    INVESTMENT_PERFORMANCE_V2.md \
    MIGRATION_GUIDE.md \
    PORTFOLIO_DISTRIBUTION_REVAMP.md \
    PORTFOLIO_DISTRIBUTION_V2.md \
    QUICK_START.md \
    QUICK_START_GITHUB.md \
    REFACTOR_SUMMARY.md \
    RESUMEN_FISCAL_REDESIGN.md \
    SHARED_COMPONENTS_USAGE.md \
    STYLING_GUIDE.md \
    TAX_BRACKET_OPTIMIZER.md \
    TAX_FISCAL_RESTRUCTURE.md \
    TOOLTIPS_GUIDE.md \
    TRANSACTIONS_COLOR_GUIDE.md \
    TRANSACTIONS_UI_UNIFIED.md \
    TRANSACTION_TYPES_PALETTE.md \
    UX_IMPROVEMENTS.md \
    VISIBILITY_TOGGLE_IMPLEMENTATION.md
do
    if [ -f "$file" ]; then
        mv "$file" docs/
    fi
done
echo "✅ Archivos .md movidos a docs/"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ ORGANIZACIÓN COMPLETADA"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

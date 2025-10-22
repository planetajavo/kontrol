#!/bin/bash

echo "🚀 Organizando estructura de archivos para GitHub..."
echo ""

# ============================================
# 1. Crear estructura .github
# ============================================
mkdir -p .github/ISSUE_TEMPLATE
mkdir -p .github/workflows
echo "✅ Estructura .github/ creada"

# ============================================
# 2. Mover templates de GitHub
# ============================================
if [ -f "PULL_REQUEST_TEMPLATE.md" ]; then
    mv PULL_REQUEST_TEMPLATE.md .github/
    echo "✅ PULL_REQUEST_TEMPLATE.md → .github/"
fi

if [ -d "ISSUE_TEMPLATE" ]; then
    if [ -f "ISSUE_TEMPLATE/bug_report.md" ]; then
        mv ISSUE_TEMPLATE/bug_report.md .github/ISSUE_TEMPLATE/
        echo "✅ bug_report.md → .github/ISSUE_TEMPLATE/"
    fi
    if [ -f "ISSUE_TEMPLATE/feature_request.md" ]; then
        mv ISSUE_TEMPLATE/feature_request.md .github/ISSUE_TEMPLATE/
        echo "✅ feature_request.md → .github/ISSUE_TEMPLATE/"
    fi
    rmdir ISSUE_TEMPLATE 2>/dev/null
fi

# ============================================
# 3. Mover workflows
# ============================================
if [ -d "workflows" ]; then
    if [ -f "workflows/ci.yml" ]; then
        mv workflows/ci.yml .github/workflows/
        echo "✅ ci.yml → .github/workflows/"
    fi
    if [ -f "workflows/deploy-docs.yml" ]; then
        mv workflows/deploy-docs.yml .github/workflows/
        echo "✅ deploy-docs.yml → .github/workflows/"
    fi
    rmdir workflows 2>/dev/null
fi

# ============================================
# 4. Eliminar LICENSE incorrecto (carpeta)
# ============================================
if [ -d "LICENSE" ]; then
    rm -rf LICENSE
    echo "✅ LICENSE/ (carpeta incorrecta) eliminado"
fi

# ============================================
# 5. Crear carpeta docs/
# ============================================
mkdir -p docs

# ============================================
# 6. Mover archivos de documentación a docs/
# ============================================
echo ""
echo "📁 Moviendo documentación a /docs..."

# Lista de archivos a mover
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
        echo "  → $file"
    fi
done

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ ORGANIZACIÓN COMPLETADA"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📂 Estructura final:"
echo "   /.github/"
echo "   ├── ISSUE_TEMPLATE/"
echo "   ├── workflows/"
echo "   └── PULL_REQUEST_TEMPLATE.md"
echo ""
echo "   /docs/"
echo "   ├── 40+ archivos de documentación"
echo ""
echo "   Raíz:"
echo "   ├── README.md"
echo "   ├── PRODUCT.md"
echo "   ├── CONTRIBUTING.md"
echo "   └── LICENSE (pendiente de crear)"
echo ""

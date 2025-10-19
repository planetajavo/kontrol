#!/bin/bash

# =============================================================================
# 🔍 Kontrol - Verification Script
# =============================================================================
# Verifica que el proyecto esté correctamente configurado después del setup
# Ejecutar: bash verify-setup.sh
# =============================================================================

set -e

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔍 KONTROL - VERIFICACIÓN DE CONFIGURACIÓN"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

ERRORS=0
WARNINGS=0

# =============================================================================
# Función para verificar archivos
# =============================================================================
check_file() {
    local file=$1
    local description=$2
    
    if [ -f "$file" ]; then
        echo "✅ $description: $file"
        return 0
    else
        echo "❌ $description FALTA: $file"
        ((ERRORS++))
        return 1
    fi
}

# =============================================================================
# Función para verificar directorios
# =============================================================================
check_directory() {
    local dir=$1
    local description=$2
    
    if [ -d "$dir" ]; then
        echo "✅ $description: $dir"
        return 0
    else
        echo "❌ $description FALTA: $dir"
        ((ERRORS++))
        return 1
    fi
}

# =============================================================================
# 1. ARCHIVOS CRÍTICOS
# =============================================================================
echo "📁 Verificando archivos críticos..."
echo ""

check_file "package.json" "Package configuration"
check_file "tsconfig.json" "TypeScript config"
check_file "vite.config.ts" "Vite config"
check_file ".gitignore" "Git ignore"
check_file "README.md" "README"
check_file "LICENSE" "License file"
check_file "PRODUCT.md" "Product specification"
check_file "CONTRIBUTING.md" "Contributing guide"

echo ""

# =============================================================================
# 2. ARCHIVOS DE ENTRADA
# =============================================================================
echo "🚪 Verificando entry points..."
echo ""

check_file "index.html" "HTML entrypoint"
check_file "main.tsx" "React entrypoint"
check_file "App.tsx" "Main App component"

echo ""

# =============================================================================
# 3. ESTRUCTURA DE CARPETAS
# =============================================================================
echo "📂 Verificando estructura de carpetas..."
echo ""

check_directory "components" "Components directory"
check_directory "components/ui" "UI components (shadcn)"
check_directory "components/shared" "Shared components"
check_directory "contexts" "Context providers"
check_directory "hooks" "Custom hooks"
check_directory "services" "Services layer"
check_directory "types" "TypeScript types"
check_directory "utils" "Utilities"
check_directory "styles" "Styles directory"
check_directory "docs" "Documentation"

echo ""

# =============================================================================
# 4. ARCHIVOS DE CONFIGURACIÓN OPCIONALES
# =============================================================================
echo "⚙️  Verificando archivos de configuración opcionales..."
echo ""

if [ -f ".nvmrc" ]; then
    echo "✅ Node version specified: .nvmrc"
else
    echo "⚠️  Recomendado: .nvmrc (especifica versión de Node)"
    ((WARNINGS++))
fi

if [ -f ".prettierrc" ]; then
    echo "✅ Prettier config: .prettierrc"
else
    echo "⚠️  Recomendado: .prettierrc (formateo de código)"
    ((WARNINGS++))
fi

if [ -f ".editorconfig" ]; then
    echo "✅ EditorConfig: .editorconfig"
else
    echo "⚠️  Recomendado: .editorconfig (configuración de editor)"
    ((WARNINGS++))
fi

if [ -f ".env.example" ]; then
    echo "✅ Environment example: .env.example"
else
    echo "⚠️  Recomendado: .env.example (variables de entorno)"
    ((WARNINGS++))
fi

echo ""

# =============================================================================
# 5. VERIFICAR LICENSE
# =============================================================================
echo "📄 Verificando LICENSE..."
echo ""

if [ -f "LICENSE" ]; then
    if grep -q "MIT License" LICENSE 2>/dev/null; then
        echo "✅ LICENSE es un archivo válido (MIT)"
    else
        echo "⚠️  LICENSE existe pero no parece ser MIT"
        ((WARNINGS++))
    fi
elif [ -d "LICENSE" ]; then
    echo "❌ LICENSE es una carpeta (debería ser archivo)"
    ((ERRORS++))
else
    echo "❌ LICENSE no existe"
    ((ERRORS++))
fi

echo ""

# =============================================================================
# 6. VERIFICAR DOCUMENTACIÓN
# =============================================================================
echo "📚 Verificando documentación en /docs..."
echo ""

DOC_COUNT=$(find docs -name "*.md" 2>/dev/null | wc -l)

if [ "$DOC_COUNT" -gt 0 ]; then
    echo "✅ Encontrados $DOC_COUNT archivos de documentación en /docs"
else
    echo "⚠️  No se encontró documentación en /docs"
    ((WARNINGS++))
fi

echo ""

# =============================================================================
# 7. VERIFICAR COMPONENTES PRINCIPALES
# =============================================================================
echo "🧩 Verificando componentes principales..."
echo ""

MAIN_COMPONENTS=(
    "components/DashboardSection.tsx"
    "components/TaxFiscalSection.tsx"
    "components/AssetsSection.tsx"
    "components/TransactionsSection.tsx"
    "components/BanksSection.tsx"
    "components/AMLKYTSection.tsx"
    "components/Sidebar.tsx"
    "components/TopNavBar.tsx"
    "components/BottomNav.tsx"
)

for component in "${MAIN_COMPONENTS[@]}"; do
    if [ -f "$component" ]; then
        echo "  ✅ $(basename $component)"
    else
        echo "  ❌ FALTA: $component"
        ((ERRORS++))
    fi
done

echo ""

# =============================================================================
# 8. VERIFICAR CONTEXTS
# =============================================================================
echo "🔌 Verificando contexts..."
echo ""

if [ -f "contexts/AuthContext.tsx" ]; then
    echo "✅ AuthContext"
else
    echo "❌ FALTA: AuthContext"
    ((ERRORS++))
fi

if [ -f "contexts/ThemeContext.tsx" ]; then
    echo "✅ ThemeContext"
else
    echo "❌ FALTA: ThemeContext"
    ((ERRORS++))
fi

echo ""

# =============================================================================
# 9. VERIFICAR ESTILOS
# =============================================================================
echo "🎨 Verificando estilos..."
echo ""

if [ -f "styles/globals.css" ]; then
    if grep -q "Tailwind" styles/globals.css 2>/dev/null; then
        echo "✅ globals.css con Tailwind CSS"
    else
        echo "⚠️  globals.css existe pero no parece tener Tailwind"
        ((WARNINGS++))
    fi
else
    echo "❌ FALTA: styles/globals.css"
    ((ERRORS++))
fi

echo ""

# =============================================================================
# 10. VERIFICAR NODE_MODULES
# =============================================================================
echo "📦 Verificando dependencias..."
echo ""

if [ -d "node_modules" ]; then
    echo "⚠️  node_modules existe (debería estar en .gitignore)"
    if grep -q "node_modules" .gitignore 2>/dev/null; then
        echo "   ✅ Pero está en .gitignore"
    else
        echo "   ❌ Y NO está en .gitignore"
        ((ERRORS++))
    fi
else
    echo "✅ node_modules no existe (correcto para git)"
fi

echo ""

# =============================================================================
# 11. VERIFICAR PACKAGE.JSON
# =============================================================================
echo "📋 Verificando package.json..."
echo ""

if [ -f "package.json" ]; then
    # Check for critical dependencies
    if grep -q "react" package.json && grep -q "typescript" package.json; then
        echo "✅ Dependencias principales encontradas"
    else
        echo "⚠️  Faltan dependencias principales"
        ((WARNINGS++))
    fi
    
    # Check for scripts
    if grep -q "\"dev\"" package.json && grep -q "\"build\"" package.json; then
        echo "✅ Scripts npm configurados"
    else
        echo "⚠️  Faltan scripts npm esenciales"
        ((WARNINGS++))
    fi
fi

echo ""

# =============================================================================
# RESUMEN FINAL
# =============================================================================
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 RESUMEN DE VERIFICACIÓN"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

if [ $ERRORS -eq 0 ] && [ $WARNINGS -eq 0 ]; then
    echo "🎉 ¡PERFECTO! Todo está correctamente configurado."
    echo ""
    echo "✅ 0 errores"
    echo "✅ 0 advertencias"
    echo ""
    echo "Próximos pasos:"
    echo "  1. git init"
    echo "  2. git add ."
    echo "  3. git commit -m \"🚀 Initial commit - Kontrol v1.0\""
    echo "  4. Crear repo en GitHub"
    echo "  5. git remote add origin <URL>"
    echo "  6. git push -u origin main"
    echo ""
    exit 0
elif [ $ERRORS -eq 0 ]; then
    echo "⚠️  Configuración ACEPTABLE con advertencias menores"
    echo ""
    echo "✅ 0 errores críticos"
    echo "⚠️  $WARNINGS advertencia(s)"
    echo ""
    echo "Puedes continuar, pero revisa las advertencias arriba."
    echo ""
    exit 0
else
    echo "❌ ERRORES ENCONTRADOS - Configuración INCOMPLETA"
    echo ""
    echo "❌ $ERRORS error(es) crítico(s)"
    echo "⚠️  $WARNINGS advertencia(s)"
    echo ""
    echo "Por favor, corrige los errores antes de continuar."
    echo "Ejecuta: bash setup-github.sh"
    echo ""
    exit 1
fi

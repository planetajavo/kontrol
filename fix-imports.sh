#!/bin/bash

echo "🔧 Arreglando imports en componentes UI..."

# Arreglar imports de Radix UI
find frontend/src -name "*.tsx" -type f -exec sed -i '' 's/@radix-ui\/react-\([^@]*\)@[0-9.]*/@radix-ui\/react-\1/g' {} \;

# Arreglar imports de class-variance-authority
find frontend/src -name "*.tsx" -type f -exec sed -i '' 's/class-variance-authority@[0-9.]*/class-variance-authority/g' {} \;

# Arreglar imports de lucide-react
find frontend/src -name "*.tsx" -type f -exec sed -i '' 's/lucide-react@[0-9.]*/lucide-react/g' {} \;

# Arreglar imports de sonner
find frontend/src -name "*.tsx" -type f -exec sed -i '' 's/sonner@[0-9.]*/sonner/g' {} \;

# Arreglar imports de recharts
find frontend/src -name "*.tsx" -type f -exec sed -i '' 's/recharts@[0-9.]*/recharts/g' {} \;

# Arreglar imports de react-hook-form
find frontend/src -name "*.tsx" -type f -exec sed -i '' 's/react-hook-form@[0-9.]*/react-hook-form/g' {} \;

# Arreglar imports de @hookform/resolvers
find frontend/src -name "*.tsx" -type f -exec sed -i '' 's/@hookform\/resolvers@[0-9.]*/@hookform\/resolvers/g' {} \;

# Arreglar imports de zod
find frontend/src -name "*.tsx" -type f -exec sed -i '' 's/zod@[0-9.]*/zod/g' {} \;

echo "✅ Imports arreglados!"

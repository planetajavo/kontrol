// src/containers/TotalPortfolioContainer.tsx

import React from 'react';
// Asume que tu componente de UI de Figma Make se llama así:
// **(Asegúrate de verificar el nombre exacto de tu componente en src/components/)**
import TotalPortfolioValue from '../components/TotalPortfolioValue'; 

// --- Lógica de Negocio Simulada ---
// En el futuro, esta función llamará a src/services/HistoricalDataService.ts
function usePortfolioValue() {
    // Aquí iría la lógica compleja: Sumar balances, convertir a divisa base, etc.
    const total = 425000.75; // Valor estático por ahora
    const trend = 0.052; // Tendencia positiva del 5.2%
    return { value: total, percentageChange: trend };
}

// El componente contenedor (NUNCA será sobrescrito por Figma Make)
const TotalPortfolioContainer: React.FC = () => {
    const { value, percentageChange } = usePortfolioValue();
    
    // El contenedor formatea los datos y decide el color
    const formattedValue = new Intl.NumberFormat('es-ES', { 
        style: 'currency', 
        currency: 'EUR' 
    }).format(value);

    // Renderiza el componente visual de Figma Make y le pasa solo datos 'tontos'
    return (
        <TotalPortfolioValue 
            currentValue={formattedValue} 
            change={percentageChange}
        />
    );
};

export default TotalPortfolioContainer;
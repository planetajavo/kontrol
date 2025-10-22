// ingestion-service-go/cmd/api/main.go
package main

import (
    "log"
    "net/http"
    "context"
    
    "kontrol/ingestion/api"
    "kontrol/ingestion/exchanges"
    "kontrol/ingestion/database"
)

func main() {
    // Configuración
    cfg := config.Load()
    
    // Clientes de base de datos
    db, err := database.NewPostgresClient(cfg.DatabaseURL)
    if err != nil {
        log.Fatal("Error conectando a PostgreSQL:", err)
    }
    
    redisClient, err := database.NewRedisClient(cfg.RedisURL)
    if err != nil {
        log.Fatal("Error conectando a Redis:", err)
    }
    
    // Clientes de exchanges
    exchangeClients := exchanges.NewClientManager()
    exchangeClients.Register("binance", exchanges.NewBinanceClient())
    exchangeClients.Register("coinbase", exchanges.NewCoinbaseClient())
    exchangeClients.Register("kraken", exchanges.NewKrakenClient())
    
    // Servidor HTTP
    server := api.NewServer(db, redisClient, exchangeClients)
    
    log.Printf("Starting ingestion service on %s", cfg.Port)
    if err := http.ListenAndServe(":"+cfg.Port, server.Router()); err != nil {
        log.Fatal("Error starting server:", err)
    }
}

// ingestion-service-go/internal/exchanges/binance.go
type BinanceClient struct {
    client *resty.Client
    apiKey string
    secret string
}

func (b *BinanceClient) GetAccountInfo(ctx context.Context) (*AccountInfo, error) {
    // Implementar llamada a Binance API
    resp, err := b.client.R().
        SetContext(ctx).
        SetAuthToken(b.apiKey).
        SetResult(&AccountInfo{}).
        Get("/api/v3/account")
        
    if err != nil {
        return nil, fmt.Errorf("error calling Binance API: %w", err)
    }
    
    return resp.Result().(*AccountInfo), nil
}

func (b *BinanceClient) GetDepositHistory(ctx context.Context) ([]Transaction, error) {
    // Obtener historial de depósitos
    // Convertir a formato canónico KONTROL
}

func (b *BinanceClient) GetWithdrawalHistory(ctx context.Context) ([]Transaction, error) {
    // Obtener historial de retiros
    // Convertir a formato canónico KONTROL
}

# Entregables
• ingestion-service-go/cmd/api/main.go
• ingestion-service-go/internal/exchanges/binance.go
• ingestion-service-go/internal/exchanges/coinbase.go
• ingestion-service-go/internal/exchanges/kraken.go
• ingestion-service-go/internal/database/postgres.go
• ingestion-service-go/internal/api/handlers.go
• ingestion-service-go/internal/models/transaction.go
• k8s/services/ingestion-service/deployment.yaml
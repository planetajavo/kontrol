// api-gateway/cmd/server/main.go
package main

import (
    "github.com/gin-gonic/gin"
    "kontrol/api-gateway/auth"
    "kontrol/api-gateway/middleware"
    "kontrol/api-gateway/routes"
)

func main() {
    // Configuración
    cfg := config.Load()
    
    // Inicializar Gin
    r := gin.Default()
    
    // Middlewares globales
    r.Use(middleware.CORS())
    r.Use(middleware.Logger())
    r.Use(middleware.Recovery())
    
    // Auth middleware
    authMiddleware := auth.NewJWTMiddleware(cfg.JWTSecret)
    
    // Routes públicas
    public := r.Group("/api/v1")
    {
        public.POST("/auth/register", routes.Register)
        public.POST("/auth/login", routes.Login)
        public.POST("/auth/refresh", routes.RefreshToken)
    }
    
    // Routes protegidas
    protected := r.Group("/api/v1")
    protected.Use(authMiddleware.ValidateToken())
    {
        // Portfolio routes
        protected.GET("/portfolio/overview", routes.GetPortfolioOverview)
        protected.GET("/portfolio/performance", routes.GetPortfolioPerformance)
        protected.GET("/portfolio/allocation", routes.GetPortfolioAllocation)
        
        // Sync routes
        protected.POST("/sync/exchange", routes.SyncExchange)
        protected.POST("/sync/wallet", routes.SyncWallet)
        protected.GET("/sync/status", routes.GetSyncStatus)
        
        // Import routes
        protected.POST("/import/cointracking", routes.ImportCointracking)
        protected.POST("/import/csv", routes.ImportCSV)
        
        // Chat routes
        protected.POST("/chat/portfolio", routes.PortfolioChat)
        protected.GET("/chat/history", routes.GetChatHistory)
        
        // Report routes
        protected.POST("/reports/tax", routes.GenerateTaxReport)
        protected.POST("/reports/proof-of-origin", routes.GenerateProofOfOrigin)
    }
    
    // Health checks
    r.GET("/health", routes.Health)
    r.GET("/ready", routes.Ready)
    
    // Iniciar servidor
    r.Run(":" + cfg.Port)
}

// api-gateway/auth/jwt.go
package auth

import (
    "github.com/golang-jwt/jwt/v4"
    "time"
)

type JWTManager struct {
    secretKey string
    duration  time.Duration
}

func (manager *JWTManager) Generate(user *User) (string, error) {
    claims := UserClaims{
        UserID: user.ID,
        Email:  user.Email,
        RegisteredClaims: jwt.RegisteredClaims{
            ExpiresAt: jwt.NewNumericDate(time.Now().Add(manager.duration)),
            IssuedAt:  jwt.NewNumericDate(time.Now()),
        },
    }
    
    token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
    return token.SignedString([]byte(manager.secretKey))
}

func (manager *JWTManager) Verify(tokenString string) (*UserClaims, error) {
    token, err := jwt.ParseWithClaims(
        tokenString,
        &UserClaims{},
        func(token *jwt.Token) (interface{}, error) {
            _, ok := token.Method.(*jwt.SigningMethodHMAC)
            if !ok {
                return nil, ErrInvalidToken
            }
            return []byte(manager.secretKey), nil
        },
    )
    
    if err != nil {
        return nil, ErrInvalidToken
    }
    
    claims, ok := token.Claims.(*UserClaims)
    if !ok {
        return nil, ErrInvalidToken
    }
    
    return claims, nil
}

# Entregables
• api-gateway/cmd/server/main.go
• api-gateway/auth/jwt.go
• api-gateway/middleware/cors.go
• api-gateway/middleware/logger.go
• api-gateway/middleware/rate_limiter.go
• api-gateway/routes/portfolio.go
• api-gateway/routes/auth.go
• api-gateway/routes/import.go
• k8s/services/api-gateway/deployment.yaml
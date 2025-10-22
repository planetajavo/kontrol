// Encontrar todas las transacciones entre dos wallets
MATCH (w1:Wallet {address: $address1})-[s:SENT]->(tx:Transaction)-[r:RECEIVED_BY]->(w2:Wallet {address: $address2})
RETURN w1, s, tx, r, w2

// Detectar patrones de mixing
MATCH (w:Wallet)-[:SENT|RECEIVED_BY*3..5]->(other:Wallet)
WHERE w.user_id IS NOT NULL AND other.user_id IS NULL
RETURN w, other

// Análisis de procedencia de fondos
MATCH path = (target:Wallet {address: $target_address})<-[:RECEIVED_BY*1..10]-(:Transaction)<-[:SENT]-(source:Wallet)
RETURN path
ORDER BY length(path) ASC
LIMIT 10
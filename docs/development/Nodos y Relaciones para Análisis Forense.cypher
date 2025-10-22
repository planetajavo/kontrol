// Nodos principales
CREATE 
// Wallets
(w1:Wallet {address: '0x123...', user_id: 'uuid', first_seen: timestamp()}),
(w2:Wallet {address: '0x456...', user_id: 'uuid', first_seen: timestamp()}),

// Exchanges
(binance:Exchange {name: 'Binance', country: 'Global', regulated: true}),
(coinbase:Exchange {name: 'Coinbase', country: 'USA', regulated: true}),

// Transacciones
(tx1:Transaction {hash: '0xabc...', amount: 1.5, asset: 'ETH', timestamp: timestamp()}),
(tx2:Transaction {hash: '0xdef...', amount: 5000, asset: 'USDT', timestamp: timestamp()}),

// Relaciones
(w1)-[:SENT {amount: 1.5, asset: 'ETH'}]->(tx1),
(tx1)-[:RECEIVED_BY {amount: 1.5, asset: 'ETH'}]->(w2),
(w1)-[:REGISTERED_ON]->(binance),
(w2)-[:REGISTERED_ON]->(coinbase)
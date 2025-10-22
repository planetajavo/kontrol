# cointracking-importer/core/parser.py
import pandas as pd
import json
from typing import Dict, List, Optional
from pathlib import Path

class CointrackingBackupParser:
    """Parser para backups de Cointracking"""
    
    def __init__(self):
        self.supported_formats = ['csv', 'json', 'backup']
        self.exchange_mappings = self.load_exchange_mappings()
        
    async def parse_backup(self, file_content: bytes, file_type: str) -> CointrackingData:
        """Parsear backup basado en el tipo de archivo"""
        
        if file_type == 'csv':
            return await self.parse_csv_backup(file_content)
        elif file_type == 'json':
            return await self.parse_json_backup(file_content)
        elif file_type == 'backup':
            return await self.parse_full_backup(file_content)
        else:
            raise ValueError(f"Formato no soportado: {file_type}")
    
    async def parse_csv_backup(self, file_content: bytes) -> CointrackingData:
        """Parsear backup en formato CSV"""
        try:
            # Leer CSV
            df = pd.read_csv(
                io.BytesIO(file_content),
                encoding='utf-8',
                parse_dates=['Date'],
                dayfirst=True
            )
            
            # Validar columnas requeridas
            required_columns = ['Date', 'Type', 'Buy', 'Sell', 'Fee']
            missing_columns = [col for col in required_columns if col not in df.columns]
            
            if missing_columns:
                raise ValueError(f"Columnas faltantes: {missing_columns}")
            
            # Convertir a formato KONTROL
            transactions = []
            for _, row in df.iterrows():
                transaction = self.convert_cointracking_row(row)
                if transaction:
                    transactions.append(transaction)
            
            return CointrackingData(
                transactions=transactions,
                metadata=self.extract_csv_metadata(df),
                file_type='csv'
            )
            
        except Exception as e:
            raise ParseError(f"Error parsing CSV backup: {str(e)}")
    
    def extract_critical_metadata(self, backup_data: CointrackingData) -> CriticalMetadata:
        """Extraer metadata crítica del backup"""
        return CriticalMetadata(
            manual_entries=backup_data.get_manual_transactions(),
            wallet_labels=backup_data.get_wallet_labels(),
            tax_methods_used=backup_data.get_tax_methods(),
            exchange_mappings=backup_data.get_exchange_mappings(),
            custom_categories=backup_data.get_custom_categories(),
            historical_notes=backup_data.get_transaction_notes(),
            import_settings=backup_data.get_import_settings()
        )
    
    async def enrich_automated_sync(self, user_id: str, metadata: CriticalMetadata) -> None:
        """Enriquecer sincronización automática con metadata de Cointracking"""
        
        # Aplicar labels históricos a wallets detectadas
        await self.apply_historical_labels(user_id, metadata.wallet_labels)
        
        # Preservar categorías manuales del usuario
        await self.preserve_custom_categories(user_id, metadata.custom_categories)
        
        # Mantener notas históricas de transacciones
        await self.preserve_transaction_notes(user_id, metadata.historical_notes)
        
        # Aplicar método fiscal histórico
        await self.apply_historical_tax_method(user_id, metadata.tax_methods_used)

# cointracking-importer/api/handlers.py
class ImportHandler:
    async def handle_cointracking_import(self, request: ImportRequest) -> ImportResponse:
        """Manejar importación de backup Cointracking"""
        
        # Validar archivo
        validation_result = await self.validate_import_file(request.file_content, request.file_type)
        if not validation_result.is_valid:
            return ImportResponse(
                success=False,
                error=validation_result.error_message
            )
        
        # Parsear backup
        parser = CointrackingBackupParser()
        backup_data = await parser.parse_backup(request.file_content, request.file_type)
        
        # Extraer metadata crítica
        critical_metadata = parser.extract_critical_metadata(backup_data)
        
        # Migrar transacciones
        migration_result = await self.migrate_transactions(
            request.user_id, 
            backup_data.transactions
        )
        
        # Aplicar metadata al sync automático
        await parser.enrich_automated_sync(request.user_id, critical_metadata)
        
        return ImportResponse(
            success=True,
            stats=migration_result.stats,
            metadata=critical_metadata,
            applied_to_sync=True
        )

# Entregables
• cointracking-importer/core/parser.py
• cointracking-importer/core/migration.py
• cointracking-importer/api/handlers.py
• cointracking-importer/utils/validation.py
• cointracking-importer/models/cointracking.py
• scripts/migration/cointracking_migration.py
• k8s/services/cointracking-importer/deployment.yaml
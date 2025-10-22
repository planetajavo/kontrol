"""
KONTROL Supabase Utilities
Utilidades para integración con Supabase
"""

import logging
from typing import Optional, Dict, Any, List
from supabase import create_client, Client
from config.settings import get_settings, SupabaseConfig

logger = logging.getLogger(__name__)
settings = get_settings()
supabase_config = SupabaseConfig(settings)

# Cliente Supabase
supabase: Optional[Client] = None

async def init_supabase():
    """Inicializar cliente Supabase"""
    global supabase
    
    try:
        logger.info("☁️ Inicializando Supabase...")
        
        supabase = create_client(
            supabase_config.url,
            supabase_config.anon_key
        )
        
        # Verificar conexión
        response = supabase.table('users').select('id').limit(1).execute()
        
        logger.info("✅ Supabase inicializado correctamente")
        
    except Exception as e:
        logger.error(f"❌ Error inicializando Supabase: {e}")
        raise

def get_supabase_client() -> Client:
    """Obtener cliente Supabase"""
    if supabase is None:
        raise RuntimeError("Supabase no está inicializado")
    return supabase

class SupabaseService:
    """Servicio base para operaciones con Supabase"""
    
    def __init__(self, table_name: str):
        self.table_name = table_name
        self.client = get_supabase_client()
    
    async def create(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """Crear nuevo registro"""
        try:
            response = self.client.table(self.table_name).insert(data).execute()
            return response.data[0] if response.data else None
        except Exception as e:
            logger.error(f"Error creando registro en {self.table_name}: {e}")
            raise
    
    async def get_by_id(self, id: str) -> Optional[Dict[str, Any]]:
        """Obtener registro por ID"""
        try:
            response = self.client.table(self.table_name).select('*').eq('id', id).execute()
            return response.data[0] if response.data else None
        except Exception as e:
            logger.error(f"Error obteniendo registro {id} de {self.table_name}: {e}")
            raise
    
    async def get_by_user(self, user_id: str, limit: int = 100, offset: int = 0) -> List[Dict[str, Any]]:
        """Obtener registros por usuario"""
        try:
            response = (
                self.client.table(self.table_name)
                .select('*')
                .eq('user_id', user_id)
                .range(offset, offset + limit - 1)
                .execute()
            )
            return response.data
        except Exception as e:
            logger.error(f"Error obteniendo registros de usuario {user_id} de {self.table_name}: {e}")
            raise
    
    async def update(self, id: str, data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """Actualizar registro"""
        try:
            response = (
                self.client.table(self.table_name)
                .update(data)
                .eq('id', id)
                .execute()
            )
            return response.data[0] if response.data else None
        except Exception as e:
            logger.error(f"Error actualizando registro {id} de {self.table_name}: {e}")
            raise
    
    async def delete(self, id: str) -> bool:
        """Eliminar registro"""
        try:
            response = (
                self.client.table(self.table_name)
                .delete()
                .eq('id', id)
                .execute()
            )
            return len(response.data) > 0
        except Exception as e:
            logger.error(f"Error eliminando registro {id} de {self.table_name}: {e}")
            raise
    
    async def search(self, filters: Dict[str, Any], limit: int = 100, offset: int = 0) -> List[Dict[str, Any]]:
        """Buscar registros con filtros"""
        try:
            query = self.client.table(self.table_name).select('*')
            
            for key, value in filters.items():
                query = query.eq(key, value)
            
            response = query.range(offset, offset + limit - 1).execute()
            return response.data
        except Exception as e:
            logger.error(f"Error buscando en {self.table_name}: {e}")
            raise

class SupabaseAuthService:
    """Servicio de autenticación con Supabase"""
    
    def __init__(self):
        self.client = get_supabase_client()
    
    async def sign_up(self, email: str, password: str, metadata: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """Registrar nuevo usuario"""
        try:
            response = self.client.auth.sign_up({
                "email": email,
                "password": password,
                "options": {
                    "data": metadata or {}
                }
            })
            return response
        except Exception as e:
            logger.error(f"Error registrando usuario {email}: {e}")
            raise
    
    async def sign_in(self, email: str, password: str) -> Dict[str, Any]:
        """Iniciar sesión"""
        try:
            response = self.client.auth.sign_in_with_password({
                "email": email,
                "password": password
            })
            return response
        except Exception as e:
            logger.error(f"Error iniciando sesión para {email}: {e}")
            raise
    
    async def sign_out(self) -> bool:
        """Cerrar sesión"""
        try:
            self.client.auth.sign_out()
            return True
        except Exception as e:
            logger.error(f"Error cerrando sesión: {e}")
            raise
    
    async def get_user(self) -> Optional[Dict[str, Any]]:
        """Obtener usuario actual"""
        try:
            response = self.client.auth.get_user()
            return response.user if response.user else None
        except Exception as e:
            logger.error(f"Error obteniendo usuario: {e}")
            raise
    
    async def refresh_token(self, refresh_token: str) -> Dict[str, Any]:
        """Refrescar token de acceso"""
        try:
            response = self.client.auth.refresh_session(refresh_token)
            return response
        except Exception as e:
            logger.error(f"Error refrescando token: {e}")
            raise

class SupabaseStorageService:
    """Servicio de almacenamiento con Supabase"""
    
    def __init__(self, bucket_name: str = None):
        self.client = get_supabase_client()
        self.bucket_name = bucket_name or supabase_config.storage_bucket
    
    async def upload_file(self, file_path: str, file_data: bytes, content_type: str = "application/octet-stream") -> str:
        """Subir archivo"""
        try:
            response = self.client.storage.from_(self.bucket_name).upload(
                file_path,
                file_data,
                file_options={"content-type": content_type}
            )
            return response.get('path')
        except Exception as e:
            logger.error(f"Error subiendo archivo {file_path}: {e}")
            raise
    
    async def download_file(self, file_path: str) -> bytes:
        """Descargar archivo"""
        try:
            response = self.client.storage.from_(self.bucket_name).download(file_path)
            return response
        except Exception as e:
            logger.error(f"Error descargando archivo {file_path}: {e}")
            raise
    
    async def delete_file(self, file_path: str) -> bool:
        """Eliminar archivo"""
        try:
            response = self.client.storage.from_(self.bucket_name).remove([file_path])
            return len(response) > 0
        except Exception as e:
            logger.error(f"Error eliminando archivo {file_path}: {e}")
            raise
    
    async def get_public_url(self, file_path: str) -> str:
        """Obtener URL pública del archivo"""
        try:
            response = self.client.storage.from_(self.bucket_name).get_public_url(file_path)
            return response
        except Exception as e:
            logger.error(f"Error obteniendo URL pública de {file_path}: {e}")
            raise
    
    async def list_files(self, folder_path: str = "") -> List[Dict[str, Any]]:
        """Listar archivos en carpeta"""
        try:
            response = self.client.storage.from_(self.bucket_name).list(folder_path)
            return response
        except Exception as e:
            logger.error(f"Error listando archivos en {folder_path}: {e}")
            raise

class SupabaseRealtimeService:
    """Servicio de tiempo real con Supabase"""
    
    def __init__(self):
        self.client = get_supabase_client()
    
    async def subscribe_to_table(self, table_name: str, callback, filters: Optional[Dict[str, Any]] = None):
        """Suscribirse a cambios en tabla"""
        try:
            channel = self.client.channel(f"realtime:{table_name}")
            
            if filters:
                for key, value in filters.items():
                    channel = channel.filter(key, 'eq', value)
            
            channel.on('postgres_changes', {
                'event': '*',
                'schema': 'public',
                'table': table_name
            }, callback).subscribe()
            
            return channel
        except Exception as e:
            logger.error(f"Error suscribiéndose a {table_name}: {e}")
            raise
    
    async def unsubscribe(self, channel):
        """Desuscribirse de canal"""
        try:
            self.client.remove_channel(channel)
        except Exception as e:
            logger.error(f"Error desuscribiéndose: {e}")
            raise

# Servicios específicos para KONTROL
class UserSupabaseService(SupabaseService):
    """Servicio de usuarios con Supabase"""
    
    def __init__(self):
        super().__init__('users')
    
    async def get_by_email(self, email: str) -> Optional[Dict[str, Any]]:
        """Obtener usuario por email"""
        try:
            response = (
                self.client.table(self.table_name)
                .select('*')
                .eq('email', email)
                .execute()
            )
            return response.data[0] if response.data else None
        except Exception as e:
            logger.error(f"Error obteniendo usuario por email {email}: {e}")
            raise
    
    async def update_subscription(self, user_id: str, subscription_tier: str) -> Optional[Dict[str, Any]]:
        """Actualizar suscripción del usuario"""
        return await self.update(user_id, {'subscription_tier': subscription_tier})

class TransactionSupabaseService(SupabaseService):
    """Servicio de transacciones con Supabase"""
    
    def __init__(self):
        super().__init__('canonical_transactions')
    
    async def get_by_date_range(self, user_id: str, start_date: str, end_date: str) -> List[Dict[str, Any]]:
        """Obtener transacciones por rango de fechas"""
        try:
            response = (
                self.client.table(self.table_name)
                .select('*')
                .eq('user_id', user_id)
                .gte('timestamp_utc', start_date)
                .lte('timestamp_utc', end_date)
                .order('timestamp_utc', desc=True)
                .execute()
            )
            return response.data
        except Exception as e:
            logger.error(f"Error obteniendo transacciones por rango: {e}")
            raise
    
    async def get_by_asset(self, user_id: str, asset: str) -> List[Dict[str, Any]]:
        """Obtener transacciones por asset"""
        try:
            response = (
                self.client.table(self.table_name)
                .select('*')
                .eq('user_id', user_id)
                .eq('asset_in', asset)
                .order('timestamp_utc', desc=True)
                .execute()
            )
            return response.data
        except Exception as e:
            logger.error(f"Error obteniendo transacciones por asset {asset}: {e}")
            raise
    
    async def get_by_kontorl_type(self, user_id: str, kontorl_type: str) -> List[Dict[str, Any]]:
        """Obtener transacciones por tipo KONTROL"""
        try:
            response = (
                self.client.table(self.table_name)
                .select('*')
                .eq('user_id', user_id)
                .eq('kontorl_type', kontorl_type)
                .order('timestamp_utc', desc=True)
                .execute()
            )
            return response.data
        except Exception as e:
            logger.error(f"Error obteniendo transacciones por tipo {kontorl_type}: {e}")
            raise

class ExchangeSupabaseService(SupabaseService):
    """Servicio de exchanges con Supabase"""
    
    def __init__(self):
        super().__init__('exchange_connections')
    
    async def get_active_by_user(self, user_id: str) -> List[Dict[str, Any]]:
        """Obtener exchanges activos por usuario"""
        try:
            response = (
                self.client.table(self.table_name)
                .select('*')
                .eq('user_id', user_id)
                .eq('is_active', True)
                .execute()
            )
            return response.data
        except Exception as e:
            logger.error(f"Error obteniendo exchanges activos: {e}")
            raise
    
    async def update_sync_status(self, connection_id: str, status: str, error_count: int = 0) -> Optional[Dict[str, Any]]:
        """Actualizar estado de sincronización"""
        data = {'sync_status': status}
        if error_count > 0:
            data['error_count'] = error_count
        return await self.update(connection_id, data)


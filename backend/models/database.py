"""
KONTROL Database Models
Modelos SQLAlchemy para Supabase PostgreSQL
"""

from sqlalchemy import (
    Column, String, Integer, Boolean, DateTime, Text, 
    ForeignKey, UniqueConstraint, CheckConstraint, Index,
    DECIMAL, JSON, Date, BigInteger
)
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from datetime import datetime
from decimal import Decimal
import uuid

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String(255), unique=True, nullable=False, index=True)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(255))
    jurisdiction = Column(String(50), nullable=False, default='ES')
    timezone = Column(String(50), default='UTC')
    kyc_status = Column(String(20), default='pending')
    subscription_tier = Column(String(20), default='pro')
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    
    # Relaciones
    exchange_connections = relationship("ExchangeConnection", back_populates="user", cascade="all, delete-orphan")
    wallet_addresses = relationship("WalletAddress", back_populates="user", cascade="all, delete-orphan")
    transactions = relationship("CanonicalTransaction", back_populates="user", cascade="all, delete-orphan")
    portfolio_snapshots = relationship("PortfolioSnapshot", back_populates="user", cascade="all, delete-orphan")
    tax_reports = relationship("TaxReport", back_populates="user", cascade="all, delete-orphan")
    sync_jobs = relationship("SyncJob", back_populates="user", cascade="all, delete-orphan")
    
    # Constraints
    __table_args__ = (
        CheckConstraint("email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$'", name='valid_email'),
        CheckConstraint("jurisdiction IN ('ES', 'US', 'DE', 'FR', 'IT', 'GB', 'NL', 'BE', 'AT', 'CH')", name='valid_jurisdiction'),
        CheckConstraint("subscription_tier IN ('free', 'pro', 'compliance', 'enterprise')", name='valid_subscription'),
    )

class ExchangeConnection(Base):
    __tablename__ = 'exchange_connections'
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    exchange_name = Column(String(100), nullable=False)
    api_key_encrypted = Column(Text, nullable=False)
    api_secret_encrypted = Column(Text, nullable=False)
    passphrase_encrypted = Column(Text)  # Para Coinbase Pro
    is_active = Column(Boolean, default=True)
    last_sync = Column(DateTime(timezone=True))
    sync_status = Column(String(20), default='pending')
    error_count = Column(Integer, default=0)
    permissions = Column(JSON, default=list)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    
    # Relaciones
    user = relationship("User", back_populates="exchange_connections")
    
    # Constraints
    __table_args__ = (
        Index('idx_exchange_user', 'user_id', 'exchange_name'),
        Index('idx_exchange_sync', 'sync_status', 'last_sync'),
        Index('idx_exchange_active', 'user_id', 'is_active'),
        CheckConstraint("exchange_name IN ('binance', 'coinbase', 'kraken', 'ftx', 'kucoin', 'bybit', 'okx')", name='valid_exchange'),
        CheckConstraint("sync_status IN ('pending', 'syncing', 'completed', 'failed', 'paused')", name='valid_sync_status'),
    )

class WalletAddress(Base):
    __tablename__ = 'wallet_addresses'
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    address = Column(String(255), nullable=False)
    label = Column(String(100))
    blockchain = Column(String(50), nullable=False)
    is_verified = Column(Boolean, default=False)
    detection_method = Column(String(50))
    confidence_score = Column(DECIMAL(3, 2), default=Decimal('0.0'))
    first_transaction_date = Column(DateTime(timezone=True))
    last_transaction_date = Column(DateTime(timezone=True))
    total_received = Column(DECIMAL(38, 18), default=Decimal('0'))
    total_sent = Column(DECIMAL(38, 18), default=Decimal('0'))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    
    # Relaciones
    user = relationship("User", back_populates="wallet_addresses")
    
    # Constraints
    __table_args__ = (
        Index('idx_wallet_user', 'user_id'),
        Index('idx_wallet_address', 'address'),
        Index('idx_wallet_blockchain', 'blockchain'),
        Index('idx_wallet_verified', 'is_verified'),
        UniqueConstraint('user_id', 'address', 'blockchain', name='unique_user_wallet'),
        CheckConstraint("blockchain IN ('ethereum', 'bitcoin', 'polygon', 'arbitrum', 'optimism', 'bsc', 'avalanche', 'solana')", name='valid_blockchain'),
        CheckConstraint("confidence_score >= 0 AND confidence_score <= 1", name='valid_confidence'),
    )

class CanonicalTransaction(Base):
    __tablename__ = 'canonical_transactions'
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    tx_id_kontrol = Column(String(255), unique=True, nullable=False)
    tx_hash = Column(String(255))
    timestamp_utc = Column(DateTime(timezone=True), nullable=False)
    tx_type = Column(String(50), nullable=False)
    asset_in = Column(String(20))
    asset_out = Column(String(20))
    amount_in = Column(DECIMAL(38, 18))
    amount_out = Column(DECIMAL(38, 18))
    source_address = Column(String(255))
    destination_address = Column(String(255))
    source_type = Column(String(50))
    destination_type = Column(String(50))
    exchange_id = Column(String(100))
    kontorl_type = Column(String(50), nullable=False)
    fiat_cost_basis_unit = Column(DECIMAL(38, 18))
    exchange_rate = Column(DECIMAL(38, 18))
    realized_pnl = Column(DECIMAL(38, 18), default=Decimal('0'))
    data_confidence = Column(DECIMAL(3, 2), default=Decimal('1.0'))
    fees = Column(DECIMAL(38, 18), default=Decimal('0'))
    network_fees = Column(DECIMAL(38, 18), default=Decimal('0'))
    tags = Column(JSON, default=list)
    metadata = Column(JSON, default=dict)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    
    # Relaciones
    user = relationship("User", back_populates="transactions")
    
    # Constraints
    __table_args__ = (
        Index('idx_tx_user_timestamp', 'user_id', 'timestamp_utc'),
        Index('idx_tx_user_asset', 'user_id', 'asset_in'),
        Index('idx_tx_user_type', 'user_id', 'kontorl_type'),
        Index('idx_tx_hash', 'tx_hash'),
        Index('idx_tx_exchange', 'exchange_id'),
        Index('idx_tx_addresses', 'source_address', 'destination_address'),
        Index('idx_tx_timestamp', 'timestamp_utc'),
        Index('idx_tx_user_asset_timestamp', 'user_id', 'asset_in', 'timestamp_utc'),
        Index('idx_tx_user_type_timestamp', 'user_id', 'kontorl_type', 'timestamp_utc'),
        CheckConstraint("tx_type IN ('BUY', 'SELL', 'TRANSFER', 'FEE', 'REWARD', 'STAKING', 'MINING')", name='valid_tx_type'),
        CheckConstraint("kontorl_type IN ('INTERNAL_TRANSFER_IN', 'INTERNAL_TRANSFER_OUT', 'CAPITAL_GAIN_SELL', 'FEE_DEDUCTION', 'TRADE', 'SALE', 'EXCHANGE', 'DEPOSIT', 'WITHDRAWAL')", name='valid_kontorl_type'),
        CheckConstraint("source_type IN ('WALLET', 'EXCHANGE', 'CEX', 'DEX', 'DEFI', 'MINING', 'STAKING')", name='valid_source_type'),
        CheckConstraint("destination_type IN ('WALLET', 'EXCHANGE', 'CEX', 'DEX', 'DEFI', 'MINING', 'STAKING')", name='valid_destination_type'),
    )

class PortfolioSnapshot(Base):
    __tablename__ = 'portfolio_snapshots'
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    date = Column(Date, nullable=False)
    asset = Column(String(20), nullable=False)
    amount = Column(DECIMAL(38, 18), nullable=False)
    value_usd = Column(DECIMAL(38, 18), nullable=False)
    cost_basis_usd = Column(DECIMAL(38, 18), nullable=False)
    unrealized_pnl = Column(DECIMAL(38, 18), nullable=False)
    unrealized_pnl_percent = Column(DECIMAL(5, 2), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relaciones
    user = relationship("User", back_populates="portfolio_snapshots")
    
    # Constraints
    __table_args__ = (
        Index('idx_portfolio_user_date', 'user_id', 'date'),
        Index('idx_portfolio_user_asset', 'user_id', 'asset'),
        UniqueConstraint('user_id', 'date', 'asset', name='unique_user_date_asset'),
    )

class TaxReport(Base):
    __tablename__ = 'tax_reports'
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    year = Column(Integer, nullable=False)
    method = Column(String(20), nullable=False)
    total_realized_gain = Column(DECIMAL(38, 18), nullable=False)
    total_tax_amount = Column(DECIMAL(38, 18), nullable=False)
    short_term_gains = Column(DECIMAL(38, 18), default=Decimal('0'))
    long_term_gains = Column(DECIMAL(38, 18), default=Decimal('0'))
    transaction_count = Column(Integer, default=0)
    report_data = Column(JSON, nullable=False)
    generated_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relaciones
    user = relationship("User", back_populates="tax_reports")
    
    # Constraints
    __table_args__ = (
        Index('idx_tax_user_year', 'user_id', 'year'),
        Index('idx_tax_user_method', 'user_id', 'method'),
        UniqueConstraint('user_id', 'year', 'method', name='unique_user_year_method'),
        CheckConstraint("method IN ('FIFO', 'LIFO', 'HIFO', 'AVERAGE_COST')", name='valid_method'),
    )

class SyncJob(Base):
    __tablename__ = 'sync_jobs'
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    job_type = Column(String(50), nullable=False)
    target_id = Column(String(255))  # ID del exchange o wallet
    status = Column(String(20), default='pending')
    progress = Column(Integer, default=0)
    total_items = Column(Integer, default=0)
    processed_items = Column(Integer, default=0)
    error_message = Column(Text)
    started_at = Column(DateTime(timezone=True))
    completed_at = Column(DateTime(timezone=True))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relaciones
    user = relationship("User", back_populates="sync_jobs")
    
    # Constraints
    __table_args__ = (
        Index('idx_jobs_user_status', 'user_id', 'status'),
        Index('idx_jobs_type_status', 'job_type', 'status'),
        CheckConstraint("job_type IN ('exchange_sync', 'wallet_sync', 'csv_import', 'tax_calculation')", name='valid_job_type'),
        CheckConstraint("status IN ('pending', 'running', 'completed', 'failed', 'cancelled')", name='valid_status'),
    )

# Modelos adicionales para funcionalidades específicas

class PriceData(Base):
    __tablename__ = 'price_data'
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    asset = Column(String(20), nullable=False)
    price_usd = Column(DECIMAL(38, 18), nullable=False)
    timestamp = Column(DateTime(timezone=True), nullable=False)
    source = Column(String(50), nullable=False)
    
    __table_args__ = (
        Index('idx_price_asset_timestamp', 'asset', 'timestamp'),
        Index('idx_price_timestamp', 'timestamp'),
    )

class ExchangeRate(Base):
    __tablename__ = 'exchange_rates'
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    from_currency = Column(String(10), nullable=False)
    to_currency = Column(String(10), nullable=False)
    rate = Column(DECIMAL(38, 18), nullable=False)
    timestamp = Column(DateTime(timezone=True), nullable=False)
    
    __table_args__ = (
        Index('idx_rate_currencies_timestamp', 'from_currency', 'to_currency', 'timestamp'),
        UniqueConstraint('from_currency', 'to_currency', 'timestamp', name='unique_rate'),
    )

class AuditLog(Base):
    __tablename__ = 'audit_logs'
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey('users.id', ondelete='CASCADE'))
    action = Column(String(100), nullable=False)
    resource_type = Column(String(50), nullable=False)
    resource_id = Column(String(255))
    details = Column(JSON)
    ip_address = Column(String(45))
    user_agent = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    __table_args__ = (
        Index('idx_audit_user', 'user_id'),
        Index('idx_audit_action', 'action'),
        Index('idx_audit_resource', 'resource_type', 'resource_id'),
        Index('idx_audit_timestamp', 'created_at'),
    )


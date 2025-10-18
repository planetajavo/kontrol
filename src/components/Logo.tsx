export default function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      {/* Círculo con degradado de fondo */}
      <div 
        className="absolute inset-0 rounded-full"
        style={{ 
          background: 'linear-gradient(135deg, var(--primary-gradient-from) 0%, var(--primary-gradient-to) 100%)'
        }}
      />
      
      {/* K japonesa sobresaliendo */}
      <span 
        className="relative z-10 text-black font-black"
        style={{ 
          fontFamily: "'Noto Sans JP', sans-serif",
          fontSize: '2.2em',
          lineHeight: '0.8',
          transform: 'translateY(-0.08em)',
          textShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}
      >
        K
      </span>
    </div>
  );
}

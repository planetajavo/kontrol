import { useState, useEffect } from 'react';
import { Play, ArrowRight, Shield, TrendingUp, FileText, Building2, CheckCircle2, Sparkles, MessageSquare, Brain, Coins, Volume2, VolumeX, DollarSign, ScanSearch, Database, Eye, Twitter, Github, Linkedin, Mail, Zap, Check, X, Bot, Code, RefreshCw } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import Logo from './Logo';
import { CryptoIcon } from './CryptoIcon';

interface LandingPageProps {
  onLogin: () => void;
  onRegister: () => void;
  onNavigateToDocs?: () => void;
}

export default function LandingPage({ onLogin, onRegister, onNavigateToDocs }: LandingPageProps) {
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isVideoMuted, setIsVideoMuted] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Extensive list of integrations for carousel (no repeats)
  const integrations = [
    { name: 'Binance', symbol: 'bnb' },
    { name: 'Coinbase', symbol: 'usdc' },
    { name: 'Kraken', symbol: 'btc' },
    { name: 'Ethereum', symbol: 'eth' },
    { name: 'Bitcoin', symbol: 'btc' },
    { name: 'Polygon', symbol: 'matic' },
    { name: 'Revolut', symbol: 'usdt' },
    { name: 'N26', symbol: 'usdc' },
    { name: 'Bybit', symbol: 'btc' },
    { name: 'KuCoin', symbol: 'btc' },
    { name: 'OKX', symbol: 'btc' },
    { name: 'Bitfinex', symbol: 'btc' },
    { name: 'Solana', symbol: 'sol' },
    { name: 'Cardano', symbol: 'ada' },
    { name: 'Avalanche', symbol: 'avax' },
    { name: 'BSC', symbol: 'bnb' },
    { name: 'Arbitrum', symbol: 'eth' },
    { name: 'Optimism', symbol: 'eth' },
    { name: 'BBVA', symbol: 'usdt' },
    { name: 'Santander', symbol: 'usdc' },
    { name: 'Wise', symbol: 'usdt' },
    { name: 'Gemini', symbol: 'btc' },
    { name: 'Bitstamp', symbol: 'btc' },
    { name: 'Gate.io', symbol: 'btc' },
  ];

  const features = [
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: 'Talk with Your Transactions',
      description: 'Natural language interface to query, analyze, and understand your entire transaction history across all wallets and exchanges.'
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: 'Tax Optimizer Agent',
      description: 'AI-powered tax optimization that analyzes your portfolio and suggests the best strategies to minimize your tax liability.'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Origin of Funds & Banking Report',
      description: 'Automated AML compliance with AI-assisted fund traceability and professional banking reports for regulatory requirements.'
    },
    {
      icon: <Coins className="w-8 h-8" />,
      title: 'Smart Wealth Management',
      description: 'AI-driven portfolio insights that help you make informed decisions and track performance across all your crypto assets.'
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: 'Exit Planner: Real Cost Against Fiat',
      description: 'Simulate your crypto sales and their associated tax impact before executing transactions. Test different exit scenarios with accurate P&L calculations.'
    },
    {
      icon: <Building2 className="w-8 h-8" />,
      title: 'Banking Report & AML Compliance',
      description: 'Our unique Banking Report feature provides full fund traceability with AI-assisted AML compliance. Perfect for regulatory requirements and banking relationships.'
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: 'Full User Privacy with ZK Proofs',
      description: 'Selective disclosure of your financial information powered by Zero-Knowledge proofs. Share only what you need, when you need it, while maintaining full privacy.'
    },
    {
      icon: <ScanSearch className="w-8 h-8" />,
      title: 'Auto-Matching Missing Transactions',
      description: 'Intelligent AI-powered detection and automatic matching of missing transactions across wallets and exchanges. Never lose track of your crypto movements.'
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: 'Automated Secure Backups',
      description: 'Your data is automatically backed up with enterprise-grade encryption. Restore your entire portfolio history anytime, anywhere with peace of mind.'
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Logo size={32} />
              <span className="text-xl font-semibold" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>Kontrol</span>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" onClick={onLogin}>
                Sign In
              </Button>
              <Button onClick={onRegister}>
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Video Background */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-[90vh] flex items-center">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1634108927657-344acccdc258?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBzZWN1cml0eSUyMHZhdWx0fGVufDF8fHx8MTc2MDcyNzY3NXww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Financial Security"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-background/80"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 border border-primary/20">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">AI-Powered Crypto Management</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Take <span style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: '1.1em', letterSpacing: '-0.02em' }}>Kontrol</span> of Your{' '}
                <span className="text-primary">
                  Crypto Wealth
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                The all-in-one platform for crypto portfolio management, tax optimization, and full AML compliance. 
                Connect your wallets, exchanges, and banks in one place.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg px-8" onClick={onRegister}>
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8" onClick={() => setVideoPlaying(true)}>
                  <Play className="w-5 h-5 mr-2" />
                  Watch Demo
                </Button>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl border border-border bg-card/50 backdrop-blur-sm">
                <iframe
                  src={`https://www.youtube.com/embed/p0IDUYx9pi0?autoplay=1&mute=${isVideoMuted ? '1' : '0'}&loop=1&playlist=p0IDUYx9pi0&controls=0&showinfo=0&rel=0&modestbranding=1`}
                  title="Kontrol Dashboard Demo"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                {/* Mute/Unmute Button */}
                <button
                  onClick={() => setIsVideoMuted(!isVideoMuted)}
                  className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-background hover:scale-110 transition-all flex items-center justify-center text-foreground shadow-lg z-10"
                  title={isVideoMuted ? 'Unmute' : 'Mute'}
                >
                  {isVideoMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Video Modal */}
        {videoPlaying && (
          <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4">
            <button
              onClick={() => setVideoPlaying(false)}
              className="absolute top-4 right-4 text-white hover:text-primary text-4xl"
            >
              ✕
            </button>
            <div className="text-white text-center max-w-2xl">
              <Play className="w-20 h-20 mx-auto mb-4" />
              <p className="text-xl">Demo video would play here</p>
              <p className="text-muted-foreground mt-2">Full product walkthrough and feature showcase</p>
            </div>
          </div>
        )}
      </section>

      {/* Integrations Carousel Strip */}
      <section className="py-8 bg-muted/50 border-y border-border overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <p className="text-center text-sm text-muted-foreground">
            INTEGRATIONS WITH 100+ EXCHANGES, WALLETS & BANKS
          </p>
        </div>
        <div className="relative">
          <div className="flex gap-4 animate-scroll">
            {/* First set */}
            {integrations.map((integration, index) => (
              <div
                key={`first-${index}`}
                className="flex-shrink-0 flex items-center gap-3 px-6 py-3 bg-card rounded-lg border border-border transition-all duration-300 hover:scale-110 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
              >
                <CryptoIcon symbol={integration.symbol} size={28} />
                <span className="font-medium whitespace-nowrap">{integration.name}</span>
              </div>
            ))}
            {/* Second set for seamless loop */}
            {integrations.map((integration, index) => (
              <div
                key={`second-${index}`}
                className="flex-shrink-0 flex items-center gap-3 px-6 py-3 bg-card rounded-lg border border-border transition-all duration-300 hover:scale-110 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
              >
                <CryptoIcon symbol={integration.symbol} size={28} />
                <span className="font-medium whitespace-nowrap">{integration.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Unified Features Section - AI-Powered & Everything You Need */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4 border border-primary/20">
              <Brain className="w-5 h-5" />
              <span className="text-sm font-medium">AI-Powered Intelligence</span>
            </div>
            <h2 className="text-4xl font-bold mb-4">
              Everything you need to manage your crypto wealth
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Advanced artificial intelligence that understands your portfolio, optimizes your taxes, ensures compliance, and helps you manage every aspect of your crypto journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-xl transition-all group"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Banking Report Highlight */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              {/* Background decorative elements */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 rounded-3xl blur-3xl -z-10" />
              
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-border/50 bg-card/80 backdrop-blur-sm">
                {/* Infographic: Exchange to Bank Flow */}
                <div className="w-full h-full flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                  
                  {/* Header */}
                  <div className="text-center mb-6 sm:mb-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-3">
                      <Sparkles className="w-4 h-4 text-primary" />
                      <span className="text-xs font-medium text-primary">How it works</span>
                    </div>
                    <h3 className="font-semibold text-lg sm:text-xl text-foreground">Crypto to Fiat Transfer</h3>
                  </div>
                  
                  <div className="space-y-4 sm:space-y-5">
                    {/* Step 1: Exchange */}
                    <div className="relative">
                      <div className="flex items-center gap-4 p-4 rounded-2xl bg-muted/30 border border-border/50 transition-all hover:bg-muted/50">
                        <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 border-2 border-blue-500/30 flex items-center justify-center">
                          <Coins className="w-7 h-7 sm:w-8 sm:h-8 text-blue-500" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-foreground mb-0.5">Crypto in Exchange</p>
                          <p className="text-xs sm:text-sm text-muted-foreground">Your digital assets stored</p>
                        </div>
                        <div className="hidden sm:flex items-center justify-center w-8 h-8 rounded-full bg-blue-500/10">
                          <span className="text-xs font-bold text-blue-500">1</span>
                        </div>
                      </div>
                    </div>

                    {/* Arrow Down */}
                    <div className="flex justify-center -my-1">
                      <div className="flex flex-col items-center gap-1">
                        <div className="w-0.5 h-4 bg-gradient-to-b from-border to-primary/50" />
                        <ArrowRight className="w-5 h-5 text-primary rotate-90" />
                        <div className="w-0.5 h-4 bg-gradient-to-b from-primary/50 to-border" />
                      </div>
                    </div>

                    {/* Step 2: Banking Report - DESTACADO */}
                    <div className="relative">
                      {/* Glow effect */}
                      <div className="absolute -inset-1 bg-gradient-to-r from-primary via-primary to-primary/50 rounded-2xl blur-sm opacity-20" />
                      
                      <div className="relative flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-primary/10 border-2 border-primary shadow-lg shadow-primary/10">
                        <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/20">
                          <FileText className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-bold text-foreground">Kontrol Banking Report</p>
                            <Sparkles className="w-4 h-4 text-primary" />
                          </div>
                          <p className="text-xs sm:text-sm text-muted-foreground">AI-powered AML + Origin of Funds</p>
                        </div>
                        <div className="hidden sm:flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white shadow-md">
                          <span className="text-xs font-bold">2</span>
                        </div>
                      </div>
                    </div>

                    {/* Arrow Down */}
                    <div className="flex justify-center -my-1">
                      <div className="flex flex-col items-center gap-1">
                        <div className="w-0.5 h-4 bg-gradient-to-b from-border to-primary/50" />
                        <ArrowRight className="w-5 h-5 text-primary rotate-90" />
                        <div className="w-0.5 h-4 bg-gradient-to-b from-primary/50 to-border" />
                      </div>
                    </div>

                    {/* Step 3: Bank Account */}
                    <div className="relative">
                      <div className="flex items-center gap-4 p-4 rounded-2xl bg-muted/30 border border-border/50 transition-all hover:bg-muted/50">
                        <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br from-green-500/20 to-green-600/20 border-2 border-green-500/30 flex items-center justify-center">
                          <Building2 className="w-7 h-7 sm:w-8 sm:h-8 text-green-500" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-foreground mb-0.5">Fiat in Bank Account</p>
                          <p className="text-xs sm:text-sm text-muted-foreground">Compliant & approved transfer</p>
                        </div>
                        <div className="hidden sm:flex items-center justify-center w-8 h-8 rounded-full bg-green-500/10">
                          <span className="text-xs font-bold text-green-500">3</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Info Badge */}
                  <div className="mt-6 sm:mt-8 p-3 sm:p-4 rounded-xl bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20">
                    <div className="flex items-start gap-2">
                      <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-xs sm:text-sm text-foreground/80">
                        <span className="font-semibold text-foreground">Required by banks:</span> Professional proof of funds origin for crypto-to-fiat transfers
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground mb-6">
                <Shield className="w-4 h-4" />
                <span className="text-sm font-medium">Unique Feature</span>
              </div>
              <h2 className="text-4xl font-bold mb-6">
                Banking Report with Full AML Compliance
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Our exclusive Banking Report feature provides complete traceability of your funds' origin, 
                AI-assisted AML compliance checks, and professional reports ready for your bank or regulator.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  'Complete origin of funds tracking',
                  'AI-powered AML screening',
                  'Bank-ready professional reports',
                  'Multi-jurisdiction compliance',
                  'Real-time risk assessment'
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button size="lg" onClick={onRegister}>
                Get Started Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* AI Agents Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4 border border-primary/20">
              <Bot className="w-5 h-5" />
              <span className="text-sm font-medium">Custom AI Agents</span>
            </div>
            <h2 className="text-4xl font-bold mb-4">
              Build Your Own AI Agents
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Create custom AI agents tailored to your specific crypto management needs. Automate your workflow and get intelligent insights 24/7.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <div className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-xl transition-all">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                <Brain className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Tax Optimization Agent</h3>
              <p className="text-muted-foreground leading-relaxed">
                Train an AI agent to continuously monitor your portfolio and suggest tax-loss harvesting opportunities, rebalancing strategies, and optimal exit timings.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-xl transition-all">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Compliance Monitor</h3>
              <p className="text-muted-foreground leading-relaxed">
                Build an agent that watches regulatory changes, scans your transactions for compliance issues, and alerts you before problems arise.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-xl transition-all">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                <TrendingUp className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Portfolio Analyst</h3>
              <p className="text-muted-foreground leading-relaxed">
                Create an agent that analyzes market trends, tracks your performance metrics, and provides personalized investment recommendations.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-xl transition-all">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                <Code className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Custom Workflows</h3>
              <p className="text-muted-foreground leading-relaxed">
                Design agents with custom logic, triggers, and actions. Integrate with your favorite tools and automate complex multi-step processes.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-xl transition-all">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                <RefreshCw className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Auto-Rebalancing</h3>
              <p className="text-muted-foreground leading-relaxed">
                Set up agents to automatically rebalance your portfolio based on your allocation targets, market conditions, or custom rules you define.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-xl transition-all">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Real-Time Alerts</h3>
              <p className="text-muted-foreground leading-relaxed">
                Configure intelligent agents that monitor specific conditions and send you instant notifications via email, SMS, or push notifications.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-3xl p-8 border border-primary/20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-bold mb-2">No-Code AI Agent Builder</h3>
                <p className="text-muted-foreground">
                  Create powerful AI agents with our intuitive drag-and-drop interface. No coding required.
                </p>
              </div>
              <Button size="lg" onClick={onRegister}>
                Start Building Agents
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4 border border-primary/20">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm font-medium">Simple, Transparent Pricing</span>
            </div>
            <h2 className="text-4xl font-bold mb-4">
              Choose Your Plan
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
              Start free, upgrade when you need more. All prices shown are for annual billing (save 20%).
            </p>
            
            {/* Limited Time Offer Badge */}
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary to-primary-gradient-to text-primary-foreground mb-8 shadow-lg">
              <Zap className="w-5 h-5" />
              <span className="font-semibold">Limited Offer: Get 2 months free on annual plans! 🎉</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Free Plan */}
            <div className="p-8 rounded-3xl bg-card border border-border hover:shadow-xl transition-all">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">Free</h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-4xl font-bold">€0</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <p className="text-muted-foreground">Perfect for getting started</p>
              </div>
              
              <Button variant="outline" size="lg" className="w-full mb-6" onClick={onRegister}>
                Get Started Free
              </Button>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">1 wallet connection</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">1 exchange connection</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">100 transactions/month</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Basic portfolio tracking</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Basic AI chat (10 queries/day)</span>
                </div>
                <div className="flex items-start gap-3">
                  <X className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">Tax reports</span>
                </div>
                <div className="flex items-start gap-3">
                  <X className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">Banking reports</span>
                </div>
                <div className="flex items-start gap-3">
                  <X className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">Custom AI agents</span>
                </div>
              </div>
            </div>

            {/* Personal Plan - Most Popular */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-primary/5 to-primary/10 border-2 border-primary shadow-xl scale-105 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </div>
              
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">Personal</h3>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-4xl font-bold">€10</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <div className="text-sm text-muted-foreground mb-4">
                  <span className="line-through">€12/month</span> when billed annually
                </div>
                <p className="text-muted-foreground">For serious crypto investors</p>
              </div>
              
              <Button size="lg" className="w-full mb-6" onClick={onRegister}>
                Start 14-Day Trial
              </Button>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-medium">Unlimited wallets & exchanges</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-medium">Unlimited transactions</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-medium">Advanced portfolio analytics</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-medium">Tax reports & P&L analysis</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-medium">Banking reports (3/month)</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-medium">Advanced AI chat (unlimited)</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-medium">Exit strategy planner</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-medium">2 custom AI agents</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-medium">Priority email support</span>
                </div>
              </div>
            </div>

            {/* Pro Plan */}
            <div className="p-8 rounded-3xl bg-card border border-border hover:shadow-xl transition-all">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">Pro</h3>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-4xl font-bold">€20</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <div className="text-sm text-muted-foreground mb-4">
                  <span className="line-through">€24/month</span> when billed annually
                </div>
                <p className="text-muted-foreground">For professionals & traders</p>
              </div>
              
              <Button variant="outline" size="lg" className="w-full mb-6" onClick={onRegister}>
                Start 14-Day Trial
              </Button>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-medium">Everything in Personal, plus:</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-medium">Unlimited banking reports</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-medium">Multi-jurisdiction tax reports</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-medium">Advanced AML & KYT screening</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-medium">Unlimited custom AI agents</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-medium">API access</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-medium">White-label reports</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-medium">Dedicated account manager</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-medium">24/7 priority support</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            <p>All prices exclude VAT. Monthly billing available at €12/month (Personal) and €24/month (Pro).</p>
            <p className="mt-2">14-day money-back guarantee on all paid plans. Cancel anytime.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to take control?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of crypto investors who trust Kontrol for their portfolio management and compliance needs.
          </p>
          <Button size="lg" className="text-lg px-8" onClick={onRegister}>
            Start Your Free Trial
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Logo size={28} />
                <span className="text-lg font-semibold" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>Kontrol</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Professional crypto portfolio management and compliance platform.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Features</a></li>
                <li><a href="#" className="hover:text-primary">Pricing</a></li>
                <li><a href="#" className="hover:text-primary">Integrations</a></li>
                <li><a href="#" className="hover:text-primary">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {onNavigateToDocs && (
                  <li>
                    <button onClick={onNavigateToDocs} className="hover:text-primary">
                      Documentación
                    </button>
                  </li>
                )}
                <li><a href="#" className="hover:text-primary">Blog</a></li>
                <li><a href="#" className="hover:text-primary">Guías</a></li>
                <li><a href="#" className="hover:text-primary">Help Center</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">About</a></li>
                <li><a href="#" className="hover:text-primary">Careers</a></li>
                <li><a href="#" className="hover:text-primary">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Privacy</a></li>
                <li><a href="#" className="hover:text-primary">Terms</a></li>
                <li><a href="#" className="hover:text-primary">Security</a></li>
                <li><a href="#" className="hover:text-primary">Compliance</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">&copy; 2025 Kontrol. All rights reserved.</p>
              <div className="flex items-center gap-4">
                <a 
                  href="https://twitter.com/kontrolapp" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a 
                  href="https://github.com/kontrolapp" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a 
                  href="https://linkedin.com/company/kontrolapp" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a 
                  href="mailto:hello@kontrol.app" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 120s linear infinite;
          width: max-content;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}

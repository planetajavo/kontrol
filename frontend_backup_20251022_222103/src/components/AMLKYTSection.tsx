import { useState } from 'react';
import { Shield, User, MapPin, FileText, CheckCircle2, AlertTriangle, Upload, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import CollapsibleSection from './CollapsibleSection';
import { Progress } from './ui/progress';

export default function AMLKYTSection() {
  const [allCollapsed, setAllCollapsed] = useState(false);
  const [collapseKey, setCollapseKey] = useState(0);
  const kycStatus = {
    profileComplete: 85,
    documentsVerified: 3,
    documentsTotal: 4,
    riskLevel: 'Low' as const,
    lastReview: new Date('2025-10-15'),
  };

  const documents = [
    { name: 'National ID', status: 'verified' as const, uploadDate: '2025-09-01' },
    { name: 'Proof of Address', status: 'verified' as const, uploadDate: '2025-09-01' },
    { name: 'Source of Funds Declaration', status: 'verified' as const, uploadDate: '2025-09-15' },
    { name: 'Bank Statement', status: 'pending' as const, uploadDate: null },
  ];

  const originOfFunds = [
    { source: 'Employment Income', percentage: 60, amount: 92345.67, verified: true },
    { source: 'Crypto Trading', percentage: 30, amount: 46172.83, verified: true },
    { source: 'Investments', percentage: 10, amount: 15390.94, verified: false },
  ];

  return (
    <div className="space-y-4 md:space-y-6 lg:space-y-8">
      {/* Page Header */}
      <div className="space-y-1">
        <h1 className="text-foreground">Compliance</h1>
        <p className="text-muted-foreground">Anti-Money Laundering & Know Your Transaction compliance</p>
      </div>

      {/* Sticky Action Bar */}
      <div className="sticky top-16 z-30 bg-background/95 backdrop-blur-sm -mx-4 sm:-mx-6 lg:-mx-8 xl:-mx-12 px-4 sm:px-6 lg:px-8 xl:px-12 py-3 md:py-4 border-b border-border">
        <div className="flex flex-wrap items-center justify-end gap-2 md:gap-3">
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2"
            onClick={() => {
              setAllCollapsed(!allCollapsed);
              setCollapseKey(prev => prev + 1);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            {allCollapsed ? (
              <>
                <ChevronDown className="w-4 h-4" />
                <span className="hidden sm:inline">Expandir todo</span>
              </>
            ) : (
              <>
                <ChevronUp className="w-4 h-4" />
                <span className="hidden sm:inline">Contraer todo</span>
              </>
            )}
          </Button>

          <Button size="sm" className="gap-2">
            <Upload className="w-4 h-4" />
            <span className="hidden sm:inline">Subir Documento</span>
            <span className="sm:hidden">Upload</span>
          </Button>
        </div>
      </div>

      {/* Status Overview */}
      <div className="rounded-xl md:rounded-2xl border border-border p-4 md:p-6 bg-card">
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <div className="text-muted-foreground mb-2">KYC Status</div>
            <div className="flex items-center gap-3 mb-3">
              <div className="text-foreground text-3xl font-semibold">{kycStatus.profileComplete}%</div>
              <Badge variant="outline" className="bg-success/10 text-success border-success/30">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                Active
              </Badge>
            </div>
            <Progress value={kycStatus.profileComplete} className="h-2" />
          </div>
          <div>
            <div className="text-muted-foreground mb-2">Risk Level</div>
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-8 h-8 text-success" />
              <div className="text-foreground text-2xl font-semibold">{kycStatus.riskLevel}</div>
            </div>
            <div className="text-sm text-muted-foreground">
              Last reviewed: {kycStatus.lastReview.toLocaleDateString('es-ES')}
            </div>
          </div>
          <div>
            <div className="text-muted-foreground mb-2">Documents</div>
            <div className="text-foreground text-3xl font-semibold mb-2">
              {kycStatus.documentsVerified}/{kycStatus.documentsTotal}
            </div>
            <div className="text-sm text-muted-foreground">Verified documents</div>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <CollapsibleSection
        key={`personal-${collapseKey}`}
        title="Personal Information"
        description="Your identity and residence details"
        defaultOpen={!allCollapsed}
        badge={<Badge className="bg-primary/10 text-primary"><User className="w-3 h-3 mr-1" />KYC</Badge>}
      >
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="fullName">Full Legal Name</Label>
              <Input id="fullName" defaultValue="Javo Rodriguez" className="mt-2" />
            </div>
            <div>
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input id="dateOfBirth" type="date" defaultValue="1990-05-15" className="mt-2" />
            </div>
            <div>
              <Label htmlFor="nationality">Nationality</Label>
              <Select defaultValue="es">
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="es">Spain</SelectItem>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="de">Germany</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="taxId">Tax ID / NIF</Label>
              <Input id="taxId" defaultValue="12345678A" className="mt-2" />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="address">Residential Address</Label>
              <Input id="address" defaultValue="Calle Mayor 123, 28013 Madrid, Spain" className="mt-2" />
            </div>
            <div>
              <Label htmlFor="country">Country of Residence</Label>
              <Select defaultValue="es">
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="es">Spain</SelectItem>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="de">Germany</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="jurisdiction">Tax Jurisdiction</Label>
              <Select defaultValue="es">
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="es">Spain (EU)</SelectItem>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="de">Germany (EU)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <Button>Save Changes</Button>
          </div>
        </div>
      </CollapsibleSection>

      {/* Documents */}
      <CollapsibleSection
        key={`documents-${collapseKey}`}
        title="Identity Documents"
        description="Upload and verify your identity documents"
        defaultOpen={!allCollapsed}
        badge={<Badge className="bg-primary/10 text-primary">{kycStatus.documentsVerified}/{kycStatus.documentsTotal}</Badge>}
      >
        <div className="space-y-2">
          {documents.map((doc, index) => (
            <div
              key={index}
              className="bg-card rounded-xl border border-border p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  doc.status === 'verified' ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-yellow-600'
                }`}>
                  {doc.status === 'verified' ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <AlertTriangle className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <div className="font-medium">{doc.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {doc.status === 'verified' 
                      ? `Verified on ${doc.uploadDate}` 
                      : 'Pending upload'}
                  </div>
                </div>
              </div>
              {doc.status === 'verified' ? (
                <Badge className="bg-green-50 text-green-700 border-green-200">
                  Verified
                </Badge>
              ) : (
                <Button size="sm" variant="outline" className="gap-2">
                  <Upload className="w-4 h-4" />
                  Upload
                </Button>
              )}
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* Origin of Funds */}
      <CollapsibleSection
        key={`funds-${collapseKey}`}
        title="Origin of Funds"
        description="Declare and verify your fund sources for AML compliance"
        defaultOpen={!allCollapsed}
        badge={<Badge className="bg-primary/10 text-primary"><Shield className="w-3 h-3 mr-1" />AML</Badge>}
      >
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="mb-6">
            <p className="text-sm text-muted-foreground mb-4">
              Declare the sources of your funds to comply with AML regulations. This information helps us verify the legitimacy of your assets.
            </p>
          </div>

          <div className="space-y-4">
            {originOfFunds.map((fund, index) => (
              <div key={index} className="p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="font-medium">{fund.source}</div>
                    {fund.verified ? (
                      <Badge className="bg-green-50 text-green-700 border-green-200 text-xs">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    ) : (
                      <Badge className="bg-yellow-50 text-yellow-700 border-yellow-200 text-xs">
                        Pending
                      </Badge>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">
                      €{fund.amount.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
                    </div>
                    <div className="text-sm text-muted-foreground">{fund.percentage}%</div>
                  </div>
                </div>
                <Progress value={fund.percentage} className="h-2" />
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-between items-center pt-6 border-t border-border">
            <div className="text-sm text-muted-foreground">
              Total declared funds: €{originOfFunds.reduce((sum, f) => sum + f.amount, 0).toLocaleString('es-ES', { minimumFractionDigits: 2 })}
            </div>
            <Button variant="outline" className="gap-2">
              <Upload className="w-4 h-4" />
              Add Source
            </Button>
          </div>
        </div>
      </CollapsibleSection>

      {/* Applicable Regulations */}
      <CollapsibleSection
        key={`regulations-${collapseKey}`}
        title="Applicable Regulations"
        description="Regulatory framework based on your jurisdiction"
        defaultOpen={!allCollapsed}
      >
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <div className="font-medium mb-1">European Union - MiCA Regulation</div>
                <p className="text-sm text-muted-foreground">
                  Markets in Crypto-Assets Regulation applies to all EU residents. Requires KYC/AML compliance and reporting for crypto transactions.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <div className="font-medium mb-1">Spanish Tax Authority (AEAT) - Modelo 721</div>
                <p className="text-sm text-muted-foreground">
                  Annual declaration of crypto assets held abroad. Required for Spanish tax residents with crypto holdings exceeding €50,000.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <div className="font-medium mb-1">FATF Travel Rule Compliance</div>
                <p className="text-sm text-muted-foreground">
                  Financial Action Task Force guidelines for virtual asset service providers. Ensures traceability of crypto transactions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* Actions Row */}
      <div className="flex items-center justify-between gap-3 pt-4 border-t border-border">
        {/* Left: Collapse Control */}
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2"
            onClick={() => setAllCollapsed(!allCollapsed)}
          >
            {allCollapsed ? (
              <>
                <ChevronDown className="w-4 h-4" />
                <span className="hidden sm:inline">Expandir todo</span>
              </>
            ) : (
              <>
                <ChevronUp className="w-4 h-4" />
                <span className="hidden sm:inline">Contraer todo</span>
              </>
            )}
          </Button>
        </div>

        {/* Right: Primary Action */}
        <div className="flex items-center gap-2">
          <Button size="sm" className="gap-2">
            <FileText className="w-4 h-4" />
            <span className="hidden sm:inline">Generar Reporte de Cumplimiento</span>
            <span className="sm:hidden">Reporte</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

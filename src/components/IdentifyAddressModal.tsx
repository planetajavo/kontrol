// ============================================================================
// IDENTIFY ADDRESS MODAL - Upload backup data from tax platforms
// ============================================================================

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Upload, CheckCircle2, AlertCircle, FileText } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { toast } from 'sonner@2.0.3';
import { importCointracking } from '../services/cointracking-importer';

// ============================================================================
// TYPES
// ============================================================================

interface Platform {
  id: string;
  name: string;
  logo: string;
  color: string;
  fileFormats: string[];
}

interface IdentifyAddressModalProps {
  open: boolean;
  onClose: () => void;
  address: string;
  onIdentified?: (platform: string, fileName: string) => void;
}

// ============================================================================
// PLATFORMS DATA
// ============================================================================

const PLATFORMS: Platform[] = [
  {
    id: 'cointracking',
    name: 'CoinTracking',
    logo: '📊',
    color: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
    fileFormats: ['.csv', '.xlsx', '.json', '.zip']
  },
  {
    id: 'waltio',
    name: 'Waltio',
    logo: '💼',
    color: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
    fileFormats: ['.csv', '.json']
  },
  {
    id: 'blockpit',
    name: 'Blockpit',
    logo: '🔷',
    color: 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400',
    fileFormats: ['.csv', '.xlsx']
  }
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function IdentifyAddressModal({
  open,
  onClose,
  address,
  onIdentified
}: IdentifyAddressModalProps) {
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  // ============================================================================
  // HANDLERS
  // ============================================================================

  const handlePlatformSelect = (platformId: string) => {
    setSelectedPlatform(platformId);
    setUploadedFile(null);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (!selectedPlatform) {
      toast.error('Por favor, selecciona primero una plataforma');
      return;
    }

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedPlatform) {
      toast.error('Por favor, selecciona primero una plataforma');
      return;
    }

    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    const platform = PLATFORMS.find(p => p.id === selectedPlatform);
    if (!platform) return;

    // Validate file format
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!platform.fileFormats.includes(fileExtension)) {
      toast.error(`Formato no válido. Usa: ${platform.fileFormats.join(', ')}`);
      return;
    }

    setUploadedFile(file);
    toast.success('Archivo cargado correctamente');
  };

  const handleUpload = async () => {
    if (!selectedPlatform || !uploadedFile) {
      toast.error('Selecciona una plataforma y sube un archivo');
      return;
    }

    setUploading(true);

    try {
      if (selectedPlatform === 'cointracking') {
        const summary = await importCointracking(uploadedFile);
        toast.success('Backup importado', {
          description: `${summary.recordCount} registros · ${summary.currencies.length} monedas · ${Object.keys(summary.typesCount).length} tipos`
        });
      } else {
        // Otros proveedores aún no implementados
        toast.info('Importador no implementado para esta plataforma');
      }

      if (onIdentified) {
        onIdentified(selectedPlatform, uploadedFile.name);
      }
      handleClose();
    } catch (err: any) {
      toast.error('Error al importar', { description: String(err?.message || err) });
      setUploading(false);
    }
  };

  const handleClose = () => {
    setSelectedPlatform(null);
    setUploadedFile(null);
    setUploading(false);
    setDragActive(false);
    onClose();
  };

  const selectedPlatformData = PLATFORMS.find(p => p.id === selectedPlatform);

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl bg-card/95 backdrop-blur-xl border-primary/20">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <span className="text-2xl">🔍</span>
            <div>
              <div className="text-foreground">Identificar Dirección</div>
              <code className="text-xs text-muted-foreground font-mono mt-1 block">
                {address.slice(0, 20)}...{address.slice(-10)}
              </code>
            </div>
          </DialogTitle>
          <DialogDescription>
            Sube un archivo de backup de tu plataforma de tax tracking para identificar esta dirección
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Platform Selection */}
          <div className="space-y-3">
            <label className="text-sm text-muted-foreground">
              1. Selecciona tu plataforma
            </label>
            <div className="grid grid-cols-3 gap-3">
              {PLATFORMS.map((platform) => (
                <button
                  key={platform.id}
                  onClick={() => handlePlatformSelect(platform.id)}
                  className={`
                    relative p-4 rounded-xl border-2 transition-all duration-300
                    hover:scale-105 active:scale-95
                    ${selectedPlatform === platform.id 
                      ? `${platform.color} shadow-lg` 
                      : 'bg-muted/20 border-border hover:border-primary/30'
                    }
                  `}
                >
                  {/* Selected indicator */}
                  {selectedPlatform === platform.id && (
                    <motion.div
                      layoutId="platform-selected"
                      className="absolute -top-2 -right-2"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', bounce: 0.5 }}
                    >
                      <CheckCircle2 className="w-6 h-6 text-success-pastel bg-background rounded-full" />
                    </motion.div>
                  )}

                  {/* Platform logo and name */}
                  <div className="text-center space-y-2">
                    <div className="text-4xl">{platform.logo}</div>
                    <div className="font-medium text-sm">{platform.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {platform.fileFormats.join(', ')}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* File Upload Area */}
          <AnimatePresence>
            {selectedPlatform && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-3"
              >
                <label className="text-sm text-muted-foreground">
                  2. Sube tu archivo de backup
                </label>

                {/* Upload box */}
                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  className={`
                    relative border-2 border-dashed rounded-xl p-8 transition-all duration-300
                    ${dragActive 
                      ? 'border-primary bg-primary/5 scale-[1.02]' 
                      : uploadedFile
                        ? 'border-success-pastel bg-success-pastel/5'
                        : 'border-border bg-muted/20 hover:border-primary/50'
                    }
                  `}
                >
                  <input
                    type="file"
                    id="file-upload"
                    onChange={handleFileInput}
                    accept={selectedPlatformData?.fileFormats.join(',')}
                    className="hidden"
                  />

                  {uploadedFile ? (
                    // File uploaded state
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-center space-y-3"
                    >
                      <CheckCircle2 className="w-12 h-12 mx-auto text-success-pastel" />
                      <div>
                        <p className="font-medium text-foreground">{uploadedFile.name}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {(uploadedFile.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setUploadedFile(null)}
                        className="mt-2"
                      >
                        Cambiar archivo
                      </Button>
                    </motion.div>
                  ) : (
                    // Upload prompt
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer flex flex-col items-center gap-3"
                    >
                      <div className={`
                        w-16 h-16 rounded-full flex items-center justify-center
                        bg-gradient-to-br from-primary/20 to-primary/5
                        border-2 border-primary/30
                      `}>
                        <Upload className="w-8 h-8 text-primary" />
                      </div>
                      <div className="text-center">
                        <p className="font-medium text-foreground">
                          Arrastra tu archivo aquí
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          o haz clic para seleccionar
                        </p>
                        <Badge 
                          variant="outline" 
                          className="mt-3 bg-accent/50"
                        >
                          {selectedPlatformData?.fileFormats.join(', ')}
                        </Badge>
                      </div>
                    </label>
                  )}
                </div>

                {/* Info alert */}
                <Card className="p-4 bg-info-pastel/5 border-info-pastel/20">
                  <div className="flex gap-3">
                    <AlertCircle className="w-5 h-5 text-info-pastel flex-shrink-0 mt-0.5" />
                    <div className="text-sm space-y-1">
                      <p className="text-foreground font-medium">
                        Tus datos están seguros
                      </p>
                      <p className="text-muted-foreground">
                        El archivo se procesa localmente y no se envía a ningún servidor externo.
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={uploading}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleUpload}
            disabled={!selectedPlatform || !uploadedFile || uploading}
            className="gap-2 min-w-[140px]"
          >
            {uploading ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                >
                  <FileText className="w-4 h-4" />
                </motion.div>
                Procesando...
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                Identificar
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

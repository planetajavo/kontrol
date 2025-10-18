import { X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';

interface EditWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  wallet: {
    name: string;
    address: string;
  };
}

export default function EditWalletModal({ isOpen, onClose, wallet }: EditWalletModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Editar Wallet</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="wallet-name">Nombre del Wallet</Label>
            <Input
              id="wallet-name"
              defaultValue={wallet.name}
              className="bg-background"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="wallet-address">Dirección</Label>
            <Input
              id="wallet-address"
              defaultValue={wallet.address}
              className="bg-background"
              disabled
            />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button 
            className="hover:opacity-90 text-white"
            style={{ background: 'linear-gradient(to right, var(--primary-gradient-from), var(--primary-gradient-to))' }}
          >
            Guardar cambios
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

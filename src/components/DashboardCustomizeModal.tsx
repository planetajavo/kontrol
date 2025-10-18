import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { GripVertical, Eye, EyeOff } from 'lucide-react';
import { Reorder } from 'motion/react';

export interface DashboardWidget {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  order: number;
}

interface DashboardCustomizeModalProps {
  open: boolean;
  onClose: () => void;
  widgets: DashboardWidget[];
  onSaveWidgets: (widgets: DashboardWidget[]) => void;
}

export default function DashboardCustomizeModal({
  open,
  onClose,
  widgets,
  onSaveWidgets
}: DashboardCustomizeModalProps) {
  const [localWidgets, setLocalWidgets] = useState<DashboardWidget[]>(widgets);

  const handleToggleWidget = (id: string) => {
    setLocalWidgets(prev =>
      prev.map(w => w.id === id ? { ...w, enabled: !w.enabled } : w)
    );
  };

  const handleReorder = (newOrder: DashboardWidget[]) => {
    setLocalWidgets(newOrder.map((widget, index) => ({
      ...widget,
      order: index
    })));
  };

  const handleSave = () => {
    onSaveWidgets(localWidgets);
    onClose();
  };

  const handleReset = () => {
    setLocalWidgets(widgets);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Personalizar Dashboard</DialogTitle>
          <DialogDescription>
            Activa, desactiva y reorganiza los widgets de tu dashboard
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* Widgets List */}
          <div>
            <h4 className="text-sm mb-3 text-foreground">Widgets disponibles</h4>
            <p className="text-xs text-muted-foreground mb-4">
              Arrastra para reordenar. Activa o desactiva según tus necesidades.
            </p>
            
            <Reorder.Group
              axis="y"
              values={localWidgets}
              onReorder={handleReorder}
              className="space-y-2"
            >
              {localWidgets.map((widget) => (
                <Reorder.Item
                  key={widget.id}
                  value={widget}
                  className={`
                    bg-card border border-border rounded-lg p-4 cursor-move
                    transition-all hover:border-primary/50
                    ${!widget.enabled ? 'opacity-50' : ''}
                  `}
                >
                  <div className="flex items-center gap-3">
                    {/* Drag Handle */}
                    <GripVertical className="w-5 h-5 text-muted-foreground flex-shrink-0" />

                    {/* Widget Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h5 className="text-sm text-foreground truncate">
                          {widget.name}
                        </h5>
                        {widget.enabled ? (
                          <Eye className="w-3.5 h-3.5 text-success-pastel flex-shrink-0" />
                        ) : (
                          <EyeOff className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {widget.description}
                      </p>
                    </div>

                    {/* Toggle Switch */}
                    <Switch
                      checked={widget.enabled}
                      onCheckedChange={() => handleToggleWidget(widget.id)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                </Reorder.Item>
              ))}
            </Reorder.Group>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <Button variant="ghost" onClick={handleReset}>
              Restablecer
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button onClick={handleSave}>
                Guardar cambios
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

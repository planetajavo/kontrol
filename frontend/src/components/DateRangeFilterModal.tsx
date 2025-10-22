// ============================================================================
// DATE RANGE FILTER MODAL - Transaction Date Filtering
// ============================================================================

import { useState } from 'react';
import { Calendar as CalendarIcon, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Calendar } from './ui/calendar';
import { Badge } from './ui/badge';

interface DateRangeFilterModalProps {
  open: boolean;
  onClose: () => void;
  onApply: (startDate: Date | null, endDate: Date | null) => void;
  currentStartDate: Date | null;
  currentEndDate: Date | null;
}

export default function DateRangeFilterModal({
  open,
  onClose,
  onApply,
  currentStartDate,
  currentEndDate
}: DateRangeFilterModalProps) {
  const [startDate, setStartDate] = useState<Date | undefined>(currentStartDate || undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(currentEndDate || undefined);
  const [mode, setMode] = useState<'start' | 'end'>('start');

  const handleApply = () => {
    onApply(startDate || null, endDate || null);
    onClose();
  };

  const handleClear = () => {
    setStartDate(undefined);
    setEndDate(undefined);
    onApply(null, null);
    onClose();
  };

  const quickRanges = [
    {
      label: 'Últimos 7 días',
      getValue: () => {
        const end = new Date();
        const start = new Date();
        start.setDate(start.getDate() - 7);
        return { start, end };
      }
    },
    {
      label: 'Últimos 30 días',
      getValue: () => {
        const end = new Date();
        const start = new Date();
        start.setDate(start.getDate() - 30);
        return { start, end };
      }
    },
    {
      label: 'Este mes',
      getValue: () => {
        const end = new Date();
        const start = new Date(end.getFullYear(), end.getMonth(), 1);
        return { start, end };
      }
    },
    {
      label: 'Mes pasado',
      getValue: () => {
        const end = new Date();
        end.setMonth(end.getMonth() - 1);
        end.setDate(new Date(end.getFullYear(), end.getMonth() + 1, 0).getDate());
        const start = new Date(end.getFullYear(), end.getMonth(), 1);
        return { start, end };
      }
    },
    {
      label: 'Este año',
      getValue: () => {
        const end = new Date();
        const start = new Date(end.getFullYear(), 0, 1);
        return { start, end };
      }
    },
    {
      label: 'Año pasado',
      getValue: () => {
        const end = new Date();
        const year = end.getFullYear() - 1;
        const start = new Date(year, 0, 1);
        const endDate = new Date(year, 11, 31);
        return { start, end: endDate };
      }
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-primary" />
            Filtrar por Fecha
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Quick Ranges */}
          <div>
            <p className="text-sm text-muted-foreground mb-2">Rangos rápidos:</p>
            <div className="flex flex-wrap gap-2">
              {quickRanges.map((range) => (
                <Button
                  key={range.label}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const { start, end } = range.getValue();
                    setStartDate(start);
                    setEndDate(end);
                  }}
                >
                  {range.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Current Selection */}
          <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
            <CalendarIcon className="w-4 h-4 text-muted-foreground" />
            <div className="flex-1 text-sm">
              {startDate || endDate ? (
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Desde:</span>
                  <Badge variant="secondary">
                    {startDate ? startDate.toLocaleDateString('es-ES') : 'Sin fecha'}
                  </Badge>
                  <span className="text-muted-foreground">Hasta:</span>
                  <Badge variant="secondary">
                    {endDate ? endDate.toLocaleDateString('es-ES') : 'Sin fecha'}
                  </Badge>
                </div>
              ) : (
                <span className="text-muted-foreground">Selecciona un rango de fechas</span>
              )}
            </div>
            {(startDate || endDate) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setStartDate(undefined);
                  setEndDate(undefined);
                }}
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>

          {/* Date Selection Tabs */}
          <div className="flex gap-2 border-b border-border">
            <button
              className={`px-4 py-2 transition-colors ${
                mode === 'start'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => setMode('start')}
            >
              Fecha Inicial
            </button>
            <button
              className={`px-4 py-2 transition-colors ${
                mode === 'end'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => setMode('end')}
            >
              Fecha Final
            </button>
          </div>

          {/* Calendar */}
          <div className="flex justify-center">
            <Calendar
              mode="single"
              selected={mode === 'start' ? startDate : endDate}
              onSelect={(date) => {
                if (mode === 'start') {
                  setStartDate(date);
                  // Auto-switch to end date after selecting start
                  if (date) setMode('end');
                } else {
                  setEndDate(date);
                }
              }}
              disabled={(date) => {
                if (mode === 'end' && startDate) {
                  return date < startDate;
                }
                return false;
              }}
              className="rounded-md border"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClear}>
            Limpiar
          </Button>
          <Button onClick={handleApply}>
            Aplicar Filtro
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

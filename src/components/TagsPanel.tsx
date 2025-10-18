import { useState } from 'react';
import { X, Plus, Edit2, Trash2, Upload, Download, Tag, Check } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent } from './ui/card';

interface TagsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TagItem {
  id: string;
  name: string;
  color: string;
  category: string;
  wallets: number;
  transactions: number;
}

export default function TagsPanel({ isOpen, onClose }: TagsPanelProps) {
  const [tags, setTags] = useState<TagItem[]>([
    { id: '1', name: 'Principal', color: '#3b82f6', category: 'Wallet', wallets: 2, transactions: 45 },
    { id: '2', name: 'Trading', color: '#10b981', category: 'Wallet', wallets: 1, transactions: 127 },
    { id: '3', name: 'Ahorro', color: '#8b5cf6', category: 'Wallet', wallets: 1, transactions: 12 },
    { id: '4', name: 'DeFi', color: '#f59e0b', category: 'Actividad', wallets: 0, transactions: 23 },
    { id: '5', name: 'NFT', color: '#ec4899', category: 'Actividad', wallets: 1, transactions: 8 },
    { id: '6', name: 'Staking', color: '#06b6d4', category: 'Actividad', wallets: 0, transactions: 15 },
    { id: '7', name: 'Inversión', color: '#3b82f6', category: 'Fiscal', wallets: 0, transactions: 56 },
    { id: '8', name: 'Ganancia', color: '#10b981', category: 'Fiscal', wallets: 0, transactions: 34 },
    { id: '9', name: 'Pérdida', color: '#ef4444', category: 'Fiscal', wallets: 0, transactions: 12 },
  ]);

  const [editingTag, setEditingTag] = useState<TagItem | null>(null);
  const [newTagName, setNewTagName] = useState('');
  const [newTagColor, setNewTagColor] = useState('#3b82f6');
  const [newTagCategory, setNewTagCategory] = useState('Wallet');

  const colors = [
    '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', 
    '#06b6d4', '#ef4444', '#f97316', '#84cc16', '#a855f7'
  ];

  const categories = ['Wallet', 'Actividad', 'Fiscal'];

  const importedTags = [
    { name: 'Exchange A', match: null, suggestion: 'Trading' },
    { name: 'Cold Wallet', match: null, suggestion: 'Ahorro' },
    { name: 'Mining Pool', match: null, suggestion: null },
  ];

  const handleAddTag = () => {
    if (newTagName.trim()) {
      const newTag: TagItem = {
        id: Date.now().toString(),
        name: newTagName,
        color: newTagColor,
        category: newTagCategory,
        wallets: 0,
        transactions: 0,
      };
      setTags([...tags, newTag]);
      setNewTagName('');
      setNewTagColor('#3b82f6');
    }
  };

  const handleDeleteTag = (id: string) => {
    setTags(tags.filter(t => t.id !== id));
  };

  const groupedTags = tags.reduce((acc, tag) => {
    if (!acc[tag.category]) acc[tag.category] = [];
    acc[tag.category].push(tag);
    return acc;
  }, {} as Record<string, TagItem[]>);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Tag className="w-5 h-5" />
            Gestión de Etiquetas
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="manage" className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="manage">Gestionar Etiquetas</TabsTrigger>
            <TabsTrigger value="import">Importar & Reconciliar</TabsTrigger>
          </TabsList>

          {/* Manage Tags Tab */}
          <TabsContent value="manage" className="space-y-6">
            {/* Add New Tag */}
            <Card>
              <CardContent className="pt-6">
                <Label className="mb-3 block">Crear Nueva Etiqueta</Label>
                <div className="flex gap-3">
                  <Input
                    placeholder="Nombre de etiqueta..."
                    value={newTagName}
                    onChange={(e) => setNewTagName(e.target.value)}
                    className="flex-1"
                  />
                  
                  <select
                    value={newTagCategory}
                    onChange={(e) => setNewTagCategory(e.target.value)}
                    className="px-3 py-2 border border-neutral-200 rounded-lg text-neutral-700"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>

                  <div className="flex gap-1">
                    {colors.slice(0, 5).map(color => (
                      <button
                        key={color}
                        onClick={() => setNewTagColor(color)}
                        className={`w-8 h-8 rounded transition-all ${
                          newTagColor === color ? 'ring-2 ring-offset-2 ring-neutral-400' : ''
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>

                  <Button onClick={handleAddTag}>
                    <Plus className="w-4 h-4 mr-2" />
                    Añadir
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Tags by Category */}
            {categories.map(category => (
              <div key={category}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-neutral-900">{category}</h3>
                  <span className="text-neutral-500">
                    {groupedTags[category]?.length || 0} etiquetas
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {groupedTags[category]?.map(tag => (
                    <Card key={tag.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="pt-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-4 h-4 rounded"
                              style={{ backgroundColor: tag.color }}
                            />
                            <span className="text-neutral-900">{tag.name}</span>
                          </div>
                          <div className="flex gap-1">
                            <button
                              onClick={() => setEditingTag(tag)}
                              className="p-1 hover:bg-neutral-100 rounded transition-colors"
                            >
                              <Edit2 className="w-4 h-4 text-neutral-600" />
                            </button>
                            <button
                              onClick={() => handleDeleteTag(tag.id)}
                              className="p-1 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                            >
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </button>
                          </div>
                        </div>
                        
                        <div className="flex gap-4 text-neutral-500">
                          <div>
                            <span>{tag.wallets}</span> wallets
                          </div>
                          <div>
                            <span>{tag.transactions}</span> transacciones
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </TabsContent>

          {/* Import & Reconcile Tab */}
          <TabsContent value="import" className="space-y-6">
            {/* Import Section */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <Label className="mb-1 block">Importar Backup de CoinTracking</Label>
                    <p className="text-neutral-500">
                      Sube tu archivo de backup para reconciliar etiquetas
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline">
                      <Upload className="w-4 h-4 mr-2" />
                      Subir Backup
                    </Button>
                    <Button variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Exportar
                    </Button>
                  </div>
                </div>

                <div className="border-2 border-dashed border-neutral-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer">
                  <Upload className="w-12 h-12 text-neutral-400 mx-auto mb-3" />
                  <p className="text-neutral-600 mb-1">Arrastra tu archivo aquí</p>
                  <p className="text-neutral-400">o haz clic para seleccionar</p>
                </div>
              </CardContent>
            </Card>

            {/* Reconciliation */}
            <div>
              <Label className="mb-3 block">Reconciliar Etiquetas Importadas</Label>
              <div className="space-y-3">
                {importedTags.map((imported, idx) => (
                  <Card key={idx}>
                    <CardContent className="pt-4">
                      <div className="flex items-center gap-4">
                        <div className="flex-1">
                          <div className="text-neutral-900 mb-1">"{imported.name}"</div>
                          <div className="text-neutral-500">Etiqueta importada</div>
                        </div>

                        <div className="flex items-center gap-3">
                          {imported.suggestion && (
                            <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 dark:bg-blue-900/20 rounded">
                              <span className="text-blue-700 dark:text-blue-400">Sugerencia:</span>
                              <Badge className="bg-blue-600 text-white border-0">
                                {imported.suggestion}
                              </Badge>
                            </div>
                          )}

                          <select className="px-3 py-2 border border-neutral-200 rounded-lg">
                            <option value="">Asignar a...</option>
                            {tags.map(tag => (
                              <option key={tag.id} value={tag.id}>{tag.name}</option>
                            ))}
                            <option value="new">+ Crear nueva</option>
                          </select>

                          <Button size="sm">
                            <Check className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1">
                Asignar todas las sugerencias
              </Button>
              <Button variant="outline" className="flex-1">
                Crear todas como nuevas
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

import { Button, Input, Badge, Card } from '../design-system';
import { FormField, EmptyState } from '../design-system';

/**
 * Design System Showcase
 * 
 * Página de demostración de todos los componentes del Design System
 * Útil para desarrollo y testing visual
 */
export default function DesignSystemShowcase() {
  return (
    <div className="min-h-screen bg-canvas-default p-lg">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-3xl">
          <h1 className="text-4xl font-bold text-fg-default mb-xs">
            🎨 KONTROL Design System
          </h1>
          <p className="text-lg text-fg-muted">
            Componentes inspirados en GitHub UI/UX
          </p>
        </div>

        {/* Buttons */}
        <section className="mb-3xl">
          <h2 className="text-2xl font-semibold text-fg-default mb-md">
            Buttons
          </h2>
          <Card>
            <div className="p-md">
              <div className="flex flex-wrap gap-sm mb-md">
                <Button variant="primary">Primary Button</Button>
                <Button variant="secondary">Secondary Button</Button>
                <Button variant="danger">Danger Button</Button>
                <Button variant="ghost">Ghost Button</Button>
              </div>
              <div className="flex flex-wrap gap-sm mb-md">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </div>
              <div className="flex flex-wrap gap-sm">
                <Button disabled>Disabled</Button>
                <Button isLoading>Loading...</Button>
              </div>
            </div>
          </Card>
        </section>

        {/* Inputs */}
        <section className="mb-3xl">
          <h2 className="text-2xl font-semibold text-fg-default mb-md">
            Inputs
          </h2>
          <Card>
            <div className="p-md space-y-md">
              <Input 
                label="Email" 
                type="email" 
                placeholder="tu@email.com"
              />
              <Input 
                label="Contraseña" 
                type="password"
                helperText="Mínimo 8 caracteres"
              />
              <Input 
                label="Con Error" 
                error="Este campo es requerido"
              />
            </div>
          </Card>
        </section>

        {/* Form Fields */}
        <section className="mb-3xl">
          <h2 className="text-2xl font-semibold text-fg-default mb-md">
            Form Fields (Molecule)
          </h2>
          <Card>
            <div className="p-md space-y-md">
              <FormField 
                label="Nombre completo" 
                required
                placeholder="John Doe"
              />
              <FormField 
                label="Email" 
                type="email"
                required
                helperText="Te enviaremos un código de verificación"
              />
            </div>
          </Card>
        </section>

        {/* Badges */}
        <section className="mb-3xl">
          <h2 className="text-2xl font-semibold text-fg-default mb-md">
            Badges
          </h2>
          <Card>
            <div className="p-md flex flex-wrap gap-sm">
              <Badge variant="success">Success</Badge>
              <Badge variant="danger">Danger</Badge>
              <Badge variant="accent">Accent</Badge>
              <Badge variant="neutral">Neutral</Badge>
              <Badge variant="attention">Attention</Badge>
            </div>
          </Card>
        </section>

        {/* Cards */}
        <section className="mb-3xl">
          <h2 className="text-2xl font-semibold text-fg-default mb-md">
            Cards
          </h2>
          <div className="grid grid-cols-2 gap-md">
            <Card>
              <div className="p-md">
                <h3 className="text-xl font-semibold text-fg-default mb-xs">
                  Card Normal
                </h3>
                <p className="text-fg-muted">
                  Contenido de la card sin hover effect
                </p>
              </div>
            </Card>
            <Card hover>
              <div className="p-md">
                <h3 className="text-xl font-semibold text-fg-default mb-xs">
                  Card con Hover
                </h3>
                <p className="text-fg-muted">
                  Pasa el mouse sobre esta card
                </p>
              </div>
            </Card>
          </div>
        </section>

        {/* Empty State */}
        <section className="mb-3xl">
          <h2 className="text-2xl font-semibold text-fg-default mb-md">
            Empty State (Molecule)
          </h2>
          <Card>
            <EmptyState
              icon={
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              }
              title="Sin direcciones"
              description="Importa tu primera wallet para comenzar a trackear tus transacciones"
              actionLabel="Importar Wallet"
              onAction={() => alert('Acción clicked!')}
            />
          </Card>
        </section>

        {/* Colors */}
        <section className="mb-3xl">
          <h2 className="text-2xl font-semibold text-fg-default mb-md">
            Color Palette
          </h2>
          <div className="grid grid-cols-3 gap-md">
            <Card>
              <div className="p-md">
                <h3 className="text-lg font-semibold text-fg-default mb-sm">Canvas</h3>
                <div className="space-y-2xs">
                  <div className="flex items-center gap-2xs">
                    <div className="w-8 h-8 rounded bg-canvas-default border border-border-default"></div>
                    <span className="text-sm text-fg-muted">default</span>
                  </div>
                  <div className="flex items-center gap-2xs">
                    <div className="w-8 h-8 rounded bg-canvas-subtle border border-border-default"></div>
                    <span className="text-sm text-fg-muted">subtle</span>
                  </div>
                  <div className="flex items-center gap-2xs">
                    <div className="w-8 h-8 rounded bg-canvas-inset border border-border-default"></div>
                    <span className="text-sm text-fg-muted">inset</span>
                  </div>
                </div>
              </div>
            </Card>
            
            <Card>
              <div className="p-md">
                <h3 className="text-lg font-semibold text-fg-default mb-sm">Accent</h3>
                <div className="space-y-2xs">
                  <div className="flex items-center gap-2xs">
                    <div className="w-8 h-8 rounded bg-accent-emphasis"></div>
                    <span className="text-sm text-fg-muted">emphasis</span>
                  </div>
                  <div className="flex items-center gap-2xs">
                    <div className="w-8 h-8 rounded bg-accent-muted"></div>
                    <span className="text-sm text-fg-muted">muted</span>
                  </div>
                  <div className="flex items-center gap-2xs">
                    <div className="w-8 h-8 rounded bg-accent-subtle"></div>
                    <span className="text-sm text-fg-muted">subtle</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card>
              <div className="p-md">
                <h3 className="text-lg font-semibold text-fg-default mb-sm">Success</h3>
                <div className="space-y-2xs">
                  <div className="flex items-center gap-2xs">
                    <div className="w-8 h-8 rounded bg-success-emphasis"></div>
                    <span className="text-sm text-fg-muted">emphasis</span>
                  </div>
                  <div className="flex items-center gap-2xs">
                    <div className="w-8 h-8 rounded bg-success-muted"></div>
                    <span className="text-sm text-fg-muted">muted</span>
                  </div>
                  <div className="flex items-center gap-2xs">
                    <div className="w-8 h-8 rounded bg-success-subtle"></div>
                    <span className="text-sm text-fg-muted">subtle</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Typography */}
        <section className="mb-3xl">
          <h2 className="text-2xl font-semibold text-fg-default mb-md">
            Typography
          </h2>
          <Card>
            <div className="p-md space-y-md">
              <div>
                <h1 className="text-4xl font-bold text-fg-default">Heading 1</h1>
                <code className="text-xs text-fg-subtle">text-4xl font-bold</code>
              </div>
              <div>
                <h2 className="text-3xl font-semibold text-fg-default">Heading 2</h2>
                <code className="text-xs text-fg-subtle">text-3xl font-semibold</code>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-fg-default">Heading 3</h3>
                <code className="text-xs text-fg-subtle">text-2xl font-semibold</code>
              </div>
              <div>
                <p className="text-base text-fg-default">Body text - Lorem ipsum dolor sit amet</p>
                <code className="text-xs text-fg-subtle">text-base text-fg-default</code>
              </div>
              <div>
                <p className="text-sm text-fg-muted">Secondary text - Lorem ipsum dolor sit amet</p>
                <code className="text-xs text-fg-subtle">text-sm text-fg-muted</code>
              </div>
              <div>
                <code className="font-mono text-sm bg-canvas-inset px-2xs py-4xs rounded">
                  Code snippet
                </code>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}

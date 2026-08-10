import { ChevronDown, Menu } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Logo from '@/reutilizables/components/Logo'

const NAV_LINKS = [
  { label: 'Cartelera', href: '#cartelera' },
  { label: 'Cines', href: '#cines' },
  { label: 'Promociones', href: '#promociones' },
]

const MORE_LINKS = [
  { label: 'Próximos estrenos', href: '#proximamente' },
  { label: 'La experiencia Multicine', href: '#experiencia' },
  { label: 'Preguntas frecuentes', href: '#faq' },
]

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-background/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo />

        <div className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                Más
                <ChevronDown className="size-3.5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {MORE_LINKS.map((link) => (
                <DropdownMenuItem key={link.href} asChild>
                  <a href={link.href}>{link.label}</a>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-1">
          <Button variant="ghost" className="hidden md:inline-flex">
            Iniciar sesión
          </Button>
          <Button className="hidden md:inline-flex">Comprar entradas</Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Abrir menú"
            className="text-muted-foreground hover:bg-white/5 hover:text-foreground lg:hidden"
          >
            <Menu />
          </Button>
        </div>
      </nav>
    </header>
  )
}

import { ChevronDown, Menu } from 'lucide-react'

import { Button } from '@/components/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/dropdown-menu'
import Logo from '@/reutilizables/components/Logo'

const NAV_LINKS = [
  { label: 'Cartelera', href: '#cartelera' },
  { label: 'Cines', href: '#cines' },
  { label: 'Promociones', href: '#promociones' },
]

const MORE_LINKS = [
  { label: 'Próximos estrenos', href: '#proximamente' },
  { label: 'La experiencia MineRoyal', href: '#experiencia' },
  { label: 'Preguntas frecuentes', href: '#faq' },
]

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <nav
        className="
          mx-auto flex h-16 max-w-7xl items-center justify-between gap-4
          rounded-2xl
          border border-white/70
          bg-white/65
          px-4
          shadow-lg shadow-[#800021]/5
          backdrop-blur-xl
          sm:px-6
          lg:px-8
        "
      >
        <Logo />

        <div className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="
                rounded-lg px-4 py-2
                text-sm font-medium
                text-muted-foreground
                transition-all duration-200
                hover:bg-black/5
                hover:text-foreground
              "
            >
              {link.label}
            </a>
          ))}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="
                  flex items-center gap-1
                  rounded-lg px-4 py-2
                  text-sm font-medium
                  text-muted-foreground
                  transition-all duration-200
                  hover:bg-black/5
                  hover:text-foreground
                "
              >
                Más
                <ChevronDown className="size-3.5" />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="
                rounded-xl
                border-[#E8CDD4]/70
                bg-white/95
                shadow-xl shadow-black/5
                backdrop-blur-xl
              "
            >
              {MORE_LINKS.map((link) => (
                <DropdownMenuItem key={link.href} asChild>
                  <a
                    href={link.href}
                    className="
                      cursor-pointer
                      rounded-lg
                      text-foreground
                      transition-colors
                      hover:bg-black/5
                      hover:text-foreground
                    "
                  >
                    {link.label}
                  </a>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            className="
              hidden
              text-foreground
              transition-all duration-200
              hover:bg-black/5
              hover:text-foreground
              md:inline-flex
            "
          >
            Iniciar sesión
          </Button>

          <Button
            className="
              hidden
              border-0
              bg-gradient-to-r from-[#800021] to-[#C24366]
              text-white
              shadow-md shadow-[#C24366]/20
              transition-all duration-200
              hover:-translate-y-0.5
              hover:shadow-lg hover:shadow-[#C24366]/30
              md:inline-flex
            "
          >
            Comprar entradas
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Abrir menú"
            className="
              text-foreground
              transition-all duration-200
              hover:bg-black/5
              hover:text-foreground
              lg:hidden
            "
          >
            <Menu />
          </Button>
        </div>
      </nav>
    </header>
  )
}
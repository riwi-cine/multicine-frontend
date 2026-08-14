import { useState } from 'react'
import {
  ChevronDown,
  Film,
  Gift,
  Menu,
  Popcorn,
  Star,
  Ticket,
  X,
} from 'lucide-react'

import { Button } from '@/components/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/dropdown-menu'
import Logo from '@/components/logo'

const NAV_LINKS = [
  { label: 'Cartelera', href: '#cartelera' },
  { label: 'Cines', href: '#cines' },
  { label: 'Promociones', href: '#promociones' },
]

const MORE_LINKS = [
  {
    label: 'Próximos estrenos',
    description: 'Descubre las próximas películas.',
    href: '#proximamente',
    icon: Film,
  },
  {
    label: 'Bonos de regalo',
    description: 'Regala una experiencia de cine.',
    href: '#bonos',
    icon: Gift,
  },
  {
    label: 'Membresía',
    description: 'Consulta tus beneficios y puntos.',
    href: '#membresia',
    icon: Star,
  },
  {
    label: 'Confitería',
    description: 'Disfruta nuestros combos y productos.',
    href: '#confiteria',
    icon: Popcorn,
  },
]

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <nav
        className="
          mx-auto max-w-7xl
          rounded-2xl
          border border-white/70
          bg-white/65
          shadow-lg shadow-[#800021]/5
          backdrop-blur-xl
        "
      >
        <div
          className="
            flex h-16 items-center justify-between gap-4
            px-4
            sm:px-6
            lg:px-8
          "
        >
          <Logo />

          {/* Navegación desktop */}
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

            {/* Más */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="
                    flex items-center gap-1
                    rounded-lg px-4 py-2
                    text-sm font-medium
                    text-muted-foreground
                    outline-none
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
                align="center"
                className="
                  w-[360px]
                  rounded-xl
                  border-[#E8CDD4]/70
                  bg-white/95
                  p-2
                  shadow-xl shadow-black/5
                  backdrop-blur-xl
                "
              >
                {MORE_LINKS.map((link) => {
                  const Icon = link.icon

                  return (
                    <DropdownMenuItem
                      key={link.href}
                      asChild
                      className="rounded-lg p-0"
                    >
                      <a
                        href={link.href}
                        className="
                          flex cursor-pointer items-center gap-3
                          rounded-lg p-3
                          transition-colors
                          hover:bg-[#800021]/5
                        "
                      >
                        <div
                          className="
                            flex size-10 shrink-0 items-center justify-center
                            rounded-lg
                            bg-[#800021]/5
                            text-[#800021]
                          "
                        >
                          <Icon className="size-4" />
                        </div>

                        <div className="flex flex-col gap-0.5">
                          <span className="text-sm font-medium text-foreground">
                            {link.label}
                          </span>

                          <span className="text-xs text-muted-foreground">
                            {link.description}
                          </span>
                        </div>
                      </a>
                    </DropdownMenuItem>
                  )
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Acciones */}
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
              <Ticket className="mr-1.5 size-4" />
              Comprar entradas
            </Button>

            {/* Menú móvil */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label={
                isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'
              }
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              className="
                text-foreground
                transition-all duration-200
                hover:bg-black/5
                hover:text-foreground
                lg:hidden
              "
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Menú móvil */}
        {isMobileMenuOpen && (
          <div className="border-t border-black/5 px-4 pb-4 lg:hidden">
            <div className="flex flex-col gap-1 pt-3">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className="
                    rounded-lg px-4 py-3
                    text-sm font-medium
                    text-muted-foreground
                    transition-colors
                    hover:bg-black/5
                    hover:text-foreground
                  "
                >
                  {link.label}
                </a>
              ))}

              <div className="my-2 border-t border-black/5" />

              {MORE_LINKS.map((link) => {
                const Icon = link.icon

                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={closeMobileMenu}
                    className="
                      flex items-center gap-3
                      rounded-lg px-4 py-3
                      transition-colors
                      hover:bg-black/5
                    "
                  >
                    <Icon className="size-4 text-[#800021]" />

                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-foreground">
                        {link.label}
                      </span>

                      <span className="text-xs text-muted-foreground">
                        {link.description}
                      </span>
                    </div>
                  </a>
                )
              })}

              <div className="my-2 border-t border-black/5" />

              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={closeMobileMenu}
              >
                Iniciar sesión
              </Button>

              <Button
                className="
                  w-full
                  border-0
                  bg-gradient-to-r from-[#800021] to-[#C24366]
                  text-white
                "
                onClick={closeMobileMenu}
              >
                <Ticket className="mr-1.5 size-4" />
                Comprar entradas
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
import {
  ExternalLink,
  Globe,
  Send,
  Share2,
} from 'lucide-react'

import Logo from '@/reutilizables/components/Logo'

const FOOTER_COLUMNS = [
  {
    title: 'Navegación',
    links: [
      { label: 'Cartelera', href: '#cartelera' },
      { label: 'Cines', href: '#cines' },
      { label: 'Promociones', href: '#promociones' },
      { label: 'Próximos estrenos', href: '#proximamente' },
    ],
  },
  {
    title: 'Información',
    links: [
      { label: 'Sobre Multicine', href: '#sobre-multicine' },
      { label: 'Contacto', href: '#contacto' },
    ],
  },
  {
    title: 'Ayuda',
    links: [
      { label: 'Preguntas frecuentes', href: '#faq' },
      { label: 'PQRS', href: '#pqrs' },
      { label: 'Términos y condiciones', href: '#terminos' },
      { label: 'Política de privacidad', href: '#privacidad' },
    ],
  },
]

const SOCIAL_LINKS = [
  {
    icon: Send,
    label: 'Facebook',
    href: '#',
  },
  {
    icon: Share2,
    label: 'Instagram',
    href: '#',
  },
  {
    icon: ExternalLink,
    label: 'Twitter',
    href: '#',
  },
  {
    icon: Globe,
    label: 'YouTube',
    href: '#',
  },
]

const BOTTOM_LINKS = [
  { label: 'Cookies', href: '#cookies' },
]

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/5 bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Logo */}
          <div className="col-span-2 lg:col-span-1">
            <Logo />
          </div>

          {/* Footer columns */}
          {FOOTER_COLUMNS.map((column) => (
            <nav
              key={column.title}
              aria-label={column.title}
            >
              <h3
                className="
                  font-mono
                  text-xs
                  tracking-[0.25em]
                  text-white/60
                  uppercase
                "
              >
                {column.title}
              </h3>

              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="
                        text-sm
                        text-muted-foreground
                        transition-colors
                        hover:text-primary
                      "
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Redes sociales */}
          <div>
            <h3
              className="
                font-mono
                text-xs
                tracking-[0.25em]
                text-white/60
                uppercase
              "
            >
              Redes sociales
            </h3>

            <div className="mt-4 flex gap-2.5">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="
                      flex size-9 items-center justify-center
                      rounded-full
                      bg-white/5
                      text-muted-foreground
                      transition-colors
                      hover:bg-primary/15
                      hover:text-primary
                    "
                  >
                    <Icon className="size-4" />
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        {/* Footer bottom */}
        <div
          className="
            mt-10
            flex flex-col
            items-start
            justify-between
            gap-4
            border-t
            border-white/5
            pt-6
            sm:flex-row
            sm:items-center
          "
        >
          <p className="text-xs text-muted-foreground">
            © 2026 Multicine. Todos los derechos reservados.
          </p>

          <ul className="flex flex-wrap gap-x-5 gap-y-2.5">
            {BOTTOM_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="
                    font-mono
                    text-xs
                    tracking-[0.25em]
                    text-muted-foreground
                    uppercase
                    transition-colors
                    hover:text-primary
                  "
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
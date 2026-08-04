import { Mail, MapPin, Phone } from 'lucide-react'

import Logo from '@/components/Logo'

interface SocialLink {
  label: string
  href: string
  path: string
}

const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'Instagram',
    href: '#',
    path: '<rect width="20" height="20" x="2" y="2" rx="5"/><path d="M16 11.37a4 4 0 1 1-4.63-4.63 4 4 0 0 1 4.63 4.63z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>',
  },
  {
    label: 'Facebook',
    href: '#',
    path: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
  },
  {
    label: 'X',
    href: '#',
    path: '<path d="M4 4h4.6l4.9 6.4L18.8 4H20l-6.4 7.3L20 20h-4.6l-5.2-6.8L5.2 20H4l6.8-8L4 4z"/>',
  },
  {
    label: 'YouTube',
    href: '#',
    path: '<path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/>',
  },
]

const QUICK_LINKS = [
  { label: 'Showtimes', href: '#showtimes' },
  { label: 'Premieres', href: '#premieres' },
  { label: 'Promotions', href: '#promotions' },
  { label: 'Theaters', href: '#benefits' },
  { label: 'Coming Soon', href: '#coming-soon' },
]

const POLICY_LINKS = [
  'Terms and Conditions',
  'Privacy Policy',
  'Cookie Policy',
  'Refunds',
]

const CONTACT_ITEMS = [
  { icon: MapPin, label: 'Av. del Mar 88, Ciudad Costera' },
  { icon: Phone, label: '+1 555 010 2200' },
  { icon: Mail, label: 'hola@multicine.com' },
]

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-abyss-950/60">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              The premium cinematic experience inspired by the deep ocean. Cutting-edge technology and stories that immerse you.
            </p>
            <div className="mt-6 flex items-center gap-2">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="grid size-9 place-items-center rounded-full border border-white/10 bg-white/5 text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-coral-500/50 hover:bg-coral-500/15 hover:text-coral-300"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-4"
                    aria-hidden="true"
                    dangerouslySetInnerHTML={{ __html: social.path }}
                  />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Quick links">
            <h3 className="font-mono text-xs tracking-[0.25em] text-white/60 uppercase">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-coral-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="font-mono text-xs tracking-[0.25em] text-white/60 uppercase">
              Contact
            </h3>
            <ul className="mt-4 space-y-3">
              {CONTACT_ITEMS.map((item) => {
                const Icon = item.icon
                return (
                  <li
                    key={item.label}
                    className="flex items-center gap-2.5 text-sm text-muted-foreground"
                  >
                    <Icon className="size-4 shrink-0 text-ocean-400" />
                    {item.label}
                  </li>
                )
              })}
            </ul>
          </div>

          <nav aria-label="Policies">
            <h3 className="font-mono text-xs tracking-[0.25em] text-white/60 uppercase">
              Policies
            </h3>
            <ul className="mt-4 space-y-2.5">
              {POLICY_LINKS.map((policy) => (
                <li key={policy}>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground transition-colors hover:text-coral-300"
                  >
                    {policy}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © 2026 Multicine. All rights reserved.
          </p>
          <p className="font-mono text-[0.65rem] tracking-[0.25em] text-white/40 uppercase">
            Designed in the deep ocean
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

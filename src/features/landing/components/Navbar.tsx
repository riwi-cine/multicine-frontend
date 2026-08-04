import { useEffect, useState } from 'react'
import { Menu, Search, Ticket, X } from 'lucide-react'

import Logo from '@/components/Logo'
import { Button } from '@/components/ui/button'
import { cn } from '@/utils/cn'

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Showtimes', href: '#showtimes' },
  { label: 'Premieres', href: '#premieres' },
  { label: 'Promotions', href: '#promotions' },
  { label: 'Theaters', href: '#benefits' },
]

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToShowtimes = (e: React.FormEvent) => {
    e.preventDefault()
    document.querySelector('#showtimes')?.scrollIntoView({ behavior: 'smooth' })
    setSearchOpen(false)
    setQuery('')
  }

  const closeMenus = () => {
    setMenuOpen(false)
    setSearchOpen(false)
  }

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled || menuOpen || searchOpen
          ? 'border-b border-white/10 bg-abyss-950/80 shadow-lg shadow-black/20 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo />

        <nav
          aria-label="Principal"
          className="hidden items-center gap-1 lg:flex"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:bg-white/5 hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Search movie"
            aria-expanded={searchOpen}
            onClick={() => setSearchOpen((open) => !open)}
            className="text-muted-foreground hover:bg-white/5 hover:text-white"
          >
            <Search />
          </Button>

          <Button className="hidden md:inline-flex" size="sm">
            <Ticket data-icon="inline-start" />
            Sign in
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="text-muted-foreground hover:bg-white/5 hover:text-white lg:hidden"
          >
            {menuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {searchOpen && (
        <div className="absolute inset-x-0 top-full border-b border-white/10 bg-abyss-950/90 px-4 py-3 backdrop-blur-xl sm:px-6 lg:px-8">
          <form
            onSubmit={scrollToShowtimes}
            className="mx-auto flex max-w-7xl items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 focus-within:border-ocean-400/50"
          >
            <Search className="size-4 shrink-0 text-muted-foreground" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search movie by name or genre..."
              className="w-full bg-transparent text-sm text-white placeholder:text-muted-foreground focus:outline-none"
            />
            <Button type="submit" size="sm" className="shrink-0">
              Search
            </Button>
          </form>
        </div>
      )}

      {menuOpen && (
        <div className="absolute inset-x-0 top-full border-b border-white/10 bg-abyss-950/95 backdrop-blur-xl lg:hidden">
          <nav
            aria-label="Mobile main"
            className="mx-auto max-w-7xl px-4 py-4 sm:px-6"
          >
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={closeMenus}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="my-3 h-px bg-white/10" aria-hidden="true" />
            <form
              onSubmit={scrollToShowtimes}
              className="flex items-center gap-2"
            >
              <div className="flex flex-1 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5">
                <Search className="size-4 shrink-0 text-muted-foreground" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search movie..."
                  className="w-full bg-transparent text-sm text-white placeholder:text-muted-foreground focus:outline-none"
                />
              </div>
              <Button type="submit" size="sm">
                Search
              </Button>
            </form>
            <Button className="mt-3 w-full">
              <Ticket data-icon="inline-start" />
Sign in
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Navbar

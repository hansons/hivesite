import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/cn'
import { Container } from './Container'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Visit', to: '/visit' },
  { label: 'About', to: '/about' },
  { label: 'Give', to: '/give' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-hive-grey-light/40">
      <Container>
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <HiveMark className="w-8 h-8" />
            <span className="font-semibold text-lg tracking-tight text-hive-grey-dark group-hover:text-hive-green transition-colors">
              The Hive
            </span>
          </Link>

          <nav className="hidden sm:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  cn(
                    'px-3 py-2 text-sm font-medium rounded-md transition-colors',
                    isActive
                      ? 'text-hive-green bg-hive-green-translucent'
                      : 'text-hive-grey-dark hover:text-hive-green hover:bg-hive-green-translucent',
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <button
            type="button"
            className="sm:hidden p-2 -mr-2 text-hive-grey-dark"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {open && (
          <nav className="sm:hidden pb-4 flex flex-col gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'px-3 py-2 text-base font-medium rounded-md',
                    isActive
                      ? 'text-hive-green bg-hive-green-translucent'
                      : 'text-hive-grey-dark hover:text-hive-green hover:bg-hive-green-translucent',
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        )}
      </Container>
    </header>
  )
}

function HiveMark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <polygon
        points="16,3 27,9.5 27,22.5 16,29 5,22.5 5,9.5"
        fill="none"
        stroke="#9ea615"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <circle cx="16" cy="16" r="3" fill="#a6159f" />
      <circle cx="11" cy="12.5" r="1.5" fill="#159fa6" />
      <circle cx="21" cy="12.5" r="1.5" fill="#159fa6" />
      <circle cx="11" cy="19.5" r="1.5" fill="#159fa6" />
      <circle cx="21" cy="19.5" r="1.5" fill="#159fa6" />
    </svg>
  )
}

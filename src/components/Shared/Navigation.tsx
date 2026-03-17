'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLocale } from '@/context/LocaleContext'
import { getMessage } from '@/lib/translations'
import { Home, Calendar, ShoppingCart } from 'lucide-react'

export function Navigation() {
  const pathname = usePathname()
  const locale = useLocale()

  const links = [
    { href: '/', label: getMessage(locale, 'navigation.dashboard', 'Dashboard'), icon: Home },
    { href: '/week', label: getMessage(locale, 'navigation.week', 'Semana'), icon: Calendar },
    { href: '/shopping-list', label: getMessage(locale, 'navigation.shopping', 'Compras'), icon: ShoppingCart },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-olive/10 bg-beige/95 backdrop-blur-sm">
      <div className="mx-auto max-w-4xl px-4">
        <div className="flex justify-around gap-4 py-3">
          {links.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className={`flex flex-col items-center gap-1 px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-olive'
                    : 'text-gray-600 hover:text-olive'
                }`}
                title={label}
              >
                <Icon size={24} />
                <span className="hidden xs:inline">{label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

'use client'

import Link from 'next/link'
import { usePathname } from 'next-intl/navigation'
import { useTranslations } from 'next-intl'
import { Home, Calendar, ShoppingCart } from 'lucide-react'

export function Navigation() {
  const pathname = usePathname()
  const t = useTranslations('navigation')

  const links = [
    { href: '/', label: t('dashboard'), icon: Home },
    { href: '/week', label: t('week'), icon: Calendar },
    { href: '/shopping-list', label: t('shopping'), icon: ShoppingCart },
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

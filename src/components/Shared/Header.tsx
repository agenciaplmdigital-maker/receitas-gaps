'use client'

import { useLocale } from '@/context/LocaleContext'
import { getMessage } from '@/lib/translations'
import LanguageSwitcher from '../LanguageSwitcher'

export function Header() {
  const locale = useLocale()

  return (
    <header className="sticky top-0 z-50 border-b border-olive/10 bg-beige/95 backdrop-blur-sm">
      <div className="mx-auto max-w-4xl px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-olive">
              {getMessage(locale, 'app_name')}
            </h1>
            <p className="text-sm text-sage">
              {getMessage(locale, 'app_description')}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <div className="text-4xl">🥬</div>
          </div>
        </div>
      </div>
    </header>
  )
}

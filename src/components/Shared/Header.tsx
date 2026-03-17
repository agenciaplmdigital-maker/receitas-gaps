'use client'

import { useTranslations } from 'next-intl'
import LanguageSwitcher from '../LanguageSwitcher'

export function Header() {
  const t = useTranslations('header')

  return (
    <header className="sticky top-0 z-50 border-b border-olive/10 bg-beige/95 backdrop-blur-sm">
      <div className="mx-auto max-w-4xl px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-olive">{t('title')}</h1>
            <p className="text-sm text-sage">{t('subtitle')}</p>
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

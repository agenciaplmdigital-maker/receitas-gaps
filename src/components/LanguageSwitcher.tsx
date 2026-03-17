'use client'

import { useLocale, useSetLocale } from '@/context/LocaleContext'

export default function LanguageSwitcher() {
  const locale = useLocale()
  const setLocale = useSetLocale()

  const languages = [
    { code: 'pt-BR', flag: '🇧🇷', label: 'PT' },
    { code: 'en-US', flag: '🇺🇸', label: 'EN' },
    { code: 'es-ES', flag: '🇪🇸', label: 'ES' },
  ] as const

  return (
    <div className="flex gap-1">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLocale(lang.code)}
          className={`
            px-2 py-1 rounded text-sm font-medium transition-all
            ${
              locale === lang.code
                ? 'bg-olive text-white shadow-md'
                : 'bg-beige text-olive hover:bg-sage'
            }
          `}
          title={`${lang.label} ${lang.flag}`}
        >
          {lang.flag} {lang.label}
        </button>
      ))}
    </div>
  )
}

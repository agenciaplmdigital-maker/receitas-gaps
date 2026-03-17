'use client'

import { useRouter, usePathname } from 'next-intl/navigation'
import { useLocale } from 'next-intl'

export default function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const locale = useLocale()

  const languages = [
    { code: 'pt-BR', flag: '🇧🇷', label: 'PT' },
    { code: 'en-US', flag: '🇺🇸', label: 'EN' },
    { code: 'es-ES', flag: '🇪🇸', label: 'ES' },
  ]

  const handleLanguageChange = (newLocale: string) => {
    router.push(pathname, { locale: newLocale })
  }

  return (
    <div className="flex gap-1">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => handleLanguageChange(lang.code)}
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

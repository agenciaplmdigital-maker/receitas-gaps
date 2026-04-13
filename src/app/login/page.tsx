'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSetUser } from '@/context/UserContext'
import { useLocale } from '@/context/LocaleContext'
import { getMessage } from '@/lib/translations'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const setUserEmail = useSetUser()
  const locale = useLocale()

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validate empty
    if (!email.trim()) {
      setError(getMessage(locale, 'login.error_empty', 'Email é obrigatório'))
      return
    }

    // Validate format
    if (!validateEmail(email)) {
      setError(getMessage(locale, 'login.error_invalid', 'Email inválido'))
      return
    }

    // Save and redirect
    setIsLoading(true)
    setUserEmail(email)
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-beige flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-olive mb-2">
            {getMessage(locale, 'app_name', 'Receitas GAPS')}
          </h1>
          <p className="text-lg text-sage">
            {getMessage(locale, 'login.title', 'Email de Compra')}
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <p className="text-center text-gray-600 mb-6">
            {getMessage(locale, 'login.subtitle', 'Coloque seu email para acessar o app')}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-olive mb-2">
                {getMessage(locale, 'login.email_label', 'Seu email')}
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={getMessage(locale, 'login.email_placeholder', 'seu@email.com')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive focus:border-transparent"
                disabled={isLoading}
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-olive text-white py-3 rounded-lg font-semibold hover:bg-[#445025] transition disabled:opacity-50"
            >
              {isLoading ? '...' : getMessage(locale, 'login.submit', 'Entrar')}
            </button>
          </form>

          {/* Language Switcher */}
          <div className="mt-8 pt-6 border-t border-gray-200 flex justify-center gap-2">
            {['pt-BR', 'en-US', 'es-ES'].map((lang) => {
              const langLabels = {
                'pt-BR': '🇧🇷 PT',
                'en-US': '🇺🇸 EN',
                'es-ES': '🇪🇸 ES',
              }
              return (
                <button
                  key={lang}
                  onClick={() => {
                    // Language switching will be implemented with next-intl
                    // For now, this is a placeholder
                  }}
                  className={`px-3 py-1 rounded text-sm transition ${
                    locale === lang
                      ? 'bg-olive text-white'
                      : 'bg-beige text-olive hover:bg-sage'
                  }`}
                  disabled
                  title={langLabels[lang as keyof typeof langLabels]}
                >
                  {langLabels[lang as keyof typeof langLabels]}
                </button>
              )
            })}
          </div>
        </div>

        {/* Footer Text */}
        <p className="text-center text-gray-500 text-sm mt-8">
          {getMessage(locale, 'login.info', 'Seu email é utilizado para fins de compra')}
        </p>
      </div>
    </div>
  )
}

'use client'

import { useLocale } from '@/context/LocaleContext'
import { getMessage } from '@/lib/translations'
import { Download, BookOpen } from 'lucide-react'

export default function MaterialsPage() {
  const locale = useLocale()

  const materials = [
    {
      id: 'gaps-ebook',
      icon: '📚',
      title: getMessage(locale, 'materials.gaps_ebook', 'E-book Protocolo GAPS'),
      description: getMessage(locale, 'materials.gaps_description', 'Guia completo sobre o Protocolo GAPS com fases, alimentos permitidos, receitas e dicas práticas'),
      size: 'Interativo',
      format: 'HTML',
      downloadUrl: '/ebook'
    }
  ]

  return (
    <main className="mx-auto max-w-4xl px-4 pb-24 pt-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-olive mb-2">
          {getMessage(locale, 'materials.title', 'Materiais para Baixar')}
        </h2>
        <p className="text-lg text-sage">
          {getMessage(locale, 'materials.subtitle', 'Recursos e guias complementares')}
        </p>
      </div>

      <div className="space-y-4">
        {materials.map((material) => (
          <div
            key={material.id}
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <div className="text-4xl">{material.icon}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-olive mb-1">
                    {material.title}
                  </h3>
                  <p className="text-gray-600 mb-3">
                    {material.description}
                  </p>
                  <div className="flex gap-4 text-sm text-gray-500">
                    <span>📄 {material.format}</span>
                    <span>💾 {material.size}</span>
                  </div>
                </div>
              </div>
            </div>

            <a
              href={material.downloadUrl}
              className="inline-flex items-center gap-2 px-6 py-3 bg-olive text-white rounded-lg font-semibold hover:bg-[#445025] transition"
            >
              <BookOpen size={20} />
              {getMessage(locale, 'materials.open_ebook', 'Abrir E-book')}
            </a>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-beige rounded-2xl p-6">
        <h3 className="text-lg font-bold text-olive mb-3">
          {getMessage(locale, 'materials.tips_title', 'Como usar os materiais')}
        </h3>
        <ul className="space-y-2 text-gray-700">
          <li>✓ {getMessage(locale, 'materials.tip1', 'Baixe o e-book e estude as fases do protocolo')}</li>
          <li>✓ {getMessage(locale, 'materials.tip2', 'Comece com a fase introdução conforme as recomendações')}</li>
          <li>✓ {getMessage(locale, 'materials.tip3', 'Use o app para planejar suas refeições semanais')}</li>
          <li>✓ {getMessage(locale, 'materials.tip4', 'Combine os materiais com acompanhamento profissional')}</li>
        </ul>
      </div>
    </main>
  )
}

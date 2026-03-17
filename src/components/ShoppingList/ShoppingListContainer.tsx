'use client'

import { useTranslations, useLocale } from 'next-intl'
import { useRecipeContext } from '@/context/RecipeContext'
import { CategorySection } from './CategorySection'

export function ShoppingListContainer() {
  const t = useTranslations('shopping')
  const tCommon = useTranslations('common')
  const locale = useLocale()
  const { shoppingList, toggleShoppingItem, isLoading } = useRecipeContext()

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="spinner" />
      </div>
    )
  }

  return (
    <main className="mx-auto max-w-4xl px-4 pb-24 pt-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-olive">{t('title')}</h2>
        <p className="text-lg text-sage">
          {t('week_of', {
            date: new Date().toLocaleDateString(
              locale === 'pt-BR' ? 'pt-BR' : locale === 'en-US' ? 'en-US' : 'es-ES'
            ),
          })}
        </p>
      </div>

      {shoppingList.length === 0 ? (
        <div className="rounded-lg border-2 border-dashed border-olive/20 p-8 text-center text-gray-500">
          <p className="text-lg">{t('empty_state')}</p>
          <p className="text-sm">{t('add_meals_hint')}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {['acougue', 'hortifruti', 'despensa_gaps', 'fermentados'].map((category) => {
            const categoryItems = shoppingList.filter(
              (item) => item.category === tCommon(`categories.${category}`)
            )
            return (
              <CategorySection
                key={category}
                category={category}
                items={categoryItems}
                onToggleItem={toggleShoppingItem}
              />
            )
          })}
        </div>
      )}

      <div className="mt-8 rounded-lg bg-cream p-6">
        <h3 className="mb-2 font-serif font-bold text-olive">{t('shopping_tips')}</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          {t.raw('tips').map((tip: string, index: number) => (
            <li key={index}>✓ {tip}</li>
          ))}
        </ul>
      </div>
    </main>
  )
}

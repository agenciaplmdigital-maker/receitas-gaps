'use client'

import { useLocale } from '@/context/LocaleContext'
import { getMessage } from '@/lib/translations'
import { useRecipeContext } from '@/context/RecipeContext'
import { CategorySection } from './CategorySection'

export function ShoppingListContainer() {
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
        <h2 className="text-2xl font-bold text-olive">{getMessage(locale, 'shopping.title', 'Lista de Compras')}</h2>
        <p className="text-lg text-sage">
          {getMessage(locale, 'shopping.week_of', 'Semana de')} {new Date().toLocaleDateString(
            locale === 'pt-BR' ? 'pt-BR' : locale === 'en-US' ? 'en-US' : 'es-ES'
          )}
        </p>
      </div>

      {shoppingList.length === 0 ? (
        <div className="rounded-lg border-2 border-dashed border-olive/20 p-8 text-center text-gray-500">
          <p className="text-lg">{getMessage(locale, 'shopping.empty_state', 'Nenhum ingrediente para esta semana')}</p>
          <p className="text-sm">{getMessage(locale, 'shopping.add_meals_hint', 'Adicione refeições para gerar a lista de compras')}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {['acougue', 'hortifruti', 'despensa_gaps', 'fermentados'].map((category) => {
            const categoryItems = shoppingList.filter(
              (item) => item.category === getMessage(locale, `categories.${category}`, category)
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
        <h3 className="mb-2 font-serif font-bold text-olive">{getMessage(locale, 'shopping.shopping_tips', '📝 Dicas de Compras')}</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>✓ Separe ingredientes por categoria para facilitar as compras</li>
          <li>✓ Verifique os ingredientes em casa antes de sair</li>
          <li>✓ Compare preços em diferentes lojas</li>
        </ul>
      </div>
    </main>
  )
}

'use client'

import { useRecipeContext } from '@/context/RecipeContext'
import { INGREDIENT_CATEGORIES } from '@/utils/constants'
import { CategorySection } from './CategorySection'

export function ShoppingListContainer() {
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
        <h2 className="text-2xl font-bold text-olive">Lista de Compras</h2>
        <p className="text-lg text-sage">Semana de {new Date().toLocaleDateString('pt-BR')}</p>
      </div>

      {shoppingList.length === 0 ? (
        <div className="rounded-lg border-2 border-dashed border-olive/20 p-8 text-center text-gray-500">
          <p className="text-lg">Nenhum ingrediente para esta semana</p>
          <p className="text-sm">Adicione refeições para gerar a lista de compras</p>
        </div>
      ) : (
        <div className="space-y-4">
          {INGREDIENT_CATEGORIES.map((category) => {
            const categoryItems = shoppingList.filter(
              (item) => item.category === category
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
        <h3 className="mb-2 font-serif font-bold text-olive">📝 Dicas de Compras</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>✓ Mantenha uma rotina com seu açougueiro de confiança</li>
          <li>✓ Escolha sempre produtos de origem conhecida</li>
          <li>✓ Prefira cultivares locais e sazonais na seção de hortifruti</li>
          <li>✓ Verifique a data de validade dos fermentados</li>
        </ul>
      </div>
    </main>
  )
}

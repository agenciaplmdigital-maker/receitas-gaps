'use client'

import { useLocale } from '@/context/LocaleContext'
import { getMessage } from '@/lib/translations'
import { useRecipeContext } from '@/context/RecipeContext'
import type { Recipe } from '@/types/recipe'
import { X, Clock, Users } from 'lucide-react'

interface RecipeModalProps {
  recipe: Recipe | null
  isOpen: boolean
  onClose: () => void
}

export function RecipeModal({ recipe, isOpen, onClose }: RecipeModalProps) {
  const locale = useLocale()

  if (!isOpen || !recipe) return null

  const totalTime = recipe.prepTime + recipe.cookTime

  return (
    <div className="fixed inset-0 z-50 flex items-end bg-black/50 sm:items-center sm:justify-center" onClick={onClose}>
      <div
        className="w-full max-h-[90vh] max-w-2xl overflow-y-auto rounded-t-2xl bg-white p-6 sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h2 className="text-3xl font-bold text-olive">{recipe.title}</h2>
            <p className="mt-2 text-gray-600">{recipe.description}</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-gray-100"
            aria-label={getMessage(locale, 'recipe_modal.close', 'Fechar')}
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Quick Info */}
        <div className="mb-6 grid grid-cols-3 gap-4 rounded-lg bg-cream p-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2">
              <Clock size={20} className="text-terracotta" />
              <span className="text-sm font-semibold text-sage">{totalTime}m</span>
            </div>
            <p className="text-xs text-gray-600">{getMessage(locale, 'recipe_modal.total_time', 'Tempo total')}</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2">
              <Users size={20} className="text-terracotta" />
              <span className="text-sm font-semibold text-sage">{recipe.servings}</span>
            </div>
            <p className="text-xs text-gray-600">{getMessage(locale, 'recipe_modal.servings', 'Porções')}</p>
          </div>
          <div className="text-center">
            <span className="inline-block rounded-full bg-olive/10 px-3 py-1 text-xs font-semibold text-olive">
              {recipe.gapsDifficulty === 'easy'
                ? getMessage(locale, 'difficulty.easy', 'Fácil')
                : recipe.gapsDifficulty === 'medium'
                  ? getMessage(locale, 'difficulty.medium', 'Médio')
                  : getMessage(locale, 'difficulty.advanced', 'Avançado')}
            </span>
          </div>
        </div>

        {/* Ingredients */}
        <div className="mb-6">
          <h3 className="mb-3 text-xl font-bold text-olive">{getMessage(locale, 'recipe_modal.ingredients', 'Ingredientes')}</h3>
          <ul className="space-y-2">
            {recipe.ingredients.map((ingredient) => (
              <li key={ingredient.id} className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-terracotta" />
                <span>
                  <strong className="text-sage">{ingredient.amount}</strong> {ingredient.unit} de{' '}
                  <strong>{ingredient.name}</strong>
                  {ingredient.notes && (
                    <span className="block text-xs text-gray-500">({ingredient.notes})</span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Instructions */}
        <div className="mb-6">
          <h3 className="mb-3 text-xl font-bold text-olive">{getMessage(locale, 'recipe_modal.instructions', 'Modo de Preparo')}</h3>
          <ol className="space-y-3">
            {recipe.instructions.map((instruction, index) => (
              <li key={index} className="flex gap-3">
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-olive/10 text-sm font-bold text-olive">
                  {index + 1}
                </span>
                <p className="pt-1 text-gray-700">{instruction}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* Nutrition Tip */}
        <div className="rounded-lg border-l-4 border-terracotta bg-cream p-4">
          <h4 className="mb-2 font-bold text-olive">💡 {getMessage(locale, 'recipe_modal.nutrition_tip', 'Dica Nutritiva')}</h4>
          <p className="text-sm text-gray-700">{recipe.nutritionTip}</p>
        </div>

        {/* Tags */}
        <div className="mt-6 flex flex-wrap gap-2">
          {recipe.tags.map((tag) => (
            <span
              key={tag}
              className="inline-block rounded-full bg-sage/10 px-3 py-1 text-xs font-medium text-sage"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

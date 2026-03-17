'use client'

import { useLocale } from '@/context/LocaleContext'
import { getMessage } from '@/lib/translations'
import type { Meal, Recipe, MealType } from '@/types/recipe'
import { Check } from 'lucide-react'

interface DailyMealCardProps {
  meal: Meal
  recipe: Recipe | undefined
  onToggle: (mealId: string) => void
  onSelectRecipe: (recipe: Recipe) => void
}

export function DailyMealCard({
  meal,
  recipe,
  onToggle,
  onSelectRecipe,
}: DailyMealCardProps) {
  const locale = useLocale()

  if (!recipe) return null

  return (
    <div className="card relative">
      <div className="flex items-start justify-between">
        <div
          className="flex-1 cursor-pointer"
          onClick={() => onSelectRecipe(recipe)}
        >
          <h4 className="mb-2 font-serif text-lg font-semibold text-olive">
            {getMessage(locale, `meal_types.${meal.mealType}`, meal.mealType)}
          </h4>
          <p className="mb-2 font-medium text-gray-800">{recipe.title}</p>
          <p className="text-sm text-gray-600">{recipe.description}</p>
          <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
            <span>⏱️ {recipe.prepTime + recipe.cookTime}m</span>
            <span>👥 {recipe.servings} {getMessage(locale, 'dashboard.portions', 'porções')}</span>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation()
            onToggle(meal.id)
          }}
          className={`ml-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 transition-all ${
            meal.isCompleted
              ? 'border-olive bg-olive'
              : 'border-olive hover:bg-olive/5'
          }`}
          aria-label={meal.isCompleted ? getMessage(locale, 'dashboard.mark_as_undone', 'Marcar como não feita') : getMessage(locale, 'dashboard.mark_as_done', 'Marcar como feita')}
        >
          {meal.isCompleted && <Check size={16} className="text-white" />}
        </button>
      </div>
    </div>
  )
}

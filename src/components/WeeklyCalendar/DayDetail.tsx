'use client'

import type { Meal, Recipe } from '@/types/recipe'
import { MealList } from '../Dashboard/MealList'

interface DayDetailProps {
  dayOfWeek: number
  meals: Meal[]
  recipes: Recipe[]
  onToggleMeal: (mealId: string) => void
  onSelectRecipe: (recipe: Recipe) => void
}

export function DayDetail({
  dayOfWeek,
  meals,
  recipes,
  onToggleMeal,
  onSelectRecipe,
}: DayDetailProps) {
  const dayMeals = meals.filter((meal) => meal.dayOfWeek === dayOfWeek)

  if (dayMeals.length === 0) {
    return (
      <div className="rounded-lg border-2 border-dashed border-olive/20 p-6 text-center text-gray-500">
        Sem refeições para este dia
      </div>
    )
  }

  return (
    <div className="mt-4 space-y-3 border-t-2 border-olive/10 pt-4">
      <MealList
        meals={dayMeals}
        recipes={recipes}
        onToggleMeal={onToggleMeal}
        onSelectRecipe={onSelectRecipe}
      />
    </div>
  )
}

'use client'

import type { Meal, Recipe } from '@/types/recipe'
import { DailyMealCard } from './DailyMealCard'

interface MealListProps {
  meals: Meal[]
  recipes: Recipe[]
  onToggleMeal: (mealId: string) => void
  onSelectRecipe: (recipe: Recipe) => void
}

export function MealList({
  meals,
  recipes,
  onToggleMeal,
  onSelectRecipe,
}: MealListProps) {
  const recipeMap = new Map(recipes.map((r) => [r.id, r]))

  return (
    <div className="gap-card">
      {meals.map((meal) => (
        <DailyMealCard
          key={meal.id}
          meal={meal}
          recipe={recipeMap.get(meal.recipeId)}
          onToggle={onToggleMeal}
          onSelectRecipe={onSelectRecipe}
        />
      ))}
    </div>
  )
}

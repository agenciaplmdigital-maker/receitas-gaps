'use client'

import { useRecipeContext } from '@/context/RecipeContext'
import { RecipeModal } from '../Shared/RecipeModal'
import { MealList } from './MealList'
import { DAY_NAMES } from '@/utils/constants'

export function DashboardContainer() {
  const {
    recipes,
    weeklyMealPlan,
    selectedRecipe,
    showRecipeModal,
    openRecipeModal,
    closeRecipeModal,
    toggleMealCompletion,
    isLoading,
  } = useRecipeContext()

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="spinner" />
      </div>
    )
  }

  const today = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1
  const todayMeals = weeklyMealPlan.filter((meal) => meal.dayOfWeek === today)

  const formattedDate = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })

  return (
    <main className="mx-auto max-w-4xl px-4 pb-24 pt-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-olive capitalize">
          Cardápio de Hoje
        </h2>
        <p className="text-lg text-sage">
          {DAY_NAMES[today]}, {formattedDate}
        </p>
      </div>

      <MealList
        meals={todayMeals}
        recipes={recipes}
        onToggleMeal={toggleMealCompletion}
        onSelectRecipe={openRecipeModal}
      />

      <RecipeModal
        recipe={selectedRecipe}
        isOpen={showRecipeModal}
        onClose={closeRecipeModal}
      />
    </main>
  )
}

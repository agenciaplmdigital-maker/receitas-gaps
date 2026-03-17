'use client'

import { useRecipeContext } from '@/context/RecipeContext'
import { useLocale } from '@/context/LocaleContext'
import { getMessage } from '@/lib/translations'
import { RecipeModal } from '../Shared/RecipeModal'
import { MealList } from './MealList'

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

  const locale = useLocale()

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="spinner" />
      </div>
    )
  }

  const today = new Date().getDay()
  const todayMeals = weeklyMealPlan.filter((meal) => meal.dayOfWeek === today)

  const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
  const formattedDate = new Date().toLocaleDateString(locale === 'pt-BR' ? 'pt-BR' : locale === 'en-US' ? 'en-US' : 'es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })

  return (
    <main className="mx-auto max-w-4xl px-4 pb-24 pt-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-olive capitalize">
          {getMessage(locale, 'dashboard.title', 'Cardápio de Hoje')}
        </h2>
        <p className="text-lg text-sage">
          {getMessage(locale, `days.${dayNames[today]}`, dayNames[today])}, {formattedDate}
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

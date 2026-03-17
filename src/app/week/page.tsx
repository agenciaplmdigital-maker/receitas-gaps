'use client'

import { Header } from '@/components/Shared/Header'
import { Navigation } from '@/components/Shared/Navigation'
import { RecipeModal } from '@/components/Shared/RecipeModal'
import { CalendarGrid } from '@/components/WeeklyCalendar/CalendarGrid'
import { useRecipeContext } from '@/context/RecipeContext'

export default function WeekPage() {
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

  return (
    <>
      <Header />
      <main className="mx-auto max-w-4xl px-4 pb-24 pt-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-olive">Semana de Refeições</h2>
          <p className="text-lg text-sage">
            Segunda a domingo, {new Date().toLocaleDateString('pt-BR')}
          </p>
        </div>

        <CalendarGrid
          meals={weeklyMealPlan}
          recipes={recipes}
          onToggleMeal={toggleMealCompletion}
          onSelectRecipe={openRecipeModal}
        />
      </main>

      <RecipeModal
        recipe={selectedRecipe}
        isOpen={showRecipeModal}
        onClose={closeRecipeModal}
      />

      <Navigation />
    </>
  )
}

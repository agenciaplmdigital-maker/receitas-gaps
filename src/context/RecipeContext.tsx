'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { useLocale } from 'next-intl'
import type { Meal, Recipe, ShoppingListItem, WeeklyPlan } from '@/types/recipe'
import { STORAGE_KEYS } from '@/utils/constants'

interface RecipeContextType {
  // Data
  recipes: Recipe[]
  weeklyMealPlan: Meal[]
  shoppingList: ShoppingListItem[]

  // UI State
  selectedDay: number
  selectedRecipe: Recipe | null
  showRecipeModal: boolean
  isLoading: boolean

  // Actions
  toggleMealCompletion: (mealId: string) => void
  toggleShoppingItem: (itemId: string) => void
  selectDay: (dayOfWeek: number) => void
  openRecipeModal: (recipe: Recipe) => void
  closeRecipeModal: () => void
  generateWeeklyPlan: (preferences?: any) => Promise<void>
  loadWeeklyPlan: () => Promise<void>
}

const RecipeContext = createContext<RecipeContextType | undefined>(undefined)

export function RecipeProvider({ children }: { children: React.ReactNode }) {
  const locale = useLocale() as 'pt-BR' | 'en-US' | 'es-ES'
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [weeklyMealPlan, setWeeklyMealPlan] = useState<Meal[]>([])
  const [shoppingList, setShoppingList] = useState<ShoppingListItem[]>([])
  const [selectedDay, setSelectedDay] = useState(0)
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null)
  const [showRecipeModal, setShowRecipeModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Load initial data
  useEffect(() => {
    loadWeeklyPlan()
  }, [locale])

  // Aggregate shopping list whenever meals change
  useEffect(() => {
    aggregateShoppingList()
  }, [weeklyMealPlan, recipes])

  const loadWeeklyPlan = async () => {
    try {
      setIsLoading(true)

      // Load seed data in the correct language
      let seedData: any
      try {
        seedData = await import(`@/data/seedRecipes.${locale}.json`)
      } catch {
        // Fallback to Portuguese if language file not found
        seedData = await import('@/data/seedRecipes.pt-BR.json')
      }
      seedData = seedData.default || seedData

      // Load recipes
      const storedRecipes = localStorage.getItem(STORAGE_KEYS.WEEKLY_MEAL_PLAN)
      if (storedRecipes) {
        const plan: WeeklyPlan = JSON.parse(storedRecipes)
        setRecipes(plan.recipes || seedData.recipes || [])
        setWeeklyMealPlan(plan.meals || [])
      } else {
        // Use seed data
        setRecipes(seedData.recipes || [])
        const meals: Meal[] = []
        const weeklyStructure = seedData.weeklyMealPlan || []

        weeklyStructure.forEach((day: any, dayIndex: number) => {
          day.meals.forEach((meal: any) => {
            meals.push({
              id: `${dayIndex}-${meal.mealType}-${Date.now()}`,
              dayOfWeek: dayIndex,
              mealType: meal.mealType,
              recipeId: meal.recipeId,
              isCompleted: false,
              createdAt: new Date().toISOString(),
            })
          })
        })

        setWeeklyMealPlan(meals)
      }

      // Load checkbox states
      const checkedItems = localStorage.getItem(STORAGE_KEYS.SHOPPING_LIST_CHECKED)
      if (checkedItems) {
        setShoppingList((prevList) =>
          prevList.map((item) => ({
            ...item,
            checked: JSON.parse(checkedItems).includes(item.id),
          }))
        )
      }
    } catch (error) {
      console.error('Failed to load weekly plan:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const aggregateShoppingList = () => {
    const aggregated: Record<string, ShoppingListItem> = {}

    weeklyMealPlan.forEach((meal) => {
      const recipe = recipes.find((r) => r.id === meal.recipeId)
      if (!recipe) return

      recipe.ingredients.forEach((ingredient) => {
        const key = `${ingredient.name}-${ingredient.unit}`

        if (!aggregated[key]) {
          aggregated[key] = {
            id: `${ingredient.id}-${Date.now()}`,
            ingredientId: ingredient.id,
            name: ingredient.name,
            totalAmount: ingredient.amount,
            unit: ingredient.unit,
            category: ingredient.category,
            checked: false,
            sourceRecipes: [recipe.id],
          }
        } else {
          aggregated[key].totalAmount += ingredient.amount
          if (!aggregated[key].sourceRecipes.includes(recipe.id)) {
            aggregated[key].sourceRecipes.push(recipe.id)
          }
        }
      })
    })

    const list = Object.values(aggregated)

    // Restore checked state from localStorage
    const checkedItems = localStorage.getItem(STORAGE_KEYS.SHOPPING_LIST_CHECKED)
    if (checkedItems) {
      const checkedIds = JSON.parse(checkedItems)
      list.forEach((item) => {
        item.checked = checkedIds.includes(item.id)
      })
    }

    setShoppingList(list)
  }

  const toggleMealCompletion = (mealId: string) => {
    setWeeklyMealPlan((prevPlan) =>
      prevPlan.map((meal) =>
        meal.id === mealId ? { ...meal, isCompleted: !meal.isCompleted } : meal
      )
    )
  }

  const toggleShoppingItem = (itemId: string) => {
    setShoppingList((prevList) =>
      prevList.map((item) =>
        item.id === itemId ? { ...item, checked: !item.checked } : item
      )
    )

    // Persist checked state
    const checkedIds = shoppingList
      .filter((item) => item.checked || item.id === itemId)
      .map((item) => item.id)
    localStorage.setItem(STORAGE_KEYS.SHOPPING_LIST_CHECKED, JSON.stringify(checkedIds))
  }

  const selectDay = (dayOfWeek: number) => {
    setSelectedDay(dayOfWeek)
  }

  const openRecipeModal = (recipe: Recipe) => {
    setSelectedRecipe(recipe)
    setShowRecipeModal(true)
  }

  const closeRecipeModal = () => {
    setShowRecipeModal(false)
    setSelectedRecipe(null)
  }

  const generateWeeklyPlan = async (preferences?: any) => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/recipes/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ preferences: preferences || {} }),
      })

      if (!response.ok) throw new Error('Failed to generate recipes')

      const data = await response.json()
      setRecipes(data.recipes || [])
      setWeeklyMealPlan(data.meals || [])

      // Save to localStorage
      const plan: WeeklyPlan = {
        weekStartDate: new Date().toISOString(),
        meals: data.meals || [],
        recipes: data.recipes || [],
      }
      localStorage.setItem(STORAGE_KEYS.WEEKLY_MEAL_PLAN, JSON.stringify(plan))
    } catch (error) {
      console.error('Failed to generate weekly plan:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const value: RecipeContextType = {
    recipes,
    weeklyMealPlan,
    shoppingList,
    selectedDay,
    selectedRecipe,
    showRecipeModal,
    isLoading,
    toggleMealCompletion,
    toggleShoppingItem,
    selectDay,
    openRecipeModal,
    closeRecipeModal,
    generateWeeklyPlan,
    loadWeeklyPlan,
  }

  return <RecipeContext.Provider value={value}>{children}</RecipeContext.Provider>
}

export function useRecipeContext() {
  const context = useContext(RecipeContext)
  if (context === undefined) {
    throw new Error('useRecipeContext must be used within RecipeProvider')
  }
  return context
}

export interface Ingredient {
  id: string
  name: string
  amount: number
  unit: string // "g", "xícara", "colher", "unidade", "ml", "L"
  category: IngredientCategory
  notes?: string
}

export type IngredientCategory = 'Açougue' | 'Hortifruti' | 'Despensa GAPS' | 'Fermentados'

export interface Recipe {
  id: string
  title: string
  description: string
  ingredients: Ingredient[]
  instructions: string[]
  servings: number
  prepTime: number // minutos
  cookTime: number // minutos
  nutritionTip: string
  gapsDifficulty: 'easy' | 'medium' | 'advanced'
  tags: string[]
  publishedDate: string // ISO date
  imageUrl?: string
}

export type MealType = 'cafe' | 'lanche-manha' | 'almoco' | 'lanche-tarde' | 'jantar'

export interface Meal {
  id: string
  dayOfWeek: number // 0-6 (segunda-domingo)
  mealType: MealType
  recipeId: string
  isCompleted: boolean
  createdAt: string // ISO date
}

export interface ShoppingListItem {
  id: string
  ingredientId: string
  name: string
  totalAmount: number
  unit: string
  category: IngredientCategory
  checked: boolean
  sourceRecipes: string[] // IDs das receitas que usam
}

export interface WeeklyPlan {
  weekStartDate: string
  meals: Meal[]
  recipes: Recipe[]
}

export interface SeedData {
  recipes: Recipe[]
  weeklyMealPlan: Array<{
    dayOfWeek: number
    meals: Array<{
      mealType: MealType
      recipeId: string
    }>
  }>
}

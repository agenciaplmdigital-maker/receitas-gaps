import type { IngredientCategory, MealType } from '@/types/recipe'

export const INGREDIENT_CATEGORIES: IngredientCategory[] = [
  'Açougue',
  'Hortifruti',
  'Despensa GAPS',
  'Fermentados',
]

export const MEAL_TYPES: MealType[] = [
  'cafe',
  'lanche-manha',
  'almoco',
  'lanche-tarde',
  'jantar',
]

export const MEAL_LABELS: Record<MealType, string> = {
  cafe: '☕ Café da Manhã',
  'lanche-manha': '🥤 Lanche Manhã',
  almoco: '🍽️ Almoço',
  'lanche-tarde': '🍪 Lanche Tarde',
  jantar: '🌙 Jantar',
}

export const DAY_NAMES = [
  'Segunda',
  'Terça',
  'Quarta',
  'Quinta',
  'Sexta',
  'Sábado',
  'Domingo',
]

export const CATEGORY_ICONS: Record<IngredientCategory, string> = {
  'Açougue': '🥩',
  'Hortifruti': '🥬',
  'Despensa GAPS': '🥫',
  'Fermentados': '🫙',
}

export const CATEGORY_ICONS_BY_KEY: Record<string, string> = {
  'acougue': '🥩',
  'hortifruti': '🥬',
  'despensa_gaps': '🥫',
  'fermentados': '🫙',
}

export const COLORS = {
  olive: '#556B2F',
  beige: '#F5F5DC',
  terracotta: '#C24B3E',
  sage: '#9CAF88',
  cream: '#FFFDD0',
}

export const STORAGE_KEYS = {
  WEEKLY_MEAL_PLAN: 'receitas-gaps:weeklyMealPlan',
  SHOPPING_LIST_CHECKED: 'receitas-gaps:shoppingListChecked',
  USER_PREFERENCES: 'receitas-gaps:userPreferences',
  LAST_UPDATED: 'receitas-gaps:lastUpdated',
}

import type { MealType } from '@/types/recipe'

/**
 * Meal type identifiers used in the application
 * Labels are now managed via i18n in meal_types namespace
 */
export const MEAL_TYPES: MealType[] = [
  'cafe',
  'lanche-manha',
  'almoco',
  'lanche-tarde',
  'jantar',
]

/**
 * Emoji icons for ingredient categories mapped by category key
 * Use with: useTranslations('common').t(`categories.${key}`)
 * to get the localized category name
 */
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

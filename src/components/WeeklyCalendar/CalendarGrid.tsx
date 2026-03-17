'use client'

import type { Meal, Recipe } from '@/types/recipe'
import { DayCard } from './DayCard'
import { DayDetail } from './DayDetail'
import { useState } from 'react'

interface CalendarGridProps {
  meals: Meal[]
  recipes: Recipe[]
  onToggleMeal: (mealId: string) => void
  onSelectRecipe: (recipe: Recipe) => void
}

export function CalendarGrid({
  meals,
  recipes,
  onToggleMeal,
  onSelectRecipe,
}: CalendarGridProps) {
  const [selectedDay, setSelectedDay] = useState<number | null>(null)

  const getMealCountForDay = (dayOfWeek: number) => {
    return meals.filter((m) => m.dayOfWeek === dayOfWeek).length
  }

  return (
    <div className="space-y-4">
      {Array.from({ length: 7 }).map((_, dayIndex) => (
        <div key={dayIndex}>
          <DayCard
            dayOfWeek={dayIndex}
            mealCount={getMealCountForDay(dayIndex)}
            isSelected={selectedDay === dayIndex}
            onClick={() =>
              setSelectedDay(selectedDay === dayIndex ? null : dayIndex)
            }
          />
          {selectedDay === dayIndex && (
            <DayDetail
              dayOfWeek={dayIndex}
              meals={meals}
              recipes={recipes}
              onToggleMeal={onToggleMeal}
              onSelectRecipe={onSelectRecipe}
            />
          )}
        </div>
      ))}
    </div>
  )
}

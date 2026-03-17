'use client'

import { useLocale } from '@/context/LocaleContext'
import { getMessage } from '@/lib/translations'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface DayCardProps {
  dayOfWeek: number
  mealCount: number
  isSelected: boolean
  onClick: () => void
}

export function DayCard({
  dayOfWeek,
  mealCount,
  isSelected,
  onClick,
}: DayCardProps) {
  const locale = useLocale()

  const date = new Date()
  const today = date.getDay()
  // Calculate days to add: if dayOfWeek < today, it's next week
  let daysToAdd = dayOfWeek - today
  if (daysToAdd < 0) daysToAdd += 7
  // If same day but we want to show this week's day, keep it as is
  date.setDate(date.getDate() + daysToAdd)

  const dayDate = date.toLocaleDateString(
    locale === 'pt-BR' ? 'pt-BR' : locale === 'en-US' ? 'en-US' : 'es-ES',
    {
      day: 'numeric',
      month: 'numeric',
    }
  )

  return (
    <button
      onClick={onClick}
      className={`card relative text-left transition-all ${
        isSelected
          ? 'border-2 border-olive shadow-hover'
          : 'border-2 border-transparent hover:border-olive/30'
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-serif text-lg font-bold text-olive">
            {getMessage(locale, `days.${['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][dayOfWeek]}`, ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek])}
          </h3>
          <p className="text-sm text-sage">{dayDate}</p>
          <p className="mt-2 text-xs text-gray-600">
            {mealCount} {mealCount === 1 ? getMessage(locale, 'meal', 'refeição') : getMessage(locale, 'meals', 'refeições')}
          </p>
        </div>
        <div className="text-2xl">
          {isSelected ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </div>
      </div>
    </button>
  )
}

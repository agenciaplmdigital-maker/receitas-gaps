'use client'

import { useLocale } from '@/context/LocaleContext'
import { getMessage } from '@/lib/translations'
import type { ShoppingListItem } from '@/types/recipe'
import { Check } from 'lucide-react'

interface IngredientItemProps {
  item: ShoppingListItem
  onToggle: (itemId: string) => void
}

export function IngredientItem({ item, onToggle }: IngredientItemProps) {
  const locale = useLocale()
  return (
    <li className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-beige/50">
      <button
        onClick={() => onToggle(item.id)}
        className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md border-2 transition-all ${
          item.checked
            ? 'border-olive bg-olive'
            : 'border-olive/30 hover:border-olive'
        }`}
        aria-label={item.checked ? getMessage(locale, 'shopping.uncheck', 'Desmarcar') : getMessage(locale, 'shopping.mark_as_bought', 'Marcar como comprado')}
      >
        {item.checked && <Check size={16} className="text-white" />}
      </button>
      <div className="flex-1">
        <p
          className={`font-medium transition-all ${
            item.checked
              ? 'line-through text-gray-400'
              : 'text-gray-800'
          }`}
        >
          {item.name}
        </p>
        <p className="text-xs text-gray-500">
          {item.totalAmount} {item.unit}
        </p>
      </div>
    </li>
  )
}

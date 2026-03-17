'use client'

import type { ShoppingListItem, IngredientCategory } from '@/types/recipe'
import { CATEGORY_ICONS } from '@/utils/constants'
import { IngredientItem } from './IngredientItem'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'

interface CategorySectionProps {
  category: IngredientCategory
  items: ShoppingListItem[]
  onToggleItem: (itemId: string) => void
}

export function CategorySection({
  category,
  items,
  onToggleItem,
}: CategorySectionProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  if (items.length === 0) return null

  const checkedCount = items.filter((item) => item.checked).length
  const icon = CATEGORY_ICONS[category]

  return (
    <div className="rounded-lg border border-olive/10 bg-white">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 text-left hover:bg-beige/30"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{icon}</span>
            <div>
              <h4 className="font-serif font-bold text-olive">{category}</h4>
              <p className="text-sm text-gray-600">
                {checkedCount} de {items.length} itens
              </p>
            </div>
          </div>
          {isExpanded ? (
            <ChevronUp size={20} className="text-olive" />
          ) : (
            <ChevronDown size={20} className="text-olive" />
          )}
        </div>
      </button>

      {isExpanded && (
        <ul className="divide-y divide-olive/5 border-t border-olive/10 py-2">
          {items.map((item) => (
            <IngredientItem
              key={item.id}
              item={item}
              onToggle={onToggleItem}
            />
          ))}
        </ul>
      )}
    </div>
  )
}

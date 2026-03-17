'use client'

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-olive/10 bg-beige/95 backdrop-blur-sm">
      <div className="mx-auto max-w-4xl px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-olive">Receitas GAPS</h1>
            <p className="text-sm text-sage">Planejador de refeições semanal</p>
          </div>
          <div className="text-4xl">🥬</div>
        </div>
      </div>
    </header>
  )
}

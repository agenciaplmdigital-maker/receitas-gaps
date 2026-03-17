import Anthropic from '@anthropic-ai/sdk'
import { MEAL_TYPES } from '@/utils/constants'
import type { Recipe, Meal } from '@/types/recipe'

const client = new Anthropic()

export async function POST(request: Request) {
  try {
    const { preferences = {} } = await request.json()

    const difficulty = preferences.difficulty || 'medium'

    const prompt = `Você é um chef especialista em Protocolo GAPS. Gere 35 receitas GAPS-amigáveis para uma semana de planejamento de refeições.

Estrutura solicitada: 7 dias × 5 refeições por dia (café, lanche manhã, almoço, lanche tarde, jantar)

Requisitos por receita:
- GAPS-compliant (sem grãos, legumes, óleos de sementes)
- Ingredientes em português com quantidades específicas
- Categorias de ingredientes: Açougue, Hortifruti, Despensa GAPS, Fermentados
- Instruções de 5-8 passos, numeradas
- Dica Nutritiva sobre benefícios para cicatrização intestinal
- Tempo de preparo + cozimento em minutos
- 4 porções padrão
- Dificuldade: ${difficulty}
- 3-5 tags relevantes
- Data de publicação: ${new Date().toISOString().split('T')[0]}

Exemplos de receitas a incluir se possível:
- Ovos mexidos na Ghee
- Caldo de ossos
- Frango ao Curry com abóbora
- Carne moída com fígado e vegetais
- Beef Bourguignon GAPS
- Peixe ao molho de alcaparras
- Vegetais fermentados

Retorne APENAS um objeto JSON válido com esta estrutura:
{
  "recipes": [
    {
      "id": "unique-id",
      "title": "Nome da receita",
      "description": "Descrição curta",
      "ingredients": [
        {
          "id": "ing-id",
          "name": "Nome",
          "amount": 300,
          "unit": "g",
          "category": "Açougue|Hortifruti|Despensa GAPS|Fermentados",
          "notes": "opcional"
        }
      ],
      "instructions": ["Passo 1", "Passo 2", ...],
      "servings": 4,
      "prepTime": 15,
      "cookTime": 30,
      "nutritionTip": "Benefício para o intestino",
      "gapsDifficulty": "easy|medium|advanced",
      "tags": ["tag1", "tag2"],
      "publishedDate": "2026-03-16"
    }
  ],
  "weeklyMealPlan": [
    {
      "dayOfWeek": 0,
      "meals": [
        {"mealType": "cafe", "recipeId": "..."},
        {"mealType": "lanche-manha", "recipeId": "..."},
        {"mealType": "almoco", "recipeId": "..."},
        {"mealType": "lanche-tarde", "recipeId": "..."},
        {"mealType": "jantar", "recipeId": "..."}
      ]
    },
    ...6 mais dias
  ]
}

Garanta que:
1. Todas as 35 receitas tenham IDs únicos
2. Cada dia tenha exatamente 5 refeições nas ordem correta
3. Todos os recipeIds na weeklyMealPlan correspondam aos IDs das receitas
4. Ingredientes usem unidades em português
5. Nenhuma receita fique vazia ou sem instruções`

    const message = await client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 4000,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    })

    const content = message.content[0]
    if (content.type !== 'text') {
      throw new Error('Unexpected response type from Claude')
    }

    let parsed: any
    try {
      // Try to extract JSON from the response
      const jsonMatch = content.text.match(/\{[\s\S]*\}/)
      if (!jsonMatch) {
        throw new Error('No JSON found in response')
      }
      parsed = JSON.parse(jsonMatch[0])
    } catch (error) {
      console.error('Failed to parse Claude response:', content.text)
      throw new Error('Failed to parse recipe data from Claude')
    }

    // Validate and transform the response
    if (!parsed.recipes || !Array.isArray(parsed.recipes)) {
      throw new Error('Invalid recipes format')
    }

    if (!parsed.weeklyMealPlan || !Array.isArray(parsed.weeklyMealPlan)) {
      throw new Error('Invalid weekly meal plan format')
    }

    // Transform to our format
    const recipes: Recipe[] = parsed.recipes.map((r: any) => ({
      ...r,
      publishedDate: r.publishedDate || new Date().toISOString().split('T')[0],
    }))

    const meals: Meal[] = []
    parsed.weeklyMealPlan.forEach((day: any, dayIndex: number) => {
      day.meals.forEach((meal: any) => {
        meals.push({
          id: `meal-${dayIndex}-${meal.mealType}-${Date.now()}`,
          dayOfWeek: dayIndex,
          mealType: meal.mealType,
          recipeId: meal.recipeId,
          isCompleted: false,
          createdAt: new Date().toISOString(),
        })
      })
    })

    return Response.json({
      success: true,
      recipes,
      meals,
      generatedAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Error generating recipes:', error)
    return Response.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to generate recipes',
      },
      { status: 500 }
    )
  }
}

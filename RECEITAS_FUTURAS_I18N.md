# 🌍 Receitas Futuras com Internacionalização

## Problema
Atualmente, o cron job que roda todo domingo (`/api/cron/generate-weekly`) gera novas receitas apenas em **português**. Essas receitas precisam ser **automaticamente traduzidas para inglês e espanhol** quando forem geradas.

## Solução

### Opção 1: Gerar 3 Idiomas no Endpoint (RECOMENDADO)

Modificar `src/app/api/recipes/generate/route.ts` para gerar receitas em 3 idiomas simultaneamente:

```typescript
export async function POST(request: Request) {
  try {
    const { locale = 'pt-BR' } = await request.json();

    const locales = ['pt-BR', 'en-US', 'es-ES'];
    const recipes = {};

    for (const lang of locales) {
      // Gerar receitas no idioma especificado
      const prompt = getPromptForLanguage(lang);
      const response = await anthropic.messages.create({
        // ... usar prompt em português, inglês ou espanhol
      });

      recipes[lang] = parseRecipesResponse(response, lang);
    }

    // Salvar as 3 versões
    await saveRecipesByLocale('pt-BR', recipes['pt-BR']);
    await saveRecipesByLocale('en-US', recipes['en-US']);
    await saveRecipesByLocale('es-ES', recipes['es-ES']);

    return NextResponse.json({ success: true, recipes });
  } catch (error) {
    // ... error handling
  }
}
```

### Opção 2: Traduzir Após Geração

Gerar em português e depois traduzir:

```typescript
// 1. Gerar em português (como faz agora)
const portugueseRecipes = await generateRecipesInPortuguese();

// 2. Traduzir para inglês e espanhol
const englishRecipes = await translateRecipes(portugueseRecipes, 'pt-BR', 'en-US');
const spanishRecipes = await translateRecipes(portugueseRecipes, 'pt-BR', 'es-ES');

// 3. Salvar as 3 versões
await updateSeedRecipes('pt-BR', portugueseRecipes);
await updateSeedRecipes('en-US', englishRecipes);
await updateSeedRecipes('es-ES', spanishRecipes);
```

---

## Prompts por Idioma

### Português (pt-BR)
```
Você é um chef especialista em Protocolo GAPS. Gere 5 receitas completas GAPS-amigáveis
para a próxima semana: 1 café da manhã, 1 lanche matinal, 1 almoço, 1 lanche da tarde, 1 jantar.

Requisitos:
- GAPS-compliant (sem grãos, óleos de sementes, leguminosas)
- Ingredientes em português com quantidades
- Categorias: Açougue, Hortifruti, Despensa GAPS, Fermentados
- Modo de preparo: 5-8 passos
- Dica Nutritiva sobre cicatrização intestinal
- Tempo prep + cozimento
- Tags em português

Responda em JSON com formato exato: { "recipes": [...] }
```

### English (en-US)
```
You are a chef expert in GAPS Protocol. Generate 5 complete GAPS-friendly recipes
for the next week: 1 breakfast, 1 morning snack, 1 lunch, 1 afternoon snack, 1 dinner.

Requirements:
- GAPS-compliant (no grains, seed oils, legumes)
- Ingredients in English with quantities
- Categories: Meat, Produce, GAPS Pantry, Fermented Foods
- Preparation: 5-8 steps
- Nutrition Tip about intestinal healing
- Prep time + cook time
- Tags in English

Respond in JSON with exact format: { "recipes": [...] }
```

### Español (es-ES)
```
Eres un chef experto en Protocolo GAPS. Genera 5 recetas completas compatible con GAPS
para la próxima semana: 1 desayuno, 1 almuerzo temprano, 1 comida, 1 merienda, 1 cena.

Requisitos:
- Compatible con GAPS (sin granos, aceites de semillas, legumbres)
- Ingredientes en español con cantidades
- Categorías: Carnes, Frutas y Verduras, Despensa GAPS, Alimentos Fermentados
- Preparación: 5-8 pasos
- Consejo Nutricional sobre cicatrización intestinal
- Tiempo de preparación + cocción
- Etiquetas en español

Responda en JSON con formato exacto: { "recipes": [...] }
```

---

## Estrutura de Dados Esperada (Mantém Padrão)

Cada idioma deve ter a mesma estrutura JSON:

```json
{
  "recipes": [
    {
      "id": "unique-slug",
      "title": "Recipe Name",
      "description": "...",
      "ingredients": [
        {
          "id": "ing-xxx",
          "name": "ingredient",
          "amount": 2,
          "unit": "metric/unit",
          "category": "Category Name",
          "notes": "optional"
        }
      ],
      "instructions": ["step1", "step2", ...],
      "servings": 1-4,
      "prepTime": minutes,
      "cookTime": minutes,
      "nutritionTip": "Healing benefit",
      "gapsDifficulty": "easy|medium|advanced",
      "tags": ["tag1", "tag2"],
      "publishedDate": "2026-XX-XX"
    }
  ],
  "weeklyMealPlan": [...]
}
```

---

## Implementação Passo a Passo

### Passo 1: Atualizar endpoint `/api/recipes/generate`

```typescript
// src/app/api/recipes/generate/route.ts

import { Anthropic } from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

interface RecipeGenerationRequest {
  locale?: 'pt-BR' | 'en-US' | 'es-ES';
  preferences?: {
    difficulty?: 'easy' | 'medium' | 'advanced';
    restrictions?: string[];
  };
}

const RECIPE_PROMPTS = {
  'pt-BR': `Você é um chef especialista em Protocolo GAPS...`,
  'en-US': `You are a chef expert in GAPS Protocol...`,
  'es-ES': `Eres un chef experto en Protocolo GAPS...`,
};

const CATEGORY_TRANSLATIONS = {
  'pt-BR': {
    'Açougue': 'Açougue',
    'Hortifruti': 'Hortifruti',
    'Despensa GAPS': 'Despensa GAPS',
    'Fermentados': 'Fermentados',
  },
  'en-US': {
    'Açougue': 'Meat',
    'Hortifruti': 'Produce',
    'Despensa GAPS': 'GAPS Pantry',
    'Fermentados': 'Fermented Foods',
  },
  'es-ES': {
    'Açougue': 'Carnes',
    'Hortifruti': 'Frutas y Verduras',
    'Despensa GAPS': 'Despensa GAPS',
    'Fermentados': 'Alimentos Fermentados',
  },
};

export async function POST(request: Request) {
  try {
    const body: RecipeGenerationRequest = await request.json();
    const targetLocale = body.locale || 'pt-BR';

    // Gerar para todas as 3 locales
    const allRecipes = {};

    for (const locale of ['pt-BR', 'en-US', 'es-ES'] as const) {
      const prompt = RECIPE_PROMPTS[locale];

      const message = await anthropic.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 4096,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      });

      const content = message.content[0];
      if (content.type !== 'text') throw new Error('Unexpected response type');

      const recipes = JSON.parse(content.text);
      allRecipes[locale] = recipes;
    }

    // Salvar nos 3 arquivos de seedRecipes
    for (const locale of ['pt-BR', 'en-US', 'es-ES'] as const) {
      await updateSeedRecipes(locale, allRecipes[locale]);
    }

    return Response.json({
      success: true,
      locales: ['pt-BR', 'en-US', 'es-ES'],
      recipes: allRecipes,
    });
  } catch (error) {
    console.error('Recipe generation error:', error);
    return Response.json(
      { error: 'Failed to generate recipes' },
      { status: 500 }
    );
  }
}

async function updateSeedRecipes(
  locale: 'pt-BR' | 'en-US' | 'es-ES',
  recipes: any
) {
  // Implementar: salvar em `src/data/seedRecipes.${locale}.json`
  // Usar fs.writeFile ou similar
}
```

### Passo 2: Atualizar RecipeContext para carregar locale dinamicamente

```typescript
// src/context/RecipeContext.tsx

import { useLocale } from 'next-intl';

export function RecipeProvider({ children }: { children: React.ReactNode }) {
  const locale = useLocale() as 'pt-BR' | 'en-US' | 'es-ES';

  useEffect(() => {
    // Carregar receitas no idioma selecionado
    const loadRecipes = async () => {
      const seedData = await import(`../data/seedRecipes.${locale}.json`);
      setRecipes(seedData.recipes);
      setWeeklyMealPlan(seedData.weeklyMealPlan);
    };

    loadRecipes();
  }, [locale]); // Recarregar quando idioma muda

  // ... resto do código
}
```

### Passo 3: Atualizar Cron Job

`.vercel/crons.json` já está configurado, mas pode adicionar headers:

```json
{
  "crons": [
    {
      "path": "/api/cron/generate-weekly",
      "schedule": "0 0 * * 0",
      "headers": {
        "x-locale": "pt-BR"
      }
    }
  ]
}
```

---

## Testes

### Testar Geração Manual

```bash
# Terminal
curl -X POST http://localhost:3000/api/recipes/generate \
  -H "Content-Type: application/json" \
  -d '{"locale": "pt-BR"}'

# Verificar se criou os 3 arquivos:
# - src/data/seedRecipes.pt-BR.json (atualizado)
# - src/data/seedRecipes.en-US.json (atualizado)
# - src/data/seedRecipes.es-ES.json (atualizado)
```

### Verificar em UI

1. Acessar `/pt-BR/` - deve mostrar receitas em português
2. Mudar para `/en-US/` - deve mostrar receitas em inglês
3. Mudar para `/es-ES/` - deve mostrar receitas em espanhol
4. Todos os 5 ingredientes, instruções, dicas devem estar no idioma correto

---

## Roadmap

- [ ] Atualizar `/api/recipes/generate` para gerar 3 idiomas
- [ ] Atualizar `RecipeContext.tsx` para recarregar ao mudar locale
- [ ] Testar geração manual
- [ ] Testar em UI
- [ ] Verificar cron job do próximo domingo
- [ ] Deploy em Railway

---

## Notas Importantes

1. **Cost**: Gerar 3 idiomas = 3x chamadas à Claude API (3x custo)
2. **Time**: Leva ~3x tempo para gerar (5 min em vez de 2 min)
3. **Alternative**: Gerar só em PT-BR e traduzir é 30% mais barato
4. **Qualidade**: Gerar nativamente em cada idioma é melhor que traduzir

**Recomendação**: Use Opção 1 (gerar 3 idiomas nativamente) para melhor qualidade.

---

## Próximas Ações

Avise quando quiser:
1. Atualizar o endpoint `/api/recipes/generate`
2. Atualizar RecipeContext
3. Fazer deploy de tudo no Railway

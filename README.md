# Receitas GAPS - PWA de Planejamento de Refeições

Um Progressive Web App moderno para planejamento de refeições baseadas no Protocolo GAPS, com lista de compras inteligente e geração automática de receitas via Claude API.

## 🌿 Características

- **Dashboard Diário**: Visualize as 5 refeições do dia (café, lanche manhã, almoço, lanche tarde, jantar)
- **Calendário Semanal**: Navegação intuitiva por dia da semana com expansão de detalhes
- **Lista de Compras Inteligente**: Agregação automática de ingredientes da semana, organizada por categoria
- **Receitas GAPS**: Pré-populadas com receitas do e-book "O Dom da Mesa"
- **Geração com IA**: Nova semana de receitas gerada automaticamente via Claude API
- **Offline First**: Funciona completamente offline com sincronização automática
- **Design Mobile-First**: Otimizado para uso na cozinha
- **PWA Instalável**: Instale como app nativo em qualquer dispositivo

## 🚀 Início Rápido

### Pré-requisitos

- Node.js 18+
- npm ou yarn
- Chave de API Anthropic Claude

### Instalação

```bash
# Clone o repositório
git clone <seu-repositorio>
cd receitas-gaps

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env.local
# Edite .env.local e adicione sua ANTHROPIC_API_KEY
```

### Desenvolvimento

```bash
npm run dev
# Abra http://localhost:3000
```

### Build para Produção

```bash
npm run build
npm run start
```

## 📱 PWA - Como Instalar

### No Chrome/Android
1. Abra o app no navegador
2. Clique no ícone "Instalar" que aparece na barra de endereço
3. Escolha onde instalar

### No Safari/iOS
1. Abra em Safari
2. Clique em "Compartilhar" → "Adicionar à Tela de Início"
3. Nomeia e confirma

## ⚙️ Configuração

### Variáveis de Ambiente

```
ANTHROPIC_API_KEY=sk-ant-...
CRON_SECRET=seu-secret-aleatorio (para Vercel Cron)
```

### Vercel Deployment

```bash
# Instale Vercel CLI
npm install -g vercel

# Deploy
vercel

# Configure as variáveis de ambiente em vercel.com/dashboard
```

## 📊 Estrutura de Dados

### Receitas
```typescript
interface Recipe {
  id: string
  title: string
  description: string
  ingredients: Ingredient[]
  instructions: string[]
  servings: number
  prepTime: number
  cookTime: number
  nutritionTip: string
  gapsDifficulty: "easy" | "medium" | "advanced"
  tags: string[]
  publishedDate: string
}
```

### Refeições Semanais
7 dias × 5 refeições = 35 refeições por semana

## 🔄 Atualização Automática de Receitas

O app gera automaticamente uma nova semana de receitas todo domingo à meia-noite (UTC) usando:

- **Agendador**: Vercel Cron Job
- **Geração**: Claude API (Sonnet 3.5)
- **Armazenamento**: localStorage (navegador) + Vercel KV (sincronização)

## 🎨 Design System

### Paleta de Cores
- **Verde Oliva** (#556B2F): Principal, títulos
- **Bege** (#F5F5DC): Fundo
- **Terracota** (#C24B3E): Acentos, destaque
- **Sage** (#9CAF88): Subtítulos
- **Creme** (#FFFDD0): Dicas e destaques

### Tipografia
- **Títulos**: Playfair Display (Serif)
- **Corpo**: Inter (Sans-serif)

## 🧪 Testes

```bash
# Testes unitários
npm run test

# Coverage
npm run test:coverage

# E2E (Playwright)
npm run test:e2e
```

## 📦 Dependências Principais

- **Next.js 14**: Framework React com App Router
- **React 18**: UI library
- **Tailwind CSS**: Utility-first CSS
- **Lucide React**: Ícones
- **@anthropic-ai/sdk**: Integração Claude API
- **next-pwa**: PWA configuration

## 🤝 Contribuições

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

MIT License - veja LICENSE para detalhes

## 📞 Suporte

Para dúvidas ou problemas, abra uma issue no repositório.

---

**Desenvolvido com 💚 para uma alimentação mais saudável baseada em GAPS**

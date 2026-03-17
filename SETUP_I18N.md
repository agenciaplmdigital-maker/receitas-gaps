# 🌍 Setup Internacionalização (i18n) - Receitas GAPS

Este guia explica como finalizar a implementação da internacionalização no seu app Receitas GAPS.

## Status Atual

✅ **Já criado:**
- Arquivos de configuração: `middleware.ts`, `src/app/i18n.ts`
- Arquivos de tradução base: `src/locales/pt-BR/common.json`, `en-US/`, `es-ES/`
- Configuração next.config.js atualizada

⏳ **Próximas etapas:**
1. Instalar dependência `next-intl`
2. Traduzir 35 receitas para 3 idiomas
3. Atualizar componentes com `useTranslations()`
4. Testar e fazer deploy

---

## ⚙️ PASSO 1: Instalar next-intl no seu computador

No seu terminal/PowerShell, na pasta do projeto:

```bash
cd C:\Users\paulo\Downloads\receitas-gaps
npm install next-intl
```

Isso irá adicionar a dependência ao `package.json`.

---

## 📝 PASSO 2: Próximas Fases de Implementação

Assim que a instalação terminar, as próximas fases serão:

### FASE 2: Traduzir Receitas (35 receitas × 3 idiomas)
- Extrair as 35 receitas do arquivo `src/data/seedRecipes.pt-BR.json`
- Usar Claude API para traduzir para Inglês e Espanhol
- Criar `seedRecipes.en-US.json` e `seedRecipes.es-ES.json`

### FASE 3: Atualizar Componentes
- Adicionar `useTranslations()` em cada componente
- Criar `LanguageSwitcher` no Header
- Refatorar `constants.ts` para usar i18n

### FASE 4: Reorganizar Rotas
- Mover arquivos para `src/app/[locale]/`
- Atualizar imports e paths

### FASE 5: Testes
- Testar em PT-BR, EN-US, ES-ES
- Verificar PWA ainda funciona
- Deploy em Railway

---

## 🚀 Como Começar Agora

1. Execute: `npm install next-intl`
2. Aguarde os próximos arquivos de tradução de receitas
3. Em seguida, os componentes serão atualizados

---

## 📚 Estrutura de Locales

```
src/locales/
├── pt-BR/
│   ├── common.json    ✅ Criado
│   ├── dashboard.json (próximo)
│   ├── recipes.json   (próximo)
│   └── shopping.json  (próximo)
├── en-US/
│   ├── common.json    ✅ Criado
│   └── ... (próximos)
└── es-ES/
    ├── common.json    ✅ Criado
    └── ... (próximos)
```

---

## ✨ Resultado Final

Depois de completar todas as fases, seu app terá:
- ✅ Interface em 3 idiomas (PT-BR, EN-US, ES-ES)
- ✅ 35 receitas traduzidas para 3 idiomas
- ✅ Seletor de idioma no Header (🇧🇷 🇺🇸 🇪🇸)
- ✅ URLs com locale: `/pt-BR/`, `/en-US/`, `/es-ES/`
- ✅ Persistência de preferência de idioma
- ✅ PWA e offline funcionando em todos os idiomas

---

## 🆘 Dúvidas?

Me avisa quando tiver `next-intl` instalado e pronto para a próxima fase!

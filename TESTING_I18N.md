# 🧪 FASE 6: Testes de Internacionalização (i18n)

## Checklist de Testes

Após completar PHASE 1-5, use este guia para testar toda a funcionalidade de internacionalização antes de fazer deploy em Railway.

---

## 1️⃣ Setup Inicial

### 1.1 Instalar dependências
```bash
npm install
```

### 1.2 Build do projeto
```bash
npm run build
```
✅ **Esperado**: Build completa sem erros

---

## 2️⃣ Testes de Desenvolvimento Local

### 2.1 Iniciar servidor de desenvolvimento
```bash
npm run dev
```
✅ **Esperado**: Servidor inicia em http://localhost:3000

### 2.2 Acessar a aplicação
- Abra http://localhost:3000/pt-BR/ no navegador
- ✅ **Esperado**: Dashboard carrega com interface em português

---

## 3️⃣ Testes de Idioma (Português)

### 3.1 Verificar Header
- [ ] Título deve ser "Receitas GAPS"
- [ ] Subtítulo deve ser "Planejador de refeições semanal"
- [ ] Emoji 🥬 aparece no canto direito
- [ ] Seletor de idioma com bandeiras aparece (🇧🇷 🇺🇸 🇪🇸)

### 3.2 Verificar Navigation (Tab Bar)
- [ ] "Dashboard" está visível
- [ ] "Semana" está visível
- [ ] "Compras" está visível
- [ ] Ícones aparecem corretamente

### 3.3 Verificar Dashboard
- [ ] Título: "Cardápio de Hoje"
- [ ] Data em formato português: "XX de janeiro de XXXX"
- [ ] Dia da semana em português (ex: "Segunda-feira")
- [ ] Nomes das refeições:
  - [ ] "☕ Café da Manhã"
  - [ ] "🥤 Lanche Manhã"
  - [ ] "🍽️ Almoço"
  - [ ] "🍪 Lanche Tarde"
  - [ ] "🌙 Jantar"
- [ ] Texto "porções" aparece após número
- [ ] Checkbox aria-label: "Marcar como feita" ou "Marcar como não feita"

### 3.4 Verificar página Semana
- [ ] Título: "Semana de Refeições"
- [ ] Dias da semana em português:
  - [ ] "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"
- [ ] Clique em um dia → expande e mostra refeições
- [ ] Texto "X refeições" aparece corretamente
- [ ] Clique novamente → collapsa

### 3.5 Verificar Modal de Receita
- [ ] Clique em uma refeição → abre modal
- [ ] Botão fechar com aria-label "Fechar"
- [ ] "Tempo total" aparece (ao invés de "Total time")
- [ ] "Porções" aparece (ao invés de "Servings")
- [ ] Dificuldade: "Fácil", "Médio", ou "Avançado"
- [ ] "Ingredientes" como título da seção
- [ ] "Modo de Preparo" como título da seção
- [ ] "💡 Dica Nutritiva" aparece

### 3.6 Verificar Lista de Compras
- [ ] Título: "Lista de Compras"
- [ ] Data: "Semana de XX de janeiro de XXXX"
- [ ] Categorias em português:
  - [ ] "🥩 Açougue"
  - [ ] "🥬 Hortifruti"
  - [ ] "🥫 Despensa GAPS"
  - [ ] "🫙 Fermentados"
- [ ] Item count: "X de Y itens"
- [ ] Checkbox aria-label: "Marcar como comprado" ou "Desmarcar"
- [ ] "📝 Dicas de Compras" aparece
- [ ] Dicas em português aparecem:
  - [ ] "Verifique a geladeira antes de sair de casa"
  - [ ] "Leve uma lista impressa ou no celular"
  - [ ] "Compre produtos frescos por último"
  - [ ] "Prefira produtos orgânicos quando possível"
  - [ ] "Negocie com o vendedor por descontos em quantidade"

---

## 4️⃣ Testes de Idioma (Inglês)

### 4.1 Mudar para Inglês
- [ ] Clique no botão "🇺🇸 EN" no header
- [ ] URL muda para http://localhost:3000/en-US/
- [ ] Página recarrega com interface em inglês

### 4.2 Verificar todos os textos em Inglês
- [ ] Header: "GAPS Recipes" (ao invés de "Receitas GAPS")
- [ ] Navigation: "Dashboard", "Week", "Shopping" (português não aparece)
- [ ] Dashboard: "Today's Menu"
- [ ] Dias da semana: "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
- [ ] Refeições:
  - [ ] "☕ Breakfast"
  - [ ] "🥤 Morning Snack"
  - [ ] "🍽️ Lunch"
  - [ ] "🍪 Afternoon Snack"
  - [ ] "🌙 Dinner"
- [ ] Modal: "Total time", "Servings", "Ingredients", "Preparation", "💡 Nutrition Tip"
- [ ] Shopping: "Shopping List", "Meat", "Produce", "GAPS Pantry", "Fermented Foods"
- [ ] Tips em inglês aparecem

### 4.3 Verificar receitas em Inglês
- [ ] Clique em uma refeição → modal mostra receita em inglês
- [ ] Todos os ingredientes estão em inglês
- [ ] Instruções estão em inglês
- [ ] Dica nutricional está em inglês

---

## 5️⃣ Testes de Idioma (Espanhol)

### 5.1 Mudar para Espanhol
- [ ] Clique no botão "🇪🇸 ES" no header
- [ ] URL muda para http://localhost:3000/es-ES/
- [ ] Página recarrega com interface em espanhol

### 5.2 Verificar todos os textos em Espanhol
- [ ] Header: "Recetas GAPS"
- [ ] Navigation: "Inicio", "Semana", "Compras"
- [ ] Dashboard: "Menú de Hoy"
- [ ] Dias da semana: "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"
- [ ] Refeições:
  - [ ] "☕ Desayuno"
  - [ ] "🥤 Almuerzo Temprano"
  - [ ] "🍽️ Comida"
  - [ ] "🍪 Merienda"
  - [ ] "🌙 Cena"
- [ ] Modal: "Tiempo total", "Porciones", "Ingredientes", "Preparación", "💡 Consejo Nutricional"
- [ ] Shopping: "Lista de Compras", "Carnes", "Productos", "Despensa GAPS", "Alimentos Fermentados"
- [ ] Tips em espanhol aparecem

### 5.3 Verificar receitas em Espanhol
- [ ] Clique em uma refeição → modal mostra receita em espanhol
- [ ] Todos os ingredientes estão em espanhol
- [ ] Instruções estão em espanhol
- [ ] Dica nutricional está em espanhol

---

## 6️⃣ Testes de Funcionalidade

### 6.1 Persistência de Idioma
- [ ] Selecione Inglês (EN-US)
- [ ] Recarregue a página (F5)
- [ ] ✅ **Esperado**: Continua em inglês (localStorage preserva a escolha)
- [ ] Selecione Espanhol (ES-ES)
- [ ] Recarregue a página
- [ ] ✅ **Esperado**: Continua em espanhol

### 6.2 Troca de Idioma em Tempo Real
- [ ] Em Português, clique em uma refeição para abrir modal
- [ ] Clique em "🇺🇸 EN" enquanto modal está aberto
- [ ] ✅ **Esperado**: Modal fecha e página recarrega em inglês
- [ ] Abra modal novamente
- [ ] ✅ **Esperado**: Todos os textos da receita estão em inglês

### 6.3 Checkboxes e Estado
- [ ] Em Português, marque uma refeição como "feita"
- [ ] Mude para Inglês
- [ ] ✅ **Esperado**: Checkbox continua marcado
- [ ] Mude para Espanhol
- [ ] ✅ **Esperado**: Checkbox ainda está marcado

### 6.4 Lista de Compras
- [ ] Em Português, marque alguns ingredientes na lista de compras
- [ ] Mude para Inglês
- [ ] ✅ **Esperado**: Checkmarks continuam marcados
- [ ] Verificar que os nomes dos ingredientes mudaram para inglês

---

## 7️⃣ Testes de PWA (Progressive Web App)

### 7.1 Instalar app (Chrome/Android)
- [ ] Abra http://localhost:3000/pt-BR/
- [ ] Clique no ícone de instalação no endereço (ou abra menu → "Instalar")
- [ ] Clique "Instalar"
- [ ] ✅ **Esperado**: App instala como PWA

### 7.2 Usar app offline
- [ ] Abra DevTools (F12)
- [ ] Vá para "Network" tab
- [ ] Marque "Offline" checkbox
- [ ] Recarregue a página
- [ ] ✅ **Esperado**: App carrega com dados em cache
- [ ] Mude de idioma (offline)
- [ ] ✅ **Esperado**: Idioma muda corretamente mesmo offline

### 7.3 Verificar Service Worker
- [ ] DevTools → "Application" tab
- [ ] Clique em "Service Workers"
- [ ] ✅ **Esperado**: Service worker está ativo e rodando

---

## 8️⃣ Testes de Performance (Lighthouse)

### 8.1 Verificar performance
- [ ] DevTools → "Lighthouse" tab
- [ ] Rodeia "Generate report"
- [ ] ✅ **Esperado**:
  - [ ] Performance: > 90
  - [ ] Accessibility: > 90
  - [ ] Best Practices: > 85
  - [ ] SEO: > 90
  - [ ] PWA: ✅ Installable

---

## 9️⃣ Testes de Build

### 9.1 Build para produção
```bash
npm run build
npm run start
```
✅ **Esperado**:
- [ ] Build completa sem erros
- [ ] App inicia em http://localhost:3000
- [ ] Todos os testes acima passam em modo produção

### 9.2 Verificar export estático (se aplicável)
- [ ] Sem erros na compilação TypeScript
- [ ] Sem warnings relacionados a falta de traduções

---

## 🔟 Deploy em Railway

### 10.1 Preparar para deploy
```bash
git status  # Verificar que tudo está committed
git log --oneline -5  # Ver últimos commits
```

### 10.2 Deploy (se usando Railway)
```bash
# Pushear para GitHub (já feito)
git push origin main

# Railway automaticamente faz deploy quando faz push para main
# Verificar status em: https://railway.app/
```

### 10.3 Verificar deployment
- [ ] Acesse https://seu-projeto.railway.app/pt-BR/
- [ ] Repita testes de Idioma (seções 3-5)
- [ ] Repita testes de Funcionalidade (seção 6)
- [ ] Teste de Performance em produção

---

## ✅ Checklist Final

- [ ] Todos os 3 idiomas testados e funcionando
- [ ] Persistência de idioma funcionando
- [ ] Receitas aparecem traduzidas nos 3 idiomas
- [ ] PWA instalável e funciona offline
- [ ] Build completa sem erros
- [ ] Deploy em Railway bem-sucedido
- [ ] Performance aceitável (Lighthouse > 90)
- [ ] Nenhuma string "undefined" ou "[object Object]" na UI
- [ ] Todos os emojis de refeições aparecem corretamente

---

## 📝 Notas Importantes

1. **Dados de Teste**: As receitas vêm de seedRecipes.{locale}.json
2. **LocalStorage**: Se quiser limpar dados de teste, abra DevTools:
   ```javascript
   localStorage.clear()
   location.reload()
   ```
3. **Caching**: Se mudanças não aparecem, limpe cache:
   - DevTools → Application → Cache Storage → Delete all
   - Ou use Ctrl+Shift+Delete (Hard Refresh)

---

## 🚀 Próximos Passos Após Testes

✅ Se todos os testes passarem:
1. Deploy confirmado em produção
2. Compartilhar link com usuários: `https://seu-site.com/pt-BR/`
3. Usuários podem escolher idioma em qualquer momento
4. Futuras receitas geradas automaticamente serão em 3 idiomas

❌ Se algum teste falhar:
1. Verificar logs: `npm run build 2>&1 | head -50`
2. Verificar console do navegador (F12)
3. Verificar se arquivos de tradução existem:
   ```bash
   ls -la src/locales/*/common.json
   ls -la src/data/seedRecipes.*.json
   ```

---

**✨ Parabéns por ter implementado internacionalização completa! Seu app agora é acessível em português, inglês e espanhol! 🎉**

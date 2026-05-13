# 🛒 Supermercado Online

Um sistema web completo e moderno de e-commerce de supermercado, desenvolvido com **HTML, CSS e JavaScript puro** - sem dependências externas (exceto Chart.js para gráficos).

## ✨ Características

### 🏪 Loja Online
- ✅ Catálogo completo com 12 produtos padrão
- ✅ Busca em tempo real (nome, descrição, categoria)
- ✅ Filtro por categorias
- ✅ Carrinho de compras funcional
- ✅ Checkout com validação de dados
- ✅ Interface responsiva (mobile, tablet, desktop)

### 📦 Sistema de Pedidos
- ✅ Histórico de pedidos do cliente
- ✅ Rastreamento em tempo real
- ✅ Timeline de status da entrega
- ✅ Atualização automática a cada 10 segundos
- ✅ Estimativa de tempo de entrega

### 🔧 Painel Administrativo
- ✅ Dashboard com estatísticas
- ✅ Gráficos Chart.js (4 tipos diferentes)
- ✅ CRUD completo de produtos
- ✅ Gerenciamento de pedidos
- ✅ Atualização de status de entrega
- ✅ Relatórios de vendas

### 💾 Armazenamento
- ✅ localStorage para persistência de dados
- ✅ Sem necessidade de banco de dados online
- ✅ Compatível com GitHub Pages
- ✅ Dados salvos automaticamente

---

## 📁 Estrutura do Projeto

```
supermercado-online/
├── index.html              # Página principal da loja
├── admin.html             # Painel administrativo
├── pedidos.html           # Página de rastreamento de pedidos
│
├── css/
│   ├── style.css          # Estilos principais
│   ├── admin.css          # Estilos do painel admin
│   └── responsive.css     # Responsividade (mobile/tablet)
│
├── js/
│   ├── database.js        # Camada de dados (localStorage)
│   ├── app.js             # Lógica da loja
│   ├── admin.js           # Lógica do admin
│   ├── delivery.js        # Sistema de rastreamento
│   └── pedidos.js         # Página de pedidos
│
├── data/
│   └── database.json      # Backup/referência de dados
│
├── img/                   # Pasta para imagens
│
└── README.md              # Este arquivo
```

---

## 🚀 Como Usar Localmente

### 1. Clonar ou Baixar o Projeto
```bash
git clone https://github.com/seu-usuario/supermercado-online.git
cd supermercado-online
```

### 2. Abrir no Navegador
Simplesmente abra o arquivo `index.html` no navegador:
- **Windows**: Duplo clique em `index.html`
- **Mac/Linux**: Clique com botão direito > Abrir com > Navegador

Ou use um servidor local:
```bash
# Com Python 3
python -m http.server 8000

# Com Node.js
npx http-server
```

Acesse: `http://localhost:8000`

---

## 🛍️ Recursos da Loja (Cliente)

### Página Principal (`index.html`)
- **Navegação**: Menu superior com logo e carrinho
- **Busca**: Campo de busca em tempo real
- **Categorias**: Filtro por tipo de produto
- **Grid de Produtos**: Exibição com imagem, nome, preço, descrição
- **Carrinho Modal**: Ver itens, ajustar quantidades, remover
- **Checkout Modal**: Formulário com dados pessoais e endereço
- **Notificações**: Mensagens de sucesso/erro

### Funcionalidades
- Adicionar/remover produtos do carrinho
- Ajustar quantidades
- Cálculo automático de subtotal + taxa de entrega (R$ 5,00)
- Validação de formulário
- Menu responsivo em mobile

### Página de Pedidos (`pedidos.html`)
- Histórico de pedidos realizados
- Status atual com progress bar visual
- Timeline de entrega com ícones
- Tempo estimado até entrega
- Detalhes completos do pedido
- Auto-atualização a cada 10 segundos

---

## ⚙️ Recursos do Admin (`admin.html`)

### 1. Dashboard
- Estatísticas gerais:
  - Total de produtos
  - Total de pedidos
  - Total de vendas (R$)
  - Pedidos entregues
- 4 Gráficos interativos (Chart.js):
  - **Vendas por Dia**: Gráfico de linha (últimos 7 dias)
  - **Pedidos por Status**: Gráfico de rosca
  - **Top 5 Produtos**: Gráfico de barras horizontal
  - **Faturamento**: Gráfico de barras

### 2. Gerenciamento de Produtos
- Tabela com todos os produtos
- Adicionar novo produto
- Editar produto existente
- Excluir produto
- Campos: Nome, Categoria, Preço, Estoque, Descrição, URL da Imagem

### 3. Gerenciamento de Pedidos
- Tabela de todos os pedidos
- Filtro por status
- Visualizar detalhes do pedido
- Atualizar status (4 estados)
- Ver itens, cliente, endereço
- Histórico de atualizações

### 4. Relatórios
- Seleção de período
- Geração de relatórios customizados

---

## 💾 Dados e localStorage

### Chaves Armazenadas
- `supermarket_products`: Produtos do catálogo
- `supermarket_orders`: Histórico de pedidos
- `supermarket_cart`: Itens do carrinho atual

### Estrutura do Produto
```json
{
  "id": 1,
  "name": "Maçã Vermelha",
  "category": "Frutas",
  "price": 5.99,
  "description": "Maçã fresca e vermelha",
  "image": "https://images.unsplash.com/...",
  "stock": 50,
  "sales": 12
}
```

### Estrutura do Pedido
```json
{
  "id": 1,
  "customerName": "João Silva",
  "customerPhone": "(11) 99999-9999",
  "customerAddress": "Rua ABC, 123",
  "customerComplement": "Apto 456",
  "items": [ { "productId": 1, "name": "...", "quantity": 2, "price": 5.99 } ],
  "subtotal": 11.98,
  "deliveryFee": 5.00,
  "total": 16.98,
  "status": "preparando",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T11:00:00Z"
}
```

---

## 🎨 Design e Cores

### Paleta de Cores
- **Primária**: #FF6B35 (Laranja)
- **Secundária**: #004E89 (Azul)
- **Sucesso**: #00D084 (Verde)
- **Perigo**: #E63946 (Vermelho)
- **Aviso**: #F77F00 (Laranja-escuro)

### Responsividade
- **Desktop**: > 1024px
- **Tablet**: 768px - 1024px
- **Mobile**: 480px - 768px
- **Small Mobile**: < 480px
- **Landscape**: Ajustes especiais

---

## 📱 Publicar no GitHub Pages

### 1. Criar um Repositório GitHub
```bash
git init
git add .
git commit -m "Inicial: Supermercado Online"
git branch -M main
git remote add origin https://github.com/seu-usuario/supermercado-online.git
git push -u origin main
```

### 2. Habilitar GitHub Pages
1. Vá para **Settings** do repositório
2. Role até **Pages**
3. Selecione `main` como **Source Branch**
4. Selecione `/root` como **folder**
5. Clique em **Save**

### 3. Acessar o Site
- Seu site estará disponível em: `https://seu-usuario.github.io/supermercado-online`
- Pode levar alguns minutos para ficar ativo

---

## 🧪 Teste a Aplicação

### Fluxo de Teste do Cliente
1. Acesse `index.html`
2. Busque por um produto
3. Filtre por categoria
4. Adicione 2-3 produtos ao carrinho
5. Clique no carrinho
6. Ajuste quantidades
7. Clique em "Finalizar Compra"
8. Preencha o formulário
9. Clique em "Confirmar Pedido"
10. Será redirecionado para `pedidos.html`

### Fluxo de Teste Admin
1. Acesse `admin.html`
2. Veja o Dashboard com gráficos
3. Vá para "Produtos" e adicione um novo produto
4. Vá para "Pedidos" e filtre por status
5. Clique em um pedido para ver detalhes
6. Atualize o status do pedido

---

## 🔒 Segurança e Limitações

- **Sem autenticação**: Qualquer um pode acessar o admin (considere adicionar)
- **Dados em localStorage**: Compartilhados por aba/janela
- **Limite de storage**: ~5-10MB por domínio
- **Sem servidor**: Dados não persistem após limpar cache
- **Sem criptografia**: Não use para dados sensíveis de produção

---

## 🐛 Troubleshooting

### Produtos não aparecem
- Abra o DevTools (F12)
- Vá para Console
- Execute: `db.getProducts()`
- Se retornar vazio, execute: `new Database()` para reinicializar

### Dados sumiram
- localStorage foi limpo (CTRL+SHIFT+Delete / Cmd+Shift+Delete)
- Cookies e cache foram apagados
- Navegador está em modo incógnito

### Gráficos não aparecem
- Chart.js não foi carregado do CDN
- Verifique a conexão com internet
- Verifique no DevTools > Network

---

## 🚀 Próximas Melhorias

- [ ] Sistema de autenticação de admin
- [ ] Integração com payment gateway (Stripe, Mercado Pago)
- [ ] Sistema de cupons/promoções
- [ ] Notificações por email
- [ ] Integração com API de CEP
- [ ] Sistema de avaliações de produtos
- [ ] Histórico de campanhas de marketing
- [ ] API backend com Node.js/Python

---

## 📄 Licença

Este projeto é de código aberto e pode ser usado livremente para fins pessoais e comerciais.

---

## 👨‍💻 Desenvolvedor

Criado como um projeto web moderno e completo usando **HTML5, CSS3 e JavaScript ES6+**.

---

## 📧 Suporte

Se encontrar problemas ou tiver sugestões, abra uma **Issue** no GitHub ou entre em contato.

---

**Acesse agora**: [GitHub Pages](https://seu-usuario.github.io/supermercado-online)


# Estudo Bíblico - Website Completo

Um website interativo sobre estudar a Bíblia com recursos educacionais, comunidade e muito mais.

## 📋 Características

- ✅ Design responsivo (Mobile, Tablet, Desktop)
- ✅ Navegação entre diferentes recursos de estudo
- ✅ Versículo do dia com seleção aleatória
- ✅ Busca de versículos
- ✅ Comentários bíblicos
- ✅ Plano de leitura anual
- ✅ Temas bíblicos explorados
- ✅ Dicionário bíblico interativo
- ✅ Comunidade de discussão
- ✅ Formulário de contato com EmailJS integrado
- ✅ Animações suaves e transições

## 📁 Estrutura de Arquivos

```
EstudoBiblico/
├── index.html                 # Página principal
├── busca-versiculos.html      # Busca de versículos
├── comentarios.html           # Comentários bíblicos
├── plano-leitura.html         # Plano de leitura anual
├── temas-biblicos.html        # Temas da Bíblia
├── dicionario-biblico.html    # Dicionário bíblico
├── comunidade.html            # Comunidade de estudo
├── style.css                  # Estilos globais
├── script.js                  # Funcionalidades JavaScript
└── README.md                  # Este arquivo
```

## 🚀 Como Usar

### 1. Abrir o Site Localmente

#### Opção A: Arrastar e Soltar
1. Abra seu navegador (Chrome, Firefox, Edge, Safari)
2. Vá até a pasta `EstudoBiblico`
3. Arraste o arquivo `index.html` para a janela do navegador

#### Opção B: Clique Duplo
1. Navegue até a pasta `EstudoBiblico`
2. Clique duas vezes em `index.html`
3. O site abrirá no seu navegador padrão

#### Opção C: VS Code Live Server (Recomendado)
1. Instale a extensão "Live Server" no VS Code
2. Clique com o botão direito em `index.html`
3. Selecione "Open with Live Server"
4. O site abrirá em `http://localhost:5500`

### 2. Configurar EmailJS (Para o Formulário de Contato)

O formulário de contato usa EmailJS para enviar emails de verdade. Siga os passos:

#### A. Criar uma Conta EmailJS
1. Acesse [emailjs.com](https://www.emailjs.com)
2. Clique em "Sign Up"
3. Crie sua conta gratuitamente

#### B. Configurar Serviço de Email
1. No painel EmailJS, vá para "Email Services"
2. Clique em "Connect New Service"
3. Escolha seu provedor de email (Gmail, Outlook, etc.)
4. Siga as instruções para conectar

#### C. Criar Template de Email
1. Vá para "Email Templates"
2. Clique em "Create New Template"
3. Crie um template com os seguintes campos:
   - `from_name` - Nome do visitante
   - `from_email` - Email do visitante
   - `message` - Mensagem enviada
   - `to_email` - Seu email de recebimento

**Exemplo de template:**
```
Novo contato de: {{from_name}}
Email: {{from_email}}

Mensagem:
{{message}}

---
Enviado de: EstudoBiblico
```

#### D. Obter as Chaves
1. Vá para "Account" → "API"
2. Copie sua **Public Key**
3. Vá para "Email Services" e copie seu **Service ID**
4. No template, copie o **Template ID**

#### E. Atualizar script.js
1. Abra `script.js`
2. Procure pela linha: `emailjs.init('YOUR_PUBLIC_KEY');`
3. Substitua `'YOUR_PUBLIC_KEY'` pela sua chave pública
4. Procure pela linha: `emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)`
5. Substitua:
   - `'YOUR_SERVICE_ID'` pelo seu Service ID
   - `'YOUR_TEMPLATE_ID'` pelo seu Template ID
6. Na mesma função, atualize: `to_email: 'seu-email@gmail.com'` com seu email

**Exemplo completo:**
```javascript
emailjs.init('pk_123abc456def789'); // Sua chave pública

// Na função submitForm:
emailjs.send('service_xyz123', 'template_abc123', {
    from_name: name,
    from_email: email,
    message: message,
    to_email: 'seu-email@gmail.com'
})
```

## 🎨 Personalização

### Cores
As cores principais estão em `style.css`:
- Roxo Principal: `#667eea`
- Roxo Secundário: `#764ba2`
- Dourado de Destaque: `#ffd700`
- Cinza de Texto: `#333`

Para mudar, procure por esses valores em `style.css` e substitua.

### Conteúdo
Todos os versículos, temas e comentários podem ser editados:
- `script.js` - Versículos do dia
- `busca-versiculos.html` - Banco de versículos
- `comentarios.html` - Comentários bíblicos
- `temas-biblicos.html` - Temas explorados
- `dicionario-biblico.html` - Palavras do dicionário

## 📱 Responsividade

O site é totalmente responsivo e funciona em:
- ✅ Desktop (1920px+)
- ✅ Tablet (768px - 1024px)
- ✅ Mobile (até 480px)

## 🔐 Segurança com EmailJS

- A Public Key pode ser visível (é pública)
- O Service ID é seguro neste contexto
- Para produção, considere usar um backend para ocultar sensíveis

## 🐛 Resolução de Problemas

### EmailJS não funciona
1. Verifique se as chaves estão corretas em `script.js`
2. Confirme que o template existe no EmailJS
3. Verifique o console (F12 → Console) para ver mensagens de erro

### Páginas não carregam
1. Verifique se todos os arquivos HTML estão na mesma pasta
2. Certifique-se de que os nomes dos arquivos correspondem aos links

### Versículos não aparecem
1. Abra o console (F12) e procure por erros
2. Verifique se `script.js` foi carregado corretamente

## 📚 Recursos Adicionais

Para expandir o site:
- Adicione mais versículos em `verses` array em `script.js`
- Crie mais páginas seguindo o padrão dos arquivos existentes
- Integre uma API de Bíblia real (como BibleAPI)
- Adicione um backend para persistência de dados

## 📄 Licença

Este projeto é livre para uso educacional e pessoal.

## 📞 Suporte

Para dúvidas sobre EmailJS, visite: https://www.emailjs.com/docs/

---

**Última atualização:** Dezembro de 2025
**Versão:** 1.0

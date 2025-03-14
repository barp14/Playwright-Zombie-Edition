## 🤘 Sobre

Repositório do projeto de testes automatizados do sistema Zombie Plus, construído no curso Playwright Zombie Edition! 

## 💻 Tecnologias
- Node.js
- Playwright
- Javascript
- Faker
- PostgreSQL
- Docker

## 🤖 Como executar

1. Clonar o repositório, instalar as dependências
```
npm install
```

2. Executar testes em Headless
```
npx playwright test 
```

3. Executar ver o relatório dos testes
```
npx playwright show-report
```

## 💭 Aprendizados interessantes

### Conteinerização das imagens do banco de dados utilizando Docker
- Utilizando Docker para gerenciar a instância do banco de dados dentro do meu ambiente pessoal;
- PostegreSQL com Docker Compose.

### Uso de encapsulamento e Page Object
- A "POO" de casos de teste;
- Sempre buscar o encapsulamento do maior número de funções possíveis para o Page Object;
- Page Object deve seguir a risca a hierarquia de páginas;
- Sempre buscar utilizar ganchos.

### XPath
- CSS Selector com Regex;
- Compreensão da melhor forma de interagir com algum elemento HTML;
- A melhor interação nem sempre é com XPath (pelo menos no caso do Playwright).

### Conexão com banco de dados
- Gerenciar as massas de teste para não deixar um teste dependente do outro.

### Inteligência artificial
- Como e porque utilizar a IA na automação de testes.
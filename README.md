# Sistema de Gerenciamento de Tarefas Simples

O Sistema de Gerenciamento de Tarefas Simples é uma aplicação web que permite o controle de tarefas. Os usuários podem adicionar, editar e excluir tarefas. Este README fornece instruções detalhadas sobre como configurar, executar e utilizar o projeto.

## Tecnologias Utilizadas

**Backend:**
- Java com Spring
- Banco de Dados MySQL

**Frontend:**
- React com Redux e Saga

## Configuração do Banco de Dados

Certifique-se de ter o MySQL instalado.

No projeto backend, acesse a pasta "resources" e edite o arquivo "application.properties". Altere a senha do banco de dados para corresponder à senha do MySQL que você está usando. O nome do banco de dados deve ser "task_manager".

## Inicialização do Projeto

### Backend

No projeto backend, siga estas etapas:

1. Execute o código do projeto Java.

### Frontend

No projeto frontend, siga estas etapas:

1. Abra o terminal na pasta do frontend.
2. Execute o comando `npm install` para instalar todas as dependências.
3. Após a conclusão da instalação, execute `npm start` para iniciar o servidor frontend.

## Funcionalidades do Site

### Gerenciamento de Tarefas

- **Listagem de Tarefas:** Visualize todas as tarefas na página inicial.
- **Adicionar Tarefa:** Adicione uma nova tarefa, incluindo a opção de adicionar uma imagem.
- **Editar Tarefa:** Atualize as informações de uma tarefa, incluindo a opção de adicionar ou alterar a imagem.
- **Deletar Tarefa:** Exclua tarefas.

### Funcionalidades Adicionais

- **Visualização de Imagem da Tarefa:** Na página inicial, cada tarefa possui um botão que permite abrir a imagem associada à tarefa.

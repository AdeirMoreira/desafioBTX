# 🚗 Desafio BTX 🏍

Um projeto full-stack de app single page ToDo List. É possível cadastrar um projeto e registrar as tarefas que deve ser realizadas, assim como um prazo e se elas foram concluídas ou não. Também é possível editar e deltar tarefas e projetos. O Projeto foi desenvolvido com Vue JS no front e com node JS no back-end, além do banco de dados MySQL.

##  📸 Screenshots do site

<p  align="center">
    <img src="https://user-images.githubusercontent.com/98994187/203871490-413101e1-f5e8-489e-8bd2-d4e0228c1cf4.png" width="800" height="400">
<p/>

## 🛠 Tecnologias

- [Vue](https://vuejs.org/guide/quick-start.html)
- [Pinia](https://pinia.vuejs.org/)
- [Node](https://nodejs.org/en/docs/)
- [MySQL](https://www.mysql.com/)

## ✔ Features 

- Ver todos os Projetos
- Cadastrar um Projeto
- Deletar um Projeto
- Ver todas as Tarefas de um Projeto
- Cadastrar uma Tarefa em um Projeto
- Editar uma Tarefa de um Projeto
- Excluir uma Tarefa

## 🎲 Modelagem do Banco de dados

Duas tabelas Project e Tasks ligadas por uma relação de 1 para muitos em que um projeto pode ter varias tarefas por meio uma Foreigen Key (projectId) na tabela Tasks que referencia o id do projeto da tablea Project.

 ### → Projet 
- id(varchar) 
- name(varchar) 
- description(text) 
- createdAt(timestamp) 
- updatedAt(datetime)

### → Task
- id(varchar) 
- name(varchar) 
- description(text) 
- completed(boolean)
- deadLine(date)
- createdAt(timestamp) 
- updatedAt(datetime)
- projectId(varchar) FK

<p  align="center">
    <img src="https://user-images.githubusercontent.com/98994187/203871574-3c83dc92-e776-443e-8cee-64f3f222dba7.png" width="300" height="200">
<p/>

## 🔛 Rodando o Projeto

### ❗⚠ Pre-Requisitos 

- [Node](https://nodejs.org/en/docs/) instalado na sua maquina.
- Um banco de dados [MySQL](https://www.mysql.com/).
- [Docker](https://www.docker.com/) (OPCIONAL)

### ⬇ Baixar

```
git clone https://github.com/AdeirMoreira/desafioBTX.git
```

### 🍲 Preparando o ambiente

```
cd desafioBTX/back-end/
```

Renomeie o arquivo ```.env.example``` para ```.env``` e altere as variáveis com seus dados do banco de dados MySQL.

### 🗃 Banco de dados - Docker 🐳

Se você for usar o seu banco de dados MySQL, basta alterar as variaveis de ambiente no arquivo .env com seu dados. Entretanto, se você não tem ou não quer usar o seu banco de dados e tiver o docker instalado em sua maquina, poderá subir um container docker com um banco de dados MySQL para usar no back-end.

Para subir o container com o banco de dados MySQL, renomeie o arquivo ```.env.example``` para ```.env```, caso ainda não tenha feito, depois dê o seguinte comando:

```
docker compose up
```

### 🖥 Instalar

- Back-End 

```
npm i
npm run migration:run
npm run dev
```

- Front-End 

```
cd desafioBTX/front-end
npm i
npm run dev
```

## 🔗 O site abrirá no link [To Do APP](http://localhost:5173/)



## 👨‍💻 Desenvolvedor
<table>         
<td><a href="https://github.com/future4code/silveira-Adeir-Maia"><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/98994187?v=4" width="100px;" alt="Imagem profile Adeir Moreira desenvolvedor"/><br /><sub><b>Adeir Moreira</b></sub></a><br />   
</table>

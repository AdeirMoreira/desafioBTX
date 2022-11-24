# 🚗 DESAFIO BTX 🏍

Um projeto full-stack de app single page ToDo List. É possível cadastrar um projeto e registrar as tarefas que deve ser realizadas, assim como um prazo e se elas foram concluídas ou não. Também é possível editar e deltar tarefas e projetos. O Projeto foi desenvolvido com Vue JS no front e com node JS no back-end, além do banco de dados MySQL.

##  📸 Screenshots do site

<  align="center">
    <img src="" width="500" height="400">
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

## 🔛 Rodando o Projeto

### ❗⚠ Pre-Requisitos 

- [Node](https://nodejs.org/en/docs/) instalado na sua maquina.
-  Um banco de dados [MySQL](https://www.mysql.com/).

### 🍲 Preparando o ambiente

Renomeie o arquivo ```.env.example``` para ```.env``` e preencha as variáveis com seus dados do banco de dados MySQL. É muito importante para a execução do servidor.

### ⬇ Baixar

```
git clone https://github.com/AdeirMoreira/desafioBTX.git
```

### 🖥 Instalar

- Back-End 

```
cd back-end 
npm i
npm run dev
```

- Front-End 

```
cd ../
cd front-end
npm i
npm run dev
```

O Front-End abrirá no seu [localhost](http://localhost:5173/) na porta 5173.

O link base da API abrira em [localhost](http://localhost:3003/).

## 👨‍💻 Desenvolvedor
<table>         
<td><a href="https://github.com/future4code/silveira-Adeir-Maia"><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/98994187?v=4" width="100px;" alt="Imagem profile Adeir Moreira desenvolvedor"/><br /><sub><b>Adeir Moreira</b></sub></a><br />   
</table>
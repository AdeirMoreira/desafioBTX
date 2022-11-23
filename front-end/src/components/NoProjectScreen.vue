<script></script>

<template>
	<div class="no-task-screen">
        <div class="message-container">
            <img src="../assets/resources/verified.png" alt="Icone de prancheta"/>
            <p class="big-paragraph">Sem tarefas</p>
            <p class="small-paragraph">Adcione uma tarefa ao projeto</p>
        </div>
    </div>
</template>

<style>
.no-task-screen {
    display: flex;
    flex-direction: column;
    background-color: white;
    height: 100%;
    justify-content: center;
    align-items: center;
}

.message-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.message-container img {
    width: 5em;
    height: 5em;
}

.big-paragraph {
    font-size: 3em;
    font-weight: 700;
}

.small-paragraph {
    font-size: 2em;
    font-weight: 700;
}
</style>

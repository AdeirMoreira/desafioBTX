<script setup>
import ToDoAppHeander from "./components/ToDoAppHeaader.vue";
import ProjetsList from "./components/ProjectsList.vue";
import NoTaskScreen from "./components/NoProjectScreen.vue";
import TasksTable from "./components/TasksTable.vue";
import CreateTaskScreen from "./components/CreateTaskScreen.vue";
import CreateProjectScreen from "./components/CreateProjectScreen.vue";
</script>

<script>
import axios from 'axios'
import { useProjectStore } from "./stores/projects";
import { storeToRefs } from "pinia";
export default {
	name: "App",
	data() {
		return {
			displayCreateProjectScreen: false,
			displayCreateTaskScreen: false,
		};
	},
};
</script>

<template>
	<header>
		<ToDoAppHeander />
	</header>

	<main>
		<section class="add-projects">
			<h2>Projetos</h2>
			<button
				class="add-button"
				@click="displayCreateProjectScreen = !displayCreateProjectScreen"
			>
				<img src="./assets/resources/plus.png" alt="icone de +" />
			</button>
		</section>
		<section class="add-tasks">
			<h2>Tarefas</h2>
			<button class="add-button" @click="displayCreateTaskScreen = !displayCreateTaskScreen">
				<img src="./assets/resources/plus.png" alt="icone de +" />
			</button>
		</section>
		<section class="projects">
			<ProjetsList />
		</section>
		<section class="tasks">
			<!-- <NoTaskScreen/> -->
			<TasksTable/>
		</section>
		<CreateProjectScreen
			v-if="displayCreateProjectScreen"
			@close="displayCreateProjectScreen = !displayCreateProjectScreen"
		/>
		<CreateTaskScreen
			v-if="displayCreateTaskScreen"
			@close="displayCreateTaskScreen = !displayCreateTaskScreen"
		/>
	</main>
</template>

<style scoped>
main {
	flex-grow: 1;
	flex-basis: auto;
	background-color: rgb(220, 220, 220);
	display: grid;
	gap: 0.5em;
	padding: 0.5em;
	grid-template:
		"add-projects add-tasks" 1fr
		"projects tasks" 7fr
		/ 1fr 4fr;
}

.add-projects {
	grid-area: add-projects;
	background-color: white;
	display: flex;
	align-items: center;
	flex-direction: row;
	justify-content: space-between;
	padding: 1em;
}

.add-tasks {
	grid-area: add-tasks;
	background-color: white;
	display: flex;
	align-items: center;
	flex-direction: row;
	justify-content: space-between;
	padding: 1em;
}

.projects {
	grid-area: projects;
	background-color: white;
	display: flex;
	flex-direction: column;
	gap: 0.5em;
	padding: 0.5em;
}

.tasks {
	grid-area: tasks;
	background-color: white;
}

h2 {
	font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
	color: white;
	font-size: 2em;
	font-weight: 700;
	color: rgb(0, 153, 102);
}

.add-button {
	background-color: transparent;
	border: none;
}

img {
	height: 3em;
	width: 3em;
}
</style>

<script>
import { storeToRefs } from "pinia";
import { useProjectStore } from "../stores/projects";
import { useTasksStore } from "../stores/tasks";
import axios from "axios";

export default {
	name: "App",
	data() {
		return {
			select: "",
		};
	},
	setup() {
		const taskStore = useTasksStore();
		const projectStore = useProjectStore();
		const { getTasks } = storeToRefs(taskStore);
		const { projectSelectedId, deletedProjectId } = storeToRefs(projectStore);
		const { removeTask, setTasks, removeAllTasksByProject } = taskStore;
		return {
			getTasks,
			removeTask,
			projectSelectedId,
			setTasks,
			deletedProjectId,
			removeAllTasksByProject,
		};
	},
	watch: {
		projectSelectedId() {
			this.requestGetTasksByProject();
		},
		deletedProjectId() {
			this.removeAllTasksByProject(this.deletedProjectId);
		},
	},
	methods: {
		openEditFields(id) {
			this.select = id;
		},
		closeEditFields(task) {
			this.select = "";
			this.requestUpdateTask(task);
		},
		requestGetTasksByProject() {
			axios
				.get(`http://localhost:3003/task/project/${this.projectSelectedId}`)
				.then((res) => {
					this.setTasks(res.data);
				})
				.catch((error) => {
					console.log(error.response);
				});
		},
		deleteTask(id) {
			this.removeTask(id);
			this.requestDeleteTask(id);
		},
		requestDeleteTask(id) {
			axios
				.delete(`http://localhost:3003/task/${id}`)
				.then((res) => {
					console.log(res.data);
				})
				.catch((error) => {
					console.log(error.response);
				});
		},
		requestUpdateTask(task) {
			axios
				.patch(`http://localhost:3003/task/${task.id}`, task)
				.then((res) => console.log(res.data))
				.catch((error) => console.log(error));
		},
	},
};
</script>

<template>
	<div class="no-task-screen" v-if="getTasks.length === 0">
		<div class="message-container">
			<img src="../assets/resources/verified.png" alt="Icone de prancheta" />
			<p class="big-paragraph">Sem tarefas</p>
			<p class="small-paragraph">Adcione uma tarefa ao projeto</p>
		</div>
	</div>

	<table class="task-table" v-if="getTasks.length !== 0">
		<thead class="task-table-title">
			<tr>
				<th class="font text-cell">
					<span>Nome</span>
				</th>
				<th class="font text-cell">
					<span>Descrição</span>
				</th>
				<th class="font date-cell">
					<span>Prazo</span>
				</th>
				<th class="font checkbox-cell">
					<span>Tarefa Concluída</span>
				</th>
				<th class="font button-cell">
					<span>Editar</span>
				</th>
				<th class="font button-cell">
					<span>Excluir</span>
				</th>
			</tr>
		</thead>
		<tbody class="task-table-body">
			<tr v-for="task in getTasks" :key="task.id">
				<th class="text-cell">
					<p class="font" v-if="select !== task.id">{{ task.name }}</p>
					<input class="input-text" v-if="select === task.id" v-model="task.name" />
				</th>
				<th class="text-cell">
					<p class="font" v-if="select !== task.id">{{ task.description }}</p>
					<input v-if="select === task.id" v-model="task.description" />
				</th>
				<th class="date-cell">
					<p class="font" v-if="select !== task.id">
						{{ task.deadLine.split("-").reverse().join("/") }}
					</p>
					<input type="date" v-if="select === task.id" v-model="task.deadLine" />
				</th>
				<th
					:class="{
						'checkbox-cell': true,
						completed: task.completed,
						uncompletd: !task.completed,
					}"
				>
					<p class="font" v-if="select !== task.id">
						{{ task.completed ? "Concluída" : "Pendente" }}
					</p>
					<input type="checkbox" v-model="task.completed" v-if="select === task.id" />
				</th>
				<th class="button-cell">
					<button @click="openEditFields(task.id)" v-if="select !== task.id">
						<img src="../assets/resources/edit.png" alt="Icone de pincel" />
					</button>
					<button @click="closeEditFields(task)" v-if="select === task.id">
						<img src="../assets/resources/tickIcon.png" alt="Icone de tick" />
					</button>
				</th>
				<th class="button-cell">
					<button @click="deleteTask(task.id)">
						<img src="../assets/resources/delete.png" alt="Icone de lixeira" />
					</button>
				</th>
			</tr>
		</tbody>
	</table>
</template>

<style scoped>
.task-table {
	width: 100%;
}

.font {
	font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
	font-weight: 700;
}

.task-table-title {
	background-color: rgb(0, 153, 102);
	font-size: 1.3em;
	color: white;
}

.text-cell {
	width: 25%;
}
.date-cell {
	width: 20%;
}
.completed {
	background-color: rgb(0, 193, 102);
	color: white;
	
}
.uncompletd {
	background-color: darkorange;
}
.checkbox-cell {
	width: 15%;
}
.button-cell {
	width: 7.5%;
}
.task-table-body {
	background-color: rgb(220, 220, 220);
}
th input {
	width: 100%;
}
button {
	background-color: transparent;
	border: none;
}

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
	font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
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

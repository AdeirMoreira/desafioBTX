<script>
import { storeToRefs } from "pinia";
import { useProjectStore } from "../stores/projects";
import { useTasksStore } from "../stores/tasks";
import { v4 as uuid } from "uuid";
import axios from "axios";

export default {
	name: "App",
	data() {
		return {
			name: "",
			description: "",
			deadLine: "",
			completed: false,
		};
	},

	methods: {
		closeScreen() {
			if (this.name !== "" && this.description !== "" && this.deadLine !== "") {
				this.$emit("close");
				const id = uuid();
				this.requestCreateTask({
					id,
					name: this.name,
					description: this.description,
					deadLine: this.deadLine,
					completed: this.completed,
					projectId: this.projectSelectedId,
				});
				this.addTask({
					id,
					name: this.name,
					description: this.description,
					deadLine: this.deadLine.split("-").reverse().join("/"),
					completed: this.completed,
				});
			}
		},
		requestCreateTask(task) {
			axios
				.post(`http://localhost:3003/task`, task)
				.then((res) => {
					console.log(res.data);
				})
				.catch((error) => console.log(error));
		},
	},

	setup() {
		const taskstore = useTasksStore();
		const projectStore = useProjectStore();
		const { addTask } = taskstore;
		const { projectSelectedId } = storeToRefs(projectStore);
		return {
			addTask,
			projectSelectedId,
		};
	},
};
</script>

<template>
	<div class="create-task-screen">
		<div class="input-container">
			<div class="window-title">
				<span>Tarefa</span>
				<button class="close-screen-button" @click="closeScreen()">
					<img src="../assets/resources/tickIcon.png" alt="Icone de tick" />
				</button>
			</div>
			<div class="inputs-area">
				<p>Nome</p>
				<input type="text" v-model="name" />
				<p>Descrição</p>
				<input type="text" v-model="description" />
				<p>Prazo</p>
				<input type="date" v-model="deadLine" />
			</div>
		</div>
	</div>
</template>

<style scoped>
.create-task-screen {
	width: 100vw;
	height: 100vh;
	position: fixed;
	top: 0px;
	left: 0px;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
}

.input-container {
	display: flex;
	flex-direction: column;
	background-color: white;
}

.window-title {
	width: 50em;
	background-color: rgb(0, 153, 102);
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 1em;
}

.window-title span {
	font-size: 3em;
	color: white;
}

.window-title img {
	height: 3.5em;
	width: 3.5em;
}
.inputs-area {
	display: flex;
	flex-direction: column;
	gap: 1em;
	padding: 1em;
}

.inputs-area p {
	font-size: 2em;
	font-weight: 700;
}

.close-screen-button {
	background-color: transparent;
	border: none;
}
.inputs-area input {
	font-size: 1.5em;
	padding: 1em;
}
</style>

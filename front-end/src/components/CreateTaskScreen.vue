<script>
import { useTasksStore } from "../stores/tasks";

export default {
	name: "App",
	data() {
		return {
			name: "",
			description: "",
			deadline: "",
			completed: false,
		};
	},

	methods: {
		closeScreen() {
			if (this.name !== "" && this.description !== "" && this.deadline !== "") {
				this.$emit("close");
				const id = Date.now();
				this.deadline = this.deadline.split("-").reverse().join("/");
				this.addTask({
					id,
					name: this.name,
					description: this.description,
					deadline: this.deadline,
					completed: this.completed,
				});
			}
		},
	},

	setup() {
		const store = useTasksStore();
		const { addTask } = store;
		return {
			addTask,
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
				<input type="date" v-model="deadline" />
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

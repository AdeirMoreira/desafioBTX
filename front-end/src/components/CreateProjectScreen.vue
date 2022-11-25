<script>
import { useProjectStore } from "../stores/projects";
import axios from "axios";
import {v4 as uuid } from 'uuid'

export default {
	name: "App",
	data() {
		return {
			name: "",
			description: "",
		};
	},

	methods: {
		closeScreen() {
			if (this.name !== "" && this.description !== "") {
				this.$emit("close");
				const id = uuid();
				this.requestCreateProject({ id, name: this.name, description: this.description });
				this.addProject({ id, name: this.name, description: this.description });
			}
		},
		requestCreateProject(project) {
			axios
				.post(`http://localhost:3003/project`, project)
				.then((res) => {
					console.log(res.data);
				})
				.catch((error) => {
					console.log(error);
				});
		},
	},

	setup() {
		const store = useProjectStore();
		const { addProject } = store;
		return {
			addProject,
		};
	},
};
</script>

<template>
	<div class="create-task-screen">
		<div class="input-container">
			<div class="window-title">
				<span>Projeto</span>
				<button @click="closeScreen()">
					<img src="../assets/resources/tickIcon.png" alt="Icone de tick" />
				</button>
			</div>
			<div class="inputs-area">
				<p>Nome</p>
				<input v-model="name" type="text" />
				<p>Descrição</p>
				<input v-model="description" type="text" />
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

.window-title button {
	background-color: transparent;
	border: none;
}

.window-title img {
	width: 3.5em;
	height: 3.5em;
}

.window-title span {
	font-size: 3em;
	color: white;
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

.inputs-area input {
	font-size: 1.5em;
	padding: 1em;
}
</style>

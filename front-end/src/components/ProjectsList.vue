<script>
import { storeToRefs } from "pinia";
import { useProjectStore } from "../stores/projects";
import axios from "axios";

export default {
	name: "App",
	data() {
		return {
			selected: "",
			classVar: "project-container",
		};
	},
	setup() {
		const store = useProjectStore();
		const { getProjects } = storeToRefs(store);
		const { removeProject, setAllProjects, setProjectSelected } = store;
		return {
			getProjects,
			removeProject,
			setAllProjects,
			setProjectSelected,
		};
	},
	methods: {
		deleteProject(id) {
			this.requestDeleteProject(id);
			this.removeProject(id);
		},

		requestGetAllProjects() {
			axios
				.get("http://localhost:3003/project")
				.then((res) => {
					this.setAllProjects(res.data);
				})
				.catch((error) => {
					console.log(error.response);
				});
		},
		requestDeleteProject(id) {
			axios
				.delete(`http://localhost:3003/project/${id}`)
				.then((res) => {
					console.log(res.data);
				})
				.catch((error) => {
					console.log(error.data);
				});
		},
	},
	watch: {
		selected() {
			this.setProjectSelected(this.selected);
		},
	},
	created() {
		this.requestGetAllProjects();
	},
};
</script>

<template>
	<section class="project-section" v-for="project in getProjects">
		<div
			:class="{
				'project-container': true,
				'project-container-selected': selected === project.id,
			}"
			:key="project.id"
			@click="selected = project.id"
		>
			<p class="project-name">{{ project.name }}</p>
		</div>
		<button
			:class="{ 'project-container-selected': selected === project.id }"
			@click="deleteProject(project.id)"
			type="button"
		>
			<img src="../assets/resources/delete.png" alt="icone de lixeira" />
		</button>
	</section>
</template>

<style scoped>
.project-section {
	display: flex;
	flex-direction: row;
	width: 100%;
	justify-content: space-between;
	background-color: rgb(220, 220, 220);
}
.project-container {
	background-color: rgb(220, 220, 220);
	padding: 0.5em 0 0.5em 0.5em;
	width: 100%;
}

.project-container-selected {
	background-color: rgb(0, 153, 102);
}
.project-name {
	margin: 0;
	font-size: 2em;
	color: black;
}

button {
	background-color: transparent;
	border: none;
	margin: 0;
	padding: 0.5em 0.5em 0.5em 0;
}
</style>

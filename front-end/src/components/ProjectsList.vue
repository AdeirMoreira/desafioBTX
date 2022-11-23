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
			setProjectSelected
		};
	},
	methods: {
		requestGetAllProjects() {
			axios
				.get("http://localhost:3003/project")
				.then((res) => {
					this.setAllProjects(res.data);
				})
				.catch((error) => {
					console.log(error);
				});
		},
	},
	watch: {
		selected() {
			this.setProjectSelected(this.selected)
		},
	},
	created() {
		this.requestGetAllProjects();
	},
};
</script>

<template>
	<section
		v-for="project in getProjects"
		:class="{
			'project-container': true,
			'project-container-selected': selected === project.id,
		}"
		:key="project.id"
		@click="selected = project.id"
	>
		<p class="project-name">{{ project.name }}</p>
		<button @click="removeProject(project.id)">
			<img src="../assets/resources/delete.png" alt="icone de lixeira" />
		</button>
	</section>
</template>

<style scoped>
.project-container {
	background-color: rgb(220, 220, 220);
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	padding: 1em;
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
}
</style>

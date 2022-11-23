<script>
import { storeToRefs } from "pinia";
import { useTasksStore } from "../stores/tasks";

export default {
	name: "App",
	data() {
		return {
			select: "",
		};
	},
	setup() {
		const store = useTasksStore();
		const { getTasks } = storeToRefs(store);
		const { removeTask } = store;
		return {
			getTasks,
			removeTask,
		};
	},
	methods: {
		openEditFields(id) {
			this.select = id;
		},
		closeEditFields(task) {
			this.select = "";
			task.deadline = task.deadline.split("-").reverse().join("/");
		},
	},
};
</script>

<template>
	<table class="task-table">
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
					<p class="font" v-if="select !== task.id">{{ task.deadline }}</p>
					<input type="date" v-if="select === task.id" v-model="task.deadline" />
				</th>
				<th class="checkbox-cell">
					<p class="font" v-if="select !== task.id">
						{{ task.completed ? "concluída" : "pendente" }}
					</p>
					<input type="checkbox" v-model="task.completed" v-if="select === task.id" />
				</th>
				<th class="button-cell">
					<Button @click="openEditFields(task.id)" v-if="select !== task.id">
						<img src="../assets/resources/edit.png" alt="Icone de pincel" />
					</Button>
					<Button @click="closeEditFields(task)" v-if="select === task.id">
						<img src="../assets/resources/tickIcon.png" alt="Icone de tick" />
					</Button>
				</th>
				<th class="button-cell">
					<button @click="removeTask(task.id)">
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
</style>

<script>
</script>

<template>
	<section class="header-Container">
		<div class="title" >
			<img src="../assets/resources/tickIcon.png"/>
			<h1>ToDo App</h1>
		</div>
		<p class="subtitle">Anote tudo, não esqueça nada</p>
	</section>
</template>

<style>
.header-Container {
	background-color: rgb(0, 153, 102);
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    padding: 1em;
}

.title {
    display: flex;
    flex-direction: row;
    gap: 1em;
    align-items: center;
}

h1 {
    font-size: 3em;
    margin: 0;
    color: white;
    font-weight: 700;
}

img {
    width: 2.3em;
    height: 2.3em;
}
.subtitle {
    margin: 0;
    color: white;
    font-size: 1.5em;
    font-weight: 500;
}

</style>

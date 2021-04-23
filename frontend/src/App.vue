<template>
	<div id="nav">
		<router-link to="/"><h2>Home</h2></router-link>
		<span>Currently in: {{ currentPlace }}</span>
	</div>
	<router-view />
</template>

<script>
export default {
	name: "App",
	data() {
		return {
			currentPlace: ""
		};
	},
	mounted() {		
	},
	watch: {
		$route(to) {
			let current = to.fullPath;
			// Formatting nicely
			current = current.substring(1); //hi hello

			this.currentPlace = current;
		}
	}
};
</script>


<style>
body {
	background-color: #222;
	color: white;
}
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
}

#nav {
	padding: 30px;
}

#nav a {
	font-weight: bold;
}

#nav a.router-link-exact-active {
	color: #42b983;
}
</style>

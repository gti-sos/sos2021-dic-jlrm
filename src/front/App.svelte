<script>
	import Router from 'svelte-spa-router';

	import Landing from './Landing.svelte';
	import DeathStatsHome from './DeathStatsGUI/DeathStatsTable.svelte';
	import DeathStatsEdit from './DeathStatsGUI/DeathStatEdit.svelte';
	import NotFound from './NotFound.svelte';
	import Info from './Info.svelte';


	const routes = {
		"/": Landing,
		"/death-stats": DeathStatsHome,
		"/death-stats/:province": DeathStatsEdit,
		"/info": Info,
		"*": NotFound
	};

</script>

<main>
	<Router {routes} />
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
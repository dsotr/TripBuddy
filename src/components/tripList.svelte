<script>
	import Trip from '../components/trip.svelte';

	let { trips } = $props();
</script>

<div class="container">
	<ul>
		{#each trips as trip}
			<Trip {trip} />
			<!-- <li>{trip.name} - {trip.destination} - {trip.start_date} - {trip.end_date}</li> -->
		{/each}
	</ul>

	<a href="#" class="btn">New Trip</a>
</div>

<style>
	.container {
		background-color: var(--light-color);
		padding: 3rem;
		display: flex;
		flex-direction: column;
		/* align-items: center; */
		gap: 1rem;
	}
</style>

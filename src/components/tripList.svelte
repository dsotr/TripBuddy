<script>
	import Trip from '../components/trip.svelte';

	let { trips } = $props();
</script>

<ul>
	{#each trips as trip}
		<Trip {trip} />
		<!-- <li>{trip.name} - {trip.destination} - {trip.start_date} - {trip.end_date}</li> -->
	{/each}
</ul>

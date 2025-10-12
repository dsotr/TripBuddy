<script>
	import Hero from '../components/hero.svelte';
	import Trip from '../components/trip.svelte';
	let { data } = $props();
	console.log(data);
</script>

<!-- <h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p> -->

<Hero />

<h1>Documents from Supabase</h1>

<ul>
	{#each data.trips as trip}
		<Trip {trip} />
		<!-- <li>{trip.name} - {trip.destination} - {trip.start_date} - {trip.end_date}</li> -->
	{/each}
</ul>

<p>{data.docs.length} documents found</p>
<ul>
	{#each data.docs as d}
		<li>{d.type}; {JSON.stringify(d.details)}</li>
	{/each}
</ul>
<p>No more documents...</p>

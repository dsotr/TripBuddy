<script>
	import Hero from '../components/hero.svelte';
	import Trip from '../components/trip.svelte';
	import TripList from '../components/tripList.svelte';
	let { data } = $props();
	console.log(data);
</script>

<TripList trips={data.trips} docs={data.docs} />

<p>{data.docs.length} documents found</p>
<ul>
	{#each data.docs as d}
		<li>{d.type}; {JSON.stringify(d.details)}</li>
	{/each}
</ul>
<p>No more documents...</p>

<script>
	import Hero from '../components/hero.svelte';
	import Trip from '../components/trip.svelte';
	import TripList from '../components/tripList.svelte';
	let { data } = $props();
	// console.log(data.trips);
</script>

<TripList trips={data.trips} docs={data.docs} />

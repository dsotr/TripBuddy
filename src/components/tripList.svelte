<script>
	import Trip from '../components/trip.svelte';

	let { trips, docs } = $props();

	/** Delete trip from list and from DB. */
	const deleteTrip = async (trip_id) => {
		console.log('delete', trip_id);
		try {
			const response = await fetch('/api/trip/' + trip_id, {
				method: 'DELETE'
			});
			if (response.ok) {
				trips = trips.filter((trip) => trip.trip_id !== trip_id);
				console.log('Trip deleted:', response.status, response.statusText);
			} else {
				console.error('Unable to remove trip from DB:', response.status, response.statusText);
			}
		} catch (error) {
			console.error('Unable to remove trip from DB:', error);
		}
	};

	const updateTrip = async (trip) => {
		console.log('update', trip);
		trips.array.forEach((element) => {
			if (element.trip_id === trip.trip_id) {
				element = trip;
			}
		});
	};
</script>

<div class="container">
	<ul>
		{#each trips as trip}
			<Trip {updateTrip} {deleteTrip} {trip} {docs} />
			<!-- <li>{trip.name} - {trip.destination} - {trip.start_date} - {trip.end_date}</li> -->
		{/each}
	</ul>

	<a href="/trip/new" class="btn">New Trip</a>
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

<!-- Create an html card with trip details: name, destination, dates, business/leisure -->
<script>
	import Documents from './documents.svelte';

	let { trip, docs } = $props();

	const deleteTrip = async () => {
		console.log('delete', trip.trip_id);
		const response = await fetch('/api/trip/' + trip.trip_id, {
			method: 'DELETE'
		});
		const jsonResponse = await response.json();
		console.log(jsonResponse);
	};
</script>

<div class="trip-card {trip.type}">
	<h2>{trip.name}</h2>
	<div>
		{#if trip.type == 'leisure'}
			<i class="fa-solid fa-umbrella-beach"></i>
		{:else}
			<i class="fa-solid fa-briefcase"></i>
		{/if}
		<p><strong>Destination:</strong> {trip.destination}</p>
		<p><strong>Dates:</strong> {trip.start_date} to {trip.end_date}</p>
	</div>
	<Documents {docs} />
	<button onclick={deleteTrip}><i class="fa-solid fa-trash"></i> Delete</button>
</div>

<style>
	.trip-card {
		border: 1px solid #eee;
		border-radius: 8px;
		padding: 1rem;
		margin-bottom: 1rem;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.leisure {
		background:
			linear-gradient(110deg, var(--light-color) 50%, transparent 60%),
			no-repeat url('/images/sea.png') center/cover,
			var(--light-color);
	}
	.business {
		background:
			linear-gradient(110deg, var(--light-color) 50%, transparent 60%),
			no-repeat url('/images/city.png') center/cover,
			var(--light-color);
	}

	.trip-card h2 {
		margin-top: 0;
		color: var(--primary-color);
	}

	.trip-card p {
		margin-bottom: 0.5rem;
	}
</style>

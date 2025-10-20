<!-- Create an html card with trip details: name, destination, dates, business/leisure -->
<script>
	import Documents from './documents.svelte';

	let { deleteTrip, trip, docs } = $props();
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
	<button aria-label="delete trip" onclick={() => deleteTrip(trip.trip_id)}
		><i class="fa-solid fa-trash fa-xl"></i></button
	>
</div>

<style>
	.trip-card {
		position: relative;
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

	/* put the button in the top right garc corner */
	button {
		position: absolute;
		right: 10px;
		top: 15px;
		padding: 8px;
		border-radius: 8px;
		background: rgba(0, 0, 0, 0.2);
		border: none;
		color: var(--light-color);
		cursor: pointer;
	}
</style>

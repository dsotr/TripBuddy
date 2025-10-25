<!-- Create an html card with trip details: name, destination, dates, business/leisure -->
<script>
	import { onMount } from 'svelte';
	import Documents from './documents.svelte';

	let { updateTrip, deleteTrip, trip, docs } = $props();
	let imageSrc = $state('');
	docs = docs.filter((doc) => doc.trip_id === trip.trip_id);

	const getImage = async () => {
		const { imageUrl } = await (await fetch('/api/destination/' + trip.destination)).json();
		imageSrc = imageUrl;
		trip.image = imageUrl;
		updateTrip(trip);
		return imageUrl;
	};

	onMount(() => {
		getImage();
	});
</script>

<div class="trip-card {trip.type}">
	<div class="card-content">
		<div class="card-image">
			<img src={trip.image ? trip.image : imageSrc} alt="placeholder" />
		</div>
		<div class="card-text">
			<h2>
				{#if trip.type == 'leisure'}
					<i class="fa-solid fa-umbrella-beach"></i>
				{:else}
					<i class="fa-solid fa-briefcase"></i>
				{/if}
				{trip.name}
			</h2>
			<p><strong>Destination:</strong> {trip.destination}</p>
			<p><strong>Dates:</strong> {trip.start_date} to {trip.end_date}</p>
			<Documents {docs} />
		</div>
		<div class="card-action">
			<a href="/trip/{trip.trip_id}" aria-label="update trip"><i class="fas fa-edit fa-xl"></i></a>
			<button aria-label="delete trip" onclick={() => deleteTrip(trip.trip_id)}
				><i class="fa-solid fa-trash fa-xl"></i></button
			>
		</div>
	</div>
</div>

<style>
	.trip-card {
		position: relative;
		border: 1px solid #eee;
		border-radius: 8px;
		padding: 0.5rem;
		margin-bottom: 1rem;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		max-height: 25vh;
	}

	.card-content {
		display: flex;
		gap: 1.5rem;
		align-items: center;
	}

	.card-image {
		/* max-height: 20vh; */
		max-height: 22vh;
		aspect-ratio: 1 / 1;
		object-fit: contain;
		background-color: var(--light-color);
		border-radius: 0.8rem;
		border: 4px solid white;
	}

	img {
		object-fit: cover;
		width: 100%;
		height: 100%;
		border-radius: 0.6rem;
	}

	.card-text {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		justify-content: space-between;
	}

	/* .leisure {
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
	} */

	.trip-card h2 {
		margin-top: 0;
		color: var(--primary-color);
	}

	.trip-card p {
		margin-bottom: 0.5rem;
	}

	/* put the button in the top right garc corner */
	.card-action {
		position: absolute;
		right: 10px;
		top: 10px;
		/* padding: 8px; */
		border-radius: 8px;
		/* background: rgba(0, 0, 0, 0.2); */
		border: none;
		color: var(--light-color);
		cursor: pointer;

		button,
		a {
			background: none;
			color: var(--dark-color);
			border: none;
			cursor: pointer;
		}
	}
</style>

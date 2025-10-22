<script>
	import { page } from '$app/state';
	let { data } = $props();
	console.log(JSON.stringify(data));
</script>

<div class="container">
	<h1>New Trip</h1>

	<form method="POST">
		<label for="type">Type:</label>
		<select id="type" name="type">
			<option value="leisure">Leisure</option>
			<option value="business">Business</option>
		</select>

		<label for="tripName">Trip name:</label>
		<input type="text" id="tripName" name="tripName" />

		<label for="destination">Destination:</label>
		<input type="text" id="destination" name="destination" />

		<label for="start_date">Start Date:</label>
		<input
			type="date"
			id="start_date"
			name="start_date"
			value={new Date().toISOString().slice(0, 10)}
		/>

		<label for="end_date">End Date:</label>
		<input
			type="date"
			id="end_date"
			name="end_date"
			value={new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().slice(0, 10)}
		/>

		<button type="submit">Submit</button>
	</form>
</div>

<style>
	/* Add css for the form */
	.container {
		background-color: var(--light-color);
		padding: 3rem;
		display: flex;
		flex-direction: column;
		align-items: start;
		gap: 1rem;
	}
	form {
		display: flex;
		flex-direction: column;
		width: 60%;
	}
	button {
		display: block;
		margin-bottom: 0.5rem;
		margin: 1rem 0 0 0;
	}
	label {
		display: block;
		margin: 1rem 0.1rem 0 0;
		font-weight: bold;
	}

	select,
	button,
	input {
		padding: 0.5rem;
	}

	input[type='date'],
	select,
	button {
		width: fit-content;
	}

	button {
		margin: 2rem 0 0 0;
	}
</style>

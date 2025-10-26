<script>
	import { page } from '$app/state';
	let { data } = $props();
	console.log(JSON.stringify(data));
</script>

<div class="container">
	<h1>New Document for trip {page.params.trip_id}</h1>

	<form>
		<label for="category">Category:</label>
		<select id="category" name="category">
			<option value="fligth">Transport - Flight</option>
			<option value="train">Transport - Train</option>
			<option value="bus">Transport - Bus</option>
			<option value="car">Transport - Car</option>
			<option value="taxi">Transport - Taxi</option>
			<option value="hotel">Accommodation - Hotel</option>
			<option value="bnb">Accommodation - Airbnb</option>
		</select>
		<label for="type">Type:</label>
		<select id="type" name="type">
			<option value="booking">Booking</option>
			<option value="ticket">Ticket</option>
			<option value="boarding">Boarding Pass</option>
		</select>
		<label for="link">Document Link:</label>
		<input type="url" name="link" id="link" />
		<label for="airport">Airport:</label>
		<input type="text" name="airport" id="airport" />
		<label for="terminal">Terminal:</label>
		<input type="text" name="terminal" id="terminal" />
		<label for="date">Date:</label>
		<input type="date" name="date" id="date" />
		<label for="time">Time:</label>
		<input type="time" name="time" id="time" />
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

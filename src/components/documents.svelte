<!-- 
 List of relevant documents for a trip, with details about status (complete/imcomplete), date/time, Terminal, addresses.
 - Flights
 - Rail
 - Taxy/Car
 - Hotel 
 -->
<script>
	let { docs } = $props();
</script>

<div class="docs">
	{#each docs as doc}
		<div class="doc">
			{#if doc.type == 'Hotel'}
				<i class="fa-solid fa-hotel"></i>
			{:else if doc.type == 'Flight'}
				<i class="fa-solid fa-plane"></i>
			{:else if doc.type == 'Bus'}
				<i class="fa-solid fa-van-shuttle"></i>
			{:else if doc.type == 'Taxi'}
				<i class="fa-solid fa-taxi"></i>
			{:else if doc.type == 'Train'}
				<i class="fa-solid fa-train-tram"></i>
			{/if}
		</div>
	{/each}
</div>

<style>
	.docs {
		display: flex;
		flex-wrap: wrap;
		gap: 0.6rem;
	}
	.doc {
		border: solid 1px var(--dark-color);
		border-radius: 0.2rem;
		padding: 0.3rem;
		width: 2.3rem;
		height: 2.3rem;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>

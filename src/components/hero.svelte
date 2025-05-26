<header>
	<div class="container hero">
		<h1>Lorem ipsum <span>dolor</span> sit.</h1>
		<p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
		<a href="/" class="btn">Start</a>
	</div>
</header>

<style>
	header {
		width: 100vw;
		height: 100vh;
		background-color: var(--light-color);
	}

	.hero {
		padding: 10rem 6rem;
		display: flex;
		flex-direction: column;
		gap: 0;
		/* align-items: left; */
		/* justify-content: top; */
	}

	h1 {
		color: var(--dark-color);
		font-size: 5rem;
		line-height: 1;

		span {
			color: var(--primary-color);
		}
	}

	p {
		font-size: 1.4rem;
	}

	.btn {
		margin-top: 2rem;
	}
</style>

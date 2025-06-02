<header>
	<div class="container hero">
		<h1>Lorem ipsum <span>dolor</span> sit.</h1>
		<p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
		<a href="/" class="btn">Start</a>
	</div>
</header>

<style lang="scss">
	header {
		width: 100vw;
		height: 100vh;
		background-color: var(--light-color);

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
	}

	@media (max-width: $phone-width) {
		header {
			/* background: no-repeat url("../images/background-desktop.jpg"), #333; */
			background:
				no-repeat url('../images/background-mobile.jpg'),
				var(--light-color);
			background-size: cover;
			background-position: bottom center;

			.hero {
				flex-direction: column;
				text-align: center;
			}

			.hero-image {
				margin: 20% auto 0;
				align-self: center;
			}

			h1 {
				font-size: 3rem;
				margin-bottom: 3rem;
			}

			p {
				font-size: 1rem;
				letter-spacing: 0rem;
				margin-bottom: 3rem;
			}

			img {
				width: 150px;
			}

			.btn {
				margin: 0 auto;
			}
		}
	}
</style>

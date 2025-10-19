import adapter from '@sveltejs/adapter-auto';
import { sveltePreprocess } from 'svelte-preprocess';

const config = {
	kit: { adapter: adapter() },
	preprocess: sveltePreprocess({
		scss: {
			// Allow scss variables to be used in every component.
			// Not using namespaces, actually using * as I won-t run into conflicts, otherwise:
			// https://sass-lang.com/documentation/at-rules/use/#loading-members
			prependData: `@use './src/variables.scss' as *;`
		}
	})
};

export default config;

export const prerender = true;

import { createBrowserClient, createServerClient, isBrowser } from '@supabase/ssr';
import { PUBLIC_VITE_SUPABASE_URL, PUBLIC_VITE_SUPABASE_KEY } from '$env/static/public';

export const load = async ({ data, depends, fetch }) => {
	/**
	 * Declare a dependency so the layout can be invalidated, for example, on
	 * session refresh.
	 */
	depends('supabase:auth');

	console.log('keys:', PUBLIC_VITE_SUPABASE_KEY);
	const supabase = isBrowser()
		? createBrowserClient(PUBLIC_VITE_SUPABASE_URL, PUBLIC_VITE_SUPABASE_KEY, {
				global: {
					fetch
				}
			})
		: createServerClient(PUBLIC_VITE_SUPABASE_URL, PUBLIC_VITE_SUPABASE_KEY, {
				global: {
					fetch
				},
				cookies: {
					getAll() {
						return data.cookies;
					}
				}
			});

	/**
	 * It's fine to use `getSession` here, because on the client, `getSession` is
	 * safe, and on the server, it reads `session` from the `LayoutData`, which
	 * safely checked the session using `safeGetSession`.
	 */
	const {
		data: { session }
	} = await supabase.auth.getSession();

	const {
		data: { user }
	} = await supabase.auth.getUser();

	return { session, supabase, user };
};

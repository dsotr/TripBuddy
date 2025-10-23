import { fail, redirect } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient';
import { saveTrip } from '$lib/server/tripsActions.js';

export const prerender = false;

export const actions = {
	default: async ({ request }) => {
		console.log('createTrip');
		const formData = await request.formData();
		await saveTrip(formData);
		throw redirect(303, '/');
	}
};

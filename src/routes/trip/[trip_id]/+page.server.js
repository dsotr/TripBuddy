// src/routes/+page.server.js
export const prerender = false;

import { supabase } from '$lib/supabaseClient';
import { saveTrip } from '$lib/server/tripsActions.js';
import { redirect } from '@sveltejs/kit';

export async function load({ params }) {
	// Esegui entrambe le richieste contemporaneamente
	const [tripResponse, documentsResponse] = await Promise.all([
		supabase.from('trips').select().eq('trip_id', params.trip_id).single(),
		supabase.from('documents').select().eq('trip_id', params.trip_id)
	]);

	return {
		// Using .single() will return a single object, not an array.
		// If no trip is found, it will return null and Supabase will return an error which SvelteKit will handle.
		trip: tripResponse.data,
		docs: documentsResponse.data ?? []
	};
}

export const actions = {
	default: async ({ request }) => {
		console.log('updateTrip');
		const formData = await request.formData();
		await saveTrip(formData);
		throw redirect(303, '/');
	}
};

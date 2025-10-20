// src/routes/+page.server.js

import { supabase } from '$lib/supabaseClient';
// import { page } from '$app/state';

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

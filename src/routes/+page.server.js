// src/routes/+page.server.js

import { supabase } from '$lib/supabaseClient';

export async function load() {
	// Esegui entrambe le richieste contemporaneamente
	const [tripsResponse, documentsResponse] = await Promise.all([
		supabase.from('trips').select(),
		supabase.from('documents').select()
	]);

	return {
		trips: tripsResponse.data ?? [],
		docs: documentsResponse.data ?? []
	};
}

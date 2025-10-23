// src/routes/+page.server.js

import { supabase } from '$lib/supabaseClient';

export async function load() {
	// Esegui entrambe le richieste contemporaneamente
	const [tripsResponse, documentsResponse] = await Promise.all([
		supabase.from('trips').select().order('start_date', { ascending: true }),
		supabase.from('documents').select()
	]);

	return {
		trips: tripsResponse.data ?? [],
		docs: documentsResponse.data ?? []
	};
}

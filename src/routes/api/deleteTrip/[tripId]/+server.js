// src/routes/+page.server.js

import { supabase } from '$lib/supabaseClient';
import { json } from '@sveltejs/kit';

export async function GET({ params }) {
	const { tripId } = params;
	const tripsDELETEResponse = await supabase.from('trips').delete().eq('trip_id', tripId);

	return json(tripsDELETEResponse);
}

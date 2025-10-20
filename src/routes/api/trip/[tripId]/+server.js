// src/routes/+page.server.js

import { supabase } from '$lib/supabaseClient';
import { json } from '@sveltejs/kit';

/**
 * Delete a trip
 * @param {trip_id} trip_id
 * @returns Operation status code
 */
export async function DELETE({ params }) {
	const { trip_id } = params;
	const tripsDELETEResponse = await supabase.from('trips').delete().eq('trip_id', trip_id);

	return json(tripsDELETEResponse.status);
}

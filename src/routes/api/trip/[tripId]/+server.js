// src/routes/+page.server.js

import { supabase } from '$lib/supabaseClient';
import { json } from '@sveltejs/kit';

/**
 * Delete a trip
 * @param {tripId} tripId
 * @returns Operation status code
 */
export async function DELETE({ params }) {
	const { tripId } = params;
	const tripsDELETEResponse = await supabase.from('trips').delete().eq('trip_id', tripId);

	return json(tripsDELETEResponse.status);
}

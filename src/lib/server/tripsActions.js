import { fail } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient';

// Get the trip's data and save them to the database, either creating a new trip or updating an existing one
export async function saveTrip(formData) {
	console.log('saveTrip function.');
	const tripId = formData.get('tripId');
	const tripType = formData.get('type');
	const tripName = formData.get('tripName');
	const destination = formData.get('destination');
	const startDate = formData.get('start_date');
	const endDate = formData.get('end_date');

	if (!(tripName || destination || startDate || endDate)) {
		return fail(400, {
			tripName,
			error: 'All fields are required.'
		});
	}

	const tripData = {
		user_id: '2a54d608-d950-47ee-8f81-323a5cc2a31e',
		name: tripName,
		type: tripType,
		destination: destination,
		start_date: startDate,
		end_date: endDate
	};
	console.log('Trip ID:', tripId);

	let error;
	if (tripId) {
		console.log('update trip with id', tripId);
		({ error } = await supabase.from('trips').update(tripData).eq('trip_id', tripId));
	} else {
		console.log('Create new trip');
		({ error } = await supabase.from('trips').insert([tripData]));
	}
	console.log(error);

	if (error) {
		console.error('Error inserting trip:', error);
		return fail(500, {
			tripName,
			error: 'Failed to create trip.'
		});
	}
}

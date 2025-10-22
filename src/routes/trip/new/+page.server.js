import { fail, redirect } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient';

export const prerender = false;

export const actions = {
	default: async ({ request }) => {
		console.log('createTrip');
		const formData = await request.formData();
		const tripName = formData.get('tripName');
		const destination = formData.get('destination');
		const startDate = formData.get('start_date');
		const endDate = formData.get('end_date');

		if (!tripName) {
			return fail(400, {
				tripName,
				error: 'Trip name is required.'
			});
		}

		const { data, error } = await supabase.from('trips').insert([
			{
				user_id: '2a54d608-d950-47ee-8f81-323a5cc2a31e',
				name: tripName,
				destination: destination,
				start_date: startDate,
				end_date: endDate
			}
		]);

		if (error) {
			console.error('Error inserting trip:', error);
			return fail(500, {
				tripName,
				error: 'Failed to create trip.'
			});
		}

		throw redirect(303, '/');
	}
};

// src/routes/api/destination/[dest]/+server.js

import { supabase } from '$lib/supabaseClient';
import { error as svelteError, json } from '@sveltejs/kit';
import { PIXABAY_KEY } from '$env/static/private';

/**
 * Delete a trip
 * @param {dest} destination name
 * @returns Operation status code
 */
export async function GET({ params }) {
	const { dest } = params;
	console.log('Destination: ' + dest, params);
	const { data, error } = await supabase
		.from('destinations')
		.select()
		.eq('name', dest.toLowerCase());

	if (data?.image) {
		console.log('Found image in DB:', data.image);
		return json({ imageUrl: data.image });
	}

	// If not in DB, fetch from Pixabay
	console.log(`Image not found in DB for "${dest}". Fetching from Pixabay.`);
	const pixabayUrl = `https://pixabay.com/api/?key=${PIXABAY_KEY}&q=${encodeURIComponent(dest)}&image_type=photo&safesearch=true&category=travel&order=popular`;
	const pixabayResponse = await fetch(pixabayUrl);

	if (!pixabayResponse.ok) {
		console.log(pixabayUrl, pixabayResponse);
		throw svelteError(pixabayResponse.status, 'Failed to fetch image from Pixabay.');
	}

	const pixabayData = await pixabayResponse.json();

	const imageUrl = pixabayData.hits[0]?.previewURL ?? null;

	if (!imageUrl) {
		throw svelteError(404, `No image found for destination: ${dest}`);
	}

	console.log(imageUrl);
	// Here you could save the imageUrl to your Supabase 'destinations' table for caching.

	return json({ imageUrl: imageUrl });
}

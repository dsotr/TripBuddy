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
		.eq('name', dest.toLowerCase())
		.single();

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

	console.log('Uploading image:', imageUrl);
	// Here you could save the imageUrl to your Supabase 'destinations' table for caching.
	uploadImage(imageUrl, dest);

	return json({ imageUrl: imageUrl });
}

const uploadImage = async (imageUrl, dest) => {
	console.log('[uploadImage] Uploading image to Supabase...');
	try {
		const response = await fetch(imageUrl);
		const imageBlob = await response.blob();
		console.log(response.status);
		// store the image file to the database
		const fileName = dest.toLowerCase() + '.jpg';
		console.log('[uploadImage] access supabase destination table');
		let { data, error } = await supabase.storage.from('destinations').upload(fileName, imageBlob, {
			cacheControl: 60 * 60 * 24 * 365, // 1 year
			upsert: false
		});
		console.log('[uploadImage] data:', data);
		console.log('[uploadImage] error:', error);

		const imagePublicUrl = supabase.storage.from('destinations').getPublicUrl(data.path);
		console.log('[uploadImage] ', imagePublicUrl.data.publicUrl);

		({ data, error } = await supabase.from('destinations').insert({
			name: dest.toLowerCase(),
			image: imagePublicUrl.data.publicUrl
		}));
		if (error) console.log(error);
	} catch (error) {
		console.log('Unable to save image to database', imageUrl, error);
	}
};

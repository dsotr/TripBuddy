<script>
	import '@fortawesome/fontawesome-free/css/all.min.css';
	import '../global.css';

	import { supabase } from '$lib/supabaseClient';
	import { onMount } from 'svelte';

	// Creiamo una variabile reattiva (con Svelte 5 runes) per tenere traccia dell'utente
	let user = $state(null);

	// onMount() assicura che il codice venga eseguito solo nel browser
	onMount(() => {
		// 1. Controlla subito se c'è già una sessione attiva
		supabase.auth.getSession().then(({ data: { session } }) => {
			user = session?.user ?? null;
			console.log('Sessione iniziale caricata:', user);
		});

		// 2. Mettiti in ascolto per futuri cambiamenti
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((event, session) => {
			console.log('Event: ', event, session);
			if (event === 'SIGNED_IN') {
				// Questo è il momento in cui l'utente ha completato il login
				user = session.user;
				console.log('UTENTE AUTENTICATO:', user);
			}

			if (event === 'SIGNED_OUT') {
				user = null;
				console.log('UTENTE DISCONNESSO');
			}
		});

		// Pulisci il listener quando il componente viene distrutto
		return () => subscription.unsubscribe();
	});
	async function signInWithGoogle() {
		// Questa singola funzione ora gestisce tutto il flusso
		const { error } = await supabase.auth.signInWithOAuth({
			provider: 'google'
		});

		if (error) {
			console.error('Errore durante il login con Google:', error);
		}
	}
</script>

<button onclick={signInWithGoogle}>
	<i class="fab fa-google"></i> Accedi con Google
</button>

<slot />

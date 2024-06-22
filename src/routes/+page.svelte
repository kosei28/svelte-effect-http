<script lang="ts">
	import { api } from '$lib/api/api';
	import { Effect } from 'effect';
	import { Client } from 'effect-http';

	const client = Client.make(api, { baseUrl: '/' });

	let name = $state('');
	let result = $state<{ ok: boolean; message: string }>();

	async function getMessage() {
		result = await Effect.runPromise(
			client.getHello({ query: { name } }).pipe(
				Effect.matchEffect({
					onSuccess: (a) => Effect.succeed({ ok: true, message: a.message }),
					onFailure: (e) => Effect.succeed({ ok: false, message: e.message })
				})
			)
		);
	}
</script>

<h1>Svelte 5 + effect-http</h1>

<h2>Request</h2>

<label>
	<div>Name</div>
	<input type="text" bind:value={name} />
</label>

<button type="button" onclick={getMessage}>Submit</button>

<h2>Response</h2>

{#if result !== undefined}
	{#if result.ok}
		<p>Success</p>
	{:else}
		<p>Error</p>
	{/if}

	<pre>{result.message}</pre>
{/if}

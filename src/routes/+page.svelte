<script lang="ts">
	import { api } from '$lib/api/api';
	import { Effect } from 'effect';
	import { Client } from 'effect-http';

	const client = Client.make(api, { baseUrl: '/' });

	let name = $state('');
	let result = $state<{ ok: boolean; message: string }>();
	let currentDate = $state<Date>();

	async function getMessage() {
		result = await Effect.runPromise(
			client.getHello({ query: { name } }).pipe(
				Effect.match({
					onSuccess: (v) => ({ ok: true, message: v.message }),
					onFailure: (e) => ({ ok: false, message: e.message })
				})
			)
		);
	}

	async function getCurrentDate() {
		await Effect.runPromise(
			client.getCurrentDate({}).pipe(
				Effect.match({
					onSuccess: (v) => {
						currentDate = v.date;
					},
					onFailure: () => {}
				})
			)
		);
	}
</script>

<h1>Svelte 5 + effect-http</h1>

<h2>/api/hello</h2>

<h3>Request</h3>

<label>
	<div>Name</div>
	<input type="text" bind:value={name} />
</label>

<button type="button" onclick={getMessage}>Submit</button>

<h3>Response</h3>

{#if result !== undefined}
	{#if result.ok}
		<p>Success</p>
	{:else}
		<p>Error</p>
	{/if}

	<pre>{result.message}</pre>
{/if}

<h2>/api/date</h2>

<h3>Request</h3>

<button type="button" onclick={getCurrentDate}>Get current date</button>

<h3>Response</h3>

{#if currentDate !== undefined}
	<p>{currentDate.toString()}</p>
{/if}

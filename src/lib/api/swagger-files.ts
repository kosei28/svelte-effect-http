import * as SwaggerRouter from 'effect-http/SwaggerRouter';
import * as Effect from 'effect/Effect';
import * as Layer from 'effect/Layer';
import * as Record from 'effect/Record';

const SWAGGER_FILE_NAMES = [
	'index.css',
	'swagger-ui.css',
	'swagger-ui-bundle.js',
	'swagger-ui-standalone-preset.js',
	'favicon-32x32.png',
	'favicon-16x16.png'
];

const loadSwaggerFile = (file: string) =>
	Effect.promise(async () => {
		const res = await fetch(`https://unpkg.com/swagger-ui-dist@5.17/${file}`);
		return new Uint8Array(await res.arrayBuffer());
	});

export const SwaggerFilesLive = Effect.gen(function* (_) {
	const files = yield* _(
		SWAGGER_FILE_NAMES,
		Effect.forEach((path) => Effect.zip(Effect.succeed(path), loadSwaggerFile(path))),
		Effect.map(Record.fromEntries)
	);

	const size = Object.values(files).reduce((acc, content) => acc + content.byteLength, 0);
	const sizeMb = (size / 1024 / 1024).toFixed(1);

	yield* _(Effect.logDebug(`Static swagger UI files loaded (${sizeMb}MB)`));

	return { files };
}).pipe(Layer.effect(SwaggerRouter.SwaggerFiles));

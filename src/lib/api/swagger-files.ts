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

const readSwaggerFile = (file: string) =>
	Effect.promise(async () => {
		const res = await fetch(
			`https://raw.githubusercontent.com/swagger-api/swagger-ui/v5.17.14/dist/${file}`
		);
		return await res.text();
	});

export const SwaggerFilesLive = Effect.gen(function* (_) {
	const files = yield* _(
		SWAGGER_FILE_NAMES,
		Effect.forEach((path) => Effect.zip(Effect.succeed(path), readSwaggerFile(path))),
		Effect.map(Record.fromEntries)
	);

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const size = Object.entries(files).reduce((acc, [_, content]) => acc + content.length, 0);
	const sizeMb = (size / 1024 / 1024).toFixed(1);

	yield* _(Effect.logDebug(`Static swagger UI files loaded (${sizeMb}MB)`));

	return { files };
}).pipe(Layer.effect(SwaggerRouter.SwaggerFiles));

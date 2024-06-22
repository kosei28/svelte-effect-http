import { Handler, RouterBuilder } from 'effect-http';
import { api, getHelloEndpoint } from './api';
import { Effect } from 'effect';
import { HttpApp } from '@effect/platform';
import { SwaggerFilesLive } from './swagger-files';

const getHelloHandler = Handler.make(getHelloEndpoint, ({ query }) =>
	Effect.succeed({ message: `Hello, ${query.name}!` })
);

const app = RouterBuilder.make(api, { docsPath: '/api/docs' }).pipe(
	RouterBuilder.handle(getHelloHandler),
	RouterBuilder.build,
	Effect.provide(SwaggerFilesLive)
);

export const handler = HttpApp.toWebHandler(app);

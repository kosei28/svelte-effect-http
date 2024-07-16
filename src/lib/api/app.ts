import { Handler, RouterBuilder } from 'effect-http';
import { api, getCurrentDateEndpoint, getHelloEndpoint } from './api';
import { Effect } from 'effect';
import { HttpApp } from '@effect/platform';
import { SwaggerFilesLive } from './swagger-files';

const getHelloHandler = Handler.make(getHelloEndpoint, ({ query }) =>
	Effect.succeed({ message: `Hello, ${query.name}!` })
);

const getCurrentDateHandler = Handler.make(getCurrentDateEndpoint, () =>
	Effect.succeed({ date: new Date() })
);

const app = RouterBuilder.make(api, { docsPath: '/api/docs' }).pipe(
	RouterBuilder.handle(getHelloHandler),
	RouterBuilder.handle(getCurrentDateHandler),
	RouterBuilder.build,
	Effect.provide(SwaggerFilesLive)
);

export const handler = HttpApp.toWebHandler(app);

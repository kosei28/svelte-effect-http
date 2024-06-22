import { Handler, RouterBuilder } from 'effect-http';
import { api, getHelloEndpoint } from './api';
import { dev } from '$app/environment';
import { NodeContext } from '@effect/platform-node';
import { NodeSwaggerFiles } from 'effect-http-node';
import { Effect } from 'effect';
import { HttpApp } from '@effect/platform';

const getHelloHandler = Handler.make(getHelloEndpoint, ({ query }) =>
	Effect.succeed({ message: `Hello, ${query.name}!` })
);

const app = RouterBuilder.make(api, { enableDocs: dev, docsPath: '/api/docs' }).pipe(
	RouterBuilder.handle(getHelloHandler),
	RouterBuilder.build,
	Effect.provide(NodeSwaggerFiles.SwaggerFilesLive),
	Effect.provide(NodeContext.layer)
);

export const handler = HttpApp.toWebHandler(app);

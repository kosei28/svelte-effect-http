import { Handler, RouterBuilder } from 'effect-http';
import { api, getHelloEndpoint } from './api';
import { Effect } from 'effect';
import { HttpApp } from '@effect/platform';

const getHelloHandler = Handler.make(getHelloEndpoint, ({ query }) =>
	Effect.succeed({ message: `Hello, ${query.name}!` })
);

const app = RouterBuilder.make(api, { enableDocs: false }).pipe(
	RouterBuilder.handle(getHelloHandler),
	RouterBuilder.build
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handler = HttpApp.toWebHandler(app as any);

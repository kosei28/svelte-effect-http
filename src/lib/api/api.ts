import { Schema } from '@effect/schema';
import { Api } from 'effect-http';

const HelloQuery = Schema.Struct({ name: Schema.String.pipe(Schema.minLength(1)) });
const HelloResponse = Schema.Struct({ message: Schema.String });

export const getHelloEndpoint = Api.get('getHello', '/api/hello').pipe(
	Api.setRequestQuery(HelloQuery),
	Api.setResponseBody(HelloResponse)
);

export const api = Api.make().pipe(Api.addEndpoint(getHelloEndpoint));

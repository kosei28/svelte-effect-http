import { Schema } from '@effect/schema';
import { Api } from 'effect-http';

const GetHelloQuery = Schema.Struct({ name: Schema.String.pipe(Schema.minLength(1)) });
const GetHelloResponse = Schema.Struct({ message: Schema.String });

const GetCurrentDateResponse = Schema.Struct({ date: Schema.Date });

export const getHelloEndpoint = Api.get('getHello', '/api/hello').pipe(
	Api.setRequestQuery(GetHelloQuery),
	Api.setResponseBody(GetHelloResponse)
);

export const getCurrentDateEndpoint = Api.get('getCurrentDate', '/api/date').pipe(
	Api.setResponseBody(GetCurrentDateResponse)
);

export const api = Api.make().pipe(
	Api.addEndpoint(getHelloEndpoint),
	Api.addEndpoint(getCurrentDateEndpoint)
);

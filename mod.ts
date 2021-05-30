import { Application, parse } from "./deps.ts";
import GraphQLService from "./src/schema.ts";

const port = parseInt(Deno.env.get('PORT') ?? '8000');
const app = new Application();

const gqlService = await GraphQLService("/graphql");
app.use(gqlService.routes(), gqlService.allowedMethods());

app.addEventListener('listen', () => console.log('Running..'));

const DEFAULT_PORT = 8000;
const argPort = parse(Deno.args).port;
await app.listen({ port: argPort ?? DEFAULT_PORT });

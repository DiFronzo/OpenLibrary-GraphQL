import { Application, parse } from "./deps.ts";
import GraphQLService from "./src/schema.ts";

const DEFAULT_PORT = 8000;
const argPort = parse(Deno.args).port;

const app = new Application();

const gqlService = await GraphQLService("/graphql");
app.use(gqlService.routes(), gqlService.allowedMethods());

console.log("Server start at http://localhost:" + argPort ?? DEFAULT_PORT);
await app.listen({ port: argPort ?? DEFAULT_PORT });

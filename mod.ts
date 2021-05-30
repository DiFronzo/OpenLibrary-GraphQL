import { Application } from "./deps.ts";
import GraphQLService from "./src/schema.ts";

const port = parseInt(Deno.env.get('PORT') ?? '8000');
const app = new Application();

const gqlService = await GraphQLService("/graphql");
app.use(gqlService.routes(), gqlService.allowedMethods());

console.log("Server start at http://localhost:" + port);
await app.listen({ port: port });

import { Application } from "./deps.ts";
import GraphQLService from "./src/schema.ts";

const app = new Application();

const gqlService = await GraphQLService("/graphql");
app.use(gqlService.routes(), gqlService.allowedMethods());

console.log("Server start at http://localhost:8080");
await app.listen({ port: 8080 });

import { Context, Router, RouterContext } from "../deps.ts";
import { applyGraphQL, gql, GQLError } from "../deps.ts";
import { IGetTaskArgs, IGetTaskArgsStr, ITask, ITaskWork } from "./types.ts";

const typeDefs = gql`
 type Query {
     findBookISBN(id: Float!): BooksOpenType!
     findBook(id: String!): BooksOpenType!
     findWork(id: String!): WorksOpenType!
 }

 type WorksOpenType {
    description: String
    covers: [Int]
    subject_places: [String]
    subjects: [String]
    subject_people: [String]
    key: String
    authors: [authorOpenType]
    subject_times: [String]
    type: keyOpenType
    latest_revision: Int
    revision: Int
    created: modifiedType
    last_modified: modifiedType
 }

 type BooksOpenType {
    number_of_pages: Int
    table_of_contents: [tocType]
    weight: String
    covers: [Int]
    lc_classifications: [String]
    latest_revision: Int
    source_records: [String]
    title: String
    languages: [keyOpenType]
    subjects: [String]
    publish_country: String
    by_statement: String
    oclc_numbers: [String]
    type: keyOpenType
    physical_dimensions: String
    revision: Int
    publishers: [String]
    description: String
    physical_format: String
    key: String
    authors: [keyOpenType]
    publish_places: [String]
    pagination: String
    created: modifiedType
    lccn: [String]
    notes: String
    identifiers: identifiersType
    isbn_13: [String]
    dewey_decimal_class: [String]
    isbn_10: [String]
    publish_date: String
    works: [keyType]
    last_modified: modifiedType
    local_id: [String]
    ocaid: String
    contributions: [String]
    first_sentence: modifiedType
 }

 type collectionType {
   name: String
 }

 type tocType {
   title: String
   level: Int
   type: keyOpenType
 }

 type modifiedType {
    type: String
    value: String
 }

 type identifiersType {
    goodreads: [String]
    librarything: [String]
    amazon: [String]
    google: [String]
    project_gutenberg: [String]
 }

 type keyOpenType {
    key: String
    name: String
 }

 type keyType {
  key: String
}

 type authorOpenType {
    author: keyOpenType
    type: keyOpenType
 }
 `;

const resolveContext = (ctx: any, resolverName: string) => {
  const agent: string = ctx.req.headers.get("User-Agent");
  ctx.res.headers.set(
    "resolver",
    `${agent.toLocaleLowerCase().replace("/", "-")}-${resolverName}`,
  );
};

const resolvers = {
  Query: {
    findBookISBN: (
      _parent: { findBookISBN: string },
      args: IGetTaskArgs,
      ctx: Context,
    ): Promise<ITask | null> => {
      resolveContext(ctx, "book");
      return fetch(`https://openlibrary.org/isbn/${args.id}.json`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          return data;
        })
        .catch((error) => {
          throw new GQLError(error);
        });
    },
    findBook: (
      _parent: { findBook: string },
      args: IGetTaskArgsStr,
      ctx: Context,
    ): Promise<ITask | null> => {
      resolveContext(ctx, "book");
      return fetch(`https://openlibrary.org/books/${args.id}.json`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          return data;
        })
        .catch((error) => {
          throw new GQLError(error);
        });
    },
    findWork: (
      _parent: { findWork: string },
      args: IGetTaskArgsStr,
      ctx: Context,
    ): Promise<ITaskWork | null> => {
      resolveContext(ctx, "work");
      return fetch(`https://openlibrary.org/works/${args.id}.json`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          return data;
        })
        .catch((error) => {
          throw new GQLError(error);
        });
    },
  },
};

const GraphQLService = async (path: string) => {
  return await applyGraphQL<Router>({
    Router,
    path,
    typeDefs: typeDefs,
    resolvers: resolvers,
    context: (ctx: RouterContext) => ({
      req: ctx.request,
      res: ctx.response,
    }),
  });
};

export default GraphQLService;

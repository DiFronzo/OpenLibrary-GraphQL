import { Context, Router, RouterContext } from "../deps.ts";
import { applyGraphQL, gql, GQLError } from "../deps.ts";
import { IGetTaskArgs, IGetTaskArgsStr, ITask, ITaskWork, ITaskAuthor } from "./types.ts";

const typeDefs = gql`
 type Query {
     findBookISBN(id: Float!): BooksOpenType!
     findBook(id: String!): BooksOpenType!
     findWork(id: String!): WorksOpenType!
     findAuthor(id: String!): AuthorOpenType!
 }

 type AuthorOpenType {
    bio: String
    name: String
    links: [linksType]
    personal_name: String
    death_date: String
    alternate_names: [String]
    created: modifiedType
    photos: [Int]
    last_modified: modifiedType
    latest_revision: Int
    key: String
    birth_date: String
    revision: Int
    type: keyType
    remote_ids: remoteIdsType
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
    type: keyType
    latest_revision: Int
    revision: Int
    created: modifiedType
    last_modified: modifiedType
    links: [linksType]
    excerpts: [excerptsType]
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
    languages: [keyType]
    subjects: [String]
    publish_country: String
    by_statement: String
    oclc_numbers: [String]
    type: keyType
    physical_dimensions: String
    revision: Int
    publishers: [String]
    description: String
    physical_format: String
    key: String
    authors: [keyType]
    publish_places: [String]
    pagination: String
    created: modifiedType
    lccn: [String]
    notes: modifiedType
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
    ia_box_id: [String]
    edition_name: String
    translation_of: String
    series: [String]
    copyright_date: String
    contributors: [contributorsType]
    translated_from: [keyType]
 }

 type remoteIdsType {
  wikidata: String
  isni: String
  viaf: String
 }

 type excerptsType {
  excerpt: String
  comment: String
  author: keyType
 }

 type linksType {
  title: String
  url: String
  type: keyType
 }

 type contributorsType {
   role: String
   name: String
 }

 type collectionType {
   name: String
 }

 type tocType {
   title: String
   level: Int
   type: keyType
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
    deposito_legal: [String]
 }

 type keyType {
  key: String
}

 type authorOpenType {
    author: keyType
    type: keyType
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
          if (data && !data.error) {
            return data;
          } else {
            throw new GQLError(data.error);
          }
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
          if (data && !data.error) {
            return data;
          } else {
            throw new GQLError(data.error);
          }
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
          if (data && !data.error) {
            return data;
          } else {
            throw new GQLError(data.error);
          }
        })
        .catch((error) => {
          throw new GQLError(error);
        });
    },
    findAuthor: (
      _parent: { findAuthor: string },
      args: IGetTaskArgsStr,
      ctx: Context,
    ): Promise<ITaskAuthor | null> => {
      resolveContext(ctx, "author");
      return fetch(`https://openlibrary.org/author/${args.id}.json`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data && !data.error) {
            return data;
          } else {
            throw new GQLError(data.error);
          }
        })
        .catch((error) => {
          throw new GQLError(error);
        });
    }
  }
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

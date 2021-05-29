import { Router, RouterContext } from "./deps.ts";
import { 
    applyGraphQL, 
    gql, 
    GQLError
} from "./deps.ts";

 const typeDefs = (gql as any)`
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
    publishers: [String]
    number_of_pages: Int
    isbn_10: [String]
    covers: [Int]
    last_modified: modifiedType
    latest_revision: Int
    key: String
    authors: [keyOpenType]
    ocaid: String
    contributions: [String]
    languages: [keyOpenType]
    classifications: classificationType
    source_records: [String]
    title: String
    identifiers: identifiersType
    created: modifiedType
    isbn_13: Int
    local_id: [String]
    publish_date: String
    works: [keyOpenType]
    type: keyOpenType
    first_sentence: modifiedType
    revision: Int
 }

 type classificationType {
    lc_classifications: [String]
    dewey_decimal_class: [String]
 }

 type modifiedType {
    type: String
    value: String
 }

 type identifiersType {
    goodreads: [String]
    librarything: [String]
 }

 type keyOpenType {
    key: String
 }

 type authorOpenType {
    author: keyOpenType
    type: keyOpenType
 }
 `;

 const resolveContext = (ctx: any, resolverName: string) => {
     const agent: string = ctx.req.headers.get('User-Agent');
     ctx.res.headers.set('resolver', `${agent.toLocaleLowerCase().replace('/', '-')}-${resolverName}`);
 }

 const resolvers = {
    Query: {
        findBookISBN: (parent: any, {id}: any, context: any, info: any) => {
            resolveContext(context, 'book');
            return fetch(`https://openlibrary.org/isbn/${id}.json`, {
            method: 'GET', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            }})
            .then(response => response.json())
            .then(data => {
                return data;
            })
            .catch((error) => {
                throw new GQLError(`Something went wrong with the id: "${id}". ${error}`)
            });
        },
        findBook: (parent: any, {id}: any, context: any, info: any) => {
            resolveContext(context, 'book');
            return fetch(`https://openlibrary.org/books/${id}.json`, {
            method: 'GET', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            }})
            .then(response => response.json())
            .then(data => {
                return data;
            })
            .catch((error) => {
                throw new GQLError(`Something went wrong with the id: "${id}". ${error}`)
            });
        },
        findWork: (parent: any, {id}: any, context: any, info: any) => {
            resolveContext(context, 'book');
            return fetch(`https://openlibrary.org/works/${id}.json`, {
            method: 'GET', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            }})
            .then(response => response.json())
            .then(data => {
                return data;
            })
            .catch((error) => {
                throw new GQLError(`Something went wrong with the id: "${id}". ${error}`)
            });
        },
    }
 };

export const GraphQLService = async (path: string) => {
    return await applyGraphQL<Router>({
      Router,
      path,
      typeDefs: typeDefs,
      resolvers: resolvers,
      context: (ctx: RouterContext) => ({
              req: ctx.request,
              res: ctx.response
      })
    });
  };

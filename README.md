<h1 align="center">
  <img src="https://openlibrary.org/static/images/openlibrary-logo-tighter.svg" width="300px"/><br/>
  OpenLibrary-GraphQL
</h1>
<p align="center">Search books using work, edition and ISBN with OpenLibrary API using a <b>backend</b> (Deno and GraphQL).

<p align="center"><a href="https://github.com/DiFronzo/OpenLibrary-GraphQL/releases" target="_blank"><img src="https://img.shields.io/badge/version-v1.0.0-blue?style=for-the-badge&logo=none" alt="OL-GQL version" /></a>&nbsp;<a href="https://deno.land/x/OpenLibrary-GraphQL@v1.0" target="_blank"><img src="https://img.shields.io/badge/Deno-1.10+-00ADD8?style=for-the-badge&logo=deno" alt="deno version" /></a>&nbsp;<img src="https://img.shields.io/badge/license-MIT-red?style=for-the-badge&logo=none" alt="license" />&nbsp;<img alt="code size" src="https://img.shields.io/github/languages/code-size/difronzo/OpenLibrary-GraphQL?style=for-the-badge&logo=none"></p>


## ⚡️ Quick start

First of all, [download](https://deno.land/) and install **Deno**. Version `1.10` or higher is required.

Verify that the installation was successful by running the following command that should return the version number for Deno, v8 and TypeScript.

```bash
deno --version
```

To quickly start using the code run the following command. With the flag `--allow-net` that is allowing network access. 

```bash
deno run --allow-net https://raw.githubusercontent.com/DiFronzo/OpenLibrary-GraphQL/main/mod.ts
```

GraphQL should now be running on [http://localhost:8080/graphql](http://localhost:8080/graphql).

That's all you need to know to start! 🎉

## ⚙️ Usage & Options

### `Find books by ISBN`
The function `findBookISBN` is used to find books by ISBN. The `id` need to be a float. With GraphQL you can choose what result should be returned. Use the `DOCS` tab on the right side for available parameters.
```gql
query
{
  findBookISBN (id: 9780140328721) {
    title
    authors {
      key
    }
  }
}
```
### `Find books by edition`
The function `findBook` is used to find books by using the edition [slug](https://openlibrary.org/books/OL24981637M). The `id` need to be a string. With GraphQL you can choose what result should be returned. Use the `DOCS` tab on the right side for available parameters.
```gql
query
{
  findBook (id: "OL24981637M") {
    title
    by_statement
    publish_date
  }
}
```
### `Find works`
The function `findWork` is used to find work using the works [slug](https://openlibrary.org/works/OL45883W). A work is a logical collection of similar editions. The `id` need to be a string. With GraphQL you can choose what result should be returned. Use the `DOCS` tab on the right side for available parameters.
```gql
query
{
  findWork (id: "OL45883W") {
    description
    type {
      key
    }
  }
}
```
### `Find authors`
The function `findAuthor` is used to find an author by using the authors [slug](https://openlibrary.org/authors/OL576769A). The `id` need to be a string. With GraphQL you can choose what result should be returned. Use the `DOCS` tab on the right side for available parameters.
```gql
query
{
  findAuthor (id: "OL576769A"){
    name
    personal_name
    alternate_names
    remote_ids {
      wikidata
    }
  }
}
```
Demo at https://openlib-graphql.herokuapp.com/graphql. If you get "Failed to fetch schema", change "http" to "https" in the url for GraphQL.

### 🐳 Docker-way to quick start

If you don't want to install OpenLibrary-GraphQL to your system, you feel free to using the following [Docker image](https://hub.docker.com/) (in progress..) and run GraphQL from isolated container.

## ⭐️ Project assistance

If you want to say **thank you** or/and support active development of `OpenLibrary-GraphQL`:

- Add a [GitHub Star](https://github.com/DiFronzo/OpenLibrary-GraphQL) to the project.

## ⚠️ License
`OpenLibrary-GraphQL` is free and open-source software licensed under the [MIT](https://github.com/DiFronzo/OpenLibrary-GraphQL/blob/main/LICENSE). This is not an offical release from [Open Library](https://github.com/internetarchive/openlibrary). Use on your own risk.

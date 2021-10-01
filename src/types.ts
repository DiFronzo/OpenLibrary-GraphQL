export interface IGetTaskArgs {
  id: number;
}

export interface IGetTaskArgsStr {
  id: string;
}

export interface ITask {
  number_of_pages: number;
  table_of_contents: string[];
  weight: string;
  covers: number[];
  lc_classifications: string[];
  latest_revision: number;
  source_records: string[];
  title: string;
  languages: { type: string }[];
  subjects: string[];
  publish_country: string;
  by_statement: string;
  oclc_numbers: string[];
  type: { key: string };
  physical_dimensions: string;
  revision: number;
  publishers: string[];
  description: string;
  physical_format: string;
  last_modified: { type: string, value: string };
  key: string;
  authors: { key: string };
  publish_places: string[];
  pagination: string;
  lccn: string[];
  notes: string;
  identifiers: {
    goodreads: string[],
    librarything: string[],
    amazon: string[],
    google: string[],
    project_gutenberg: string[],
    depósito_legal: string[]
  };
  isbn_13: string[];
  dewey_decimal_class: string[];
  isbn_10: string[];
  publish_date: string;
  works: { key: string }[];
  local_id: string[];
  ocaid: string;
  contributions: string[];
  first_sentence: { type: string, value: string };
  ia_box_id: string[];
  edition_name: string;
  translation_of: string;
  series: string[];
  copyright_date: string;
  contributors: {role: string, name: string}[];
  translated_from: {key: string}[];
}

export interface ITaskWork {
  title: string;
  description: string;
  covers: number[];
  subject_places: string[];
  subjects: string[];
  subject_people: string[];
  key: string;
  authors: string[];
  subject_times: string[];
  type: { key: string };
  latest_revision: number;
  revision: number;
  created: { type: string; value: string };
  last_modified: { type: string; value: string };
  links: {title: string, url: string, type: {key: string}}[];
  excerpts: {excerpt: string, comment: string, author: {key: string}}[];
}


export interface ITaskAuthor {
  bio: string;
  name: string;
  links: {title: string, url: string, type: {key: string}}[];
  personal_name: string;
  death_date: string;
  alternate_names: string[];
  created: { type: string; value: string };
  photos: number[];
  last_modified: { type: string; value: string };
  latest_revision: number;
  key: string;
  birth_date: string;
  revision: number;
  type: { key: string };
  remote_ids: {wikidata: string, isni: string, viaf: string};
}

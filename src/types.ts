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
  languages: string[];
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
  last_modified: { type: string; value: string };
  key: string;
  authors: { key: string; name: string };
  publish_places: string[];
  pagination: string;
  lccn: string[];
  notes: string;
  identifiers: {
    goodreads: string[];
    librarything: string[];
    amazon: string[];
    google: string[];
    project_gutenberg: string[];
  };
  isbn_13: string[];
  dewey_decimal_class: string[];
  isbn_10: string[];
  publish_date: string;
  works: { key: string }[];
  local_id: string[];
  ocaid: string;
  contributions: string[];
  first_sentence: { type: string; value: string };
}

export interface ITaskWork {
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
}

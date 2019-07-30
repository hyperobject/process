/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Add_Note
// ====================================================

export interface Add_Note_insert_notes_returning {
  __typename: "notes";
  id: any;
  content: string;
  publishedAt: any;
}

export interface Add_Note_insert_notes {
  __typename: "notes_mutation_response";
  /**
   * data of the affected rows by the mutation
   */
  returning: Add_Note_insert_notes_returning[];
}

export interface Add_Note {
  /**
   * insert data into the table: "notes"
   */
  insert_notes: Add_Note_insert_notes | null;
}

export interface Add_NoteVariables {
  content: string;
  repoName: string;
  repoOwner: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Get_Notes
// ====================================================

export interface Get_Notes_notes {
  __typename: "notes";
  id: any;
  content: string;
  publishedAt: any;
}

export interface Get_Notes {
  /**
   * fetch data from the table: "notes"
   */
  notes: Get_Notes_notes[];
}

export interface Get_NotesVariables {
  repoName: string;
  repoOwner: string;
  start?: any | null;
  end?: any | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetFirstCommits
// ====================================================

export interface GetFirstCommits_repository_ref_target_Tree {
  __typename: "Tree" | "Blob" | "Tag";
}

export interface GetFirstCommits_repository_ref_target_Commit_history_nodes_author_user {
  __typename: "User";
  /**
   * The username used to login.
   */
  login: string;
}

export interface GetFirstCommits_repository_ref_target_Commit_history_nodes_author {
  __typename: "GitActor";
  /**
   * The GitHub user corresponding to the email field. Null if no such user exists.
   */
  user: GetFirstCommits_repository_ref_target_Commit_history_nodes_author_user | null;
}

export interface GetFirstCommits_repository_ref_target_Commit_history_nodes {
  __typename: "Commit";
  /**
   * An abbreviated version of the Git object ID
   */
  abbreviatedOid: string;
  /**
   * The Git commit message headline
   */
  messageHeadline: string;
  /**
   * The datetime when this commit was authored.
   */
  authoredDate: any;
  /**
   * Authorship details of the commit.
   */
  author: GetFirstCommits_repository_ref_target_Commit_history_nodes_author | null;
  /**
   * The HTTP URL for this Git object
   */
  commitUrl: any;
}

export interface GetFirstCommits_repository_ref_target_Commit_history_pageInfo {
  __typename: "PageInfo";
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: boolean;
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor: string | null;
}

export interface GetFirstCommits_repository_ref_target_Commit_history {
  __typename: "CommitHistoryConnection";
  /**
   * A list of nodes.
   */
  nodes: (GetFirstCommits_repository_ref_target_Commit_history_nodes | null)[] | null;
  /**
   * Information to aid in pagination.
   */
  pageInfo: GetFirstCommits_repository_ref_target_Commit_history_pageInfo;
}

export interface GetFirstCommits_repository_ref_target_Commit {
  __typename: "Commit";
  /**
   * The linear commit history starting from (and including) this commit, in the same order as `git log`.
   */
  history: GetFirstCommits_repository_ref_target_Commit_history;
}

export type GetFirstCommits_repository_ref_target = GetFirstCommits_repository_ref_target_Tree | GetFirstCommits_repository_ref_target_Commit;

export interface GetFirstCommits_repository_ref {
  __typename: "Ref";
  /**
   * The object the ref points to.
   */
  target: GetFirstCommits_repository_ref_target;
}

export interface GetFirstCommits_repository {
  __typename: "Repository";
  /**
   * Fetch a given ref from the repository
   */
  ref: GetFirstCommits_repository_ref | null;
}

export interface GetFirstCommits {
  /**
   * Lookup a given repository by the owner and repository name.
   */
  repository: GetFirstCommits_repository | null;
}

export interface GetFirstCommitsVariables {
  repoOwner: string;
  repoName: string;
  branch: string;
}

export interface CommitAuthor {
    user: {
        login: string
    }
}

export interface Commit {
    abbreviatedOid: string, // commit hash
    messageHeadline: string,
    authoredDate: string, // timestamp
    author: CommitAuthor,
    commitUrl: string 
}

export interface CommitNode {
    commit: Commit
}
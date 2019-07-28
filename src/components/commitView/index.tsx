import React from 'react'
import { Heading, Box, Table, TableHeader, TableRow, TableCell, TableBody, InfiniteScroll } from 'grommet';
import { Commit } from '../../models/commitNode'
import { gql, ApolloClient } from 'apollo-boost';
import { Query } from 'react-apollo';
import { Spinning } from 'grommet-controls'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime';

// import * as style from './style.module.css'
dayjs.extend(relativeTime);

interface CommitQuery {
repository: {
    ref: {
      target: {
        history: {
          nodes: Commit[]
        }
      }
    } 
  }
}

interface State {
    commits: Commit[]
    cursor: string | null
}

//TODO: configure dynamic number and repo
const GET_ALL_COMMITS = gql`
query GetAllCommits { 
  repository(name: "eslint", owner: "eslint") {
    ref(qualifiedName: "master") {
      target {
        ... on Commit {
          history(first: 10) {
            nodes {
              abbreviatedOid
              messageHeadline
              authoredDate
              author {
                user {
                  login
                }
              }
              commitUrl
            }
          }
        }
      }
    }
  }
}
`

class CommitView extends React.Component<{}, State> {
    private apollo: ApolloClient<any> | null
    constructor() {
        super({});
        this.state = {
            commits: [],
            cursor: null
        }
        this.apollo = null
    }

    render() {
        return (
            <Box
                gridArea="code"
            >
                <Heading level="3">Commits</Heading>
                <Query<CommitQuery>
                    query={GET_ALL_COMMITS}
                >
                    {({ loading, error, data, client }) => {
                        this.apollo = client
                        if (loading || !data) return(
                                <Spinning kind='pulse' size='medium' />
                        ) 
                        if (error) return `Error! ${error.message}`;
                        const commitData = data.repository.ref.target.history.nodes
                        if (this.state.commits === commitData) {
                            return null
                        }

                        this.setState(() => ({
                            commits: commitData
                        }))
                        return null
                    }}
                </Query>
                <Table>
                    <TableHeader>
                        <TableRow>
                        <TableCell scope="col">
                        </TableCell>
                        <TableCell scope="col">
                            Commit
                        </TableCell>
                        <TableCell scope="col">
                            Author
                        </TableCell>
                        <TableCell scope="col">
                            Summary
                        </TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <InfiniteScroll
                            renderMarker={marker => (
                                <TableRow>
                                    <TableCell>{marker}</TableCell>
                                </TableRow>
                            )}
                            step={10}
                            items={this.state.commits}
                        >
                            {(commit: Commit) => (
                                <TableRow key={commit.abbreviatedOid}>
                                    <TableCell>{dayjs(commit.authoredDate).fromNow()}</TableCell>
                                    <TableCell>{commit.abbreviatedOid}</TableCell>
                                    <TableCell>{commit.author.user.login}</TableCell>
                                    <TableCell>{commit.messageHeadline}</TableCell>
                                </TableRow>
                            )}
                        </InfiniteScroll>
                    </TableBody>
                </Table>
            </Box>
        )
    }
}

export default CommitView
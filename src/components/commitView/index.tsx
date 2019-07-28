import React from 'react'
import { Heading, Box, Table, TableHeader, TableRow, TableCell, TableBody, InfiniteScroll } from 'grommet';
import { Commit } from '../../models/commitNode'
import { gql, ApolloClient, ApolloQueryResult } from 'apollo-boost';
import { withApollo } from 'react-apollo';
import { Spinning } from 'grommet-controls'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime';

import * as style from './style.module.css'
dayjs.extend(relativeTime);

interface CommitQuery {
repository: {
    ref: {
      target: {
        history: {
          nodes: Commit[]
          pageInfo: {
              hasNextPage: Boolean,
              endCursor: string
          }
        }
      }
    } 
  }
}

interface Props {
    client: ApolloClient<any>
}

interface State {
    commits: Commit[]
    cursor: string | null
    allLoaded: Boolean | null
}

//TODO: configure dynamic number and repo
const GET_FIRST_COMMITS = gql`
query { 
  repository(owner: "connorhudson", name: "crossorigin.me") {
    ref(qualifiedName: "master") {
      target {
        ... on Commit {
          history(first: 30) {
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
            pageInfo {
              hasNextPage
              endCursor
            }
          }
        }
      }
    }
  }
}
`

const GET_MORE_COMMITS = gql`
query ($cursor: String!){ 
  repository(owner: "connorhudson", name: "crossorigin.me") {
    ref(qualifiedName: "master") {
      target {
        ... on Commit {
          history(first: 30, after: $cursor) {
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
            pageInfo {
              hasNextPage
              endCursor
            }
          }
        }
      }
    }
  }
}
`

class CommitView extends React.Component<Props, State> {
    private apollo: ApolloClient<any> | null
    constructor(props: Props) {
        super(props);
        this.state = {
            commits: [],
            cursor: null,
            allLoaded: null
        }
        this.apollo = null
    }

    async componentDidMount() {
        let result: ApolloQueryResult<CommitQuery>
        result = await this.props.client.query({
            query: GET_FIRST_COMMITS
        })

        const history = result.data.repository.ref.target.history 

        this.setState({
            commits: history.nodes.sort(this._sortByTime),
            cursor: history.pageInfo.endCursor,
            allLoaded: !history.pageInfo.hasNextPage
        })
    }

    render() {
        return (
            <Box
                gridArea="code"
            >
                <Heading level="3">Commits</Heading>
                <div style={{
                    minHeight: 0,
                    overflowY: "scroll",
                    scrollbarColor: "#aaa transparent"
                }}>
                {this.state.commits.length > 0 &&
                <Table style={{
                    tableLayout: "auto",
                    width: "100%"
                }}>
                    <TableHeader
                        style={{
                            position: "sticky",
                            top: "0px",
                            backgroundColor: "#fafafa"
                        }}
                    >
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
                            scrollableAncestor="window"
                            step={20}
                            items={this.state.commits}
                            onMore={() => this._loadMore()}
                        >
                            {(commit: Commit) => (
                                <TableRow
                                    key={commit.abbreviatedOid}
                                    className={style.commit}
                                    onClickCapture={() => console.log(commit.abbreviatedOid)}
                                >
                                    <TableCell>{dayjs(commit.authoredDate).fromNow()}</TableCell>
                                    <TableCell>{commit.abbreviatedOid}</TableCell>
                                    <TableCell>{commit.author.user ? commit.author.user.login : "unknown"}</TableCell>
                                    <TableCell>{commit.messageHeadline}</TableCell>
                                </TableRow>
                            )}
                        </InfiniteScroll>
                    </TableBody>
                </Table>
                }
                {!this.state.allLoaded ?
                <Box align="center" style={{margin: "0 auto"}}>
                    <Spinning kind='pulse' size='medium' />
                </Box>
                : null
                }
                </div>
            </Box>
        )
    }

    private _sortByTime(a: Commit, b: Commit) {
        const aDate = new Date(a.authoredDate)
        const bDate = new Date(b.authoredDate)

        return bDate.getTime() - aDate.getTime()
    }

    private async _loadMore() {
        console.warn("LOADING MORE")
        if (this.state.allLoaded) {
            return
        }

        let result: ApolloQueryResult<CommitQuery>

        result = await this.props.client.query({
            query: GET_MORE_COMMITS,
            variables: {cursor: this.state.cursor}
        })

        const history = result.data.repository.ref.target.history 


        this.setState({
            cursor: history.pageInfo.endCursor,
            commits: Array.from(new Set([
                ...this.state.commits,
                ...history.nodes
            ])).sort(this._sortByTime),
            allLoaded: !history.pageInfo.hasNextPage
        })
    }
}

export default withApollo(CommitView)
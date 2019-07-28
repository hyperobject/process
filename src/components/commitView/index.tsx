import React from 'react'
import { Heading, DataTable, Text, Box } from 'grommet';
import { CommitNode, Commit } from '../../models/commitNode'
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import { Spinning } from 'grommet-controls'

interface CommitQuery {
repository: {
    ref: {
      target: {
        history: {
          nodes: CommitNode[]
        }
      }
    } 
  }
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

const CommitView: React.SFC = () => {
    return (
        <Box
            gridArea="code"
        >
            <Heading level="3">Commits</Heading>
            <Query<CommitQuery>
                query={GET_ALL_COMMITS}
            >
                {({ loading, error, data, client }) => {
                    if (loading || !data) return(
                            <Spinning kind='pulse' size='medium' />
                    ) 
                    if (error) return `Error! ${error.message}`;
                    const commitData = data.repository.ref.target.history.nodes
                    console.warn(commitData)

                    return (
                        <DataTable
                            alignSelf="start"
                            columns={[
                                {
                                    property: 'abbreviatedOid',
                                    primary: true,
                                    header: <Text>Commit</Text>
                                },
                                {
                                    property: 'author',
                                    render: (datum: Commit) => <Text>{datum.author.user.login}</Text>,
                                    header: <Text>Author</Text>
                                }, 
                                {
                                    property: 'messageHeadline',
                                    header: <Text>Description</Text>
                                }
                            ]}
                            data={commitData}
                            style={{
                                height: "auto",
                                width: "100%"
                            }}
                        />
                    )
                }}
            </Query>
        </Box>
    )
}

export default CommitView
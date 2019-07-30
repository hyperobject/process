import React from 'react'
import { InfiniteScroll, Heading, Box } from 'grommet';
import Note from '../note';
import { Spinning } from 'grommet-controls'
import * as style from './style.module.css'
import { AppContextInterface, withAppContext } from '../../models/context';
import { ApolloClient, gql } from 'apollo-boost';
import Thought from '../../models/thought';
import dayjs from 'dayjs'
import { Query, QueryResult } from 'react-apollo';
import { Commit } from '../../models/commitNode';

interface NoteQuery {
    notes: Thought[]
}

const GET_NOTES = gql`
query Get_Notes($repoName: String!, $repoOwner: String!, $start: timestamptz, $end: timestamptz) {
    notes(where: {
        repository: {_eq: $repoName},
        _and: {
            owner: {_eq: $repoOwner},
            _and: {
                publishedAt: {_gte: $start}
                _and: {publishedAt: {_lte: $end}}
                }
            }
        }) {
        id
        content
        publishedAt
    }
}
`

interface Props {
    client: ApolloClient<any>
    sortByTime: (a: Thought, b: Thought) => number
    appContext?: AppContextInterface
}

interface State {
    thoughts: Thought[]
    loaded: Boolean
}

class AllNotes extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        
        this.state = {
            thoughts: [],
            loaded: false
        }

        if (!this.props.appContext || !this.props.appContext.currentCommit) {
            return
        }

        
    }

    public render() {
        if(!this.props.appContext) {
            return null
        }

        if (!this.props.appContext.currentCommit) {
            return null
        }
        const commit: Commit = this.props.appContext.currentCommit
        return(
            <Query query={GET_NOTES} variables={{
                repoName: this.props.appContext.repoName,
                repoOwner: this.props.appContext.repoOwner,
                start: dayjs(commit.authoredDate).subtract(1, 'hour').toISOString(),
                end: dayjs(commit.authoredDate).add(1, 'hour').toISOString()
            }}>
                {(result: QueryResult<NoteQuery>) => (
                    <div className={style.list}>
                    {!result.loading && result.data ?
                        result.data.notes.length > 0 ?
                        <InfiniteScroll
                            items={result.data.notes.sort(this.props.sortByTime)}
                            // show={sorted.length - 1}
                            // replace={true}
                            step={10}
                        >
                            {(thought) => (
                                <Note thought={thought}  key={`note-${thought.id}`}/> 
                            )}
                        </InfiniteScroll>
                        :
                            <Heading level="4">No notes found.</Heading>
                    :
                        <Box width="full" align="center" margin={{top: "small"}}>
                            <Spinning kind='pulse' size='medium' />
                        </Box>
                    }
                </div>
                )}
            </Query>
        )
    }
}

export default withAppContext(AllNotes)
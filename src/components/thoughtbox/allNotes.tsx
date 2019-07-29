import React from 'react'
import { InfiniteScroll, TextArea } from 'grommet';
import Note from '../note';
import { Mutation, MutationFunction } from 'react-apollo';
import { Spinning } from 'grommet-controls'
import * as style from './style.module.css'
import { AppContextInterface, withAppContext } from '../../models/context';
import { ApolloClient, gql, FetchResult } from 'apollo-boost';
import { DataProxy } from 'apollo-cache';
import Thought from '../../models/thought';

const GET_NOTES = gql`
query Get_Notes($repoName: String!, $repoOwner: String!) {
    notes(where: {repository: {_eq: $repoName}, _and: {owner: {_eq: $repoOwner}}}) {
        id
        content
        publishedAt
    }
}
`

const ADD_NOTE = gql`
mutation Add_Note($content: String!, $repoName: String!, $repoOwner: String!) {
    insert_notes(objects: {owner: $repoOwner, repository: $repoName, content: $content}) {
        returning {
            id
            content
            publishedAt
        }
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

        if (!this.props.appContext) {
            return
        }


        this.props.client.watchQuery({
            query: GET_NOTES,
            variables: {
                repoName: this.props.appContext.repoName,
                repoOwner: this.props.appContext.repoOwner
            }
        }).subscribe(
            result => this.setState({
                loaded: !result.loading,
                thoughts: Array.from(new Set([
                    ...result.data.notes,
                    ...this.state.thoughts
                ]))
            })
        )
    }
    public render() {
        return(
            <>
            <div className={style.list}>
                {this.state.loaded ?
                    <InfiniteScroll
                        items={this.state.thoughts.sort(this.props.sortByTime)}
                        // show={sorted.length - 1}
                        // replace={true}
                        onMore={() => {console.log("more items please")}}
                        step={10}
                    >
                        {(thought) => (
                            <Note thought={thought}  key={`note-${thought.id}`}/> 
                        )}
                    </InfiniteScroll>
                :
                    <Spinning kind='pulse' size='medium' />
                }
            </div>
            {this.state && this.state.loaded &&
            <Mutation<any, {content: string}> mutation={ADD_NOTE} update={this.updateCache.bind(this)}>
            {(addNote, {loading, data}) => {
                return(
                    <TextArea
                        placeholder="What are you thinking about?"
                        // onChange={}
                        onKeyPress={e => this._inputChange(e, addNote)} 
                        className={style.input}
                        size="medium"
                    />
                // <textarea
                //     className={style.input}
                //     placeholder="What are you thinking about?"
                //     onKeyPress={e => this._inputChange(e, addNote)}
                //     rows={4}
                // />
                )
            }}
            </Mutation>
            }
            </>
        )
    }

    private _inputChange(e: React.KeyboardEvent, submitInput: MutationFunction<any, any>) {
        if (e.key !== 'Enter' || e.shiftKey || !e.currentTarget || !this.props.appContext) {
            return
        }
        e.preventDefault()
        const target = e.currentTarget as HTMLInputElement
        if (target.value === '' || target.value.match(/\n+$/)) {
            return
        }
        
        submitInput({variables:{
            content: target.value,
            repoName: this.props.appContext.repoName,
            repoOwner: this.props.appContext.repoOwner
        }})
        target.value = ''

    }
    
    private updateCache(cache: DataProxy, { data }: FetchResult) {
        if (!data || !this.props.appContext) {
            return
        }
    
        // Fetch the todos from the cache
    
        const existingNotes: {notes: Thought[]} | null = cache.readQuery({
          query: GET_NOTES,
          variables: {
              repoName: this.props.appContext.repoName,
              repoOwner: this.props.appContext.repoOwner
          }
    
        });
    
        if (!existingNotes) {
            return
        }
        // Add the new todo to the cache
    
        const newNote: Thought = data.insert_notes.returning[0];
    
        cache.writeQuery({
    
          query: GET_NOTES,
          variables: {
            repoName: this.props.appContext.repoName,
            repoOwner: this.props.appContext.repoOwner
          },
    
          data: {notes: [newNote, ...existingNotes.notes]}
    
        });
    
      };
}

export default withAppContext(AllNotes)
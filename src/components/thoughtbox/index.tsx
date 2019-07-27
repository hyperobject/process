import React from 'react'
import Thought from "../../models/thought";
import Note from "../note";
import * as style from './style.module.css'
import gql from 'graphql-tag';
import { Query, Mutation, MutationFn, FetchResult } from 'react-apollo';
import { DataProxy } from 'apollo-cache';
import { Box, Heading, InfiniteScroll, TextArea } from 'grommet';
import { Spinning } from 'grommet-controls'

interface State {
    thoughts: Thought[]
    loaded: Boolean
}

const GET_NOTES = gql`
query Get_Notes {
    notes {
        id
        content
        publishedAt
    }
}
`

const ADD_NOTE = gql`
mutation Add_Note($content: String!) {
    insert_notes(objects: {owner: "connorhudson", repository: "process", content: $content}) {
        returning {
            id
            content
            publishedAt
        }
    }
}
`
export default class Thoughtbox extends React.Component<{}, State> {
    constructor() {
        super({})
        this.state = {
            thoughts: [],
            loaded: false
        }
    }
    public render() {
        return (
            <Box gridArea="notes" style={{
                maxHeight: "100%",
                padding: "10px"
            }}>
                {/* <div className={style.header}>
                    <h3>Thoughts</h3>
                    <p>What's on your mind?</p>
                </div> */}
                <Heading level="3">Notes</Heading>
                <div className={style.list}>
                    <Query<{notes: Thought[]}> query={GET_NOTES}>
                    {({ loading, error, data, client }) => {
                        console.log(client.typeDefs)
                        if (loading || !data) return(
                            <Box
                                style={{minHeight: '100%'}}
                            >
                                <Spinning kind='pulse' size='medium' />
                            </Box>
                        ) 
                        if (error) return `Error! ${error.message}`;
                        if (this.state && !this.state.loaded) {
                            this.setState((prev) => ({
                                ...prev,
                                loaded: true
                            }))
                        }
                        const sorted = data.notes.sort(this._sortByTime) 
                        return (
                            <InfiniteScroll
                                items={sorted}
                                // show={sorted.length - 1}
                                // replace={true}
                                onMore={() => {console.log("more items please")}}
                                step={10}
                            >
                                {(thought) => (
                                    <Note thought={thought}  key={`note-${thought.id}`}/> 
                                )}
                            </InfiniteScroll>
                        )
                    }}
                    </Query>
                </div>
                {this.state && this.state.loaded &&
                <Mutation<any, {content: string}> mutation={ADD_NOTE} update={this.updateCache}>
                {(addNote, {loading, data}) => {
                    return(
                        <TextArea
                            placeholder="What are you thinking about?"
                            // onChange={}
                            onKeyPress={e => this._inputChange(e, addNote)} 
                            className={style.input}
                            size="small"
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
            </Box>
        )
    }

    private _inputChange(e: React.KeyboardEvent, submitInput: MutationFn<any, any>) {
        if (e.key !== 'Enter' || e.shiftKey || !e.currentTarget) {
            return
        }
        e.preventDefault()
        const target = e.currentTarget as HTMLInputElement
        if (target.value === '' || target.value.match(/\n+$/)) {
            return
        }
        
        submitInput({variables: {content: target.value}})
        target.value = ''

    }

    private _sortByTime(a: Thought, b: Thought) {
        const aDate = new Date(a.publishedAt)
        const bDate = new Date(b.publishedAt)
        return bDate.getTime() - aDate.getTime()
    }

    private updateCache(cache: DataProxy, { data }: FetchResult) {
        if (!data) {
            return
        }
    
        // Fetch the todos from the cache
    
        const existingNotes: {notes: Thought[]} | null = cache.readQuery({
    
          query: GET_NOTES
    
        });
    
        if (!existingNotes) {
            return
        }
        // Add the new todo to the cache
    
        const newNote: Thought = data.insert_notes.returning[0];
    
        cache.writeQuery({
    
          query: GET_NOTES,
    
          data: {notes: [newNote, ...existingNotes.notes]}
    
        });
    
      };
}
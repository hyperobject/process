import React from 'react'
import Remarkable from 'remarkable'
import Thought from "../../models/thought";
import Note from "../note";
import * as style from './style.module.css'
import gql from 'graphql-tag';
import { Query, Mutation, MutationFn } from 'react-apollo';

interface State {
    thoughts: Thought[]
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
    private md: Remarkable

    public constructor() {
        super({})
        this.md = new Remarkable()
    }
    public render() {
        return (
            <div className={style.thoughtbox}>
                <div className={style.header}>
                    <h3>Thoughts</h3>
                    <p>What's on your mind?</p>
                </div>
                <div className={style.list}>
                    <Query<{notes: Thought[]}> query={GET_NOTES}>
                    {({ loading, error, data, client }) => {
                        console.log(client.typeDefs)
                        if (loading || !data) return "Loading...";
                        if (error) return `Error! ${error.message}`;
                        return (
                            data.notes.sort(this._sortByTime).map(thought => (
                                <Note thought={thought} markdown={this.md} key={`note-${thought.id}`}/> 
                             ))
                        )
                    }}
                    </Query>
                </div>
                <Mutation<any, {content: string}> mutation={ADD_NOTE}>
                {(addNote, {loading, data}) => {
                    return(
                    <textarea
                        className={style.input}
                        placeholder="What are you thinking about?"
                        onKeyPress={e => this._inputChange(e, addNote)}
                        rows={4}
                    />
                    )
                }}
                </Mutation>
            </div>
        )
    }

    private _inputChange(e: React.KeyboardEvent, submitInput: MutationFn<any, any>) {
        if (e.key !== 'Enter' || e.shiftKey || !e.currentTarget) {
            return
        }
        const target = e.currentTarget as HTMLInputElement

        submitInput({variables: {content: target.value}})
        // TODO: handle cache update
        target.value = ''

    }

    private _sortByTime(a: Thought, b: Thought) {
        const aDate = new Date(a.publishedAt)
        const bDate = new Date(b.publishedAt)
        return aDate.getTime() - bDate.getTime()
    }
}
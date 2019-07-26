import React from 'react'
import Remarkable from 'remarkable'
import Thought from "../../models/thought";
import Note from "../note";
import * as style from './style.module.css'

interface State {
    thoughts: Thought[]
}
export default class Thoughtbox extends React.Component<{}, State> {
    public state = {
        thoughts: []
    }
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
                    {
                        this.state.thoughts.sort(this._sortByTime).map(thought => (
                           <Note thought={thought} markdown={this.md}/> 
                        ))
                    }
                </div>
                <textarea
                    className={style.input}
                    placeholder="What are you thinking about?"
                    onKeyPress={e => this._inputChange(e)}
                    rows={4}
                />
            </div>
        )
    }

    private _inputChange(e: React.KeyboardEvent) {
        if (e.key !== 'Enter' || e.shiftKey || !e.currentTarget) {
            return
        }
        const target = e.currentTarget as HTMLInputElement

        this.setState({
            thoughts: Array.prototype.concat(this.state.thoughts, {
                time: Date.now(),
                text: target.value
            })
        })
        target.value = ''
    }

    private _sortByTime(a: Thought, b: Thought) {
        return a.time - b.time
    }
}
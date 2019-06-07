import { Component, h } from "preact";

import Remarkable from 'remarkable'
import Thought from "../../models/thought";
import Note from "../note";
import * as style from './style.css'

interface State {
    thoughts: Thought[]
}
export default class Thoughtbox extends Component<{}, State> {
    public state = {
        thoughts: []
    }
    private md: Remarkable

    public constructor() {
        super()
        this.md = new Remarkable()
    }
    public render({}, { thoughts }: State) {
        return (
            <div class={style.thoughtbox}>
                <div class={style.header}>
                    <h3>Thoughts</h3>
                    <p>What's on your mind?</p>
                </div>
                <div class={style.list}>
                    {
                        thoughts.sort(this._sortByTime).map(thought => (
                           <Note thought={thought} markdown={this.md}/> 
                        ))
                    }
                </div>
                <input
                    class={style.input}
                    type="text"
                    placeholder="What are you thinking about?"
                    onKeyPress={e => this._inputChange(e)}
                />
            </div>
        )
    }

    private _inputChange(e: KeyboardEvent) {
        if (e.key !== 'Enter' || !e.currentTarget) {
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
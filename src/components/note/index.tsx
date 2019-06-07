import { FunctionalComponent, h } from "preact";
import Thought from "../../models/thought";
import * as style from './style.css'

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';


dayjs.extend(relativeTime);

interface Props {
    thought: Thought
    markdown: Remarkable
}

const Note: FunctionalComponent<Props> = ({thought, markdown, ...props}) => (
    <div class={style.note} key={thought.time}>
        <span class={style.date}>{dayjs(thought.time).fromNow()}</span>
        <p class={style.text} dangerouslySetInnerHTML={{__html: markdown.render(thought.text)}} />
    </div>
)

export default Note
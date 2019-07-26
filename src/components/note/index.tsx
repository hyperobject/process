import React from 'react'
import Thought from "../../models/thought";
import * as style from './style.module.css'

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';


dayjs.extend(relativeTime);

interface Props {
    thought: Thought
    markdown: Remarkable
}

const Note: React.SFC<Props> = ({thought, markdown, ...props}) => (
    <div className={style.note} key={thought.time}>
        <span className={style.date}>{dayjs(thought.time).fromNow()}</span>
        <p className={style.text} dangerouslySetInnerHTML={{__html: markdown.render(thought.text)}} />
    </div>
)

export default Note
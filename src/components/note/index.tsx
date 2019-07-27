import React from 'react'
import Thought from "../../models/thought";
import * as style from './style.module.css'

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Markdown } from 'grommet';


dayjs.extend(relativeTime);

interface Props {
    thought: Thought
}

const Note: React.SFC<Props> = ({thought, ...props}) => (
    <div className={style.note} key={thought.id}>
        <span className={style.date}>{dayjs(thought.publishedAt).fromNow()}</span>
        <Markdown>{thought.content}</Markdown>
        {/* <p className={style.text} dangerouslySetInnerHTML={{__html: markdown.render(thought.content)}} /> */}
    </div>
)

export default Note
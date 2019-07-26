import React from 'react'
import Thoughtbox from "../../components/thoughtbox";
import * as style from "./style.module.css";

interface Props {
}

interface State {
}
export default class Project extends React.Component<Props, State> {
    public render() {
        return (
            <div className={style.project}>
                <Thoughtbox />
                <div className={style.code} />
                {/* <div class={style.docs} >
                    <img src="/assets/placeholder.png" />
                    <img src="/assets/placeholder.png" />
                    <img src="/assets/placeholder.png" />
                    <div class={style.addImage}>+</div>
                </div> */}
            </div>
        );
    }
}

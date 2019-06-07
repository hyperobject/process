import { Component, h } from "preact";
import Thoughtbox from "../../components/thoughtbox";
import * as style from "./style.css";

interface Props {
}

interface State {
}
export default class Project extends Component<Props, State> {
    public render({}: Props, {}: State) {
        return (
            <div class={style.project}>
                <Thoughtbox />
                <div class={style.code} />
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

import { Component, h } from "preact";
import { Link } from "preact-router/match";
import * as style from "./style.css";

interface Props {}
export default class Home extends Component<Props> {
    public render() {
        return (
            <div class={style.home}>
                <div class={style.modal}>
                    <h3>Start a new project</h3>
                    <em>todo: add a form here, as well as sign up</em>
                    <Link href="/project" activeClassName="">New Project</Link>
                </div>
            </div>
        );
    }
}

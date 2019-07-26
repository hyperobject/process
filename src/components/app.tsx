import React from 'react';
import Project from "../routes/project";
import Header from "./header";

import * as style from '../style/app.module.css'

export default class App extends React.Component {
    // public currentUrl?: string;
    // public handleRoute = (e: RouterOnChangeArgs) => {
    //     this.currentUrl = e.url;
    // };

    public render() {
        return (
            <div id={style.app}>
                    <Header />
                    <Project />
            </div>
        );
    }
}

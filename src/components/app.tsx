import React from 'react';
import Project from "../routes/project";
import Header from "./header";

import * as style from '../style/app.module.css'
import { Grid } from 'grommet';

export default class App extends React.Component {
    // public currentUrl?: string;
    // public handleRoute = (e: RouterOnChangeArgs) => {
    //     this.currentUrl = e.url;
    // };

    public render() {
        return (
            <div id={style.app}>
            <Grid
                columns={["full"]}
                rows={["xxsmall", "flex"]}
                areas={[
                    { name: "appbar", start: [0,0], end: [0,0] },
                    { name: "project", start: [0,1], end: [0,1] }
                ]}
                style={{overflow: "hidden", maxHeight: "100vh"}}
            >
                <Header />
                <Project />
            </Grid>
            </div>
        );
    }
}

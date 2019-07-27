import React from 'react';
import Project from "../routes/project";
import Header from "./header";

import * as style from '../style/app.module.css'
import { Grid, Heading } from 'grommet';

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
                rows={["xxsmall", "xxsmall", "flex"]}
                areas={[
                    { name: "appbar", start: [0,0], end: [0,0] },
                    { name: "repo", start: [0,1], end: [0,1] },
                    { name: "project", start: [0,2], end: [0,2] }
                ]}
                style={{overflow: "hidden", maxHeight: "100vh", minHeight: "100vh"}}
                gap="small"
            >
                <Header />
                <Heading level="2" gridArea="repo" margin="none">chudson/CodeProject</Heading>
                <Project />
            </Grid>
            </div>
        );
    }
}

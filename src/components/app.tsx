import React from 'react';
import Project from "../routes/project";
import Header from "./header";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import * as style from '../style/app.module.css'


const client = new ApolloClient({
  uri: "https://48p1r2roz4.sse.codesandbox.io"
});


export default class App extends React.Component {
    // public currentUrl?: string;
    // public handleRoute = (e: RouterOnChangeArgs) => {
    //     this.currentUrl = e.url;
    // };

    public render() {
        return (
            <ApolloProvider client={client}>
            <div id={style.app}>
                    <Header />
                    <Project />
            </div>
            </ApolloProvider>
        );
    }
}

import React from 'react'
import Thought from "../../models/thought";
import { withApollo } from 'react-apollo';
import { Box, Heading, Tabs, Tab } from 'grommet';
import { ApolloClient } from 'apollo-boost';
import { withAppContext, AppContextInterface } from '../../models/context';
import AllNotes from './allNotes';
import CommitNotes from './commitNotes';

interface Props {
    client: ApolloClient<any>
    appContext?: AppContextInterface
}


class Thoughtbox extends React.Component<Props> {
    public render() {
        if (!this.props.appContext) {
            return null
        }
        return (
            <Box gridArea="notes" style={{
                maxHeight: "100%",
                padding: "10px"
            }}>
                <Heading level="3">Notes</Heading>
                    <Tabs
                        activeIndex={this.props.appContext.currentTab}
                        onActive={(tab) => this.props.appContext ? this.props.appContext.setTab(tab) : null}
                        style={{height: "100%"}}
                    >
                        <Tab title={"all"}>
                            <AllNotes client={this.props.client} sortByTime={this._sortByTime}/>
                        </Tab>
                        {this.props.appContext.currentCommit &&
                        <Tab title={this.props.appContext.currentCommit.abbreviatedOid}>
                            <CommitNotes client={this.props.client} sortByTime={this._sortByTime}/>
                        </Tab>
                        }
                    </Tabs>
            </Box>
        )
    }



    private _sortByTime(a: Thought, b: Thought) {
        const aDate = new Date(a.publishedAt)
        const bDate = new Date(b.publishedAt)
        return bDate.getTime() - aDate.getTime()
    }


}

export default withAppContext(withApollo(Thoughtbox))
import React from 'react'
import Thought from "../../models/thought";
import { withApollo } from 'react-apollo';
import { Box, Heading, Grid, Tabs, Tab } from 'grommet';
import { ApolloClient } from 'apollo-boost';
import { withAppContext, AppContextInterface } from '../../models/context';
import AllNotes from './allNotes';

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
                <Grid
                    columns={["full"]}
                    rows={["flex", "75px"]}
                    areas={[
                        { name: "notes-list", start: [0,0], end: [0,0] },
                        { name: "notes-field", start: [0,1], end: [0,1] }
                    ]}
                >
                    <Tabs
                        activeIndex={this.props.appContext.currentTab}
                        onActive={(tab) => this.props.appContext ? this.props.appContext.setTab(tab) : null}
                    >
                        <Tab title={"all"}>
                            <AllNotes client={this.props.client} sortByTime={this._sortByTime}/>
                        </Tab>
                        {this.props.appContext.currentCommit &&
                        <Tab title={this.props.appContext.currentCommit.abbreviatedOid}></Tab>
                        }
                    </Tabs>
                </Grid>
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
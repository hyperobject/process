import React from 'react'
import Thoughtbox from "../../components/thoughtbox";
import CommitView from '../../components/commitView'
// import * as style from "./style.module.css";
import { Grid } from 'grommet';

interface Props {
}

interface State {
}
export default class Project extends React.Component<Props, State> {
    public render() {
        return (
            // <Box overflow={{ horizontal: 'hidden' }}>
                <Grid
                    columns={["flex", "1/3"]}
                    rows={["full"]}
                    gap="small"
                    areas={[
                        { name: "code", start: [0,0], end: [0,0] },
                        { name: "notes", start: [1,0], end: [1,0] }
                    ]}
                    gridArea="project"
                    style={{minHeight: 0}}
                >
                    <CommitView />
                    <Thoughtbox />
                </Grid>
            // </Box>
                // <Thoughtbox />
                // <div className={style.code} />
        );
    }
}

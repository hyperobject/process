import React from 'react'
import { Grid, Heading } from 'grommet';

const CommitView: React.SFC = () => {
    return (
        <Grid
            gridArea="code"
            columns={["flex"]}
            rows={["xxsmall", "flex"]}
            margin={"small"}
            areas={[
                { name: "title", start:[0,0], end:[0,0] },
                { name: "list", start:[0,1], end:[0,1] }
            ]}
            gap="small"
            fill
        >
            <Heading level="3" gridArea="title" margin="none">Commits</Heading>
        </Grid>
    )
}

export default CommitView
import React from 'react'
// import * as style from "./style.module.css";
import { Heading, Box } from 'grommet';

export default class Header extends React.Component {
    public render() {
        return (
             <Box
                tag='header'
                direction='row'
                align='center'
                justify='between'
                background='brand'
                pad={{ left: '10px', right: 'small', vertical: 'small' }}
                elevation='medium'
                style={{ zIndex: 1 }}
                gridArea="appbar"
            >
                <Heading level="3" margin="none">Process</Heading>
            </Box>
        );
    }
}

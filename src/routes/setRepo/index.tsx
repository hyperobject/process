import React from 'react'
import { AppContextInterface, withAppContext } from '../../models/context';
import { Box, Heading, TextInput, Button } from 'grommet';
import * as style from './style.module.css'

interface Props {
    appContext?: AppContextInterface
}

const SetRepo = (props: Props) => {
    if (!props.appContext) {
        return null
    }

    const ownerRef = React.createRef<any>()
    const nameRef = React.createRef<any>()

    const handleSubmit = () => {
        const owner = ownerRef.current.value
        const name = nameRef.current.value
        if (owner === '' || name === '' || !props.appContext) {
            return
        }

        props.appContext.setRepo(owner, name)
    }

    return (
        <Box width="full" align="center" gridArea="project">
            <Heading level="1">Please select a GitHub repository</Heading>
            <Box margin={{top: "small"}} direction="column" className={style.form}>
                <TextInput ref={ownerRef} placeholder="Repository Owner" size="large"/>
                <TextInput ref={nameRef} placeholder="Repository Name" size="large"/>
                <Button label="Select" style={{width: "100%"}} onClickCapture={() => handleSubmit()}/>
            </Box>
        </Box>
    )
}

export default withAppContext(SetRepo)
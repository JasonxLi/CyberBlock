import * as React from 'react';
import { Box, Typography, Card, FormGroup, FormControl, FormControlLabel, Radio, } from '@material-ui/core';
import { Context } from '../../context/ContextProvider';
import { useContext } from 'react';

const GameInterFace = ({ children, rolledAttack }) => {

    const {selectedDefenses, userEarnings} =useContext(Context);

    const cardStyling = {
        display: 'inline-block', mx: '2px', transform: 'scale(0.8)',
        minWidth: 275, minHeight: 150
    }
    
    console.log(selectedDefenses)
    return(
        <Box sx={cardStyling}>
            <Card variant="outlined" >
                <Typography>{`Host rolled ${rolledAttack}`} </Typography>
            </Card>

            <Box >
                <FormControl  component="fieldset" variant="standard">
                    <FormGroup>
                    {selectedDefenses.map(item =>{
                        return(
                        <Card sx={cardStyling}>
                            {item.defenseName}
                                <FormControlLabel
                                    control={
                                    <Radio
                                        key={item.defenseName}
                                    />
                                    }
                                />
                        </Card>);
                    })}
                    </FormGroup>
                </FormControl>
            </Box>


        </Box>
    )


}
export default GameInterFace
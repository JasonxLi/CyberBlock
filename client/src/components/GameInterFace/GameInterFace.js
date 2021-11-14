import * as React from 'react';
import { Box, Typography, Card, FormGroup, FormControl, FormControlLabel, Radio, CardContent, CardActions, Grid} from '@material-ui/core';
import { Context } from '../../context/ContextProvider';
import { useContext } from 'react';

const GameInterFace = ({ children, rolledAttack }) => {

    const {selectedDefenses} =useContext(Context);

    const boxStyling={
        m:'20px',
        p:'10px'
    }
    const cardStyling={
        ...boxStyling,
        width:'200%'

    }
    
    return(
        <Box  >
            <Box sx={boxStyling}>
                <Card >
                    <CardContent>
                        <Typography  align ='center' variant='h6' color="text.secondary" gutterBottom>
                        {`Host rolled ${rolledAttack}`}
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        
            <Grid container spacing={1}>
                <Grid item xs="auto">
                <FormControl  component="fieldset" variant="standard">
                    <FormGroup>
                    {selectedDefenses.map(item =>{
                        return(
                            <Box sx={cardStyling} >
                                <Card>
                                    <CardContent >
                                        <Typography variant='h7' align ='center' color="text.secondary" gutterBottom>
                                            {item.defenseName}
                                            </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <FormControlLabel
                                            control={
                                            <Radio
                                                key={item.defenseName}
                                            />
                                            }
                                        />
                                    </CardActions>
                                </Card>
                            </Box>);
                    })}
                    </FormGroup>
                </FormControl>
                </Grid>
            </Grid>


        </Box>
    )


}
export default GameInterFace;
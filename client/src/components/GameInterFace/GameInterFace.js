import * as React from 'react';
import { Box, Typography, Card, FormGroup, FormControl, FormControlLabel, Radio, CardContent, CardActions  } from '@material-ui/core';
import { Context } from '../../context/ContextProvider';
import { useContext } from 'react';
import  {styled}  from '@material-ui/styles';

const GameInterFace = ({ children, rolledAttack }) => {

    const {selectedDefenses} =useContext(Context);

    const boxStyling={
        m:'20px',
        p:'10px',
       
    }
    const cardStyling={
        m:'20px',
        p:'10px',
        width:'150%'
    }
    const handleChange=(id)=>{
        console.log(id)
    }
 
    
    return(
        <Box sx={{alignItems:'center', justifyContent:'center', p:'5%'}} >
            <Box sx={boxStyling}>
                <Card >
                    <CardContent>
                        <Typography  align ='center' variant='h6' color="text.secondary" gutterBottom>
                        {`Host rolled ${rolledAttack}`}
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        
           
            <FormControl  component="fieldset" variant="standard">
                <FormGroup>
                {selectedDefenses.map(item =>{
                    return(
                        <Box sx={cardStyling}>
                            <Card >
                                <CardContent>
                                    <FormControlLabel
                                        control={
                                        <Radio
                                            key={item.defenseName}
                                            onChange={handleChange(item.defenseID)}
                                        />
                                        }
                                    />
                                
                                    <Typography variant='h7' align ='center' color="text.secondary" gutterBottom>
                                        {item.defenseName}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Box>
                        );
                })}
                </FormGroup>
            </FormControl>
        </Box>
    
    )


}
export default GameInterFace;
import * as React from 'react';
import { Box, Typography, Card, CardContent, Button, Grid } from '@material-ui/core';
import { Context } from '../../context/ContextProvider'
import { useState, useContext } from 'react';


const GameInterFace = ({ rolledAttack, attackId, pointTable }) => {

    const { selectedDefenses } = useContext(Context);
    const [points, setPoints] = useState(0)

    const boxStyling = {
        m: '20px',
        p: '10px',
    }

    const handleChange = (defenseID) => {

        pointTable.map((item) => {
            if (item.Attack_ID === attackId && item.Defense_ID === defenseID) {
                setPoints(points + item.PointValue)
            }
        })
    }

    return (
        <Box sx={boxStyling} >
            <Typography color="text.secondary" >Points:{points}</Typography>

            <Box sx={{ m: '30px' }}>
                <Card >
                    <CardContent>
                        <Typography align='center' variant='h6' color="text.secondary" gutterBottom>
                            {`Attack rolled: ${rolledAttack}`}
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
            <Grid container spacing={8}  >

                {selectedDefenses.map(item => {
                    return (
                        <Grid item >
                            <Button variant="contained" size='large' color='blue' onClick={() => handleChange(item.defenseID)}>
                                <Typography variant='h7' align='center' color="text.secondary" gutterBottom>
                                    {item.defenseName}
                                </Typography>
                            </Button>
                        </Grid>
                    );
                })}

            </Grid >
        </Box>

    )


}
export default GameInterFace;
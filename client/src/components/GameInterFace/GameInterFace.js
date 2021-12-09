import * as React from 'react';
import { Box, Typography, Card, CardContent, Button, Grid,Modal } from '@material-ui/core';
import { Context } from '../../context/ContextProvider'
import { useState, useContext } from 'react';


const GameInterface = ({ rolledAttack, attackId, pointTable, teamNumber }) => {

    const { selectedDefenses } = useContext(Context);
    const [points, setPoints] = useState([0])
    const[selectedItems, setSelectedItems] =useState([])
    const[count, setCount]=useState(0)

    const boxStyling = {
        m: '20px',
        p: '10px',
    }
    console.log(pointTable)
    
    const handleChange = (defenseID, defenseName) => {
        
        if(count < 2 ) {
           
            setCount(count + 1 );
            const tempDefense = {
                defenseName: defenseName,
                defenseID: defenseID,
            }
            setSelectedItems([...selectedItems, tempDefense])
        }
        else{
            const tempDefense = {
                defenseName: defenseName,
                defenseID: defenseID,
            }
            setSelectedItems( [...selectedItems.slice(1), tempDefense])   
        }
    }
    const checkPoints =()=>{
         const currentIndex = [...points];

        selectedItems.map(defense =>{
            pointTable.map((item) => {
                if (item.Attack_ID === attackId && item.Defense_ID === defense.defenseID) {
                    let tempIndex = { ...currentIndex[teamNumber-1] }
                    tempIndex = tempIndex+ item.PointValue ;
                    currentIndex[teamNumber-1] = tempIndex
                    setPoints(currentIndex)
                }
            })
        })
    }
    console.log(points)
    
    return (
        <Box sx={boxStyling} >
            <Typography color="text.secondary" >Points:{points}</Typography>

            <Box sx={{ m: '30px' }}>
                <Card >
                    <CardContent>
                        <Typography align='center' variant='h6' color="text.secondary" gutterBottom>
                            {`Attack rolled: ${rolledAttack.Name} `}
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
            <Grid container spacing={8}  >

                {selectedDefenses.map(item => {
                    return (
                        <Grid item >
                            <Button variant="contained" size='large' color='blue' onClick={() => handleChange(item.defenseID, item.defenseName)}>
                                <Typography variant='h7' align='center' color="text.secondary" gutterBottom>
                                    {item.defenseName}
                                </Typography>
                            </Button>
                        </Grid>
                    );
                })}

            </Grid >
            <Box sx={boxStyling}>
                <Box sx={{m:'10px'}}>
                    <Typography>Selected Defense: </Typography>
                </Box>
                <Card>
                    <Box sx={{m:'10px'}}>
                    {selectedItems.map(item =>{
                        return(
                        <Typography>{item.defenseName}</Typography>
                        )
                    })}
                    </Box>
                </Card>
            </Box>
            <br></br>
            <br></br>
            <Button variant='contained' onClick={checkPoints()} >Submit</Button>
          

        </Box>

    )


}
export default GameInterface;
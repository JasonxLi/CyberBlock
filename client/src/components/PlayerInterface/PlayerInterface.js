import * as React from 'react';
import { useState } from 'react';
import { Box, Typography, TableContainer, Table, TableBody, TableRow, TableCell, Button, TableHead, FormGroup, FormControl, FormControlLabel,Checkbox} from '@material-ui/core'

const PlayerInterface = ({userDefenses, setEndBuyPhase}) => {
    const boxStyling ={
        p:6,
        minWidth:'85%'
    }
    const[userEarnings, setUserEarnings]= useState(30);
    const [selectedDefenses, setSelectedDefenses]=useState([]);
    const getUserDefense =(name,cost)=>{
        
        const tempDefense= {
            defenseName : name,
            
            defenseCost : cost
            
        }
        setSelectedDefenses([ ...selectedDefenses,tempDefense])

       
        

        setUserEarnings(userEarnings-cost);
        
    }
    // const endPhase= {
    //     setEndBuyPhase(true);

    // }
    

    return (
        <Box sx={boxStyling}>
           
            <Box >
                
                {/* <Typography variant='h7'm> Round No: 4</Typography><br></br>
               <Typography variant='h7'> Points Accquired: 458</Typography><br></br> */}
               <Typography variant='h7'> Earnings:${userEarnings}</Typography>
            </Box>
            <br></br>
            <br></br>
            <TableContainer >
                <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                    <TableHead >
                        <TableRow>
                        <TableCell>Defense</TableCell>
                        <TableCell align="right">Points </TableCell>
                        <TableCell align="right">Submission</TableCell>
                        
                    </TableRow>
                    </TableHead>
                    <TableBody>
                      
                        {userDefenses.map((row) => (
                            <TableRow key={row.label}>
                            <TableCell component="th" scope="row">
                                {row.label}
                            </TableCell>
                            <TableCell style={{ width: 160 }} align="right">
                                {row.cost}
                            </TableCell>
                           
                                    <TableCell style={{ width: 160 }} align="right">
                                    <FormControl  component="fieldset" variant="standard">
                                    
                                    <FormGroup>
                              
                                        <FormControlLabel
                                            control={
                                            <Checkbox 
                                            checked={row.name}
                                            onChange={()=> getUserDefense(row.name,row.cost)}
                                             />
                                            }
                                            
                                        />
                                         </FormGroup>
                                    </FormControl>
                                   
                            </TableCell>
                                   
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer><br></br>
            <Button variant='contained' >Submit</Button>
            
        </Box>

    );

}
export default PlayerInterface;
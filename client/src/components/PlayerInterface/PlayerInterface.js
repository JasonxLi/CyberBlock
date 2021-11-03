import * as React from 'react';
import { Box, Typography, TableContainer, Table, TableBody, TableRow, TableCell, Button, TableHead, FormGroup, FormControl, FormControlLabel,Checkbox} from '@material-ui/core'

const HostInterFace = ({ children}) => {
    const boxStyling ={
        p:6,
        minWidth:'85%'
    }
    const createData=(Defense, Points) => {
        return { Defense,Points};
    }
    
    const rows = [
  
    createData('Uniquely Identify Devices (Serial Numbers)', 305),
    createData('Traceable Supply Chain', 452),
  

    ]

    return (
        <Box sx={boxStyling}>
            <Box >
                
                <Typography variant='h7'm> Round No: 4</Typography><br></br>
               <Typography variant='h7'> Points Accquired: 458</Typography><br></br>
               <Typography variant='h7'> Earnings:$30 </Typography>
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
                        {rows.map((row) => (
                            <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                                {row.Defense}
                            </TableCell>
                            <TableCell style={{ width: 160 }} align="right">
                                {row.Points}
                            </TableCell>
                           
                                    <TableCell style={{ width: 160 }} align="right">
                                    <FormControl  component="fieldset" variant="standard">
                                    
                                    <FormGroup>
                              
                                        <FormControlLabel
                                            control={
                                            <Checkbox checked={row.name}  />
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
            <Button variant='contained'>Submit</Button>
            
        </Box>

    );

}
export default HostInterFace;
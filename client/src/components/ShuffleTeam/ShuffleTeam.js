import * as React from 'react';
import { Box, TableContainer, Table, TableBody, TableRow, TableCell, TableHead, FormControl,InputLabel,Select,MenuItem,} from '@material-ui/core'
import {  useState, useContext } from 'react';
import { Context} from '../../context/ContextProvider'

const ShuffleTeam = ({ children}) => {
    const {teamInfo, host_move_student, lobbyId }= useContext(Context);

    const handleChange =(newTeamId, socketId,oldTeamId )=>{
       
        host_move_student(lobbyId,socketId, oldTeamId, newTeamId)

    }
    console.log(teamInfo);
    return (
        <Box>
            <TableContainer >
                <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                    <TableHead >
                        <TableRow>
                            <TableCell >Team</TableCell>
                            <TableCell align="right" sx={{ minWidth: 300 }}>Members</TableCell>
                        </TableRow> 
                    </TableHead>
                    {teamInfo.map((item, index) =>{
                        return(
                            <TableBody>
                                <TableRow key={index+1}>
                                <TableCell component="th" scope="child">
                                    Team {index+1}
                                </TableCell>
                                    {item.map(child =>{
                                        return(
                                        <TableCell  align="right">
                                        {child.alias}
                                        
                                        <FormControl fullWidth >
                                        <InputLabel id="select-label-round" >Switch</InputLabel>
                                        <Select
                                            label="Round"
                                            onChange={(event)=> handleChange(event.target.value, child.socketId, index+1)}
                                        >
                                            {teamInfo.map((item, index) =>
                                            <MenuItem value={index+1}>{index+1}</MenuItem>
                                            )}
                                        </Select>
                                    </FormControl>
                                    </TableCell>
                                    
                                    )})}
                                    </TableRow>
                            </TableBody>
                        )
                    })}   
                </Table>
            </TableContainer>
        </Box>
    )


}
export default ShuffleTeam;

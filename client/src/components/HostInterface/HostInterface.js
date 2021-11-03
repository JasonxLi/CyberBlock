import * as React from 'react';
import { Box, TableContainer, Table, TableBody, TableRow, TableCell} from '@material-ui/core'

const HostInterFace = ({ children, }) => {


   const createData=(teamName, totalPoints, roundNumber) => {
        return { teamName, totalPoints, roundNumber};
      }
      
      const rows = [
        createData('Team Name', 'Total Points', 'Round No'),
        createData('Team 1', 305, 4),
        createData('Team 2', 452, 4),

      ].sort((a, b) => (a.totalPoints > b.totalPoints ? -1 : 1));
  
    return (
    
        <Box >
            <TableContainer >
                <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                                {row.teamName}
                            </TableCell>
                            <TableCell style={{ width: 160 }} align="right">
                                {row.totalPoints}
                            </TableCell>
                            <TableCell style={{ width: 160 }} align="right">
                                {row.roundNumber}
                            </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {children}
           
        </Box>
       
    )
}
export default HostInterFace;
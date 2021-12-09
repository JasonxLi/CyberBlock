import * as React from 'react';
import { Box, TableContainer, Table, TableBody, TableRow, TableCell, TableHead, Button } from '@material-ui/core'
import { useContext } from 'react';
import { Context } from '../../context/ContextProvider'

const PlayerInfromation = ({}) => {
    
    const { currentLead, teamInfo, nbOfRounds, roundCount,setCurrentLead } = useContext(Context)
   
    // const leaderPhase= ()=>{
    //     var playerIndex = 0;
    //     const leadSwitch = nbOfRounds / teamInfo.length

    //     if (roundCount % Math.ceil(leadSwitch) === 0) {
    //         const tempLeader = [...currentLead];
    //         teamInfo.map((team, index) => {

    //             let tempLeaderIndex = { ...tempLeader[index] }
    //             tempLeaderIndex = team[playerIndex].socketId
    //             tempLeader[index] = tempLeaderIndex
                
    //             setCurrentLead(tempLeader)
    //         })

    //         playerIndex++
    //     }
    // }
    // console.log(currentLead)
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
                    {teamInfo.map((item, index) => {
                        return (
                            <TableBody>
                                <TableRow key={index + 1}>
                                    <TableCell component="th" scope="child">
                                        Team {index + 1}
                                    </TableCell>
                                    {item.map(child => {
                                        return (
                                            <TableCell align="right">
                                                {child.alias}
                                            </TableCell>
                                        )
                                    })}
                                </TableRow>
                            </TableBody>
                        )
                    })}
                </Table>
            </TableContainer>
           
        </Box>
    )


}
export default PlayerInfromation;

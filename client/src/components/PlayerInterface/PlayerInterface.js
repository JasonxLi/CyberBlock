import * as React from 'react';
import { useState,useContext, useEffect } from 'react';
import { Box, Typography, TableContainer, Table, TableBody, TableRow, TableCell, Button, TableHead, FormGroup, FormControl, FormControlLabel,Checkbox, Card, CardContent} from '@material-ui/core'
import { Context } from '../../context/ContextProvider';


const PlayerInterface = ({userDefenses, }) => {

    const {selectedDefenses, setSelectedDefenses, setEndBuyPhase, userEarnings, setUserEarnings, alias, teamInfo, currentLead, roundCount, nbOfRounds,setCurrentLead } =useContext(Context)
    const boxStyling ={
        p:6,
        minWidth:'85%'
    }
    
    var teamNumber=0;

    const [isLeader, setisLeader] =useState(false)
    const [isChecked, setIsChecked] =useState([]);
    

    const removeDefense = (index, cost) =>{
           
        const tempDefenseList = [
            ...selectedDefenses.slice(0,index),
            ...selectedDefenses.slice(index+1,selectedDefenses.length)
        ]
        setSelectedDefenses(tempDefenseList);
        setUserEarnings(userEarnings+cost);
    }
    const getUserDefense = ( value, name,cost,index, id)=>{
       
        const currentIndex = [...isChecked];
        let tempIndex ={...currentIndex[index]}
        tempIndex =value;
        currentIndex[index] = tempIndex
        setIsChecked(currentIndex)
        

        if( !value && selectedDefenses.length > 0 && userEarnings > 0){
            selectedDefenses.map((item, index) => {
                if(item.defenseName === name  ){
                    removeDefense(index, item.defenseCost)
                }
            })
        }
        else if(value && selectedDefenses.length >= 0 && userEarnings > 0){
            const tempDefense= {
                defenseName : name,
                defenseCost : cost,
                defenseID: id,
                done: value 
            }
            setSelectedDefenses([...selectedDefenses, tempDefense])
            if(userEarnings-cost >= 8){
                setUserEarnings(userEarnings-cost)
            }
            else {
                setUserEarnings(userEarnings-cost)
                
            }
        }
    }
    
        

    
    const getMemberinfo=()=>{
        var playerIndex = 0;

        const leadSwitch = nbOfRounds/teamInfo.length
        
        if(roundCount % Math.ceil(leadSwitch) === 0){
            const tempLeader = [...currentLead];
            teamInfo.map( (team, index)=>{
                
                let tempLeaderIndex = {...tempLeader[index]}
                tempLeaderIndex =team[playerIndex].socketId
                tempLeader[index] =tempLeaderIndex
                console.log(tempLeader)
                setCurrentLead(tempLeader)
                
            })
            
           playerIndex++    
        }
        console.log(currentLead)
        teamInfo.map((team, index) =>{
           
            team.map(player=>{
                if(player.alias === alias){
                    teamNumber= index +1 ;
                    // if(player.socketId == currentLead[index].socketId){
                    //     setisLeader(true)
                    // }
                }
                

            })
        })   
    }
    getMemberinfo();
    console.log(currentLead)

    return (
        <Box sx={boxStyling}>
            <Card>
                <CardContent>
                <Typography     gutterBottom>
                    {alias}
                </Typography>
                <Typography     gutterBottom>
                            
                    You are in Team {teamNumber}
                </Typography>
                {isLeader ? 
                    <Typography     gutterBottom>
                        
                        You are the current leader
                    </Typography>
                    :
                    <Typography></Typography>
                }
                
                </CardContent>
            </Card>
            <br></br>
            <br></br>
            
            <Typography   variant='h7' color="text.secondary"  gutterBottom>
                Earnings:${userEarnings}
            </Typography>  
            
            <br></br>
            <br></br>
            <TableContainer >
                <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                    <TableHead >
                        <TableRow>
                        <TableCell>Defenses</TableCell>
                        <TableCell align="right">Cost</TableCell>
                        <TableCell align="right">Submission</TableCell>
                        
                    </TableRow>
                    </TableHead>
                    <TableBody>
                      
                        {userDefenses.map((row, index) => (
                            
                            <TableRow key={row.Name}>
                                <TableCell component="th" scope="row">
                                    {row.Name}
                                </TableCell>
                                <TableCell style={{ width: 160 }} align="right">
                                    {row.Cost}
                                </TableCell>
                                
                                <TableCell style={{ width: 160 }} align="right">
                                    <FormControl  component="fieldset" variant="standard">
                                        <FormGroup>
                                            <FormControlLabel
                                                control={
                                                <Checkbox 
                                                    key={row.label}
                                                    onChange={(event)=> getUserDefense( event.target.checked, row.Name,row.Cost, index, row.DefenseID )}
                                                    disabled={row.Cost > userEarnings && !isChecked[index] ? true : false || isLeader ? true : false}
                                                    checked={isChecked[index]}
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
            <Button variant='contained' onClick={() => setEndBuyPhase(true)} >Submit</Button>
            
        </Box>

    );

}
export default PlayerInterface;
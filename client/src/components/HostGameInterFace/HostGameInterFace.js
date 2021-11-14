import * as React from 'react';
import { Box, Typography,Button} from '@material-ui/core';
import { Context } from '../../context/ContextProvider';
import { useContext } from 'react';

const HostGameInterFace = ({ children, lobbyId, start_buy_phase}) => {

    const {selectedDefenses} =useContext(Context);

    return(
        <Box>
            <Typography>{`Lobby created, use code ${lobbyId} to join.`}</Typography>
                <br></br>
                <br></br>
            <Button  variant="contained"onClick={() => start_buy_phase(lobbyId)}>Start Game</Button>
        </Box>
    )


}
export default HostGameInterFace;
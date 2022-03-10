import { AppBar, Box, Button, Container, IconButton, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import { useState, useContext } from 'react';
import { makeStyles } from "@material-ui/styles";
import { MedtronicsIcon } from "../Icons/Icons";
import { Context } from '../../context/ContextProvider'

const useStyles = makeStyles({
    // This group of buttons will be aligned to the right
    rightToolbar: {
        marginLeft: "auto",
        marginRight: -12
    },
    typography: {
        flexGrow: 1,
        color: '#121212',
        fontSize: '1.6rem'
    },
    appbar: {
        background: '#dcdcdc'
    }
})

const Navbar = ({ }) => {

    // Grab the elements from ContextProvider.js
    const { lobbyId, roundCount, hideTeamChat, teamLeader } = useContext(Context);

    const classes = useStyles()

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar className={classes.appbar} position="static">
                <Container maxWidth="x1">
                    <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
                        <MedtronicsIcon />
                        <Typography className={classes.typography}>
                            CyberBlock
                        </Typography>
                        <Typography className={classes.typography}>
                            {roundCount
                                ? `Round ${roundCount}`
                                : `Lobby`
                            }
                        </Typography>
                        <section>
                            <Typography className={classes.typography}>
                                {!hideTeamChat && `Current Team Leader: ${teamLeader}`
                                }
                            </Typography>
                            <Typography className={classes.typography}>
                                {lobbyId
                                    ? `Lobby ID: ${lobbyId}`
                                    : `Lobby ID: Join a lobby!`
                                }
                            </Typography>
                        </section>
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    )
}

export default Navbar;
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
    menuButton: {
      marginRight: 16,
      marginLeft: -12
    }
  })

const Navbar = ({ }) => {

    // Grab the elements from ContextProvider.js
    const { lobbyId } = useContext(Context);
    
    const classes = useStyles()

    const toolbar = {
        bgcolor: 'text.secondary'
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Container maxWidth="x1">
                    <Toolbar disableGutters sx={{ justifyContent: "space-between"}}>
                        <MedtronicsIcon/>
                        <Typography>
                            CyberBlock
                        </Typography>
                        <Typography component="div">
                            Testing
                        </Typography>
                        <section className={classes.rightToolbar}>
                            <Typography>
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
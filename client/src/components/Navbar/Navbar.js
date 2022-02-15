import { AppBar, Box, Button, Container, IconButton, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/styles";
import { MedtronicsIcon } from "../Icons/Icons";

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
                                Lobby ID: 1111
                            </Typography>
                        </section>
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    )
}

export default Navbar;
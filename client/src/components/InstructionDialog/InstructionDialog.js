import * as React from "react";
import { render } from "react-dom";
import { Box, Button, Container, Dialog, DialogTitle, DialogContent, DialogActions, Input, TextField, Typography } from "@material-ui/core";
import { Shadows } from "@material-ui/system";
import { useState, useContext, useEffect } from "react";
import { Context } from "../../context/ContextProvider";
import { createTheme, ThemeProvider } from '@material-ui/core';
import { Fragment } from "react";
import { makeStyles } from '@material-ui/core/styles';

const theme = createTheme({
	palette: {
		primary: {
			main: '#F5F5F5',
		},
		secondary: {
			main: '#DCDCDC',
		},
	},
	typography: {

	},
  });

const LobbyInterFace = ({ children }) => {
	const { setLobbyId, setIsInLobby, setIsHost, setAlias, setGameStage, student_join_lobby } = useContext(Context);

    const useStyles = makeStyles(theme => ({
        titleStyling: {
          fontSize: '24px',
          fontWeight: 600,
        },
        headerStyling: {
          fontSize: '20px',
          fontWeight: 500,
          wordWrap: "break-word",
        },
        subHeaderStyling: {
          fontSize: '18px',
          fontWeight: 400,
          wordWrap: "break-word",
          color: "#A0A0A0",
        },
        bodyStyling: {
          fontSize: '16px',
          wordWrap: "break-word",
          marginBottom: "10px",
        },
      }));
      const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }


return (
    <Fragment>
        <Button  type="submit" variant="contained" fullWidth onClick={handleClickOpen}>
            Learn How To Play
        </Button>
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="lg"
        >
            <DialogTitle>
                <Typography className={classes.titleStyling}>
                    How To Play
                </Typography>
            </DialogTitle>
            <DialogContent>
                <Typography className={classes.headerStyling}>
                    What is CyberBlock?
                </Typography>
                <Typography className={classes.bodyStyling}>
                    CyberBlock is a team-based game where teams block incoming cyber-attacks using purchased defenses. Defenses are purchased at the beginning of the game and successful defenses each round earn points. The team with the most at the end of the game wins.
                </Typography>
                <Typography className={classes.headerStyling}>
                    Joining A Game
                </Typography>
                <Typography className={classes.bodyStyling}>
                    To join a game, enter the Lobby ID that your instructor gave and your name, and then press the Join button. Once you are in the lobby, you will automatically be placed on a team. Your instructor has the ability to move you between teams.
                </Typography>
                <Typography className={classes.headerStyling}>
                    Communication
                </Typography>
                <Typography className={classes.bodyStyling}>
                    If you do not have an external method to communicate with the rest of the players, you can use the built-in chat window at the right. At the top left of the chat box there is a drop down menu to choose between chatting with all members of the game and chatting with only your team members.
                </Typography>
                <Typography className={classes.headerStyling}>
                    Pre-Game Prep
                </Typography>
                <Typography className={classes.subHeaderStyling}>
                    Teamwork and Team Leader
                </Typography>
                <Typography className={classes.bodyStyling}>
                    Every round of the game, one person is selected as the Team Leader. For that round, that player will be selecting what to play. Teammates can give input to the team leader to help with choosing what to play. The team leader rotates throughout the game, so everyone has a chance to be the leader.
                </Typography>
                <Typography className={classes.subHeaderStyling}>
                    Trivia (Optional)
                </Typography>
                <Typography className={classes.bodyStyling}>
                    If your instructor enables it, the first round of the game will be the trivia round. Your team can answer trivia questions to earn bonus money for purchasing defenses. Once your team has answered the trivia question, you will see your team's answer, other teams' answers, and the correct answer.
                </Typography>
                <Typography className={classes.subHeaderStyling}>
                    Buy Round
                </Typography>
                <Typography className={classes.bodyStyling}>
                    This part of the game will have you purchase defenses to be used against incoming cyber-attacks. Above the list of defenses you will see your earnings. You will want to spend this money wisely. Each defense has its own cost. Will you purchase a few expensive defenses? Or would you rather have a large quantity of more niche defenses? Decide with your team which ones you want to purchase. The team leader will check the box of the defesnes they want to buy, then at the bottom of the screen press "Submit" to confirm.
                </Typography>
                <Typography className={classes.bodyStyling}>
                    Once the purchase has been made, you will be see your team's defenses along with other teams' defenses.
                </Typography>
                <Typography className={classes.headerStyling}>
                    Gameplay
                </Typography>
                <Typography className={classes.subHeaderStyling}>
                    Defending Attacks
                </Typography>
                <Typography className={classes.bodyStyling}>
                    Each round, your team will be tasked with defending rounds of incoming attacks. In the middle of the screen you will be able to see the incoming attack and its description. Below you will be able to see how many defenses you can play that round, along with all of your defenses.
                </Typography>
                <Typography className={classes.bodyStyling}>
                    If you are not the team leader, you can select a few defenses and press the "SHARE SELECTED DEFENSES TO TEAM CHAT" to suggest defenses to the team leader. Once your team chooses what defenses they want to play, the team leader will select those defenses and press the "SUBMIT" button.
                </Typography>
                <Typography className={classes.subHeaderStyling}>
                    Post-Defense
                </Typography>
                <Typography className={classes.bodyStyling}>
                    After your defenses have been selected, you will be able to see your team's defenses along with other teams' defenses. You will also be able to see which are the best defenses and their point values. When a team plays a successful defense those points are added to their score. The leaderboard under the chat box will show the scores for all of the teams.
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    </Fragment>
	);
};

export default LobbyInterFace;
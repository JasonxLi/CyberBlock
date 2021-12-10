import { Box, TextField, Grid, Button, Typography, List, ListItemText } from '@material-ui/core';
import { StylesContext } from '@material-ui/styles';
import React from 'react'
import { useState, useContext } from 'react';
import { Context } from '../../context/ContextProvider'

const ChatInterface = ({lobbyId, alias, teamId}) => {

    // Grab the elements from ContextProvider.js
    const {chatMessagesAll, chat_sendToAll} = useContext(Context);

    var value

    // Generic Handle Function
    const handleClick=() => {
        alert('Test')
    }

    // Send to all chat function
    function sendToAll() {
        chat_sendToAll(value)
    }

    // Handle the text field changes
    function handleTextFieldChange(e) {
        value = e.target.value
    }

    // Return the actual chat box
    return (
        // Container for the chat box
        <div>
            <Grid container style={{ border: "1px solid grey"}}>
                <Grid item xs={12} align="center">
                    <Typography>Chat Box</Typography>
                </Grid>
                <Grid>
                    <List id="ChatBoxMessages">
                        <ListItemText primary="Hi John!" secondary="By Jimmy"/>
                        <ListItemText primary="Hi Jimmy!" secondary="By John"/>
                        {(chatMessagesAll && chatMessagesAll.map(chatMessage => {
                            return (
                                <ListItemText primary={chatMessage.message} secondary={chatMessage.alias}/>
                            )
                        }))}
                    </List>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <TextField id="chatTextBox" fullWidth variant="standard" label="Send message"/>
                    </Grid>
                    <Grid item xs={2}>
                        <Button onclick={handleClick} id="SendToTeamButton" variant="outlined">Send To Team</Button>
                    </Grid>
                    <Grid item xs={2}>
                        <Button onclick="sendToAll()" id="SendToAllButton" variant="outlined">Send To All</Button>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default ChatInterface;

/*
socket.on("chat_sendToAll", ({ lobbyId, alias, message }) => {
    io.in(lobbyId).emit("chat_receiveFromAll", { alias: alias, message: message });
})

socket.on("chat_sendToTeam", ({ lobbyId, alias, teamId, message }) => {
    io.in(lobbyId + `_team` + teamId).emit("chat_receiveFromTeam", { alias: alias, message: message });
})
*/
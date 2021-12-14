import { Box, TextField, Grid, Button, Typography, List, ListItemText } from '@material-ui/core';
import { StylesContext } from '@material-ui/styles';
import React from 'react'
import { useState, useContext } from 'react';
import { Context } from '../../context/ContextProvider'


const ChatInterface = ({ }) => {

    // Grab the elements from ContextProvider.js
    const { chatMessagesAll, chatMessagesTeam, chat_sendToAll, chat_sendToTeam, hideAllChat, hideTeamChat } = useContext(Context);

    // Variable for text box
    const [textTeam, setTextTeam] = useState('');
    const [textAll, setTextAll] = useState('');

    // Variable for scrolling to bottom
    const messagesEndRef = React.createRef()

    // Send to all chat function
    const sendToAll = () => {
        chat_sendToAll(textAll);
        setTextAll('');
        scrollToBottom();
    }

    const sendToTeam = () => {
        chat_sendToTeam(textTeam);
        setTextTeam('');
        scrollToBottom();
    }

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
    // Handle the text field changes
    const handleChangeAll = e => {
        // set the value of value
        setTextAll(e.target.value);
    };

    const handleChangeTeam = e => {
        // set the value of value
        setTextTeam(e.target.value);
    };

    // Return the actual chat box

    return (
        // Container for the chat box

        <Box align="center">
            {!hideAllChat &&
                <Grid container style={{ border: "1px solid grey", width: '50%' }}>
                    <Grid item xs={12} align="center">
                        <Typography>Chat Box All</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <List id="ChatBoxMessagesAll" style={{ maxHeight: '200px', width: '100%', overflow: 'auto' }}>
                            {(chatMessagesAll && { chatMessagesAll }.chatMessagesAll.map(chatMessage => {
                                return (
                                    <ListItemText primary={`${chatMessage.alias}: ${chatMessage.message}`}/>
                                )
                            }))}
                            <div ref={messagesEndRef} />
                        </List>
                    </Grid>
                    <Grid item xs={8}>
                        <TextField value={textAll} onChange={handleChangeAll} fullWidth variant="standard" label="Send message all" />
                    </Grid>
                    <Grid item xs={4}>
                        <Button onClick={sendToAll} variant="outlined">Send To All</Button>
                    </Grid>
                </Grid>}

            {!hideTeamChat &&
                <Grid container style={{ border: "1px solid grey", width: '50%' }}>
                    <Grid item xs={12} align="center">
                        <Typography>Chat Box Team</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <List id="ChatBoxMessagesTeam" style={{ maxHeight: '200px', width: '100%', overflow: 'auto' }}>
                            {(chatMessagesTeam && { chatMessagesTeam }.chatMessagesTeam.map(chatMessage => {
                                return (
                                    <ListItemText primary={`${chatMessage.alias}: ${chatMessage.message}`} />
                                )
                            }))}
                            <div ref={messagesEndRef} />
                        </List>
                    </Grid>
                    <Grid item xs={8}>
                        <TextField value={textTeam} onChange={handleChangeTeam} fullWidth variant="standard" label="Send message team" />
                    </Grid>
                    <Grid item xs={4}>
                        <Button onClick={sendToTeam} variant="outlined">Send To Team</Button>
                    </Grid>
                </Grid>}
        </Box>
    )
}

export default ChatInterface;
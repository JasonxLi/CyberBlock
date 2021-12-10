import { Box, TextField, Grid, Button, Typography, List, ListItemText } from '@material-ui/core';
import { StylesContext } from '@material-ui/styles';
import React from 'react'
import { useState, useContext } from 'react';
import { Context } from '../../context/ContextProvider'


const ChatInterface = ({lobbyId, alias, teamId}) => {

    // Grab the elements from ContextProvider.js
    const {chatMessagesAll, chat_sendToAll} = useContext(Context);

    // Variable for text box
    const [textValue, setText] = useState('');

    // Variable for scrolling to bottom
    const messagesEndRef = React.createRef()

    // Generic Handle Function
    function handleClick() {
        alert('test');
    }

    // Send to all chat function
    const sendToAll = () => {
        chat_sendToAll({textValue}.textValue)
        clearText()
    }

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({behavior: "smooth"});
    }
    // Handle the text field changes
    const handleChange = e => {
        // set the value of value
        setText(e.target.value);
    };

    const clearText = () => {
        setText('');
    }

    // Return the actual chat box

    return (
        // Container for the chat box
        <div>
            <Grid container style={{ border: "1px solid grey"}}>
                <Grid item xs={12} align="center">
                    <Typography>Chat Box</Typography>
                </Grid>
                <Grid item xs={12}>
                    <List id="ChatBoxMessages" style={{maxHeight: '200px', width: '100%', maxWidth: '100%', overflow: 'auto'}}>
                        {(chatMessagesAll && {chatMessagesAll}.chatMessagesAll.map(chatMessage => {
                            return (
                                <ListItemText primary={chatMessage.message} secondary={chatMessage.alias}/>
                            )
                        }))}
                        <div ref={messagesEndRef}/>
                    </List>
                </Grid>
                <Grid item xs={8}>
                    <TextField value={textValue} onChange={handleChange} fullWidth variant="standard" label="Send message"/>
                </Grid>
                <Grid item xs={2}>
                    <Button onClick={handleClick} variant="outlined">Send To Team</Button>
                </Grid>
                <Grid item xs={2}>
                    <Button onClick={sendToAll} variant="outlined">Send To All</Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default ChatInterface;
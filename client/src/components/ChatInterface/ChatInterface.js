import { Box, TextField, Grid, IconButton, Typography, List, ListItemText } from '@material-ui/core';

import React from 'react';
import { useState, useContext } from 'react';
import { Context } from '../../context/ContextProvider';
import { makeStyles } from '@material-ui/core/styles';
import { SendIcon } from '../Icons';

const ChatInterface = ({}) => {
  // Grab the elements from ContextProvider.js
  const { chatMessagesAll, chatMessagesTeam, chat_sendToAll, chat_sendToTeam, hideAllChat, hideTeamChat } = useContext(Context);

  // Variable for text box
  const [textTeam, setTextTeam] = useState('');
  const [textAll, setTextAll] = useState('');

  // Variable for scrolling to bottom
  const messagesEndRef = React.createRef();

  // Send to all chat function
  const sendToAll = () => {
    chat_sendToAll(textAll);
    setTextAll('');
    scrollToBottom();
  };

  const sendToTeam = () => {
    chat_sendToTeam(textTeam);
    setTextTeam('');
    scrollToBottom();
  };

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  // Handle the text field changes
  const handleChangeAll = (e) => {
    // set the value of value
    setTextAll(e.target.value);
  };

  const handleChangeTeam = (e) => {
    // set the value of value
    setTextTeam(e.target.value);
  };

  const useStyles = makeStyles((theme) => ({
    textFieldStyling: {
      marginBottom: '15px',
      marginLeft: '15px',
    },
    typographyStyling: {
      fontWeight: 600,
      fontSize: '19px',
      margin: '15px',
    },
    buttonStyling: {
      marginTop: '15px',
      border: '1px solid #D3D3D3 ',
    },
    headerStyling: {
      backgroundColor: '#FAF9F6',
      borderTop: 1,
      borderRight: 1,
      borderLeft: 1,
      border: '1px solid #D3D3D3',
    },
    chatMessageUserNameStyling: {
      fontWeight: 600,
      color: '#71797E',
    },
  }));

  const classes = useStyles();

  // Return the actual chat box

  return (
    // Container for the chat box

    <Box align="center">
      {!hideAllChat && (
        <Grid
          container
          style={{
            boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
            borderRadius: '5px',
          }}
        >
          <Grid item xs={12} align="center" className={classes.headerStyling}>
            <Typography className={classes.typographyStyling}>Chat Box All</Typography>
          </Grid>
          <Grid item xs={12}>
            <List
              id="ChatBoxMessagesAll"
              style={{
                maxHeight: '200px',
                width: '100%',
                overflow: 'auto',
                alignItems: 'start',
                minHeight: '25vh',
              }}
            >
              {chatMessagesAll &&
                { chatMessagesAll }.chatMessagesAll.map((chatMessage) => {
                  return (
                    <ListItemText style={{ display: 'flex ', marginLeft: '15px' }} primary={<Typography className={classes.chatMessageUserNameStyling}>{chatMessage.alias}:</Typography>} secondary={<Typography>{chatMessage.message}</Typography>} />
                  );
                })}
              <div ref={messagesEndRef} />
            </List>
          </Grid>

          <Grid item xs={9}>
            <TextField value={textAll} onChange={handleChangeAll} fullWidth variant="standard" label="Send message all" className={classes.textFieldStyling} />
          </Grid>
          <Grid item xs={3}>
            <IconButton onClick={sendToAll} size="small" className={classes.buttonStyling}>
              <SendIcon />
            </IconButton>
          </Grid>
        </Grid>
      )}

      {!hideTeamChat && (
        <Grid container style={{ border: '1px solid grey', width: '50%' }}>
          <Grid item xs={12} align="center">
            <Typography className={classes.typographyStyling}>Chat Box Team</Typography>
          </Grid>
          <Grid item xs={12}>
            <List
              id="ChatBoxMessagesTeam"
              style={{
                maxHeight: '200px',
                width: '100%',
                overflow: 'auto',
              }}
            >
              {chatMessagesTeam &&
                { chatMessagesTeam }.chatMessagesTeam.map((chatMessage) => {
                  return <ListItemText className={classes.chatMessageStyling} primary={<Typography className={classes.chatMessageUserNameStyling}>{chatMessage.alias}: </Typography>} secondary={<Typography>{chatMessage.message}</Typography>} />;
                })}
              <div ref={messagesEndRef} />
            </List>
          </Grid>

          <Grid item xs={9}>
            <TextField value={textTeam} onChange={handleChangeTeam} fullWidth variant="standard" label="Send message team" className={classes.textFieldStyling} />
          </Grid>
          <Grid item xs={3}>
            <IconButton onClick={sendToTeam} size="small" className={classes.buttonStyling}>
              <SendIcon />
            </IconButton>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default ChatInterface;

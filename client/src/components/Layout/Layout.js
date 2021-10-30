
import * as React from 'react';
import { Box, Divider, Typography} from '@material-ui/core'
import {MedtronicsIcon} from '../Icons/Icons'

const Layout = ({ children}) => {

    const base = {
        p:'1rem',
    }
    const layoutStyling ={
        minHeight:'100vh',
        overflow:'auto',
        positon:'relative'
    }
 
  
    return (
    
        <Box sx={layoutStyling} >
            <Box sx={base}>
            
                <MedtronicsIcon />
                <Divider />
            </Box>

            {children}
            <Box position ='absolute' bottom='0px'  height='20px' p='2rem'>
                <Typography>CopyRights Reserved 2021</Typography>
            
            </Box>
        </Box>
       
    )
}
export default Layout;
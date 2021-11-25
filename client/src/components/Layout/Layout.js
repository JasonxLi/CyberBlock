import * as React from 'react';
import { Box, Divider, Typography} from '@material-ui/core'
import {MedtronicsIcon} from '../Icons/Icons'

const Layout = ({ children}) => {

    const base = {
        p:'2rem',
    }
    const layoutStyling ={
        overflow:'auto',
        positon:'relative',
        //minHeight:'100vh',
    }
 
  
    return (
    
        <Box sx={layoutStyling}  >
            <Box sx={base}>
            
                <MedtronicsIcon />
                <Divider />
            </Box>

            {children}
            
            {/* <Box sx={base} sx={{position:'sticky', bottom : '0'}} >
            
                <Typography >CopyRights Reserved 2021</Typography>
            
            </Box> */}
        </Box>
       
    )
}
export default Layout;
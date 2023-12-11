import * as React from 'react'
import { AppBar, Box, Icon, Typography } from '@mui/material';
import Logo from '@/images/Vector.svg';

const Header = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#F5F5F5' }}>
      <Box sx={{ paddingBlock: '10px' }}>
        <Icon sx={{ width: 40, height: 40, marginLeft: '27px', overflow: 'visible' }}>
          <img src={Logo} alt="Logo" />
        </Icon>
      </Box>
      <Typography align="center" component="h1" sx={{
        color: '#202329',
        fontSize: 101.25,
        fontStyle: 'normal',
        fontWeight: 900,
        lineHeight: '110%',
        padding: '113px 0px 120px 0px',
      }}>
        The Rick and Morty API
      </Typography>
    </AppBar>
  )
};

export default Header;

import { Link, Box, Icon, Typography } from '@mui/material';
import * as React from 'react';
import FooterLogo from '../../images/footerImg.png';
import Ellipse from '../../images/Ellipse.svg';
import Github from '../../images/github.svg';
import Twitter from '../../images/twitter.svg';
import Heart from '../../images/heart.svg';

export const Footer = () => {
  return (
    <Box component="footer" sx={{
      backgroundColor: '#202329',
      padding: '47px 0 81px 0',
      display: 'flex',
      justifyContent: 'center',
      marginTop: 'auto',
    }}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        }}>
        <Typography  sx={{
          color: '#9E9E9E',
          textAlign: 'center',
          fontSize: '13.5px',
          fontStyle: 'normal',
          fontWeight: 700,
          lineHeight: '162.5%',
          textTransform: 'uppercase',
          maxWidth: '212px',
          marginBottom: '34px',
        }}>
          performed as part of a test case for the company
        </Typography>

        <Icon sx={{
          width: 'auto',
          height: 'auto',
          overflow: 'visible',
          position: 'absolute',
        }}>
          <img src={Ellipse} alt="Footer icon"></img>
        </Icon>

        <Icon sx={{
          width: '50px',
          height: '50px',
          marginBottom: '64px',
          zIndex: '1'
        }}>
          <img src={FooterLogo} alt="Footer icon" />
        </Icon>
        
        <Box sx={{ paddingBlock: '5px', marginBottom: '27px' }}>
          <Link sx={{
            marginRight: '27px',
          }}>
            <img src={Github} alt="Github" />
          </Link>
          <Link sx={{ marginRight: '27px', }}>
            <img src={Twitter} alt="Twitter" />
          </Link>
          <Link>
            <img src={Heart} alt="Heart" />
          </Link>
        </Box>

        <Typography sx={{
          color: '#9E9E9E',
          fontSize: '12.5px',
          fontStyle: 'normal',
          fontWeight: 400,
          lineHeight: '175.5%',
        }}>
          2023
        </Typography>
      </Box>
    </Box>
  )
};

export default Footer;

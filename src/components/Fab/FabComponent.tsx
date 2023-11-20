import * as React from 'react';
import { Stack, Fab, Icon, Zoom, Drawer, Box, Typography, Button } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DownloadIcon from '@mui/icons-material/Download';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const FabComponent = ({ disabled }: { disabled?: boolean }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isDrawerOpen, setDrawerIsOpen] = React.useState(false);

  const handleOpenFab = () => {
    setIsOpen(prev => !prev);
  };

  const handleOpenDrawer = (isOpen: boolean) => {
    return () => {
      setDrawerIsOpen(isOpen);
    }
  }

  return (
    <Stack spacing="24px" sx={{
      maxWidth: '88px',
      alignItems: 'center'
    }}>

      <Zoom appear={isOpen} in={isOpen}>
        <Stack spacing="24px">
          <Fab onClick={handleOpenDrawer(true)} sx={{
            width: '40px',
            height: '40px',
          }}>
            <ErrorOutlineIcon />
          </Fab>

          <Fab disabled={disabled} sx={{
            width: '40px',
            height: '40px',
          }}>
            <DownloadIcon />
          </Fab>
        </Stack>
      </Zoom>

      <Fab variant="circular" onClick={handleOpenFab}>
        <Icon sx={{
          width: '24px',
          height: '24px',
          '& > img': {
            verticalAlign: 'top'
          }
        }}>
          <MoreVertIcon sx={{ verticalAlign: 'top' }} />
        </Icon>
      </Fab>

      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={handleOpenDrawer(false)}
        PaperProps={{
          sx: {
            top: '30%',
            height: 'auto'
          }
        }}
      >
        <Box sx={{
          padding: '16px 16px 8px'
        }}>
          <Stack spacing="16px">
            <Typography>
              History
            </Typography>

            <Typography>
              Character:
            </Typography>

            <Typography>
              value
            </Typography>

            <Typography>
              Location:
            </Typography>

            <Typography>
              value
            </Typography>

            <Typography>
              Episode:
            </Typography>

            <Typography>
              value
            </Typography>
          </Stack>

          <Button onClick={handleOpenDrawer(false)}>
            Close
          </Button>
        </Box>
      </Drawer>
    </Stack>
  )
};

export default FabComponent;

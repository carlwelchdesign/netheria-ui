import React from 'react'
import { styled } from '@mui/material/styles'
import MuiDrawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import HomeIcon from '@mui/icons-material/Home'
import EqualizerIcon from '@mui/icons-material/Equalizer'
import { Avatar } from '@mui/material'
import OctoMlLogo from '../../assets/svg/logo'

const Drawer = styled(MuiDrawer)(
  () => ({
    width: 64,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
  }),
)

const UserAvatar = styled(Avatar)(
  () => ({
    position: 'absolute',
    bottom: '14px',
    left: '11px'
  }),
)

const SideNav = () => (
  <Drawer variant="permanent" PaperProps={{ elevation: 6 }}>
    <List>
      {[<OctoMlLogo key="logo" />, <HomeIcon key="home" />, <EqualizerIcon key="benchmarks" style={{ transform: 'scaleX(-1)' }} />].map((icon, index) => (
        <ListItem key={index} disablePadding sx={{ display: 'block', marginBottom: '62px' }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: 'center',
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: 'auto',
                justifyContent: 'center',
              }}
            >
              {icon}
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
      ))}

    </List>
    <UserAvatar alt="Jane Doe" src={require('../../assets/avatars/anon.png')} />
  </Drawer>
)

export default SideNav
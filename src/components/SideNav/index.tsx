import React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import HomeIcon from '@mui/icons-material/Home'
import EqualizerIcon from '@mui/icons-material/Equalizer'
import OctoMlLogo from '../../assets/svg/logo'
import { UserAvatar, LeftNav } from '../../styles/theme'

const SideNav = () => (
  <LeftNav variant='permanent' PaperProps={{ elevation: 6 }}>
    <List>
      {[
        <OctoMlLogo key='logo' />,
        <HomeIcon key='home' />,
        <EqualizerIcon key='benchmarks' style={{ transform: 'scaleX(-1)' }} />,
      ].map((icon, index) => (
        <ListItem
          key={index}
          disablePadding
          sx={{ display: 'block', marginBottom: '62px' }}
        >
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
    <UserAvatar alt='Jane Doe' src={require('../../assets/avatars/anon.png')} />
  </LeftNav>
)

export default SideNav

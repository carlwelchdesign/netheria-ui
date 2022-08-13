import { createTheme } from '@mui/material/styles'
import { styled, Typography, Avatar } from '@mui/material'
import { grey, blue } from '@mui/material/colors'
import MuiDrawer from '@mui/material/Drawer'

export const theme = createTheme({
  typography: {
    fontFamily: ['Inter var', 'sans-serif'].join(','),
    h2: {
      fontWeight: 700,
      fontSize: '14px',
    },
    h3: {
      fontStyle: 'normal',
      fontSize: '30px',
      fontWeight: 200,
    },
    body1: {
      fontSize: '16px',
    },
    body2: {
      fontStyle: 'normal',
      fontSize: '14px',
    },
    caption: {
      fontSize: '12px',
      fontWeight: 700,
      color: grey[500],
      display: 'block',
    },
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        color: 'transparent',
      },
    },
    MuiAccordion: {
      defaultProps: {},
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiList: {
      defaultProps: {
        dense: true,
      },
    },
    MuiMenuItem: {
      defaultProps: {
        dense: true,
        color: grey[500],
      },
    },
    MuiTable: {
      defaultProps: {
        // size: 'small',
      },
    },
    MuiButton: {
      defaultProps: {
        // size: 'small',
      },
    },
    MuiButtonGroup: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiCheckbox: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiFab: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiFormControl: {
      defaultProps: {
        margin: 'dense',
        size: 'small',
      },
    },
    MuiFormHelperText: {
      defaultProps: {
        margin: 'dense',
      },
    },
    MuiIconButton: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiInputBase: {
      defaultProps: {
        margin: 'dense',
        size: 'small',
      },
    },
    MuiInputLabel: {
      defaultProps: {
        margin: 'dense',
      },
    },
    MuiRadio: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiSwitch: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiTextField: {
      defaultProps: {
        margin: 'dense',
        size: 'small',
      },
    },
    MuiTooltip: {
      defaultProps: {
        arrow: true,
      },
    },
  },
})

export const TableHeadText = styled(Typography)(() => ({
  fontSize: '10px',
  color: blue[500],
  fontWeight: 500,
}))

export const addButtonStyle = {
  marginTop: '55px',
  width: '60px',
  textTransform: 'none',
}

export const totalRunDetailStyle = {
  fontStyle: 'normal',
  color: '#4DB296',
  fontWeight: 500,
  fontSize: '32px',
  textAlign: 'right',
  marginBottom: '24px',
}

export const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: '400px',
  minHeight: '400px',
  maxHeight: '600px',
  maxWidth: '70%',
  bgcolor: 'background.paper',
  borderRadius: '8px',
  overflowY: 'scroll',
  boxShadow: 24,
  pt: 2,
  px: 6,
  pb: 3,
}

export const LeftNav = styled(MuiDrawer)(() => ({
  width: 64,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
}))

export const UserAvatar = styled(Avatar)(() => ({
  position: 'absolute',
  bottom: '14px',
  left: '11px',
}))

export const submitButtonStyle = {
  width: '100%',
  height: '48px',
  borderRadius: '8px',
  textTransform: 'none',
}

export const itemRunsStyle = {
  fontStyle: 'normal',
  color: '#4DB296',
  fontWeight: 500,
  fontSize: '16px',
  textAlign: 'right',
}

export const flashIconStyle = {
  color: 'orange',
  margin: '0 0 0 4px',
  width: '16px',
  height: '16px',
}

export const coreTextStyle = {
  fontWeight: 400,
  fontSize: '12px',
  marginBottom: '0px',
}

export const instanceTextStyle = {
  fontWeight: 600,
  fontSize: '16px',
  marginBottom: '0px',
  display: 'inline',
}

export const panelStyle = {
  borderRadius: '8px',
  padding: '24px',
  position: 'relative',
}

export const totalRunsTextStyle = { marginBottom: '0px', textAlign: 'right' }

export const gridContainerStyle = { marginBottom: '14px' }

export const boxContainerStyle = { display: 'flex' }

export const flexStyle = { display: 'flex' }
export const mainPanelStyle = { borderRadius: '8px', marginBottom: '64px' }
export const accorianContainerStyle = { padding: '24px 24px 10px' }
export const hardwareTargetTableHeadingStyle = { paddingLeft: '0 !important' }
export const hardwareTargetTextStyle = { marginTop: '60px', color: grey[500] }

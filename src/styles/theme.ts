import grey from '@mui/material/colors/grey'
import { createTheme } from '@mui/material/styles'

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
    }
    
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        color: 'transparent',
      }
    },
    MuiAccordion: {
      defaultProps: {
  
      }
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      }
    },
    MuiList: {
      defaultProps: {
        dense: true,
      }
    },
    MuiMenuItem: {
      defaultProps: {
        dense: true,
        color: grey[500],
      }
    },
    MuiTable: { 
      defaultProps: {
        // size: 'small',
      }
    },
    MuiButton: {
      defaultProps: {
        // size: 'small',
      }
    },
    MuiButtonGroup: {
      defaultProps: {
        size: 'small',
      }
    },
    MuiCheckbox: {
      defaultProps: {
        size: 'small',
      }
    },
    MuiFab: {
      defaultProps: {
        size: 'small',
      }
    },
    MuiFormControl: {
      defaultProps: {
        margin: 'dense',
        size: 'small',
      }
    },
    MuiFormHelperText: {
      defaultProps: {
        margin: 'dense',
      }
    },
    MuiIconButton: {
      defaultProps: {
        size: 'small',
      }
    },
    MuiInputBase: {
      defaultProps: {
        margin: 'dense',
        size: 'small',
      }
    },
    MuiInputLabel: {
      defaultProps: {
        margin: 'dense',
      }
    },
    MuiRadio: {
      defaultProps: {
        size: 'small',
      }
    },
    MuiSwitch: {
      defaultProps: {
        size: 'small',
      }
    },
    MuiTextField: {
      defaultProps: {
        margin: 'dense',
        size: 'small',
      }
    },
    MuiTooltip: {
      defaultProps: {
        arrow: true,
      }
    },
  }
})


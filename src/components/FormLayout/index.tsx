import { Box, Grid, Paper, Typography } from '@mui/material'
import React from 'react'
import {
  flexStyle,
  mainPanelStyle,
  accorianContainerStyle,
  octomizeTitleTextStyle,
  hardwareTargetTableHeadingStyle,
  hardwareTargetTextStyle,
} from '../../styles/theme'

type Props = {
  addRowButton: JSX.Element
  modelTitleDetails: JSX.Element
  accordianForm: JSX.Element
  duplicateAlert: JSX.Element
  targetTableForm: JSX.Element
  octomizePanel: JSX.Element
  onSubmit: () => void
}

const FormLayout = ({
  onSubmit,
  modelTitleDetails,
  accordianForm,
  addRowButton,
  duplicateAlert,
  targetTableForm,
  octomizePanel,
}: Props) => (
  <form onSubmit={onSubmit}>
    <Grid container spacing={2}>
      <Grid item xs={12}>
        {modelTitleDetails}
      </Grid>
      <Grid item xs={9}>
        <Paper sx={mainPanelStyle} elevation={6}>
          <Box sx={accorianContainerStyle}>
            <Typography sx={octomizeTitleTextStyle} variant='h3'>
              Octomize
            </Typography>
            {accordianForm}
            <Grid container spacing={0}>
              <Grid item xs={11} sx={hardwareTargetTableHeadingStyle}>
                <Typography sx={hardwareTargetTextStyle} variant='body1'>
                  Hardware targets
                </Typography>
              </Grid>
              <Grid item xs={1} sx={flexStyle}>
                {addRowButton}
              </Grid>
            </Grid>
          </Box>
          {duplicateAlert}
          {targetTableForm}
        </Paper>
      </Grid>
      <Grid item xs={3}>
        {octomizePanel}
      </Grid>
    </Grid>
  </form>
)

export default React.memo(FormLayout)

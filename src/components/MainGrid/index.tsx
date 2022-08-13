import { Box, Container, Grid, Paper, Typography } from '@mui/material'
import React from 'react'
import {
  flexStyle,
  mainPanelStyle,
  accorianContainerStyle,
  octomizeTitleTextStyle,
  hardwareTargetTableHeadingStyle,
  hardwareTargetTextStyle,
} from '../../styles/theme'
import SideNav from '../SideNav'

type Props = {
  addRowButton: JSX.Element
  modelTitleDetails: JSX.Element
  accordianForm: JSX.Element
  duplicateAlert: JSX.Element
  targetTable: JSX.Element
  octomizePanel: JSX.Element
}

const MainGrid = ({
  modelTitleDetails,
  accordianForm,
  addRowButton,
  duplicateAlert,
  targetTable,
  octomizePanel,
}: Props) => (
  <Box sx={flexStyle}>
    <SideNav />
    <Container>
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
            {targetTable}
          </Paper>
        </Grid>
        <Grid item xs={3}>
          {octomizePanel}
        </Grid>
      </Grid>
    </Container>
  </Box>
)

export default MainGrid

import { Paper, Typography, Box, Grid, Button } from '@mui/material'
import React from 'react'
import { OctomizePanelProps, TargetTableTypes } from '../../constants/types'
import {
  boxContainerStyle,
  coreTextStyle,
  flashIconStyle,
  gridContainerStyle,
  instanceTextStyle,
  itemRunsStyle,
  panelStyle,
  submitButtonStyle,
  totalRunDetailStyle,
  totalRunsTextStyle,
} from '../../styles/theme'
import FlashAutoIcon from '@mui/icons-material/FlashAuto'

const OctomizePanel = ({
  totalRuns,
  targetRowData,
  benchmarkChecked,
  runsPerTrial,
  numTrials,
  isOctomizeDisabled,
  watch,
  isAccelerateComplete,
}: OctomizePanelProps) => {
  return (
    <Paper sx={panelStyle} elevation={6}>
      <Typography sx={totalRunsTextStyle} variant='caption'>
        Total Runs
      </Typography>
      <Typography sx={totalRunDetailStyle}>{totalRuns}</Typography>
      <>
        {targetRowData.map(
          (targetRow, index) =>
            targetRow.instance && (
              <Box key={index} sx={boxContainerStyle}>
                <Grid container spacing={0} sx={gridContainerStyle}>
                  <Grid item xs={9}>
                    <Typography sx={instanceTextStyle} variant='body1'>
                      {targetRow.instance}
                      {isAccelerateComplete &&
                        watch('accelerateHardware') === targetRow.provider && (
                          <FlashAutoIcon sx={flashIconStyle} />
                        )}
                    </Typography>
                    <Typography sx={coreTextStyle} variant='caption'>
                      {`${targetRow.vcpu} core${
                        targetRow.vcpu !== 1 ? 's' : ''
                      }`}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography sx={itemRunsStyle}>
                      {benchmarkChecked &&
                      watch('benchmarkHardware') === targetRow.provider
                        ? runsPerTrial * numTrials
                        : 1}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            ),
        )}
      </>
      <Button
        name={'octomize'}
        sx={submitButtonStyle}
        type='submit'
        disabled={!isOctomizeDisabled}
        variant='contained'
      >
        Octomize
      </Button>
    </Paper>
  )
}

export default OctomizePanel

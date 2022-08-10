import { Paper, Typography, Box, Grid, Button } from '@mui/material'
import React from 'react'
import { TargetTableTypes } from '../../constants/types'
import { totalRunDetailStyle } from '../../styles/theme'
import FlashAutoIcon from '@mui/icons-material/FlashAuto'

type Props = {
  totalRuns: number
  targetRowData: TargetTableTypes[]
  benchmarkChecked: boolean
  runsPerTrial: number
  numTrials: number
  isOctomizeDisabled: boolean
  isAccelerateComplete: boolean
  watch: (arg0: string) => unknown
}

const OctomizePanel = ({
  totalRuns,
  targetRowData,
  benchmarkChecked,
  runsPerTrial,
  numTrials,
  isOctomizeDisabled,
  watch,
  isAccelerateComplete,
}: Props) => {
  return (
    <Paper sx={{ borderRadius: '8px', padding: '24px', position: 'relative' }} elevation={6}>
      <Typography sx={{ marginBottom: '0px', textAlign: 'right' }} variant='caption'>
        Total Runs
      </Typography>
      <Typography sx={totalRunDetailStyle}>{totalRuns}</Typography>
      <>
        {targetRowData.map(
          (targetRow, index) =>
            targetRow.instance && (
              <Box key={index} sx={{ display: 'flex' }}>
                <Grid container spacing={0} sx={{ marginBottom: '14px' }}>
                  <Grid item xs={9}>
                    <Typography
                      sx={{
                        fontWeight: 600,
                        fontSize: '16px',
                        marginBottom: '0px',
                        display: 'inline',
                      }}
                      variant='body1'
                    >
                      {targetRow.instance}
                      {isAccelerateComplete &&
                        watch('accelerateHardware') === targetRow.provider && (
                          <FlashAutoIcon
                            sx={{
                              color: 'orange',
                              margin: '0 0 0 4px',
                              width: '16px',
                              height: '16px',
                            }}
                          />
                        )}
                    </Typography>
                    <Typography
                      sx={{ fontWeight: 400, fontSize: '12px', marginBottom: '0px' }}
                      variant='caption'
                    >
                      {`${targetRow.vcpu} core${targetRow.vcpu !== 1 ? 's' : ''}`}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography
                      sx={{
                        fontStyle: 'normal',
                        color: '#4DB296',
                        fontWeight: 500,
                        fontSize: '16px',
                        textAlign: 'right',
                      }}
                    >
                      {benchmarkChecked && watch('benchmarkHardware') === targetRow.provider
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
        sx={{ width: '100%', height: '48px', borderRadius: '8px', textTransform: 'none' }}
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

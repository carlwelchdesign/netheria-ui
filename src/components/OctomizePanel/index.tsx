import { Paper, Typography, Box, Grid, Button } from '@mui/material'
import { watch } from 'fs'
import React from 'react'
import { TargetTableTypes } from '../../constants/types'
import { totalRunDetailStyle } from '../../styles/theme'

type Props = {
  totalRuns: number
  targetRowData: TargetTableTypes[]
  benchmarkChecked: boolean
  runsPerTrial: number
  numTrials: number
  isOctomizeDisabled: boolean
  watch: (arg0: string) => unknown
}

const OctomizePanel = ({ totalRuns, targetRowData, benchmarkChecked, runsPerTrial, numTrials, isOctomizeDisabled, watch }: Props) => {

  return (
    <Paper sx={{ borderRadius: '8px', padding: '24px', position: 'relative' }} elevation={6}>
      <Typography sx={{ marginBottom: '0px', textAlign: 'right' }} variant='caption'>
        Total Runs
      </Typography>
      <Typography sx={totalRunDetailStyle}>
        {totalRuns}
      </Typography>
      <>
        {targetRowData.map((targetRow, index) => (
          targetRow.instance && (<Box key={index} sx={{ display: 'flex' }}>
            <Grid container spacing={2} sx={{ marginBottom: '14px' }}>
              <Grid item xs={10}>
                <Typography sx={{ fontWeight: 600, fontSize: '16px', marginBottom: '0px', display: 'block' }} variant='body1'>
                  {targetRow.instance}
                </Typography>
                <Typography sx={{ fontWeight: 400, fontSize: '12px', marginBottom: '0px' }} variant='caption'>
                  {`${targetRow.vcpu} core${targetRow.vcpu !== 1 ? 's' : ''}`}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography sx={{ fontStyle: 'normal', color: '#4DB296', fontWeight: 500, fontSize: '16px', textAlign: 'right' }}>
                  {benchmarkChecked && watch('benchmarkHardware') === targetRow.provider ? runsPerTrial * numTrials : 1}
                </Typography>
              </Grid>
            </Grid>
          </Box>)
        ))}
      </>
      <Button sx={{ width: '100%', height: '48px', borderRadius: '8px', textTransform: 'none' }} type="submit" disabled={!isOctomizeDisabled} variant="contained">Octomize</Button>
    </Paper>
  )

}

export default OctomizePanel
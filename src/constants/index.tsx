import React from 'react'
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Select, MenuItem, TextField } from '@mui/material'
import { AccordianDataProps, Engine, Providers, TargetTableTypes } from './types'
import { TableHeadText } from '../styles/theme'

export const instances = [
  { provider: Providers.AWS, name: 'm4.large', cpu: 2, memory: 8 },
  { provider: Providers.AWS, name: 'm4.xlarge', cpu: 4, memory: 16 },
  { provider: Providers.AWS, name: 'm4.2xlarge', cpu: 8, memory: 32 },
  { provider: Providers.AWS, name: 'm4.4xlarge', cpu: 16, memory: 64 },
  { provider: Providers.GCP, name: 'n2-standard-2', cpu: 2, memory: 8 },
  { provider: Providers.GCP, name: 'n2-standard-4', cpu: 4, memory: 16 },
  { provider: Providers.GCP, name: 'n2-standard-8', cpu: 8, memory: 32 },
  { provider: Providers.GCP, name: 'n2-standard-16', cpu: 16, memory: 64 },
  { provider: Providers.AZURE, name: 'az-a-series-2', cpu: 2, memory: 8 },
  { provider: Providers.AZURE, name: 'az-a-series-4', cpu: 4, memory: 16 },
  { provider: Providers.AZURE, name: 'az-a-series-8', cpu: 8, memory: 32 },
  { provider: Providers.AZURE, name: 'az-a-series-16', cpu: 16, memory: 64 },
]

export const rowsInputDefault: TargetTableTypes = {
  provider: '',
  instance: '',
  vcpu: 0,
  memory: 0
}

export const getAccordianForms = ({ setBenchmarkChecked, setAccelerateChecked, benchmarkChecked, accelerateChecked, register, watch }: AccordianDataProps) => {
  return [
    {
      title: 'Benchmark',
      detail: 'Benchmarks are designed to measure the performance and accuracy of embedded inference. This allows organizations to develop plans on making improvements or adapting specific best practices, usually to increase some aspect of performance.',
      handleCheckBoxChange: () => {
        setBenchmarkChecked(!benchmarkChecked)
      },
      checked: benchmarkChecked,
      optionsTable: (
        <TableContainer component={Paper}>
          <Table aria-label="caption table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ paddingBottom: '10px' }} width="35%"><TableHeadText>ENGINE</TableHeadText></TableCell>
                <TableCell sx={{ paddingBottom: '10px' }} width="35%"><TableHeadText>HARDWARE</TableHeadText></TableCell>
                <TableCell sx={{ paddingBottom: '10px' }} width="15%"><TableHeadText>NUM TRIALS</TableHeadText></TableCell>
                <TableCell sx={{ paddingBottom: '10px' }} width="15%"><TableHeadText>RUNS PER TRIAL</TableHeadText></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Select sx={{ minWidth: '100%' }}
                    displayEmpty
                    renderValue={(selected) => {
                      if (selected.length === 0) {
                        return 'Select Engine'
                      }
                      return selected
                    }}
                    inputProps={{ 'aria-label': 'Without label' }}
                    defaultValue={''}
                    {...register('benchmarkEngine')}
                  >
                    {Object.keys(Engine).map(key => <MenuItem key={key} value={key}>{key}</MenuItem>)}
                  </Select>
                </TableCell>
                <TableCell>
                  <Select sx={{ minWidth: '100%' }}
                    displayEmpty
                    renderValue={(selected) => {
                      if (selected.length === 0) {
                        return 'Select Hardware'
                      }
                      return selected
                    }}
                    inputProps={{ 'aria-label': 'Without label' }}
                    disabled={!watch('benchmarkEngine')}
                    defaultValue={''}
                    {...register('benchmarkHardware')}
                  >
                    {Object.keys(Providers).map(key => <MenuItem key={key} value={key}>{key}</MenuItem>)}
                  </Select>
                </TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    disabled={!watch('benchmarkHardware')}
                    InputProps={{ inputProps: { min: 1, max: 16 } }}
                    {...register('num_trials')}
                    defaultValue={1}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    disabled={!watch('benchmarkHardware')}
                    InputProps={{ inputProps: { min: 1, max: 16 } }}
                    {...register('runs_per_trial')}
                    defaultValue={1}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )
    },
    {
      title: 'Accelerate',
      detail: 'An AI accelerator is a high-performance parallel computation machine that is specifically designed for the efficient processing of AI workloads like neural networks.',
      handleCheckBoxChange: () => {
        setAccelerateChecked(!accelerateChecked)
      },
      checked: accelerateChecked,
      optionsTable: (
        <TableContainer component={Paper}>
          <Table aria-label="caption table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ paddingBottom: '10px' }} width="50%"><TableHeadText>ENGINE</TableHeadText></TableCell>
                <TableCell sx={{ paddingBottom: '10px' }} width="50%"><TableHeadText>HARDWARE</TableHeadText></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Select sx={{ minWidth: '100%' }}
                    displayEmpty
                    renderValue={(selected) => {
                      if (selected.length === 0) {
                        return 'Select Engine'
                      }
                      return selected
                    }}
                    inputProps={{ 'aria-label': 'Without label' }}
                    defaultValue={''}
                    {...register('accelerateEngine')}
                  >
                    {Object.keys(Engine).map(key => <MenuItem key={key} value={key}>{key}</MenuItem>)}
                  </Select>
                </TableCell>
                <TableCell>
                  <Select sx={{ minWidth: '100%' }}
                    displayEmpty
                    renderValue={(selected) => {
                      if (selected.length === 0) {
                        return 'Select Hardware'
                      }
                      return selected
                    }}
                    disabled={!watch('accelerateEngine')}
                    inputProps={{ 'aria-label': 'Without label' }}
                    defaultValue={''}
                    {...register('accelerateHardware')}
                  >
                    {Object.keys(Providers).map(key => <MenuItem key={key} value={key}>{key}</MenuItem>)}
                  </Select>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      ),
    },
  ]
}
import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Button, Container, Grid, MenuItem, Modal, Paper, Select, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material'
import { grey, blue } from '@mui/material/colors'
import SideNav from '../SideNav'
import ModelTitleDetails from '../ModelTitleDetails'
import MainPanel from '../MainPanel'
import OctoMLAccordian, { AccordianProps } from '../OctoMLAccordian'
import { FieldValues, useForm } from 'react-hook-form'
import TargetTable from '../TargetTable'
import { uniq } from 'lodash'

const TableHeadText = styled(Typography)(
  () => ({
    fontSize: '10px',
    color: blue[500],
    fontWeight: 500
  }),
)

const addButtonStyle = { 
  marginTop: '55px', 
  width: '60px', 
  textTransform: 'none' 
}

const totalRunDetailStyle = { 
  fontStyle: 'normal', 
  color: '#4DB296', 
  fontWeight: 500, 
  fontSize: '32px', 
  textAlign: 'right', 
  marginBottom: '24px' 
}

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: '400px',
  maxWidth: '70%',
  bgcolor: 'background.paper',
  borderRadius: '8px',
  boxShadow: 24,
  pt: 2,
  px: 6,
  pb: 3,
};

export enum Engine {
  ONNX = 'onnx',
  TVM = 'tvm',
}

export enum Providers {
  AWS = 'AWS',
  GCP = 'GCP',
  AZURE = 'AZURE',
}

export type TargetTableTypes = {
  provider: Providers | '',
  instance: string,
  vcpu: number,
  memory: number
}

export const instances = [
  { provider: Providers.AWS, name: 'm4.large', cpu: 2, memory: 8 },
  { provider: Providers.AWS, name: 'm4.xlarge', cpu: 4, memory: 16 },
  { provider: Providers.AWS, name: 'm4.2xlarge', cpu: 8, memory: 32 },
  { provider: Providers.AWS, name: 'm4.4xlarge', cpu: 16, memory: 64 },
  { provider: Providers.GCP, name: 'n2-standard-2', cpu: 2, memory: 8 },
  { provider: Providers.GCP, name: 'n2-standard-4', cpu: 4, memory: 16 },
  { provider: Providers.GCP, name: 'n2-standard-8', cpu: 8, memory: 32 },
  { provider: Providers.GCP, name: 'n2-standard-16', cpu: 16, memory: 64 },
  { provider: Providers.AZURE, name: 'az2-A-Series-2', cpu: 2, memory: 8 },
  { provider: Providers.AZURE, name: 'az2-A-Series-4', cpu: 4, memory: 16 },
  { provider: Providers.AZURE, name: 'az2-A-Series-8', cpu: 8, memory: 32 },
  { provider: Providers.AZURE, name: 'az2-A-Series-16', cpu: 16, memory: 64 },
]

const rowsInputDefault: TargetTableTypes = {
  provider: '',
  instance: '',
  vcpu: 0,
  memory: 0
}

const App = () => {
  const { register, handleSubmit, watch } = useForm();
  const [benchmarkChecked, setBenchmarkChecked] = useState<boolean>(false)
  const [accelerateChecked, setAccelerateChecked] = useState<boolean>(false)
  const [targetRowData, setTargetRowData] = useState<TargetTableTypes[]>([rowsInputDefault])
  const [openErrorModal, setErrorModal] = useState<boolean>(false)
  const [modalMessage, setModalMessage] = useState<string>('')

  const isAddButtonDisabled = !!targetRowData.filter(row => row.instance === '').length
  const dataLength = targetRowData.filter(row => row.instance).length
  const runsPerTrial = watch('runs_per_trial') || 1
  const numTrials = watch('num_trials') || 1
  const totalRuns = dataLength ? targetRowData.reduce((accumulator, obj) => {
    return obj.instance ? accumulator + (benchmarkChecked && obj.provider === watch('benchMarkHardware') ? runsPerTrial * numTrials : 1) : accumulator
  }, 0) : 0
  const isBenchMarkComplete = benchmarkChecked && !!watch('benchMarkEngine') && !!watch('benchMarkHardware')
  const isAccelerateComplete = accelerateChecked && !!watch('accelerateEngine') && !!watch('accelerateHardware')

  const isOctomizeDisabled = () => {
    if ((isBenchMarkComplete || isAccelerateComplete) && dataLength) {
      if (isBenchMarkComplete && isAccelerateComplete) {
        return true
      } else if (isBenchMarkComplete && !accelerateChecked) {
        return true
      } else if (isAccelerateComplete && !benchmarkChecked) {
        return true
      }
    }
    return false
  }

  const addTableRows = () => {
    setTargetRowData([...targetRowData, rowsInputDefault])
  }

  const deleteTableRow = (index: number) => {
    if (targetRowData.length > 1) {
      const rows = [...targetRowData]
      rows.splice(index, 1)
      setTargetRowData(rows)
    }
  }

  const getCpuMemory = (value: string) => {
    const instance = instances.filter(instance => instance.name === value)[0]
    const { cpu, memory } = instance
    return {
      vcpu: cpu,
      memory
    }
  }

  const checkForDuplicates = (data: TargetTableTypes[]) => {
    const dataCopy = [...data];
    Object.keys(dataCopy).forEach((key: string) => {
      // @ts-ignore: key type error - figure it out later
      dataCopy[key] = JSON.stringify(dataCopy[key]);
    });
    const dataHasDuplicates = uniq(dataCopy).length != dataCopy.length;
    return dataHasDuplicates
  }


  const handleChange = (index: number, e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target
    const updatedDataRow: TargetTableTypes = {
      ...targetRowData[index], [name]: value,
      ...(name === 'instance' && getCpuMemory(value)),
    }
    const newRowData = [...targetRowData]
    newRowData[index] = {
      ...updatedDataRow,
    }
    if (checkForDuplicates(newRowData)) {
      setModalMessage('No duplicates')
      setErrorModal(true)
    } else {
      setTargetRowData([...newRowData]);
    }
  }

  const onSubmit = (data: FieldValues) => {
    const msg = JSON.stringify({ ...data, hardwareTargets: targetRowData })
    setModalMessage(msg)
    setErrorModal(true)
    return console.log({ data, hardwareTargets: targetRowData })
  }

  const accordianProps: AccordianProps[] = [
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
                    {...register('benchMarkEngine')}
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
                    disabled={!watch('benchMarkEngine')}
                    defaultValue={''}
                    {...register('benchMarkHardware')}
                  >
                    {Object.keys(Providers).map(key => <MenuItem key={key} value={key}>{key}</MenuItem>)}
                  </Select>
                </TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    defaultValue={1}
                    disabled={!watch('benchMarkHardware')}
                    InputProps={{ inputProps: { min: 1, max: 32 } }}
                    {...register('num_trials')}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    defaultValue={1}
                    disabled={!watch('benchMarkHardware')}
                    InputProps={{ inputProps: { min: 1, max: 32 } }}
                    {...register('runs_per_trial')} />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

      ),
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

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: 'flex' }}>
          <SideNav />
          <Container>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <ModelTitleDetails {...{ title: 'Shufflenet-v2.onnx', details: 'Created three days ago by Mike Johnson' }} />
              </Grid>
              <Grid item xs={9}>
                <MainPanel>
                  <Box sx={{ padding: '24px 24px 10px 24px' }}>
                    <Typography sx={{ color: grey[500], marginBottom: '22px' }} variant='h3'>
                      Octomize
                    </Typography>
                    <OctoMLAccordian data={accordianProps} />
                    <Grid container spacing={0}>
                      <Grid item xs={11} sx={{ paddingLeft: '0 !important' }}>
                        <Typography sx={{ marginTop: '60px', color: grey[500] }} variant='body1'>
                          Hardware targets
                        </Typography>
                      </Grid>
                      <Grid item xs={1} sx={{ display: 'flex' }}>
                        <Button sx={addButtonStyle} variant="contained" disabled={isAddButtonDisabled} onClick={addTableRows}>Add</Button>
                      </Grid>
                    </Grid>
                  </Box>
                  <TargetTable rowsData={targetRowData} deleteTableRow={deleteTableRow} handleChange={handleChange} />
                </MainPanel>
              </Grid>
              <Grid item xs={3}>
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
                              {benchmarkChecked && watch('benchMarkHardware') === targetRow.provider ? runsPerTrial * numTrials : 1}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Box>)
                    ))}
                  </>
                  <Button sx={{ width: '100%', height: '48px', borderRadius: '8px', textTransform: 'none' }} type="submit" disabled={!isOctomizeDisabled()} variant="contained">Octomize</Button>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </form>
      <Modal
        open={openErrorModal}
        onClose={() => { setErrorModal(!openErrorModal) }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Message:
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {modalMessage}
          </Typography>
        </Box>
      </Modal>
    </>
  )
}

export default App

import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Alert, Button, Container, Grid, Paper } from '@mui/material'
import { grey } from '@mui/material/colors'
import SideNav from '../SideNav'
import ModelTitleDetails from '../ModelTitleDetails'
import AccordianForm from '../AccordianForm'
import { TargetTableTypes, OctomizeDataTypes } from '../../constants/types'
import { addButtonStyle } from '../../styles/theme'
import { FieldValues, useForm } from 'react-hook-form'
import TargetTable from '../TargetTable'
import { instances, rowsInputDefault, getAccordianForms } from '../../constants'
import MessageModal from '../MessageModal'
import OctomizePanel from '../OctomizePanel'
import { checkForDuplicates } from '../../utils'

const App = () => {
  const { register, handleSubmit, watch } = useForm()
  const [benchmarkChecked, setBenchmarkChecked] = useState<boolean>(false)
  const [accelerateChecked, setAccelerateChecked] = useState<boolean>(false)
  const [targetRowData, setTargetRowData] = useState<TargetTableTypes[]>([
    rowsInputDefault,
  ])
  const [openMessageModal, setMessageModal] = useState<boolean>(false)
  const [errorAlert, setErrorAlert] = useState<boolean>(false)
  const [modalMessage, setModalMessage] = useState<string>('')
  const [octomizeFormData, setOctomizeFormData] = useState<OctomizeDataTypes>()

  const isAddButtonDisabled = !!targetRowData.filter(
    (row) => row.instance === '',
  ).length
  const dataLength = targetRowData.filter((row) => row.instance).length
  const runsPerTrial = watch('runs_per_trial') || 1
  const numTrials = watch('num_trials') || 1
  const totalRuns = dataLength
    ? targetRowData.reduce((accumulator, obj) => {
        return obj.instance
          ? accumulator +
              (benchmarkChecked && obj.provider === watch('benchmarkHardware')
                ? runsPerTrial * numTrials
                : 1)
          : accumulator
      }, 0)
    : 0
  const isBenchMarkComplete =
    benchmarkChecked &&
    !!watch('benchmarkEngine') &&
    !!watch('benchmarkHardware')
  const isAccelerateComplete =
    accelerateChecked &&
    !!watch('accelerateEngine') &&
    !!watch('accelerateHardware')

  useEffect(() => {
    console.log({ octomizeFormData })
  }, [octomizeFormData])

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
    const instance = instances.filter((instance) => instance.name === value)[0]
    const { cpu, memory } = instance
    return {
      vcpu: cpu,
      memory,
    }
  }

  const handleChange = (
    index: number,
    e: { target: { name: string; value: string } },
  ) => {
    const { name, value } = e.target
    const updatedDataRow: TargetTableTypes = {
      ...targetRowData[index],
      [name]: value,
      ...(name === 'instance' && getCpuMemory(value)),
    }

    const newRowData = [...targetRowData]
    newRowData[index] = {
      ...updatedDataRow,
    }
    if (checkForDuplicates(newRowData)) {
      setErrorAlert(true)
    } else {
      setErrorAlert(false)
      setTargetRowData([...newRowData])
    }
  }

  const onSubmit = (data: FieldValues) => {
    const formData: OctomizeDataTypes = {
      ...(benchmarkChecked && {
        benchmarks: {
          engine: data.benchmarkEngine || null,
          hardware: data.benchmarkHardware || null,
          numTrials: numTrials,
          runsPerTrial: runsPerTrial,
        },
      }),
      ...(accelerateChecked && {
        accelerator: {
          engine: data.accelerateEngine || null,
          hardware: data.accelerateHardware || null,
        },
      }),
      hardwareTargets: targetRowData,
    }

    setOctomizeFormData(formData)
    const msg = JSON.stringify(formData, null, '\t')
    setModalMessage(msg)
    setMessageModal(true)
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: 'flex' }}>
          <SideNav />
          <Container>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <ModelTitleDetails
                  {...{
                    title: 'Shufflenet-v2.onnx',
                    details: 'Created three days ago by Mike Johnson',
                  }}
                />
              </Grid>
              <Grid item xs={9}>
                <Paper
                  sx={{ borderRadius: '8px', marginBottom: '64px' }}
                  elevation={6}
                >
                  <Box sx={{ padding: '24px 24px 10px' }}>
                    <Typography
                      sx={{ color: grey[500], marginBottom: '22px' }}
                      variant='h3'
                    >
                      Octomize
                    </Typography>
                    <AccordianForm
                      data={getAccordianForms({
                        setBenchmarkChecked,
                        setAccelerateChecked,
                        benchmarkChecked,
                        accelerateChecked,
                        register,
                        watch,
                      })}
                    />
                    <Grid container spacing={0}>
                      <Grid item xs={11} sx={{ paddingLeft: '0 !important' }}>
                        <Typography
                          sx={{ marginTop: '60px', color: grey[500] }}
                          variant='body1'
                        >
                          Hardware targets
                        </Typography>
                      </Grid>
                      <Grid item xs={1} sx={{ display: 'flex' }}>
                        <Button
                          name={'add-target'}
                          sx={addButtonStyle}
                          variant='contained'
                          disabled={isAddButtonDisabled}
                          onClick={addTableRows}
                        >
                          Add
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                  <>
                    {errorAlert && (
                      <Alert
                        severity='error'
                        onClose={() => setErrorAlert(false)}
                      >
                        Duplicates are not allowed. Please make another
                        selection
                      </Alert>
                    )}
                  </>
                  <TargetTable
                    rowsData={targetRowData}
                    deleteTableRow={deleteTableRow}
                    handleChange={handleChange}
                  />
                </Paper>
              </Grid>
              <Grid item xs={3}>
                <OctomizePanel
                  {...{
                    totalRuns,
                    targetRowData,
                    benchmarkChecked,
                    runsPerTrial,
                    numTrials,
                    isOctomizeDisabled: isOctomizeDisabled(),
                    watch,
                    isAccelerateComplete: isAccelerateComplete,
                  }}
                />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </form>
      <MessageModal
        openModal={openMessageModal}
        setOpenModal={setMessageModal}
        message={modalMessage}
      />
    </>
  )
}

export default App

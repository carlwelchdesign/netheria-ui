import React, { useState, useEffect } from 'react'
import { Alert, Button } from '@mui/material'
import ModelTitleDetails from '../ModelTitleDetails'
import AccordianForm from '../AccordianForm'
import { TargetTableTypes, OctomizeDataTypes } from '../../constants/types'
import { FieldValues, useForm } from 'react-hook-form'
import TargetTable from '../TargetTable'
import { instances, rowsInputDefault, getAccordianForms } from '../../constants'
import MessageModal from '../MessageModal'
import OctomizePanel from '../OctomizePanel'
import { checkForDuplicates } from '../../utils'
import MainGrid from '../MainGrid'
import { addButtonStyle } from '../../styles/theme'

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
    octomizeFormData && console.log({ octomizeFormData })
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
    } else {
      setTargetRowData([rowsInputDefault])
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

  const handleHardwareTargetChange = (
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
        <MainGrid
          modelTitleDetails={
            <ModelTitleDetails
              {...{
                title: 'Shufflenet-v2.onnx',
                details: 'Created three days ago by Mike Johnson',
              }}
            />
          }
          accordianForm={
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
          }
          addRowButton={
            <Button
              name={'add-target'}
              sx={addButtonStyle}
              variant='contained'
              disabled={isAddButtonDisabled}
              onClick={addTableRows}
            >
              Add
            </Button>
          }
          duplicateAlert={
            <>
              {errorAlert && (
                <Alert severity='error' onClose={() => setErrorAlert(false)}>
                  Duplicates are not allowed. Please make another selection
                </Alert>
              )}
            </>
          }
          targetTable={
            <TargetTable
              rowsData={targetRowData}
              deleteTableRow={deleteTableRow}
              handleChange={handleHardwareTargetChange}
            />
          }
          octomizePanel={
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
          }
        />
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

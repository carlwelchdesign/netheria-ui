import { uniq } from 'lodash'
import { TargetTableTypes } from '../constants/types'

export const checkForDuplicates = (data: TargetTableTypes[]) => {
  const dataCopy = [...data]
  Object.keys(dataCopy).forEach((key: string) => {
    // @ts-ignore: key type error - figure it out later
    dataCopy[key] = JSON.stringify(dataCopy[key])
  })
  const dataHasDuplicates = uniq(dataCopy).length != dataCopy.length
  return dataHasDuplicates
}

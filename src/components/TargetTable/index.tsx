import React, { ChangeEvent } from 'react'
import {
  TableRow,
  TableCell,
  Select,
  MenuItem,
  IconButton,
  SelectChangeEvent,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  styled,
  Typography,
} from '@mui/material'
import { instances } from '../../constants'
import { Providers, TargetTableTypes } from '../../constants/types'
import ClearIcon from '@mui/icons-material/Clear'
import { blue, grey } from '@mui/material/colors'
import { TableHeadText } from '../../styles/theme'

type Props = {
  rowsData: TargetTableTypes[]
  deleteTableRow: (index: number) => void
  handleChange: (
    index: number,
    e: SelectChangeEvent | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void
}

const tableStyle = { boxShadow: 'none', borderBottom: 'none' }

export const TableCellHeader = styled(TableCell)(() => ({
  paddingBottom: '10px',
}))

const tableHeadTextColor = { color: grey[500] }

const TargetTable = ({ rowsData, deleteTableRow, handleChange }: Props) => {
  return (
    <TableContainer component={Paper} sx={tableStyle}>
      <Table aria-label='hardware-target-table'>
        <TableHead>
          <TableRow>
            <TableCellHeader width='35%'>
              <TableHeadText sx={{ color: blue[500] }}>PROVIDER</TableHeadText>
            </TableCellHeader>
            <TableCellHeader width='35%'>
              <TableHeadText sx={tableHeadTextColor}>INSTANCE</TableHeadText>
            </TableCellHeader>
            <TableCellHeader width='15%'>
              <TableHeadText sx={tableHeadTextColor}>VCPU</TableHeadText>
            </TableCellHeader>
            <TableCellHeader width='15%'>
              <TableHeadText sx={tableHeadTextColor}>
                MEMORY (GIB)
              </TableHeadText>
            </TableCellHeader>
            <TableCellHeader width='15%'>
              <TableHeadText></TableHeadText>
            </TableCellHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {rowsData.map((data: TargetTableTypes, index: number) => {
            const dataStyle = {
              color: `${data.instance ? grey[600] : grey[400]}`,
            }
            return (
              <TableRow key={index}>
                <TableCell sx={tableStyle}>
                  <Select
                    sx={{ minWidth: '100%' }}
                    name={'provider'}
                    displayEmpty
                    renderValue={(selected) => {
                      if (selected.length === 0) {
                        return 'Select Provider'
                      }
                      return selected
                    }}
                    inputProps={{ 'aria-label': 'Without label' }}
                    onChange={(e) => {
                      data.provider = ''
                      return handleChange(index, e)
                    }}
                    value={data.provider}
                    placeholder='Placeholder'
                    defaultValue={''}
                  >
                    {Object.keys(Providers).map((key) => (
                      <MenuItem key={key} value={key}>
                        {key}
                      </MenuItem>
                    ))}
                  </Select>
                </TableCell>
                <TableCell sx={tableStyle}>
                  <Select
                    sx={{ minWidth: '100%' }}
                    name={'instance'}
                    displayEmpty
                    renderValue={(selected) => {
                      if (selected.length === 0) {
                        return 'Select Instance'
                      }
                      return selected
                    }}
                    disabled={!data.provider}
                    inputProps={{ 'aria-label': 'Without label' }}
                    onChange={(e) => handleChange(index, e)}
                    value={data.instance}
                    defaultValue={''}
                  >
                    {instances
                      .filter((instance) => instance.provider === data.provider)
                      .map((instance) => (
                        <MenuItem key={instance.name} value={instance.name}>
                          {instance.name}
                        </MenuItem>
                      ))}
                  </Select>
                </TableCell>
                <TableCell sx={tableStyle}>
                  <Typography sx={dataStyle}>{data.vcpu}</Typography>
                </TableCell>
                <TableCell sx={tableStyle}>
                  <Typography sx={dataStyle}>{data.memory}</Typography>
                </TableCell>
                <TableCell sx={tableStyle}>
                  {data.instance && (
                    <IconButton
                      disabled={rowsData.length === 0}
                      onClick={() => deleteTableRow(index)}
                    >
                      <ClearIcon />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TargetTable

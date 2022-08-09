import React, { ChangeEvent } from 'react'
import { TableRow, TableCell, Select, MenuItem, IconButton, SelectChangeEvent, Paper, Table, TableBody, TableContainer, TableHead, styled, Typography } from '@mui/material'
import { Providers, TargetTableTypes, instances } from '../App'
import ClearIcon from '@mui/icons-material/Clear'
import { blue, grey } from '@mui/material/colors'

type Props = {
  rowsData: TargetTableTypes[],
  deleteTableRow: (index: number) => void
  handleChange: (index: number, e: SelectChangeEvent | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}



const TableHeadText = styled(Typography)(
  () => ({
    fontSize: '10px',
    color: blue[500],
    fontWeight: 500
  }),
)

const TargetTable = ({ rowsData, deleteTableRow, handleChange }: Props) => {

  return (
    <TableContainer component={Paper} sx={{ boxShadow: 'none', borderBottom: 'none' }}>
      <Table aria-label="caption table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ paddingBottom: '10px' }} width="35%"><TableHeadText>PROVIDER</TableHeadText></TableCell>
            <TableCell sx={{ paddingBottom: '10px' }} width="35%"><TableHeadText>INSTANCE</TableHeadText></TableCell>
            <TableCell sx={{ paddingBottom: '10px' }} width="15%"><TableHeadText>VCPU</TableHeadText></TableCell>
            <TableCell sx={{ paddingBottom: '10px' }} width="15%"><TableHeadText>MEMORY (GIB)</TableHeadText></TableCell>
            <TableCell sx={{ paddingBottom: '10px' }} width="15%"><TableHeadText></TableHeadText></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rowsData.map((data: TargetTableTypes, index: number) => (
            <TableRow key={index}>
              <TableCell sx={{ boxShadow: 'none', borderBottom: 'none' }}>
                <Select sx={{ minWidth: '100%' }}
                  name={'provider'}
                  displayEmpty
                  renderValue={(selected) => {
                    if (selected.length === 0) {
                      return 'Select Provider'
                    }
                    return selected
                  }}
                  inputProps={{ 'aria-label': 'Without label' }}
                  onChange={(e) => (handleChange(index, e))}
                  value={data.provider}
                  placeholder="Placeholder"
                  defaultValue={''}
                >
                  {Object.keys(Providers).map(key => <MenuItem key={key} value={key}>{key}</MenuItem>)}
                </Select>
              </TableCell>
              <TableCell sx={{ boxShadow: 'none', borderBottom: 'none' }}>
                <Select sx={{ minWidth: '100%' }}
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
                  onChange={(e) => (handleChange(index, e))}
                  value={data.instance}
                  defaultValue={''}
                >
                  {instances.filter(instance => instance.provider === data.provider).map(instance => <MenuItem key={instance.name} value={instance.name}>{instance.name}</MenuItem>)}
                </Select>
              </TableCell>
              <TableCell sx={{ boxShadow: 'none', borderBottom: 'none' }}>
                <Typography sx={{ color: `${data.instance ? grey[600] : grey[400]}`}}>{data.vcpu}</Typography>
              </TableCell>
              <TableCell sx={{ boxShadow: 'none', borderBottom: 'none' }}>
                <Typography sx={{ color: `${data.instance ? grey[600] : grey[400]}`}}>{data.memory}</Typography>
              </TableCell>
              <TableCell sx={{ boxShadow: 'none', borderBottom: 'none' }}>
                {data.instance && <IconButton disabled={rowsData.length === 1} onClick={() => deleteTableRow(index)}>
                  <ClearIcon />
                </IconButton>}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )

}

export default TargetTable
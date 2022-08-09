import React from 'react'
import { Paper } from '@mui/material'

type Props = {
  children: JSX.Element | JSX.Element[]
}
const MainPanel = ({children}: Props) => (
  <Paper sx={{ borderRadius: '8px', marginBottom: '64px'}} elevation={6}>
    {children}
  </Paper>
)

export default MainPanel
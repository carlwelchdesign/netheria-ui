import React from 'react'
import { Box, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'

type Props = {
  title: string
  details: string
}

const ModelTitleDetails = ({title, details}: Props) => (
  <Box sx={{ margin: '80px 0 48px' }}>
    <Typography sx={{ fontSize: '36px', color: grey[700], fontWeight: 300 }} variant='h2'>
      {title}
    </Typography>
    <Typography sx={{ fontSize: '14px', color: grey[700], fontWeight: 500 }} variant='body2'>
      {details}
    </Typography>
  </Box>
)

export default ModelTitleDetails
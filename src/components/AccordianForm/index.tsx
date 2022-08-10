import React, { useState } from 'react'
import styled from '@emotion/styled'
import { Accordion, AccordionSummary, Typography, AccordionDetails, Checkbox, Box } from '@mui/material'
import { grey } from '@mui/material/colors'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { AccordianProps } from '../../constants/types'

const CustomAccordian = styled(Accordion)(
  () => ({
    borderRadius: '6px'
  }),
)

const AccordianForm = ({ data }: { data: AccordianProps[] }) => (
  <>
    {data.map((prop: AccordianProps, index: number) => {
      const { title, handleCheckBoxChange, detail, optionsTable, checked } = prop
      const [expanded, setExpanded] = useState(false);

      return (
        <CustomAccordian key={title} expanded={expanded} onChange={() => setExpanded(!expanded)} sx={{ marginBottom: '16px', paddingLeft: '10px' }} variant="outlined">
          <Box sx={{
            display: 'flex',
            justifyContent: 'start'
          }}>
            <Checkbox
              checked={checked}
              onChange={(e) => {
                e.stopPropagation()
                handleCheckBoxChange()
              }}
              inputProps={{ 'aria-label': 'controlled' }}
              sx={{ display: 'absolute' }}
            />
            <Box>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ alignSelf: 'flex-end', display: 'flex' }} />}
                aria-controls={`panel${index}bh-header`}
                id={`panel${index}bh-header`}
                sx={{ margin: '0 !important', minHeight: 'auto !important', paddingLeft: '10px' }}
              >
                <Typography sx={{ fontWeight: 700, color: grey[900], margin: '12px 0 0' }} variant='h2'>
                  {title}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ margin: '0 16px 0 0', padding: '0 16px', paddingLeft: '10px' }}>
                <Typography sx={{ fontWeight: 400, padding: '0px 0 16px 0' }} variant='body2'>
                  {detail}
                </Typography>
              </AccordionDetails>
            </Box>
          </Box>
          <>
            {optionsTable}
          </>
        </CustomAccordian>
      )
    })}
  </>
)


export default AccordianForm
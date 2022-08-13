import React, { useState } from 'react'
import styled from '@emotion/styled'
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Checkbox,
  Box,
} from '@mui/material'
import { grey } from '@mui/material/colors'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { AccordianProps } from '../../constants/types'

const CustomAccordian = styled(Accordion)(() => ({
  borderRadius: '6px',
  marginBottom: '16px',
  paddingLeft: '10px',
}))

const accordionSummaryStyle = {
  margin: '0 !important',
  minHeight: 'auto !important',
  paddingLeft: '10px',
}

const expandMoreIconStyle = { alignSelf: 'flex-end', display: 'flex' }

const accordionSummaryTextStyle = {
  fontWeight: 700,
  color: grey[900],
  margin: '12px 0 0',
}

const accordionDetailsStyle = {
  margin: '0 16px 0 0',
  padding: '0 16px',
  paddingLeft: '10px',
}

const accordionDetailsTextStyle = { fontWeight: 400, padding: '0px 0 16px 0' }

const AccordianForm = ({ data }: { data: AccordianProps[] }) => (
  <>
    {data.map((prop: AccordianProps, index: number) => {
      const { title, handleCheckBoxChange, detail, optionsTable, checked } =
        prop
      const [expanded, setExpanded] = useState(false)
      return (
        <CustomAccordian
          key={title}
          expanded={expanded}
          onChange={() => setExpanded(!expanded)}
          variant='outlined'
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'start',
            }}
          >
            <Checkbox
              checked={checked}
              disableRipple
              onChange={(e) => {
                e.stopPropagation()
                handleCheckBoxChange()
              }}
              inputProps={{ 'aria-label': 'controlled' }}
              sx={{ display: 'absolute' }}
            />
            <Box>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={expandMoreIconStyle} />}
                aria-controls={`panel${index}bh-header`}
                id={`panel${index}bh-header`}
                sx={accordionSummaryStyle}
              >
                <Typography sx={accordionSummaryTextStyle} variant='h2'>
                  {title}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={accordionDetailsStyle}>
                <Typography sx={accordionDetailsTextStyle} variant='body2'>
                  {detail}
                </Typography>
              </AccordionDetails>
            </Box>
          </Box>
          <>{optionsTable}</>
        </CustomAccordian>
      )
    })}
  </>
)

export default AccordianForm

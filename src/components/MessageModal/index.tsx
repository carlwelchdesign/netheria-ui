import React from 'react'
import { Modal, Box, Typography } from '@mui/material'
import { modalStyle } from '../../styles/theme'

type Props = {
  openModal: boolean,
  setOpenModal: (arg0: boolean) => void,
  message: string
}

const MessageModal = ({openModal, setOpenModal, message}: Props) => {
  return (
    <Modal
      open={openModal}
      onClose={() => { setOpenModal(!openModal) }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Message:
        </Typography>
        <pre>
          <Typography id="modal-modal-description" sx={{ mt: 2, overflowWrap: 'break-word' }}>
            {message}
          </Typography>
        </pre>
      </Box>
    </Modal>
  )
}

export default MessageModal
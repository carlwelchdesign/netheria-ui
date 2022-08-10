import React from 'react'
import { render, screen } from '@testing-library/react'
import MessageModal from '../'

const mockSetOpenModal = () => jest.fn()
const message = 'This is my message to you, Rudy'

describe('MessageModal', () => {
  it('renders MessageModal', () => {
    render(
      <MessageModal
        openModal={true}
        setOpenModal={mockSetOpenModal}
        message={message}
      />,
    )
    screen.getByText('Message:')
    screen.getByText(message)
  })
})

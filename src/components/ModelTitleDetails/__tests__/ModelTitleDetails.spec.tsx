import React from 'react'
import { render, screen } from '@testing-library/react'
import ModelTitleDetails from '../'

const title = 'This is a mock title'
const details = 'These are my mock details'

describe('ModelTitleDetails', () => {
  it('renders ModelTitleDetails', async () => {
    render(<ModelTitleDetails title={title} details={details} />)
    screen.getByText(title)
    screen.getByText(details)
  })
})

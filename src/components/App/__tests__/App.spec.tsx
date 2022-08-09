import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../';
import UserEvent from '@testing-library/user-event'

describe('App Component', () => {
  it('renders App', () => {
    render(<App />)
    screen.getByText('Shufflenet-v2.onnx')
    const OctomizeText = screen.queryAllByText(/Octomize/i)
    expect(OctomizeText.length).toBe(2);
    // I can see the accordians
    screen.getByText('Benchmark')
    screen.getByText('Accelerate')
    // I can see the hardware Target table
    screen.getByText('Hardware targets')
    screen.getByLabelText('hardware-target-table')
    screen.findByRole('button', { name: 'Add' })
    // Can see the Octomize panel
    screen.getByText('Total Runs')
    screen.findByRole('button', { name: 'Octomize' })
  })
  it('can create a list of Hardware targets ', async () => {
    render(<App />)
    await waitFor(() => UserEvent.click(screen.getByText('Select Provider')))
    screen.getByText('AWS')
    screen.getByText('GCP')
    screen.getByText('AZURE')
  })
})

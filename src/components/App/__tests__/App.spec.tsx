import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import App from '../'
import UserEvent from '@testing-library/user-event'
import { instances } from '../../../constants'

describe('App Component', () => {
  it('renders App', async () => {
    await waitFor(() => render(<App />))
    screen.getByText('Shufflenet-v2.onnx')
    const OctomizeText = screen.queryAllByText(/Octomize/i)
    expect(OctomizeText.length).toBe(2)
    // I can see the accordians
    screen.getByText('Benchmark')
    screen.getByText('Accelerate')
    // I can see the hardware Target table
    screen.getByText('Hardware targets')
    screen.getByLabelText('hardware-target-table')
    screen.getByRole('button', { name: 'Add' })
    // Can see the Octomize panel
    screen.getByText('Total Runs')
    screen.getByRole('button', { name: 'Octomize' })
  })
  it('can create a list of Hardware targets ', async () => {
    render(<App />)
    // When I click the Provider Dropdown
    await waitFor(() => UserEvent.click(screen.getByText('Select Provider')))
    // I see the list of provider options
    screen.getByText('AWS')
    screen.getByText('GCP')
    screen.getByText('AZURE')
    // the Add button is disabled
    // expect(screen.getByRole('button', { name: 'Add' })).toBeDisabled()
    // When I select a provider option
    await waitFor(() => UserEvent.click(screen.getByText('AWS')))
    // I can see and select an Instance
    await waitFor(() => UserEvent.click(screen.getByText('Select Instance')))
    // I can now see the instance options
    screen.getByText(instances[0].name)
    screen.getByText(instances[1].name)
    screen.getByText(instances[2].name)
    screen.getByText(instances[3].name)
    await waitFor(() => UserEvent.click(screen.getByText(instances[0].name)))
    // when I select an instance, I see the Octomize panel populated
    expect(screen.getAllByText(instances[0].name).length).toBe(3)
    screen.getByText('2 cores')
    screen.getAllByText('1')
    // and I can add another row
    UserEvent.click(screen.getByRole('button', { name: 'Add' }))
    screen.debug()
  })
})

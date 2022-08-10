import React from 'react'
import { render, screen } from '@testing-library/react'
import OctomizePanel from '../'
import { Providers, TargetTableTypes } from '../../../constants/types'

const mockTargetRowData: TargetTableTypes[] = [
  {
    provider: Providers.AWS,
    instance: 'm4.large',
    vcpu: 2,
    memory: 8,
  },
  {
    provider: Providers.GCP,
    instance: 'n2-standard-16',
    vcpu: 16,
    memory: 64,
  },
]
const totalRuns = 10
const runsPerTrial = 10
const numTrials = 5
const benchmarkChecked = true
const isOctomizeDisabled = true
const isAccelerateComplete = true
const watch = (str: string) => {
  if (str) return 'mock'
}

describe('OctomizePanel', () => {
  it('renders OctomizePanel', async () => {
    render(
      <OctomizePanel
        totalRuns={totalRuns}
        targetRowData={mockTargetRowData}
        benchmarkChecked={benchmarkChecked}
        runsPerTrial={runsPerTrial}
        numTrials={numTrials}
        isOctomizeDisabled={isOctomizeDisabled}
        isAccelerateComplete={isAccelerateComplete}
        watch={watch}
      />,
    )
    screen.getByText('Total Runs')
    screen.getByText('10')
    screen.getByText('m4.large')
    screen.getByText('2 cores')
    screen.getByText('n2-standard-16')
    screen.getByText('16 cores')
    screen.getByRole('button', { name: 'Octomize' })
  })
})

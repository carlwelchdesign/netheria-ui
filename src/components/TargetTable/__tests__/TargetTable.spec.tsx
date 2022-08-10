import React from 'react'
import { render, screen } from '@testing-library/react'
import TargetTable from '../'
import { TargetTableTypes, Providers } from '../../../constants/types'

const mockRowsData: TargetTableTypes[] = [
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

const mockDeleteTableRow = () => jest.fn()
const MockHandleChange = () => jest.fn()

describe('TargetTable', () => {
  it('renders TargetTable', () => {
    render(
      <TargetTable
        rowsData={mockRowsData}
        deleteTableRow={mockDeleteTableRow}
        handleChange={MockHandleChange}
      />,
    )
    screen.getByText('PROVIDER')
    screen.getByText('INSTANCE')
    screen.getByText('VCPU')
    screen.getByText('MEMORY (GIB)')
    screen.getByText('AWS')
    screen.getByText('m4.large')
    screen.getByText('2')
    screen.getByText('8')
    screen.getByText('GCP')
    screen.getByText('n2-standard-16')
    screen.getByText('16')
    screen.getByText('64')
  })
})

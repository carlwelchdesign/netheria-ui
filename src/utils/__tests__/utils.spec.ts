import { checkForDuplicates } from '../'
import { Providers } from '../../constants/types'

const mockDataNoDuplicates = [
  {
    provider: Providers.AWS,
    instance: 'm4.4xlarge',
    vcpu: 16,
    memory: 64,
  },
  {
    provider: Providers.GCP,
    instance: 'n2-standard-8',
    vcpu: 8,
    memory: 32,
  },
]
const mockDataWithDuplicates = [
  {
    provider: Providers.AWS,
    instance: 'm4.4xlarge',
    vcpu: 16,
    memory: 64,
  },
  {
    provider: Providers.AWS,
    instance: 'm4.4xlarge',
    vcpu: 16,
    memory: 64,
  },
  {
    provider: Providers.GCP,
    instance: 'n2-standard-8',
    vcpu: 8,
    memory: 32,
  },
]

describe('checkForDuplicates', () => {
  it('returns correct result when no duplicates are present', () => {
    expect(checkForDuplicates(mockDataNoDuplicates)).toBe(false)
  })
  it('returns correct result when duplicates are present', () => {
    expect(checkForDuplicates(mockDataWithDuplicates)).toBe(true)
  })
})

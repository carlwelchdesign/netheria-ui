
export enum Engine {
  ONNX = 'onnx',
  TVM = 'tvm',
}

export enum Providers {
  AWS = 'AWS',
  GCP = 'GCP',
  AZURE = 'AZURE',
}

export type TargetTableTypes = {
  provider: Providers | '',
  instance: string,
  vcpu: number,
  memory: number
}

export type OctomizeDataTypes = {
  benchmarks?: {
    engine: Engine,
    hardware: Providers,
    numTrials: number,
    runsPerTrial: number,
  },
  accelerator?: {
    engine: Engine,
    hardware: Providers,
  }
  hardwareTargets: TargetTableTypes[],
}

export type AccordianProps = {
  title: string
  detail: string
  checked: boolean
  handleCheckBoxChange: () => void
  optionsTable?: unknown
}

export type AccordianDataProps = {
  setBenchmarkChecked: (arg0: boolean)=>void
  setAccelerateChecked: (arg0: boolean)=>void
  benchmarkChecked: boolean
  accelerateChecked: boolean
  register: (arg0: string) => Record<string, unknown>
  watch: (arg0: string) => Record<string, unknown>
}

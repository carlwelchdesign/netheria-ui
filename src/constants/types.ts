
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

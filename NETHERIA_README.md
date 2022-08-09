# Netheria

In this challenge you will be tasked with laying out a frontend for Netheria,
a mock service for accelerating deep learning models.

### Design
The design for this frontend can be found at:
https://www.figma.com/file/gfD44AXC632l4gIYpHiUWf/FE-Candidate-Takehome?node-id=0%3A1 .

What we are looking for/evaluation criteria, in descending order of importance:
- The total runs pane should display a high-level breakdown of how many actions (benchmark + accelerate)
  will be run on each hardware target.

- For the hardware targets pane, mock out some data that could be transformed into the JSON Schema below
  (you can find some example data at the bottom of this document)
    - Multiple such targets can be specified, but duplicates should not be allowed
    - Targets added can subsequently be removed, with the appropriate state updates to the total runs pane

```json
{
    "type": "object",
    "properties": {
        "provider": { "enum": ["AWS", "GCP", "Azure"] },
        "instance": { "type": "string" },
        "cpu":      { "type": "number" },
        "memory":   { "type": "number" }
    }
}
```

- For the benchmark pane, the dropdown should surface options matching the following JSON Schema:
    - Conceptually, this pane is to allow users to benchmark "this model" using the selected engine and
      hardware target.

```json
{
    "type": "object",
    "properties": {
        "engine":         { "enum": ["ONNX", "TVM"] },
        "hardware":       { "type": "HardwareTarget (described above)" },
        "num_trials":     { "type": "number" },
        "runs_per_trial": { "type": "number" }
    }
}
```
- For the accelerate pane, the dropdown should surface options matching the following JSON Schema:
    - Conceptually, this pane is to allow users to optimize "this model" using the selected engine for
      the selected hardware target.

```json
{
    "type": "object",
    "properties": {
        "engine":   { "enum": ["ONNX", TVM (see below)]}
        "hardware": { "type": "HardwareTarget (described above)" },
    }
}
```

- Both benchmark and accelerate can be selected simultaneously if desired by the user, but selecting
  neither and submitting nothing is not a valid action.
- Clicking "Octomizer" should mock submission of the staged options to a backend server - you may
  display a dialog box to mock out such a submission.

For places where the design may be vague (e.g. with dropdown selectors) use your best taste to implement
default/reasonable behavior based on what you can glean from the API spec described below.

## Deliverable

The primary intent of this challenge is for us to gain insight into you as a frontend engineer and so we will be evaluating
not just on code quality but also faithfulness to the provided design. However, please try not to spend more than a couple
hours on this task - we understand that folks have lives outside of interviewing with us and in general we want to be
respectful of your time. If it comes to it, focus on faithful implementations of specific sub-panels in the order
listed above, e.g. a robust and faithful hardware target selection list as opposed to a half-faithful implementation
of hardware target selection and the benchmark and accelerate pane.

Feel free to use any framework, etc. you wish, be it Vue, React, Backbone, or anything else.

Once you are done please send us a link to a public repository (e.g. GitHub, GitLab) for your solution which should
include a README with:
- Screenshots of your solution, including toggled/expanded cards and populated fields where relevant
- Instructions on how to run the code locally
- Optional: If you did not complete the challenge in full, a section describing your what work is left to do,
  where you think there could be improvement, etc.

Please submit any support requests, issues, etc. to Adelbert at achang@octoml.ai.

### Mock data for hardware targets

```yaml
- provider: AWS
  instance: m4.large
  cpu: 2
  memory: 8
- provider: AWS
  instance: m4.xlarge
  cpu: 4
  memory: 16
- provider: AWS
  instance: m4.2xlarge
  cpu: 8
  memory: 32
- provider: AWS
  instance: m4.4xlarge
  cpu: 16
  memory: 64
- provider: GCP
  instance: n2-standard-2
  cpu: 2
  memory: 8
- provider: GCP
  instance: n2-standard-4
  cpu: 4
  memory: 16
- provider: GCP
  instance: n2-standard-8
  cpu: 8
  memory: 32
- provider: GCP
  instance: n2-standard-16
  cpu: 16
  memory: 64
```

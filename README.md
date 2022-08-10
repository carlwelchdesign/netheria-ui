# Netheria UI

![list and duplicates 2](https://user-images.githubusercontent.com/2073707/183807060-d8d0eabb-6ce9-43d8-8ad8-19aeae4a4439.gif)

![Aug-09-2022 20-13-28](https://user-images.githubusercontent.com/2073707/183802418-03d75bac-a235-4a0e-8ff2-f693c1800e47.gif)

<img width="880" alt="image" src="https://user-images.githubusercontent.com/2073707/183795842-cdb54700-9865-4d32-a6a5-6b1e42dc1e0b.png">

<img width="878" alt="image" src="https://user-images.githubusercontent.com/2073707/183795906-d922727c-b446-4ffb-b0dc-c5d8d55ee44a.png">

<img width="880" alt="image" src="https://user-images.githubusercontent.com/2073707/183795993-7fdf9771-0084-492d-a01e-c13b355a4767.png">

Duplicates are not allowed:
<img width="879" alt="image" src="https://user-images.githubusercontent.com/2073707/183797462-ae20b025-1de5-4eb0-910e-3bedd5a103fa.png">

<img width="881" alt="image" src="https://user-images.githubusercontent.com/2073707/183795705-0a072b50-d07d-4886-b7cc-805841f7a9bb.png">

<img width="880" alt="image" src="https://user-images.githubusercontent.com/2073707/183797599-b787aee1-22cc-4397-b6a5-9ffdc012529d.png">

<img width="880" alt="image" src="https://user-images.githubusercontent.com/2073707/183797682-9bdb4f60-947a-460b-8b9a-ca4986f8d2e4.png">

<img width="878" alt="image" src="https://user-images.githubusercontent.com/2073707/183797737-164a3880-07b1-45fd-b1b9-8ab5664d6318.png">

<img width="880" alt="image" src="https://user-images.githubusercontent.com/2073707/183797831-6ef7522b-6592-4727-ae2f-31b981b3d797.png">

<img width="878" alt="image" src="https://user-images.githubusercontent.com/2073707/183797888-cf8d4c93-d3e2-41ac-b2f6-b493f4bbe0f4.png">

<img width="879" alt="image" src="https://user-images.githubusercontent.com/2073707/183797950-b1d2b2a2-fd14-4eee-b02d-85ccf1dc37fc.png">

Final Data Output:
```
{
	"benchmarks": {
		"engine": "ONNX",
		"hardware": "AWS",
		"numTrials": "5",
		"runsPerTrial": "6"
	},
	"accelerator": {
		"engine": "TVM",
		"hardware": "GCP"
	},
	"hardwareTargets": [
		{
			"provider": "AWS",
			"instance": "m4.large",
			"vcpu": 2,
			"memory": 8
		},
		{
			"provider": "AWS",
			"instance": "m4.xlarge",
			"vcpu": 4,
			"memory": 16
		},
		{
			"provider": "GCP",
			"instance": "n2-standard-4",
			"vcpu": 4,
			"memory": 16
		},
		{
			"provider": "AZURE",
			"instance": "az-a-series-16",
			"vcpu": 16,
			"memory": 64
		}
	]
}
```

If only one Octomize option is selected, form data is updated accordingly:
<img width="878" alt="image" src="https://user-images.githubusercontent.com/2073707/183798253-0bb4aafb-7c7a-436c-93e9-145df32dce92.png">
```
{
	"accelerator": {
		"engine": "TVM",
		"hardware": "GCP"
	},
	"hardwareTargets": [
		{
			"provider": "AWS",
			"instance": "m4.large",
			"vcpu": 2,
			"memory": 8
		},
		{
			"provider": "AWS",
			"instance": "m4.xlarge",
			"vcpu": 4,
			"memory": 16
		},
		{
			"provider": "GCP",
			"instance": "n2-standard-4",
			"vcpu": 4,
			"memory": 16
		},
		{
			"provider": "AZURE",
			"instance": "az-a-series-16",
			"vcpu": 16,
			"memory": 64
		}
	]
}
```

## Available Scripts

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

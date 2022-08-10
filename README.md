# Netheria UI

![list and duplicates](https://user-images.githubusercontent.com/2073707/183807652-7745b8c2-23e6-4a61-912c-95d8f76e46e8.gif)

![accelerate](https://user-images.githubusercontent.com/2073707/183808650-458e0e41-0d71-49eb-9565-4358a05c4735.gif)

![benchmark](https://user-images.githubusercontent.com/2073707/183808877-19afce6e-5322-41cc-9c01-b556ddabda20.gif)

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

# Zoom Video SDK

Use of this SDK is subject to our [Terms of Use](https://zoom.us/docs/en-us/zoom_api_license_and_tou.html).

Add Video, Audio, Screen Share, and Chat features to your web applications with the [Zoom Video SDK](https://marketplace.zoom.us/docs/sdk/video/introduction).

## Installation

In your frontend project, install the Video SDK:

`$ npm install @zoom/videosdk --save`

## Usage

In the component file where you want to use the Video SDK, import `ZoomVideo`.

```js
import ZoomVideo from '@zoom/videosdk';
```

Create the Zoom Video Client, and initialize the dependencies.

```js
const client = ZoomVideo.createClient()

client.init('en-US', `http://localhost:9999/node_modules/@zoom/videosdk/dist/lib/`);
```

NOTE: The following directory in node_modules must be accessible in your url path:

- `node_modules/@zoom/videosdk/dist/lib`

   For example, you could place the `lib` directory in your projects public assets directory, or use webpack's copy plugin to copy it to the public directory when starting the server up. You can test it by navigating to one of the included files: http://localhost:9999/assets/lib/webim.min.js

Set the config variables (reference below):

```js
// setup your signature endpoint here: https://github.com/zoom/videosdk-sample-signature-node.js
const signatureEndpoint = 'http://localhost:4000'
const sessionName = 'VideoSDK-Test'
const userName = 'VideoSDK'
const sessionPasscode = '1234ABC'
let stream;
```


Config variables reference:

| Variable                   | Description |
| -----------------------|-------------|
| signatureEndpoint          | Required, the endpoint url that returns a signature. [Get a signature endpoint here.](https://github.com/zoom/videosdk-sample-signature-node.js) |
| sessionName  | Required, the name of your session. |
| userName | Required, the name of the user joining your session. |
| sessionPasscode | Required, the passcode for your session. |
| stream | Required, the stream variable that you define after your session is joined. |


Generate the session signature to authenticate, [instructions here](https://github.com/zoom/videosdk-sample-signature-node.js).

```js
const signature = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJhcHBfa2V5IjoiVklERU9fU0RLX0tFWV9IRVJFIiwiaWF0IjoxNjIzNDQyNTYzLCJleHAiOjE2MjM0NDk3NjMsInRwYyI6IlZpZGVvU0RLLVRlc3QiLCJwd2QiOiIxMjM0QUJDIn0='
```

Then join the session.

```js
client.join(sessionName, signature, userName, sessionPasscode).then((data) => {
  console.log(data);
}).catch((error) => {
  console.log(error);
});

// Using "await" syntactical sugar:
try {
  const data = await client.join(sessionName, signature, userName, sessionPasscode);
  console.log(data);
} catch (error) {
  console.error(error);
}
```

Define the stream variable in the `connection-change` event listener to use the Video, Audio, Screen Share, and Chat APIs.

```js
client.on("connection-change", (payload) => {
  stream = client.getMediaStream();
})
```
Alternatively, retrieve the mediaStream object after having successfully joined the meeting
```js
try {
  const data = await client.join(sessionName, signature, userName, sessionPasscode);
  stream = zmClient.getMediaStream();
} catch (error) {
  console.error(error);
}
```

Add the following HTML for the user interface (if using a framework like React, do the framework's equivalent). The start button will turn on your video and display it on the canvas in your web page.

```html
<button onclick="startVideo()">Start Video</button>
<button onclick="stopVideo()">Stop Video</button>

<canvas id="my-video" width="640" height="360"></canvas>
```

Then, in your component file, connect the buttons to the Video SDK start and stop video functions.

```js
// Try to use the same aspect ratio as your webcam, and match it with the canvas
// If you cannot, the SDK will add black bars to maintain correct aspect ratio
const canvas = document.querySelector('#my-video')
const canvasWidth = 640;
const canvasHeight = 360;
const xOffset = 0;
const yOffset = 0;
const videoQuality = 2;   // equivalent to 360p; refer to the API reference for more info

async function startVideo() {
  if (!stream.isCapturingVideo()) {
    try {
      await stream.startVideo();

      const session = client.getSessionInfo();
      stream.renderVideo(canvas, session.userId, canvasWidth, canvasHeight, xOffset, yOffset, videoQuality);
    } catch (error) {
      console.log(error);
    }
  }
}

async function stopVideo() {
  if (stream.isCapturingVideo()) {
    try {
      await stream.stopVideo();

      const session = client.getSessionInfo();
      stream.stopRenderVideo(canvas, session.userId);
    } catch (error) {
      console.log(error);
    }
  }
}
```

For the full list of features and event listeners including [Audio](https://marketplace.zoom.us/docs/sdk/video/web/essential/audio), [Screen Sharing](https://marketplace.zoom.us/docs/sdk/video/web/essential/screen-share), and [Chat](https://marketplace.zoom.us/docs/sdk/video/web/essential/chat), as well as additional guides, please see our [Video SDK docs](https://marketplace.zoom.us/docs/sdk/video/web).

## Sample App

Checkout the Zoom [Web Video SDK Sample App](https://github.com/zoom/sample-app-videosdk), and the [Simple Signature Setup Sample App](https://github.com/zoom/videosdk-sample-signature-node.js).

## Need help?

If you're looking for help, try [Developer Support](https://devsupport.zoom.us) or our [Developer Forum](https://devforum.zoom.us). Priority support is also available with [Premier Developer Support](https://zoom.us/docs/en-us/developer-support-plans.html) plans.

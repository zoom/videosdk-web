# Zoom Video SDK

Use of this SDK is subject to our [Terms of Use](https://zoom.us/docs/en-us/zoom_api_license_and_tou.html).

The [Zoom Video SDK NPM package](https://www.npmjs.com/package/@zoom/videosdk) is for implementing the [Zoom Video SDK](https://marketplace.zoom.us/docs/sdk/video/introduction) with a frontend framework like React or Angular that uses webpack / babel.

## Installation

In your frontend project, install the Video SDK:

`$ npm install @zoom/videosdk --save`

## Usage

In the component file where you want to use the Video SDK, import `ZoomVideo`.

```js
import { ZoomVideo } from '@zoom/videosdk';
```

Create the Zoom Video Client, and initialize the dependencies.

```js
var client = ZoomVideo.createClient()

client.init('en-US', `${window.location.origin}/node_modules/@zoom/videosdk/dist/lib`);
```

NOTE: The following directory (already in node_modules) must be accessible in your url path:

- `node_modules/@zoom/videosdk/dist/lib`

Or, you can set a custom path to the Video SDK's lib directory using:

```js
client.init('en-US', `${window.location.origin}/custom/path/to/lib/`);
```

Set the config variables (reference below):

```js
// setup your signautre endpoint here: https://github.com/zoom/videosdk-sample-signature-node.js
var signatureEndpoint = 'http://localhost:4000'
var sessionName = 'VideoSDK-Test'
var userName = 'VideoSDK'
var sessionPasscode = '1234ABC'
var stream;
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
var signature = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJhcHBfa2V5IjoiVklERU9fU0RLX0tFWV9IRVJFIiwiaWF0IjoxNjIzNDQyNTYzLCJleHAiOjE2MjM0NDk3NjMsInRwYyI6IlZpZGVvU0RLLVRlc3QiLCJwd2QiOiIxMjM0QUJDIn0='
```

Then join the session.

```js
client.join(sessionName, signature, userName, sessionPasscode).then((data) => {
  console.log(data);
}).catch((error) => {
  console.log(error);
});
```

Define the stream variable in the `connection-change` event listener to use the Video, Audio, Screen Share, and Chat APIs.

```js
client.on("connection-change", async (payload) => {
  stream = client.getMediaStream();
})
```

In your HTML where you want to display your Video SDK interface, create a button and a canvas element. This button will start your video, and display it in the canvas on the web page.

```html
<button onclick="startVideo()">Start Video</button>
<button onclick="stopVideo()">Stop Video</button>

<canvas id="my-video" width="1920" height="1080"></canvas>
```

Then, in your component file, add the start and stop video functions.

```js
function startVideo() {
  if (!stream.isCapturingVideo()) {
    stream.startVideo().then((data: any) => {
      console.log(data);

      const canvas = document.querySelector('#my-video')

      const session = client.getSessionInfo();

      stream.renderVideo(canvas, session.userId, 300, 100, 0, 0, 2)
    }).catch((error: any) => {
      console.log(error);
    })
  }
}

function stopVideo() {
  if (stream.isCapturingVideo()) {
    stream.stopVideo().then((data: any) => {
      console.log(data);

      const canvas = document.querySelector('#my-video')

      const session = client.getSessionInfo();

      stream.stopRenderVideo(canvas, session.userId)
    }).catch((error: any) => {
      console.log(error);
    })
  }
}
```

For the full list of features including [Audio](https://marketplace.zoom.us/docs/sdk/video/web/essential/audio), [Screen Sharing](https://marketplace.zoom.us/docs/sdk/video/web/essential/screen-share), and [Chat](https://marketplace.zoom.us/docs/sdk/video/web/essential/chat), as well as additional guides, please see our [Video SDK docs](https://marketplace.zoom.us/docs/sdk/video/web).

## Need help?

If you're looking for help, try [Developer Support](https://devsupport.zoom.us) or our [Developer Forum](https://devforum.zoom.us). Priority support is also available with [Premier Developer Support](https://zoom.us/docs/en-us/developer-support-plans.html) plans.

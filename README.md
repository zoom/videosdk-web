# Zoom Video SDK

Use of this SDK is subject to our [Terms of Use](https://zoom.us/docs/en-us/zoom_api_license_and_tou.html).

Add Video, Audio, Screen Share, and Chat features to your web applications with the Zoom Video SDK.

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
client.on("connection-change", (payload) => {
  stream = client.getMediaStream();
})
```

Add the following HTML for the user interface. The start button will turn on your video and display it on the canvas in your web page.

```html
<button onclick="startVideo()">Start Video</button>
<button onclick="stopVideo()">Stop Video</button>

<canvas id="my-video" width="1920" height="1080"></canvas>
```

Then, in your component file, connect the buttons to the Video SDK start and stop video functions.

```js
async function startVideo() {
  if (!stream.isCapturingVideo()) {
    try {
      await stream.startVideo()

      const canvas = document.querySelector('#my-video')
      const session = client.getSessionInfo();

      stream.renderVideo(canvas, session.userId, 300, 100, 0, 0, 2)
    } catch (error) {
      console.log(error);
    }
  }
}

async function stopVideo() {
  if (stream.isCapturingVideo()) {
    try {
      await stream.stopVideo();

      const canvas = document.querySelector('#my-video')
      const session = client.getSessionInfo();

      stream.stopRenderVideo(canvas, session.userId)
    } catch (error) {
      console.log(error);
    }
  }
}
```

For the full list of features and event listeners including [Audio](https://marketplace.zoom.us/docs/sdk/video/web/essential/audio), [Screen Sharing](https://marketplace.zoom.us/docs/sdk/video/web/essential/screen-share), and [Chat](https://marketplace.zoom.us/docs/sdk/video/web/essential/chat), as well as additional guides, please see our [Video SDK docs](https://marketplace.zoom.us/docs/sdk/video/web).

## Need help?

If you're looking for help, try [Developer Support](https://devsupport.zoom.us) or our [Developer Forum](https://devforum.zoom.us). Priority support is also available with [Premier Developer Support](https://zoom.us/docs/en-us/developer-support-plans.html) plans.

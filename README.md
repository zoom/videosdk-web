# Zoom Video SDK for Web

Use of this SDK is subject to our [Terms of Use](https://zoom.us/docs/en-us/zoom_api_license_and_tou.html).

The [Zoom Video SDK](https://marketplace.zoom.us/docs/sdk/video/web) enables you to build custom video experiences with Zoom's core technology through a highly optimized WebAssembly module.

## Installation

In your frontend project, install the Video SDK:

```bash
$ npm install @zoom/videosdk --save
```

## Usage

![Zoom Video SDK](https://marketplace.zoom.us/docs/images/sdk/vsdk-example.gif)

> The Video SDK provides video, audio, screen sharing, chat, data streams, and more, as a service. You can build with all of these features, or pick and choose. The Video SDK also comes with a full set of server side [APIs](https://marketplace.zoom.us/docs/api-reference/video-sdk/methods) and [Webhooks](https://marketplace.zoom.us/docs/api-reference/video-sdk/events).

In the component file where you want to use the Video SDK, import `ZoomVideo` and create the client.

```js
import ZoomVideo from '@zoom/videosdk'

const client = ZoomVideo.createClient()
```

Then init the SDK and declare the `stream` which we will define later:

```js
client.init('en-US', `CDN`)

let stream
```

Now we will start or join the session.  Here are the required parameters for the `client.join()` function.

| Parameter              | Parameter Description |
| -----------------------|-------------|
| topic  | Required, a session name of your choice or the name of the session you are joining. |
| token  | Required, your [Video SDK JWT](https://marketplace.zoom.us/docs/sdk/video/auth). |
| userName | Required, a name for the participant. |
| password | Required, a session passcode of your choice or the passcode of the session you are joining. |

Then start or join the session and define the stream, which will be used for [core features](#core-features).

```js
client.join(topic, token, userName, password).then(() => {
  stream = client.getMediaStream()
}).catch((error) => {
  console.log(error)
})
```

Now that we are in a session, we can start using core features like `stream.startVideo()`.

### Core Features:

- [Video](https://marketplace.zoom.us/docs/sdk/video/web/essential/video)
- [Audio](https://marketplace.zoom.us/docs/sdk/video/web/essential/audio)
- [Chat](https://marketplace.zoom.us/docs/sdk/video/web/essential/chat)
- [Call Out](https://marketplace.zoom.us/docs/sdk/video/web/advanced/call-out)
- [Screen Share](https://marketplace.zoom.us/docs/sdk/video/web/essential/screen-share)
- [Cloud Recording](https://marketplace.zoom.us/docs/sdk/video/web/essential/recording)
- [Command Channel](https://marketplace.zoom.us/docs/sdk/video/web/advanced/command-channel)
- [Audio Video Preview](https://marketplace.zoom.us/docs/sdk/video/web/essential/test)
- [Subsessions](https://marketplace.zoom.us/docs/sdk/video/web/advanced/breakout-rooms)

For the full list of features and event listeners, as well as additional guides, see our [Video SDK docs](https://marketplace.zoom.us/docs/sdk/video/web).

## Sample Apps

- [Video SDK Web Sample](https://github.com/zoom/videosdk-web-sample)
- [Video SDK Auth Sample (Node.js)](https://github.com/zoom/videosdk-sample-signature-node.js)
- [Webhook Sample (Node.js)](https://github.com/zoom/webhook-sample-node.js)

## Need help?

If you're looking for help, try [Developer Support](https://devsupport.zoom.us) or our [Developer Forum](https://devforum.zoom.us). Priority support is also available with [Premier Developer Support](https://zoom.us/docs/en-us/developer-support-plans.html) plans.

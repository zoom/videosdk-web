## CHANGELOG

## v1.1.5

### Fixed:

* WebCodecs send-video errors due to breaking changes to the WebCodecs API in Mac Chrome 93 & 94

## v1.1.4

### Added:

* "sessionId" attribute to the SessionInfo interface

### Fixed:

* Bug where screen sharing was not working in Chrome with WebCodecs support
* WebCodecs send-video errors due to breaking changes to the WebCodecs API in Chrome 93

## v1.1.3

### Added:

* "session_key" and "user_identity" fields to JWT, allowing developers to assign unique session and user IDs to V-SDK sessions from separate, external systems

### Enhanced:

* Rendering video in Chrome and Edge to remove WebGC console warning

### Fixed:

* Bug where sendToAll generated unintended errors
* Issue where SDK clients were automatically muted when joining the second meeting in a session after leaving the first

## v1.1.0

### Added:

* Local audio and video track APIs to preview audio/video before joining a session
* Audio quality of service (QOS) improvements resulting in smoother audio in high latency environments.
* [npm package](https://www.npmjs.com/package/@zoom/videosdk) for integrating the Web Video SDK into the developer workflow
* CORP/COEP header configurations in the demo apps to support cross-origin isolation requirements for changes related to Chrome 92. See [https://marketplace.zoom.us/docs/guides/stay-up-to-date/announcements](https://marketplace.zoom.us/docs/guides/stay-up-to-date/announcements) for details
* APIs for controlling and managing Web Video SDK sessions

### Enhanced:

* Updated "Instant" namespace to "Video"
* Exposed enumeration types to facilitate proper usage of types and type-checking
* Clarified notices around older SDK versions that need to be upgraded

## v1.0.3

### Added: 

* Added single view support for browsers not capable of multi-video
* Added "stream.isSupportMultipleVideos" method
* Added screen sharing for latest Safari browser
* Added webEndpoint argument to init API function

### Fixed:

* Fixed issues when leaving and rejoining a session

## v1.0.2

### Added:

* Added gallery view support (& sample code in the demo app).
* Added audio GCM encryption
* Added audio support for Chrome on Android OS
* Added error code for join session success/fail

## v1.0.0

Introducing Zoom Web Video SDK, which is the app development kit provided to enable apps designed to connect people and to share happiness. With the Video SDK, you can build feature-rich apps with highly customized user interfaces

Web Video SDK is designed to be:

* **Easy to use**: Video SDKs have simplified most function calls, allowing you to have a high-quality video session with simple calls and options.
* **Lightweight**: Video SDKs are lighter than ever, with an enormous reduction in size compared to Client SDKs with the same quality of the Zoom’s video and audio solutions.

The Video Web SDK provides the ability to experience the following functionality for your app:

* Launch a video communication session instantly
* Share screen directly from your device
* Send instant chat messages during the session

To get started, visit: [Zoom Video Web SDK Get Started](https://marketplace.zoom.us/docs/sdk/custom/web);

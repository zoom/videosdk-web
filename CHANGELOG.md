## CHANGELOG
## version 1.4.1

### Added
* Subsession support

### Enhanced
* Monitor logs for helping troubleshoot audio-start issues in iOS browser.
* `preloadDependentAssets` method by adding a customized assets path option/argument

### Fixed
* Mobile browsers not receiving 'active-share-change' event
* Issues where the `startAudio` method is called with the `speakerOnly` option unintentionally
* Issues with chrome tab audio sharing in certain cases
* Issues when rendering 3+1 videos with SharedArrayBuffer disabled
* Timing issues with the `device-change` event

## 1.4.0

### Added
* `muteUserAudioLocally` method to locally mute or unmute another user's audio
* Mic and speaker preview support
  * The microphone can be tested by recording voice and playing it
  * Speakers can be tested by playing a sound and visualizing its audio wave
  * See the [LocalAudioTrack docs](https://marketplacefront.zoom.us/sdk/custom/web/interfaces/localaudiotrack.html) to learn more
* `stayAwake` option to the `init` method to prevent device dimming/locking during a session
* `preloadDependentAssets` method to preload asset dependencies; optimizes performance in poor network environments
* Manager (co-host) support via `makeManager` and `removeManager` methods

### Enhanced
* Video playback in Safari and Firefox by removing black bars from 4:3 aspect ratio
* Maximum number of participants per canvas to 25 (previously 9)
* Video statistics/data to include fps and resolution of each rendered video
  * Enabled via `subscribeVideoStatisticData` method, with data acquired via `video-detailed-data-change` event
* Starting video in mobile browsers with facing mode support
* Video quality support (up to 720p) for Intel Macs
* Command channel by reducing delay from 50ms to 0ms between messages

### Fixed
* An issue where if the host unmutes someone via `unmuteAudio`, the user will receive the `host-ask-unmute-audio` event instead of the audio being unmuted directly
* Edge cases on firefox where calling `startAudio` would always return an unresolved promise

## v1.3.0

* The `role_type` attribute in the JWT token is required. See [SDK Authorization](https://marketplace.zoom.us/docs/sdk/video/auth) for details.

### Added
* Virtual background support, and APIs
  * APIs include: `isSupportVirtualBackground`,  `previewVirtualBackground`, `updateVirtualBackgroundImage`, `stopPreviewVirtualBackground`, and `virtualBackground` option in `startVideo` method
  * See API reference for more details
* Audio and video statistic information. 
  * Subscribe to audio and video data via `subscribeAudioStatisticData` and `subscribeVideoStatisticData`
  * Data will be sent every second via the `audio-statistic-data-change` and `video-statistic-data-change` events
* Support for sharing audio only while screen sharing a Chrome tab
* Support for sharing “Content from 2nd Camera” (e.g. a document camera, or the integrated camera on your laptop)
  * New `ScreenShareOption` option for the `startShareScreen` method
  * New secondaryCamera-related method: `switchSharingSecondaryCamera`
  * See [here](https://support.zoom.us/hc/en-us/articles/201362153-Sharing-your-screen-or-desktop-on-Zoom) for more details on functionality, and the API reference for usage

### Enhanced
* Datacenter selection algorithm for reduced latency and improved in-meeting performance
  * Improvements include geo-fencing and greater prioritization of geographically-close servers
* QoS for in-meeting video streams (e.g. participant videos)

### Fixed
* Occasional conflicts when starting 720p videos with virtual background
* Issue where the start audio with `speakerOnly` option on iOS mobile browser could lead to users not hearing audio
* Video rendering issue on Android mobile browsers

## v1.2.7

### Fixed:
* Issue where two-or-more videos could not be properly, simultaneously shown on Firefox and Safari

## v1.2.5

### Added:
* Support for audio on iOS Safari
* Support for multiple videos (3 others + 1 self) on Chromium browsers without SharedArrayBuffer. Set the value of `enforceMultipleVideos` to `true` in the `init` method to enable this feature

### Fixed:
* Audio issues on Safari browser
* Unexpected failover when leaving or ending a session on Safari (related to the [NSURLSession WebSocket](https://bugs.webkit.org/show_bug.cgi?id=228296) experimental feature)
* Issue of improperly clearing all sessionStorage when leaving the session
* An edge case issue with session idle timeouts and command channel

## v1.2.3

### Added:
* Support for users to join session before host

### Fixed:
* Issue with Command Channel having unexpected failover behavior when ending a session
* Audio and video not reconnecting properly on failover
* Error code not being sent correctly when no server responds to connection requests

### Known Issue:
On Chromium, video stops playing and goes black when resolution changes to or from 720p. This is caused by a bug in Chromium, which is due to be fixed in Chrome 101, scheduled for release at the end of April. To work around this, you may reduce resolution below 720p; alternatively, if you’d like to continue using 720p, it may help to add a button or messaging to the user to toggle their video on and off
  
## v1.2.0

### Added:
* Support for [Cloud Recording](https://marketplace.zoom.us/docs/sdk/video/web/essential/recording)
* Limited support for [720p video send](https://marketplace.zoom.us/docs/sdk/overview/720p)
* Support for call out
* Support for command channel / real-time data
* Improved role management
  * *The user who created a session is considered the "original host". The original host has the following privileges: the session ends after a configurable timeout after the original host leaves a session, if a new host was not assigned. When the original host rejoins the same session later, if nobody was assigned as the new host by the original host before they left the session, the original host can claim the 'host' role, based on its user_identity setting in the JWT payload. The original host can take the host role at any time from the current host. See user_identity and role_type in [Authentication](https://marketplace.zoom.us/docs/sdk/video/auth) for details.*
* Interface to disable session timeout
  * *Previously, the Video SDK session would end after being idle for 48 hours. This interface enables you to choose to disable the timeout and allow the participants to be idle for an unlimited period of time. The new parameter is an unsigned int sessionIdleTimeoutMins. The default value is 40 minutes.*

### Fixed:
* chatClient.getHistory() method was not exposed
* makeManager, revokeManager, and isManager are not available as co-hosts are not supported by the Web Video SDK. These have been removed from the documentation as well

## v1.1.7

### Added:
* Support for resizing screen-share canvas via `stream.updateSharingCanvasDimension` API

### Enhanced:
* Security for dependencies in `package.json`

### Fixed:
* Broken self view in Chrome when SharedArrayBuffer is disabled and webpage is not cross-origin isolated
* Video rendering bugs on Chrome OS 

## v1.1.6

### Added:

* "mirrorVideo" API call (see docs for more details)

### Enhanced:

* "startVideo" API call with 'mirror' option
* "startAudio" API call with 'speakerOnly' option to join audio without needing mic permissions
* internal failover and sharing flow

### Fixed:
* 'underlyingColor' option not working properly after calling "stopRenderVideo"

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
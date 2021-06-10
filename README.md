# Zoom Video SDK

Use of this SDK is subject to our [Terms of Use](https://zoom.us/docs/en-us/zoom_api_license_and_tou.html).

The Zoom Video SDK NPM package is for implementing the [Zoom Video SDK](https://marketplace.zoom.us/docs/sdk/video/introduction) with a frontend framework like React or Angular that uses webpack / babel.

## Installation

In your frontend project, install the Video SDK:

`$ npm install @zoom/videosdk --save`

## Usage
Most features have their own namespace, while events, enums, and interfaces are exposed under **Global** namespace

**ZoomVideo** namespace provides methods about checking system requirements and creating the video client instance

**VideoClient** namespace gathers methods about interacting with a Zoom Video meeting. It can initialize client instance, join or leave session, manage users in a session, listen to events, and retrieve session status

**ChatClient** namespace provides methods that define the chat functionality

**Stream** namespace contains methods about working with streams. Video, audio, and screen sharing can be controlled though these methods

Please consult the [API documentation](https://marketplace.zoom.us/docs/sdk/video/web) for additional details on how to use the SDK


## Sample App

(Publish sample app from marketplace download on github too.)

<!-- Checkout the [Zoom Web SDK Sample App](), and the [Simple Signature Setup Sample App](). -->

## Need help?

If you're looking for help, try [Developer Support](https://devsupport.zoom.us) or our [Developer Forum](https://devforum.zoom.us). Priority support is also available with [Premier Developer Support](https://zoom.us/docs/en-us/developer-support-plans.html) plans.

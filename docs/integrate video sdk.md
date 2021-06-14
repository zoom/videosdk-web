# Integrate the SDK

## Prerequisites

Before using the Zoom Video SDK, you need to:

- Get an SDK key & Secret for authentication. Login to the Zoom Marketplace and [Create a SDK App](https://marketplace.zoom.us/docs/guides/build/sdk-app) to get **SDK Keys** & **Secrets**.
- Prepare a camera and a microphone.
- A backend service to provide the video sdk token. Refer to the [Generate Signature](https://marketplace.zoom.us/docs/sdk/native-sdks/web/essential/signature) for the detail.

## Integrate the SDK

Choose any of the following methods to integrate the Zoom Video SDK into your project. Please stay tuned for more options coming soon!

### NPM
1. The Zoom Video SDK can be installed through npm using the [zoomus videosdk](https://npmjs.com) package.

``` 
 npm install @zoomus/videosdk --save
```
2. Then import the module in your package.

```javascript
import ZoomVideo from '@zoomus/videosdk';
const client = ZoomVideo.createClient();
```

3. The Zoom Video SDK use web worker and web assembly to deal with audio/video/screen, so you need to load these depedent assets. When the SDK is released, the web worker and the web assembly assets will be also included(the `lib` folder), you can either deploy these assets to your private servers or use the cloud assets provided by ZOOM. 
- Use Zoom Global service.The dependent assets path will be `https://source.zoom.us/video/{version}/lib`
``` javascript
const client = ZoomVideo.createClient();
client.init('en-US', 'Global');
```
- Use Zoom CDN service. The dependent assets path will be `https://dmogdx0jrul3u.cloudfront.net/video/{version}/lib`
```javascript
const client = ZoomVideo.createClient();
client.init('en-US', 'CDN');
```
- Use private server to deploy the assets.
```javascript
// webpack config
{
  ... other configuration
  plugins:[
    new CopyWebpackPlugin({
      patterns:[
        from:'node_modules/@zoomus/videosdk/lib',
        to:'dest/zoom-libs' // The dest folder
      ]
    })
  ]
}
// use private dependent assets path
const client = ZoomVideo.createClient();
client.init('en-US', 'path to the zoom-libs');
```

### CDN
The Zoom Video SDK can also be imported and used through CDN.
```html
<script src="https://source.zoom.us/video/zoom-video-1.0.0.min.js">
``` 

### Marketplace
While the Zoom Video SDK is provided alongside a working demo app, you may prefer incorporating the SDK into your own project. To do so: 
1. Copy the SDK package at the following location from the demo app to your project: 
```
@zoomus/videosdk
```
2. Import the module inside your project
```javascript
// Import from local path. For example, if located at the project root:
import ZoomVideo from '@zoomus/videosdk';
const client = ZoomVideo.createClient();
```
3. Privately host the dependent assets and initialize the client with them
```javascript
// Example webpack config
{
  ... other configuration
  plugins:[
    new CopyWebpackPlugin({
      patterns:[
        from:'@zoomus/videosdk/lib',
        to:'dest/zoom-libs' // The dest folder
      ]
    })
  ]
}
...

// Inside your project's class:
...
const client = ZoomVideo.createClient();
client.init('en-US', 'path to zoom-libs');
...
```
4. Create and join a session from within your app
```javascript
/* 
 * Example. Please note that the order of operations is very important
 * You can look-up JavaScript Promises to learn more about how to do this
 */
import ZoomVideo from '@zoomus/videosdk';
...
const client = ZoomVideo.createClient();
await client.init('en-US', 'path to zoom-libs');
await client.join(topic, signature, name, password);
...
```

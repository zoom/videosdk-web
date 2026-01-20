import { MediaCompatibility, VideoClient, SupportFeatures } from './videoclient';
import { LocalVideoTrack, LocalAudioTrack } from './preview';

/**
 * Zoom Video SDK for web platform.
 */
export declare namespace ZoomVideo {
  /**
   * The version of the Zoom Video SDK for web.
   */
  const VERSION: string;
  /**
   * Creates a client for managing the session.
   * This method will return a same instance if called multiple times.
   * This is usually the first step of using the Zoom Video SDK for web.
   * @category ZOOM Core
   */
  function createClient(): typeof VideoClient;

  /**
   * Checks the compatibility of the current browser.
   * Use this method before calling {@link init} to check if the SDK is compatible with the web browser.
   *
   * @returns A `MediaCompatibility` object. The object has following properties:
   * - `audio`: boolean, whether the audio is compatible with the current web browser.
   * - `video`: boolean, whether the video is compatible with the current web browser.
   * - `screen`: boolean, whether the screen is compatible with the current web browser.
   */
  function checkSystemRequirements(): MediaCompatibility;

  /**
   * Shows which features are supported and not supported on the current browser or platform.
   *
   * @returns A `SupportFeatures` object. The object has following properties:
   * - `platform`: string, the browser version info or platform version info.
   * - `supportFeatures`: Array<string>, contains all the support features on current platform.
   * - `unSupportFeatures`: Array<string>, contains all the unsupport features on current platform.
   */
  function checkFeatureRequirements(): SupportFeatures;

  /**
   * Enumerates the media input and output devices available, such as microphones, cameras, and headsets.
   *
   * If this method call succeeds, the SDK returns a list of media devices in an array of [MediaDeviceInfo](https://developer.mozilla.org/en-US/docs/Web/API/MediaDeviceInfo) objects.
   *
   * > Calling this method turns on the camera and microphone shortly for the device permission request. On browsers including Chrome 81 or later, Firefox, and Safari, the SDK cannot get accurate device information without permission to use the media device.
   *
   * ```javascript
   * ZoomVideo.getDevices().then(devices => {
   *  console.log(devices);
   * }).catch(e => {
   *  console.log('get devices error!', e);
   * })
   *
   * // Using await...
   * try {
   *  const devices = await ZoomVideo.getDevices();
   *  console.log(devices);
   * } catch (e) {
   *  console.log('get devices error!', e);
   * }
   * ```
   * @param skipPermissionCheck Determines whether to skip the permission check. If you set this parameter as `true`, the SDK does not trigger the request for media device permission. In this case, the retrieved media device information may be inaccurate.
   * - `true`: Skip the permission check.
   * - `false`: (Default) Do not skip the permission check.
   *
   * @returns
   * - Array&lt;MediaDeviceInfo&gt;, an array of [MediaDeviceInfo](https://developer.mozilla.org/en-US/docs/Web/API/MediaDeviceInfo) objects.
   */
  function getDevices(
    skipPermissionCheck?: boolean,
  ): Promise<Array<MediaDeviceInfo>>;
  /**
   * Creates a new {@link LocalAudioTrack} to manage local audio capture.
   * @param [deviceId] Optional device ID to use for local capture.
   * @category preview
   */
  function createLocalAudioTrack(deviceId?: string): LocalAudioTrack;
  /**
   * Creates a new {@link LocalVideoTrack} to start or stop local video capture and playback.
   * @param [deviceId] Optional device ID to use for local capture.
   * @category preview
   */
  function createLocalVideoTrack(deviceId?: string): LocalVideoTrack;
  /**
   * Destroys the client.
   * @category ZOOM Core
   */
  function destroyClient(): Promise<void>;
  /**
   * Preloads dependent assets to optimize performance.
   *
   */
  function preloadDependentAssets(path?: string): void;
}

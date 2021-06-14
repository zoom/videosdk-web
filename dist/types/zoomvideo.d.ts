import { MediaCompatiblity, VideoClient } from './videoclient';

declare namespace ZoomVideo {
  /**
   * The version of the Zoom Video Web SDK.
   */
  const VERSION: string;
  /**
   * Creates a client for managing the meeting.
   * This method will return a same instance if called multi times.
   * This is usually the first step of using the Zoom Video Web SDK.
   * @category ZOOM Core
   */
  function createClient(): typeof VideoClient;

  /**
   * Checks the compatibility of the current browser.
   * Use this method before calling {@link init} to check if the SDK is compatible with the web browser.
   *
   * @returns A `MediaCompatiblity` object. The object has following properties:
   * - `audio`: boolean, whether the audio is compatible with the current web browser.
   * - `video`: boolean, whether the video is compatible with the current web browser.
   * - `screen`: boolean, whether the screen is compatible with the current web browser.
   */
  function checkSystemRequirements(): MediaCompatiblity;
  /**
   * Destroy the client
   */
  function destroyClient(): void;
}

export default ZoomVideo;
import { ExecutedResult } from './common';

/**
 * Status of the live stream.
 */
export enum LiveStreamStatus {
  /**
   * Not started or ended.
   */
  Ended = 0,
  /**
   * Live streaming is in progress.
   */
  InProgress = 1,
  /**
   * Attempting to connect to the live streaming service.
   */
  Connecting = 2,
  /**
   * The connection to the live streaming service has timed out.
   */
  Timeout = 3,
}
/**
 * The live streaming client.
 * Video SDK supports live streaming of a session to Facebook Live, YouTube Live, and a number of other custom live streaming platforms.
 */
export declare namespace LiveStreamClient {
  /**
   * Start live streaming
   * - Only the **host** can start live streaming.
   * @param streamUrl Third-party live stream URL.
   * @param streamKey Third-party live streaming key.
   * @param broadcastUrl Broadcast URL.
   */
  function startLiveStream(
    streamUrl: string,
    streamKey: string,
    broadcastUrl: string,
  ): ExecutedResult;

  /**
   * Stops live streaming.
   * - Only the **host** can stop live streaming.
   */
  function stopLiveStream(): ExecutedResult;
  /**
   * Whether live streaming is enabled or not.
   * @returns boolean
   */
  function isLiveStreamEnabled(): boolean;
  /**
   * Gets live streaming status.
   * @returns {@link LiveStreamStatus}
   */
  function getLiveStreamStatus(): LiveStreamStatus;
}

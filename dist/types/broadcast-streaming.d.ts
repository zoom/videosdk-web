import { ExecutedResult } from './common';
/**
 * Status of broadcast streaming
 */
export enum BroadcastStreamingStatus {
  /**
   * Init status
   */
  Init = 0,
  /**
   * Attempting to connecting the broadcast streaming
   */
  Pending = 1,
  /**
   * Broadcast streaming is in progress
   */
  InProgress = 2,
  /**
   * Broadcast streaming is closing
   */
  Closing = 3,
  /**
   *  Broadcast streaming has ended
   */
  Closed = 4,
}

/**
 * The client of broadcast streaming
 */
export declare namespace BroadcastStreamingClient {
  /**
   * Start broadcast streaming
   * @since 2.2.5
   */
  function startBroadcast(): ExecutedResult | Promise<string>;
  /**
   * Stop broadcast streaming
   * @since 2.2.5
   *
   * @param channelId Optional.  Required only if the original host started the broadcast and then transferred the host role to another user. In this case, the new host needs to provide the channelId to stop the broadcast.
   */
  function stopBroadcast(channelId?: string): ExecutedResult | Promise<string>;
  /**
   * Get the broadcast streaming status.
   * @since 2.2.5
   */
  function getBroadcastStreamingStatus(): {
    /**
     * Status of broadcast streaming
     */
    status: BroadcastStreamingStatus;
    /**
     * Channel ID
     */
    channelId: string;
  };
  /**
   * Is broadcast streaming enabled.
   * @since 2.2.5
   */
  function isBroadcastStreamingEnable(): boolean;
}

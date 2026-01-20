import { ExecutedResult } from './common';

/**
 * Status of real-time media streams
 */
export enum RealTimeMediaStreamsStatus {
  /**
   * Real-time media streams is stopped for no subscription
   */
  NoSubscription = -2,
  /**
   * Real-time media streams failed to start
   */
  StartFailed = -1,
  /**
   * Real-time media streams is not initialized
   */
  None = 0,
  /**
   * Real-time media streams is started
   */
  Start = 1,
  /**
   * Real-time media streams is paused
   */
  Pause = 2,
  /**
   * Real-time media streams is stopped
   */
  Stop = 3,
}
/**
 * The real-time media streams client.
 */
export declare namespace RealTimeMediaStreamsClient {
  /**
   * Is your meeting support real-time media streams
   * @returns boolean
   */
  function isSupportRealTimeMediaStreams(): boolean;
  /**
   * Can start real-time media streams,
   * - Only the **host** can start real-time media streams.
   * - Can not start real-time media streams in breakout room
   * @returns boolean
   */
  function canStartRealTimeMediaStreams(): boolean;
  /**
   * Start real-time media streams
   * @returns {@link ExecutedResult}
   */
  function startRealTimeMediaStreams(): ExecutedResult;
  /**
   * Pause real-time media streams
   * @returns {@link ExecutedResult}
   */
  function pauseRealTimeMediaStreams(): ExecutedResult;
  /**
   * Resume real-time media streams
   * @returns {@link ExecutedResult}
   */
  function resumeRealTimeMediaStreams(): ExecutedResult;
  /**
   * Stop real-time media streams
   * @returns {@link ExecutedResult}
   */
  function stopRealTimeMediaStreams(): ExecutedResult;
  /**
   * Get the real-time media streams status
   * @returns {@link RealTimeMediaStreamsStatus}
   */
  function getRealTimeMediaStreamsStatus(): RealTimeMediaStreamsStatus;
}

/**
 * Cloud recording Status
 */
export enum RecordingStatus {
  /**
   * Recording
   */
  Recording = 'Recording',
  /**
   * Recording is paused
   */
  Paused = 'Paused',
  /**
   * Recording is stopped
   */
  Stopped = 'Stopped',
}

/**
 * The `RecordingClient` class provides methods that define the behaviors of a RecordingClient object, such as start/stop cloud recording.
 *
 * The RecordingClient object can be accessed by `getRecordingClient` method of a `ZoomVideo` instance.
 */
export declare namespace RecordingClient {
  /**
   * Start cloud recording.
   *
   *
   * @return
   * - `''`: Success
   * - `Error`: Failure. Details in {@link ErrorTypes}.
   */
  export function startCloudRecording(): Promise<'' | Error>;

  /**
   * Stop cloud recording.
   *
   *
   * @returns
   * - `''`: Success
   * - `Error`: Failure. Details in {@link ErrorTypes}.
   */
  export function stopCloudRecording(): Promise<'' | Error>;
  /**
   * Pause cloud recording.
   *
   *
   * @returns
   * - `''`: Success
   * - `Error`: Failure. Details in {@link ErrorTypes}.
   */
  export function pauseCloudRecording(): Promise<'' | Error>;
  /**
   * Resume cloud recording
   */
  export function resumeCloudRecording(): Promise<'' | Error>;
  /**
   * Get status of cloud recording
   */
  export function getCloudRecordingStatus(): RecordingStatus;
  /**
   * Whether the meeting enabled the recording.
   */
  export function canStartRecording(): boolean;
}

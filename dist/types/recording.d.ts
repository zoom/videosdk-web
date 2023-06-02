/**
 * Cloud recording status.
 */
export enum RecordingStatus {
  /**
   * Recording.
   */
  Recording = 'Recording',
  /**
   * Recording paused.
   */
  Paused = 'Paused',
  /**
   * Recording stopped.
   */
  Stopped = 'Stopped',
  /**
   * When to start ISO recording.
   */
  Ask = 'Ask',
  /**
   * When user accepts ISO recording.
   */
  Accept = 'Accept',
  /**
   * When user declines ISO recording.
   */
  Decline = 'Decline',
}

/**
 * The `RecordingClient` class provides methods that define the behaviors of a `RecordingClient` object, such as starting or stopping cloud recording.
 *
 * Use the `getRecordingClient` method for a `ZoomVideo` instance to access the `RecordingClient` object.
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
   * Stops cloud recording.
   *
   *
   * @returns
   * - `''`: Success
   * - `Error`: Failure. Details in {@link ErrorTypes}.
   */
  export function stopCloudRecording(): Promise<'' | Error>;
  /**
   * Pauses cloud recording.
   *
   *
   * @returns
   * - `''`: Success
   * - `Error`: Failure. Details in {@link ErrorTypes}.
   */
  export function pauseCloudRecording(): Promise<'' | Error>;
  /**
   * Resumes cloud recording.
   */
  export function resumeCloudRecording(): Promise<'' | Error>;
  /**
   * Gets the status of cloud recording.
   */
  export function getCloudRecordingStatus(): RecordingStatus;
  /**
   * Determines whether the session enabled cloud recording.
   */
  export function canStartRecording(): boolean;
  /**
   * Accepts individual cloud recording.
   * @returns
   * - `''`: Success
   * - `Error`: Failure. Details in {@link ErrorTypes}.
   */
  export function acceptIndividualRecording(): Promise<'' | Error>;
  /**
   * Declines individual cloud recording.
   * @returns
   * - `''`: Success
   * - `Error`: Failure. Details in {@link ErrorTypes}.
   */
  export function declineIndividualRecording(): Promise<'' | Error>;
}

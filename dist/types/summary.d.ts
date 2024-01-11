import { MeetingQueryStatus, SummaryStatus } from './common';
/**
 * The `AIClient` class provides methods that define the behaviors of a AIClient object, such as start/stop smart summary/meeting query.
 */
export declare namespace AIClient {
  /**
   * Start smart summary.
   *
   *
   * @return
   * - `''`: Success
   * - `Error`: Failure. Details in {@link ErrorTypes}.
   */
  export function startSummary(): Promise<'' | Error>;

  /**
   * Stop smart summary.
   *
   *
   * @returns
   * - `''`: Success
   * - `Error`: Failure. Details in {@link ErrorTypes}.
   */
  export function stopSummary(): Promise<'' | Error>;
  /**
   * Get status of smart summary
   */
  export function getSummaryStatus(): SummaryStatus;
  /**
   * Whether the smart summary is enabled.
   */
  export function isSummaryEnabled(): boolean;

  /**
   * Start meeting query.
   *
   *
   * @return
   * - `''`: Success
   * - `Error`: Failure. Details in {@link ErrorTypes}.
   */
  export function startMeetingQuery(): Promise<'' | Error>;

  /**
   * Stop meeting query.
   *
   *
   * @returns
   * - `''`: Success
   * - `Error`: Failure. Details in {@link ErrorTypes}.
   */
  export function stopMeetingQuery(): Promise<'' | Error>;
  /**
   * Get status of meeting query
   */
  export function getMeetingQueryStatus(): MeetingQueryStatus;
  /**
   * Whether the meeting query is enabled.
   */
  export function isMeetingQueryEnabled(): boolean;
}

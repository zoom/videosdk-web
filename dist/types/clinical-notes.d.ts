import { ExecutedResult } from './common';

/**
 * Capture status of Clinical Notes.
 * @since 2.6.0
 * @ignore
 */
export enum ClinicalNotesStatus {
  /**
   * Clinical Notes has not started.
   */
  None = 0,
  /**
   * Capture is in progress.
   */
  InProgress = 1,
  /**
   * Capture is paused.
   */
  Pause = 2,
  /**
   * Capture has stopped.
   */
  Stopped = 3,
  /**
   * Capture is initializing.
   */
  Init = 4,
  /**
   * Capture start timed out.
   */
  Timeout = 5,
}

/**
 * Host decision on a participant's request to stop Clinical Notes capture.
 * @since 2.6.0
 * @ignore
 */
export enum ClinicalNotesApprovedState {
  /**
   * The host approved the request to stop capture.
   */
  Approved = 'Approved',
  /**
   * The host declined the request to stop capture.
   */
  Declined = 'Declined',
}

/**
 * Server error codes reported on Clinical Notes status changes.
 * @since 2.6.0
 * @ignore
 */
export enum ClinicalNotesErrorCode {
  /**
   * Something is temporarily wrong with the connection. Try again.
   */
  General = -1,
  /**
   * Clinical Notes has been turned off in web settings.
   */
  SettingNotEnable = 13280,
  /**
   * All available notes for the current subscription period have been used.
   */
  CreditRunOut = 13284,
}

/**
 * Current Clinical Notes capture snapshot.
 * @since 2.6.0
 * @ignore
 */
export interface ClinicalNotesCaptureStatus {
  /**
   * Current capture status.
   */
  status: ClinicalNotesStatus;
  /**
   * Session stream ID. Empty string when capture is not active.
   */
  streamId: string;
}
/**
 * Options for stopping Clinical Notes capture.
 */
interface StopClinicalNotesCaptureOptions {
  /**
   * Cancel the stream instead of a normal stop. Defaults to `false`.
   */
  cancelStream?: boolean;
}
/**
 * The Clinical Notes client.
 *
 * Clinical Notes capture can be started by the session host. Participants can ask
 * the host to stop capture, and the host can approve or decline that request.
 *
 * ```javascript
 * const clinicalNotesClient = client.getClinicalNotesClient();
 *
 * client.on('clinical-notes-supported-change', ({ supported }) => {
 *   console.log('Clinical Notes supported:', supported);
 * });
 *
 * client.on('clinical-notes-status-change', ({ status, errorCode, streamId }) => {
 *   console.log('Clinical Notes status:', status, errorCode, streamId);
 * });
 *
 * if (clinicalNotesClient.isClinicalNotesEnabled()) {
 *   await clinicalNotesClient.startCapture();
 * }
 * ```
 *
 * @since 2.6.0
 * @category ClinicalNotes
 * @ignore
 */
export declare namespace ClinicalNotesClient {
  /**
   * Start Clinical Notes capture as the host.
   *
   * @returns
   * - `''`: Success.
   * - `Error`: Failure. Details in {@link ErrorTypes}.
   * @throws {ExceptionCode.CLINICAL_NOTES_ACCOUNT_DISABLE} Clinical Notes is not enabled for this account.
   * @throws {ExceptionCode.CLINICAL_NOTES_MISMATCH_STATE} Capture cannot be started in the current status.
   * @throws {ExceptionCode.CLINICAL_NOTES_CREDIT_RUN_OUT} All available notes for the current subscription period have been used.
   * @since 2.6.0
   * @category ClinicalNotes
   * @ignore
   */
  function startCapture(): ExecutedResult;

  /**
   * Pause an in-progress Clinical Notes capture.
   *
   * @returns
   * - `''`: Success.
   * - `Error`: Failure. Details in {@link ErrorTypes}.
   * @throws {ExceptionCode.CLINICAL_NOTES_MISMATCH_STATE} Capture cannot be paused in the current status.
   * @since 2.6.0
   * @category ClinicalNotes
   * @ignore
   */
  function pauseCapture(): ExecutedResult;

  /**
   * Resume a paused Clinical Notes capture.
   *
   * @returns
   * - `''`: Success.
   * - `Error`: Failure. Details in {@link ErrorTypes}.
   * @throws {ExceptionCode.CLINICAL_NOTES_MISMATCH_STATE} Capture cannot be resumed in the current status.
   * @since 2.6.0
   * @category ClinicalNotes
   * @ignore
   */
  function resumeCapture(): ExecutedResult;

  /**
   * Stop Clinical Notes capture.
   *
   * @param options - Optional stop behavior.
   * @param options.cancelStream - If `true`, cancel the stream instead of stopping it normally.
   * @returns
   * - `''`: Success.
   * - `Error`: Failure. Details in {@link ErrorTypes}.
   * @throws {ExceptionCode.CLINICAL_NOTES_MISMATCH_STATE} Capture cannot be stopped in the current status.
   * @since 2.6.0
   * @category ClinicalNotes
   * @ignore
   */
  function stopCapture(options?: StopClinicalNotesCaptureOptions): ExecutedResult;

  /**
   * Ask the host to stop Clinical Notes capture.
   *
   * Only a participant (non-host) can call this method.
   * Listen to `clinical-notes-stop-response` for the host decision.
   *
   * @returns
   * - `''`: Success.
   * - `Error`: Failure. Details in {@link ErrorTypes}.
   * @throws {ExceptionCode.CLINICAL_NOTES_MISMATCH_STATE} Capture cannot be asked to stop in the current status.
   * @since 2.6.0
   * @category ClinicalNotes
   * @ignore
   */
  function askToStopCapture(): ExecutedResult;

  /**
   * Approve a participant's request to stop Clinical Notes capture.
   *
   * Only the host can call this method.
   *
   * @returns
   * - `''`: Success.
   * - `Error`: Failure. Details in {@link ErrorTypes}.
   * @throws {ExceptionCode.CLINICAL_NOTES_MISMATCH_STATE} There is no pending stop request, or capture is not active.
   * @since 2.6.0
   * @category ClinicalNotes
   * @ignore
   */
  function approveStopCapture(): ExecutedResult;

  /**
   * Decline a participant's request to stop Clinical Notes capture.
   *
   * Only the host can call this method.
   *
   * @returns
   * - `''`: Success.
   * - `Error`: Failure. Details in {@link ErrorTypes}.
   * @throws {ExceptionCode.CLINICAL_NOTES_MISMATCH_STATE} There is no pending stop request, or capture is not active.
   * @since 2.6.0
   * @category ClinicalNotes
   * @ignore
   */
  function declineStopCapture(): ExecutedResult;

  /**
   * Get whether Clinical Notes is enabled for this session.
   *
   * @returns Whether Clinical Notes is enabled.
   * @since 2.6.0
   * @category ClinicalNotes
   * @ignore
   */
  function isClinicalNotesEnabled(): boolean;

  /**
   * Get the current Clinical Notes capture status.
   *
   * @returns Current capture status and stream ID.
   * @since 2.6.0
   * @category ClinicalNotes
   * @ignore
   */
  function getClinicalNotesStatus(): ClinicalNotesCaptureStatus;
}

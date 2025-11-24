import { ExecutedResult, Participant } from './common';

/**
 * Options for starting a whiteboard session
 */
interface StartWhiteboardOptions {
  /**
   * Whether to disable whiteboard export functionality.
   * When set to true, users will not be able to export the whiteboard as PDF.
   * @defaultValue false (export is enabled by default)
   */
  isDisableExport?: boolean;
}
/**
 * Permission codes for whiteboard sharing control.
 * Determines who can start or take control of a whiteboard session.
 */
export enum WhiteboardSharePermissionCode {
  /**
   * Only the host or manager can start whiteboard sharing.
   * Other participants cannot initiate or take control of the whiteboard.
   */
  LockShare = 0,
  /**
   * Host or manager can grab control of the whiteboard from the current presenter.
   * Regular participants can start whiteboard but may lose control to host/manager.
   */
  HostGrab = 1,
  /**
   * Any participant can grab control of the whiteboard.
   * Most permissive mode allowing any participant to take over whiteboard control.
   */
  AnyoneGrab = 3,
}

/**
 * Permission codes for initiating new whiteboard sessions.
 * Controls who can create new whiteboard instances during a meeting.
 */
export enum WhiteboardInitiatePermissionCode {
  /**
   * Only the host or manager can initiate a new whiteboard.
   * Regular participants cannot create new whiteboard sessions.
   */
  HostOnly = 0,
  /**
   * All participants can initiate new whiteboards.
   * Most permissive mode allowing any participant to create whiteboard sessions.
   */
  AllParticipants = 2,
}

/**
 * Status of the whiteboard session
 */
export enum WhiteboardStatus {
  /**
   * Whiteboard session is closed or not started.
   */
  Closed = 0,
  /**
   * Whiteboard is initializing.
   */
  Pending = 1,
  /**
   * Whiteboard session is active and in progress.
   */
  InProgress = 2,
}

/**
 * The client for managing whiteboard functionality in a Zoom meeting.
 * Provides methods for starting, viewing, and controlling collaborative whiteboards.
 *
 */
export declare namespace WhiteboardClient {
  /**
   * Start a whiteboard session as the presenter.
   * The current user becomes the whiteboard presenter.
   *
   * @param element - HTML element where the whiteboard will be rendered
   * @param options - Optional configuration whiteboard
   * @returns Promise that resolves when the whiteboard session starts successfully
   *
   * @throws {INVALID_OPERATION} If screen sharing is in progress or whiteboard conflicts exist
   * @throws {INSUFFICIENT_PRIVILEGES} If user lacks permission to start whiteboard
   * @throws {INVALID_PARAMETERS} If the provided docId or templateId is incorrect
   *
   * @example
   * ```typescript
   * // Start a new blank whiteboard
   * await whiteboardClient.startWhiteboardScreen(whiteboardElement);
   *
   * ```
   * @since 2.3.5
   */
  function startWhiteboardScreen(
    element: HTMLElement,
    options?: StartWhiteboardOptions,
  ): ExecutedResult | Promise<string>;

  /**
   * Stop the current whiteboard session as the presenter.
   * Only the current presenter can stop their own whiteboard session.
   * Other participants' view will automatically close when the presenter stops.
   *
   * @returns Promise that resolves when the whiteboard session stops successfully
   *
   * @example
   * ```typescript
   * await whiteboardClient.stopWhiteboardScreen();
   * ```
   * @since 2.3.5
   */
  function stopWhiteboardScreen(): ExecutedResult | Promise<string>;

  /**
   * Start viewing another participant's whiteboard session.
   * Allows the current user to see and interact with a whiteboard being presented by another user.
   * The viewer can see real-time updates and may be able to annotate based on permissions.
   *
   * @param element - HTML element where the whiteboard will be rendered
   * @param presenterId - User ID of the whiteboard presenter to view
   * @param options - Optional configuration whiteboard
   * @returns Promise that resolves when successfully joined the whiteboard view
   *
   * @throws {INVALID_PARAMETERS} If the specified presenter hasn't started a whiteboard
   * @throws {INVALID_OPERATION} If whiteboard state is invalid
   *
   * @example
   * ```typescript
   * // Listen for peer whiteboard state changes and automatically join
   * client.on('peer-whiteboard-state-change', async (payload) => {
   *   const { action, userId } = payload;
   *
   *   if (action === 'Start') {
   *     // Another user started presenting whiteboard
   *     await whiteboardClient.startWhiteboardView(whiteboardElement, userId);
   *   } else if (action === 'Stop') {
   *     // Presenter stopped sharing whiteboard
   *     await whiteboardClient.stopWhiteboardView();
   *   }
   * });
   *
   * // Or manually view a specific presenter's whiteboard
   * const presenter = whiteboardClient.getWhiteboardPresenter();
   * if (presenter) {
   *   await whiteboardClient.startWhiteboardView(whiteboardElement, presenter.userId);
   * }
   * ```
   * @since 2.3.5
   */
  function startWhiteboardView(
    element: HTMLElement,
    presenterId: number,
    options?: StartWhiteboardOptions,
  ): ExecutedResult | Promise<string>;

  /**
   * Stop viewing the current whiteboard session.
   * Disconnects the current user from viewing another participant's whiteboard.
   *
   * @returns Promise that resolves when successfully stopped viewing the whiteboard
   *
   * @throws {INVALID_OPERATION} If the current user is the presenter (use stopWhiteboardScreen instead)
   *
   * @example
   * ```typescript
   * await whiteboardClient.stopWhiteboardView();
   * ```
   * @since 2.3.5
   */
  function stopWhiteboardView(): ExecutedResult | Promise<string>;

  /**
   * Set whiteboard permission settings for the meeting.
   * Controls who can share and initiate whiteboards.
   * Only the host or manager can change whiteboard permissions.
   *
   * @param permissionOption - Permission configuration object
   * @returns Promise that resolves when permissions are successfully updated
   *
   * @example
   * ```typescript
   * // Allow only host to start whiteboard, but anyone can grab control
   * await whiteboardClient.setWhiteboardPermission({
   *   initiatePermission: WhiteboardInitiatePermissionCode.HostOnly,
   *   sharePermission: WhiteboardSharePermissionCode.AnyoneGrab
   * });
   *
   * // Lock down whiteboard to host only
   * await whiteboardClient.setWhiteboardPermission({
   *   initiatePermission: WhiteboardInitiatePermissionCode.HostOnly,
   *   sharePermission: WhiteboardSharePermissionCode.LockShare
   * });
   * ```
   * @since 2.3.5
   */

  // function setWhiteboardPermission(permissionOption: {
  //   sharePermission?: WhiteboardSharePermissionCode;
  //   initiatePermission?: WhiteboardInitiatePermissionCode;
  // }): ExecutedResult | Promise<string>;

  /**
   * Lock or unlock whiteboard sharing permissions.
   * When locked, only the host or manager can start whiteboard sharing.
   * Convenience method that sets sharePermission to LockShare or HostGrab.
   *
   * @param isLocked - true to lock whiteboard to host/manager only, false to allow host grabbing
   * @returns Promise that resolves when permission is successfully updated
   *
   * @example
   * ```typescript
   * // Lock whiteboard to host only
   * await whiteboardClient.lockWhiteboardPermission(true);
   *
   * // Unlock to allow host grabbing
   * await whiteboardClient.lockWhiteboardPermission(false);
   * ```
   * @since 2.3.5
   */

  // function lockWhiteboardPermission(
  //   isLocked: boolean,
  // ): ExecutedResult | Promise<string>;

  /**
   * Export the current whiteboard content to a file.
   * Downloads the whiteboard as an document (PDF).
   * Can optionally include comments and annotations in the export.
   *
   * @param format - Export format: 'pdf' for document
   * @param name - Optional custom filename (without extension). Defaults to meeting topic
   * @param includeComments - Whether to include comments in the export. Defaults to false
   * @returns Promise that resolves when export completes and download starts
   *
   * @throws {INVALID_OPERATION} If whiteboard is not currently in progress
   *
   * @example
   * ```typescript
   * // Export as PDF with default name
   * await whiteboardClient.exportWhiteboard('pdf');
   *
   * // Export as pdf with custom name and comments
   * await whiteboardClient.exportWhiteboard('pdf', 'brainstorm-session', true);
   * ```
   * @since 2.3.5
   */
  function exportWhiteboard(
    format: 'pdf',
    name?: string,
    includeComments?: boolean,
  ): ExecutedResult | Promise<string>;

  /**
   * Check if whiteboard feature is enabled for the current meeting.
   * Whiteboard may be disabled due to account settings, device limitations,
   * or unsupported platforms (e.g., mobile browsers).
   *
   * @returns true if whiteboard feature is available, false otherwise
   *
   * @example
   * ```typescript
   * if (whiteboardClient.isWhiteboardEnabled()) {
   *   // Show whiteboard UI controls
   * } else {
   *   // Hide or disable whiteboard features
   * }
   *
   * ```
   * @since 2.3.5
   */
  function isWhiteboardEnabled(): boolean;

  /**
   * Get the current whiteboard session status.
   *
   * @returns Current WhiteboardStatus (Closed, Pending, or InProgress)
   *
   * @example
   * ```typescript
   * const status = whiteboardClient.getWhiteboardStatus();
   * if (status === WhiteboardStatus.InProgress) {
   *   console.log('Whiteboard is active');
   * }
   * ```
   * @since 2.3.5
   */
  function getWhiteboardStatus(): WhiteboardStatus;

  /**
   * Get the current whiteboard presenter information.
   * Returns null if no whiteboard session is active.
   *
   * @returns Participant object of the current presenter, or null if no active session
   *
   * @example
   * ```typescript
   * const presenter = whiteboardClient.getWhiteboardPresenter();
   * if (presenter) {
   *   console.log(`${presenter.displayName} is presenting the whiteboard`);
   * }
   * ```
   * @since 2.3.5
   */
  function getWhiteboardPresenter(): Participant | null;

  /**
   * Get the current whiteboard permission settings for the meeting.
   *
   * @returns Object containing current share and initiate permission codes
   *
   * @example
   * ```typescript
   * const permissions = whiteboardClient.getWhiteboardPermission();
   * console.log('Share permission:', permissions.sharePermission);
   * console.log('Initiate permission:', permissions.initiatePermission);
   * ```
   * @since 2.3.5
   */

  // function getWhiteboardPermission(): {
  //   sharePermission: WhiteboardSharePermissionCode;
  //   initiatePermission: WhiteboardInitiatePermissionCode;
  // };

  /**
   * Check if the current user can start a whiteboard session.
   * Takes into account permissions, current sharing state, and whiteboard status.
   * Returns false if whiteboard is disabled, screen sharing is active,
   * or user lacks necessary permissions.
   *
   * @returns true if the current user is allowed to start a whiteboard, false otherwise
   *
   * @example
   * ```typescript
   * const startButton = document.getElementById('start-whiteboard-btn');
   * startButton.disabled = !whiteboardClient.canStartWhiteboard();
   *
   * // Or use in conditional logic
   * if (whiteboardClient.canStartWhiteboard()) {
   *   await whiteboardClient.startWhiteboardScreen(element);
   * } else {
   *   console.log('You do not have permission to start a whiteboard');
   * }
   * ```
   * @since 2.3.5
   */
  function canStartWhiteboard(): boolean;
}

/**
 * Definition of error types for operations.
 * - INVALID_OPERATION: The operation is invalid, perhaps caused by duplicated operations.
 * - INTERNAL_ERROR: The remote service is temporarily unavailable.
 * - INSUFFICIENT_PRIVILEGES: The operation is only applicable for a host or manager.
 * - OPERATION_TIMEOUT: The operation timed out, try again later.
 * - IMPROPER_MEETING_STATE: The user is not in a meeting, see the reason for details.
 *  - `closed`: The meeting is not joined.
 *  - `on hold`: The user is on hold.
 *  - `reconnecting`: The meeting is reconnecting.
 * - INVALID_PARAMETERS: The parameters passed to the method are invalid, perhaps the wrong user ID or value, see the reason for details.
 * - OPERATION_LOCKED: The operation can not be completed because the relevant property is locked, see the reason for details.
 */
export type ErrorTypes =
  | 'INVALID_OPERATION'
  | 'INTERNAL_ERROR'
  | 'OPERATION_TIMEOUT'
  | 'INSUFFICIENT_PRIVILEGES'
  | 'IMPROPER_MEETING_STATE'
  | 'INVALID_PARAMETERS'
  | 'OPRATION_LOCKED';
/**
 * Failure reason for async operation.
 */
interface ExecutedFailure {
  /**
   * Error type.
   */
  type: ErrorTypes;
  /**
   * Error reason.
   */
  reason: string;
}
/**
 * The result of an asynchronous operation. It is a promise object.
 * - '': Success
 * - ExecutedFailure: Failure. Use `.catch(error=>{})` or `try{ *your code* }catch(error){}` to handle the errors.
 */
export type ExecutedResult = Promise<'' | ExecutedFailure>;

/**
 * The participant interface.
 */
interface Participant {
  /**
   * User ID.
   */
  userId: number;
  /**
   * User's display name.
   */
  displayName: string;
  /**
   * User's audio state.
   * - `''`: No audio.
   * - `computer`: Joined by computer audio.
   * - `phone`: Joined by phone.
   */
  audio: '' | 'computer' | 'phone';
  /**
   * Whether audio is muted.
   * If the user is not joined to audio (not connected to the microphone), the value is undefined
   */
  muted?: boolean;
  /**
   * Whether the user is the host.
   */
  isHost: boolean;
  /**
   * Whether the user is a manager.
   */
  isManager: boolean;
  /**
   * User's avatar.
   * Users can set their avatar in their [web profile](https://zoom.us/profile).
   */
  avatar?: string;
  /**
   * Whether the user started video.
   */
  bVideoOn: boolean;
  /**
   * Whether the user started sharing.
   */
  sharerOn: boolean;
  /**
   * Whether the share is paused.
   */
  sharerPause: boolean;
  /**
   * Whether the share is optimized for video.
   */
  bVideoShare?: boolean;
  /**
   * Whether the sharer is also sharing the tab audio.
   */
  bShareAudioOn?: boolean;
  /**
   *  Whether the sharer is also sharing to the subsession.
   */
  bShareToSubsession?: boolean;
  /**
   *  Whether the user connected via the phone.
   */
  isPhoneUser?: boolean;
  /**
   * The unified ID of a user among the main session or subsession.
   */
  userGuid?: string;
  /**
   * Whether to allow individual recording.
   */
  isAllowIndividualRecording: boolean;
  /*
   * Whether the user has a camera connected to the device.
   */
  isVideoConnect: boolean;
  /**
   * The `user_identity` from the JWT payload.
   */
  userIdentity?: string;
  /**
   * Whether the user is only connected to the audio speaker, not the microphone.
   */
  isSpeakerOnly?: boolean;
  /**
   * The phone number if the user is a public switched telephone network (PSTN) call out user.
   * For privacy concerns, only the calling user has this property.
   */
  phoneNumber?: string;
  /**
   * Whether the user is in a failover process.
   */
  isInFailover?: boolean;
}
/**
 * Subsession's status.
 */
export enum SubsessionStatus {
  /**
   * Subsession is not open.
   */
  NotStarted = 1,
  /**
   * Subsession is open.
   */
  InProgress = 2,
  /**
   * Subsession is closing, there may be a closing countdown.
   */
  Closing = 3,
  /**
   * Subsession is closed.
   */
  Closed = 4,
}

/**
 * Dial out state.
 *
 * Normal process: Calling-> Ringing->Accepted->Success
 *
 * Busy process: Calling->Busy
 */
export enum DialoutState {
  /**
   * Calling.
   */
  Calling = 1,
  /**
   * Ringing.
   */
  Ringing = 2,
  /**
   * User accepted the call.
   */
  Accepted = 3,
  /**
   * Busy.
   */
  Busy = 4,
  /**
   * Service unavailable.
   */
  NotAvailable = 5,
  /**
   * User hung up the call.
   */
  HangUp = 6,
  /**
   * Call failed.
   */
  Fail = 7,
  /**
   * Call succeeded.
   */
  Success = 8,
  /**
   * Timeout.
   */
  Timeout = 9,
  /**
   * Canceling the call.
   */
  Canceling = 10,
  /**
   * Canceled the call.
   */
  Canceled = 11,
  /**
   * Failed to cancel the call.
   */
  CancelFailed = 12,
}

/**
 * Payload audio muted source type for current-audio-change event.
 */
export enum MutedSource {
  /**
   * User actively muted.
   */
  Active = 'active',
  /**
   * The host muted the user.
   */
  PassiveByMuteOne = 'passive(mute one)',
  /**
   * The host muted all users.
   */
  PassiveByMuteAll = 'passive(mute all)',
}

/**
 * Payload for action type of current audio change.
 */
export enum AudioChangeAction {
  /**
   * Join the audio.
   */
  Join = 'join',
  /**
   * Leave the audio.
   */
  Leave = 'leave',
  /**
   * Muted.
   */
  Muted = 'muted',
  /**
   * Unmuted.
   */
  Unmuted = 'unmuted',
}

/**
 * The reconnecting reason for the connection-change payload.
 */
export enum ReconnectReason {
  /**
   * Meeting failover.
   */
  Failover = 'failover',
  /**
   * Join the breakout subsession.
   */
  JoinSubsession = 'join breakout room',
  /**
   * Move among the breakout subsessions.
   */
  MoveToSubsession = 'move to breakout room',
  /**
   * Back to the main session.
   */
  BackToMainSession = 'back to main session',
}
/**
 * Enumeration of video quality.
 * @enum
 */
export enum VideoQuality {
  /**
   * 90P
   */
  Video_90P = 0,
  /**
   * 180P
   */
  Video_180P = 1,
  /**
   * 360P
   */
  Video_360P = 2,
  /**
   * 720P
   */
  Video_720P = 3,
}
/**
 *  `facingMode` for mobile browser, see https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints/facingMode.
 */
export enum MobileVideoFacingMode {
  /**
   * The video source is facing toward the user, such as a front-facing camera on a mobile device.
   */
  User = 'user',
  /**
   * The video source is facing away from the user, such as the back camera on a mobile device facing the user's environment.
   */
  Environment = 'environment',
  /**
   * The video source is facing toward the user but to their left, such as a camera aimed toward the user but over their left shoulder.
   */
  Left = 'left',
  /**
   * The video source is facing toward the user but to their right, such as a camera aimed toward the user but over their right shoulder.
   */
  Right = 'right',
}

/**
 * Enumeration of camera control command.
 * @enum
 */
export enum CameraControlCmd {
  /**
   * Zoom in.
   */
  ZoomIn = 2,
  /**
   * Zoom out.
   */
  ZoomOut = 3,
  /**
   * Pan left.
   */
  Left = 4,
  /**
   * Pan right.
   */
  Right = 5,
  /**
   * Tilt up.
   */
  Up = 6,
  /**
   * Tilt down.
   */
  Down = 7,
  /**
   * Switch camera.
   */
  SwitchCamera = 8,
}

/**
 * Capability of camera.
 */
export interface PTZCameraCapability {
  /**
   * Pan
   */
  pan: boolean;
  /**
   * Tilt
   */
  tilt: boolean;
  /**
   * Zoom
   */
  zoom: boolean;
}

/**
 * Reasons for refusal to control far-end camera.
 */
export enum FarEndCameraControlDeclinedReason {
  /**
   * Normal.
   */
  None = 0,
  /**
   * Approved another user.
   */
  ApproveAnother = 3,
  /**
   * User withdrew the control.
   */
  Stop = 5,
}
/**
 * Log level
 */
type LogLevelLabel = 'debug' | 'log' | 'info' | 'print' | 'warn' | 'error';
/**
 * Log level object
 */
export type LogLevelDetail = {
  /**
   * debug
   */
  debug: boolean;
  /**
   * log
   */
  log: boolean;
  /**
   * info
   */
  info: boolean;
  /**
   * print
   */
  print: boolean;
  /**
   * warn
   */
  warn: boolean;
  /**
   * error
   */
  error: boolean;
};
/**
 * Logger init option
 */
export interface LoggerInitOption {
  /**
   * Whether in debug mode or not. In debug mode, the log prints to console.
   */
  debugMode?: boolean;
  /**
   * The external tracking ID.
   */
  trackingId?: string;
}

/**
 * Media playback file for audio or video input
 */
export interface MediaPlaybackFile {
  /**
   * Media playback file URL.
   */
  url: string;
  /**
   * Start time of file playback.
   */
  currentTime?: number;
  /**
   * Is loop
   */
  loop?: boolean;
}

/**
 * File transfer upload status
 */
export enum ChatFileUploadStatus {
  /**
   * Init
   */
  Init = 0,
  /**
   * InProgress
   */
  InProgress = 1,
  /**
   * Success
   */
  Success = 2,
  /**
   * Fail
   */
  Fail = 3,
  /**
   * Cancel
   */
  Cancel = 4,
  /**
   * Complete
   */
  Complete = 5,
}
/**
 * File transfer download status
 */
export enum ChatFileDownloadStatus {
  /**
   * InProgress
   */
  InProgress = 1,
  /**
   * Success
   */
  Success = 2,
  /**
   * Fail
   */
  Fail = 3,
  /**
   * Cancel
   */
  Cancel = 4,
}

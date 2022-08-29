/**
 * Define error types of operations.
 * - INVALID_OPERATION: The operation is invalid, perhaps causeed by the duplicated operations.
 * - INTERNAL_ERROR: The remote service is temporarily unavailable.
 * - INSUFFICIENT_PRIVILEGES: The operation is only applicable for host or manager.
 * - OPERATION_TIMEOUT: The operation is timeout, try again later.
 * - IMPROPER_MEETING_STATE: The user is not in meeting, refer to the relevant reason for the detail.
 *  - `closed`: The meeting is not joined.
 *  - `on hold`: You are on hold.
 *  - `reconnecting`: The meeting is reconnecting.
 * - INVALID_PARAMETERS: The parameters passing to the method is invala, perhaps the wrong user id or the wrong value, refer to the relevant reason for the detail.
 * - OPERATION_LOCKED: The operation can not be completed because the relevant property is locked, refer to the relevant reason for the detail.
 */
export type ErrorTypes =
  | 'INVALID_OPERATION'
  | 'INTERNAL_ERROR'
  | 'OPERATION_TIMEOUT'
  | 'INSUFFICIENT_PRIVILEGES'
  | 'IMPROPER_MEETING_STATE'
  | 'INVALID_PARAMETERS'
  | 'OPRATION_LOCKED';
interface ExecutedFailure {
  type: ErrorTypes;
  reason: string;
}
/**
 * The result of asynchronous operation. It is a promise object.
 * - '': Success
 * - ExecutedFailure: Failure. Use `.catch(error=>{})` or `try{ *your code* }catch(error){}` to handle the errors.
 */
export type ExecutedResult = Promise<'' | ExecutedFailure>;

/**
 * Interface of a participant
 */
interface Participant {
  /**
   * Identify of a user.
   */
  userId: number;
  /**
   * Display name of a user.
   */
  displayName: string;
  /**
   * Audio state of a user.
   * - `''`: No audio.
   * - `computer`: Joined by computer audio.
   * - `phone`: Joined by phone
   */
  audio: '' | 'computer' | 'phone';
  /**
   * Whether audio is muted.
   */
  muted: boolean;
  /**
   * Whether the user is host.
   */
  isHost: boolean;
  /**
   * Whether the user is manager.
   */
  isManager: boolean;
  /**
   * The avatar of a user.
   * You can set the avatar in the [web profile](https://zoom.us/profile).
   */
  avatar?: string;
  /**
   * Whether the user is started video.
   */
  bVideoOn: boolean;
  /**
   * Whether the user is started share.
   */
  sharerOn: boolean;
  /**
   * Whether the share is paused
   */
  sharePause: boolean;
}
/**
 * Status of subsession
 */
export enum SubsessionStatus {
  /**
   * Subsession is not open
   */
  NotStarted = 1,
  /**
   * Subsession is open
   */
  InProgress = 2,
  /**
   * Subsession is closing, there may be a closing countdown
   */
  Closing = 3,
  /**
   * Subsession is closed
   */
  Closed = 4,
}

/**
 * The state of dial out state
 *
 * Normal process: Calling-> Ringing->Accepted->Success
 *
 * Busy process: Calling->Busy
 */
export enum DialoutState {
  /**
   * Calling
   */
  Calling = 1,
  /**
   * Ringing
   */
  Ringing = 2,
  /**
   * Accepted the call
   */
  Accepted = 3,
  /**
   * Busy
   */
  Busy = 4,
  /**
   * Service unavailable
   */
  NotAvailable = 5,
  /**
   * Hang up the call
   */
  HangUp = 6,
  /**
   * Fail
   */
  Fail = 7,
  /**
   * Success
   */
  Success = 8,
  /**
   * Timeout
   */
  Timeout = 9,
  /**
   * Canceling the call
   */
  Canceling = 10,
  /**
   * Canceled the call
   */
  Canceled = 11,
  /**
   * Cancel the call failed
   */
  CancelFailed = 12,
}

/**
 * Payload audio muted source type for current-audio-change event
 */
export enum MutedSource {
  /**
   * User actively muted
   */
  Active = 'active',
  /**
   * The host muted you
   */
  PassiveByMuteOne = 'passive(mute one)',
  /**
   * The host muted all
   */
  PassiveByMuteAll = 'passive(mute all)',
}

/**
 * Payload for action type of current audio change
 */
export enum AudioChangeAction {
  /**
   * Join the audio
   */
  Join = 'join',
  /**
   * Leave the audio
   */
  Leave = 'leave',
  /**
   * Muted
   */
  Muted = 'muted',
  /**
   * Unmuted
   */
  Unmuted = 'unmuted',
}

/**
 * Payload of connection-change, the reconnecting reason
 */
export enum ReconnectReason {
  /**
   * meeting failover
   */
  Failover = 'failover',
  /**
   * join the breakout subsession
   */
  JoinSubsession = 'join breakout room',
  /**
   * move among the breakout subsessions
   */
  MoveToSubsession = 'move to breakout room',
  /**
   * back to the main session
   */
  BackToMainSession = 'back to main session',
}
/**
 * Enumeration of video quality
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
 *  `facingMode` for mobile browser, see https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints/facingMode
 */
export enum MobileVideoFacingMode {
  /**
   * The video source is facing toward the user; this includes, for example, the front-facing camera on a smartphone.
   */
  User = 'user',
  /**
   * The video source is facing away from the user, thereby viewing their environment. This is the back camera on a smartphone.
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

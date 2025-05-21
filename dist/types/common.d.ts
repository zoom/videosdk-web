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
  /**
   * Error code.
   */
  errorCode: number;
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
  /**
   * Subsession ID.
   * Available if the user is in a subsession.
   */
  subsessionId?: string;
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
 * The reason for leaving audio for the current-audio-change event.
 * @enum
 */
export enum LeaveAudioSource {
  /**
   * User actively left audio.
   */
  Active = 'active',
  /**
   * Left audio due to failover.
   */
  Failover = 'failover',
  /**
   * Left audio due to system ending audio stream.
   */
  EndedBySystem = 'audio stream is ended by system',
  /**
   * Left audio as audio was connected to a phone call.
   */
  Pstn = 'pstn',
  /**
   * Left audio due to microphone error.
   */
  MicrophoneError = 'microphone error',
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
  /**
   * 1080P
   */
  Video_1080P = 4,
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
  /**
   * Whether to play the audio file locally
   */
  playback?: boolean;
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

/**
 * Summary status.
 */
export enum SummaryStatus {
  /**
   * Summary started.
   */
  Start = 'Start',
  /**
   * Summary paused.
   */
  Paused = 'Paused',
  /**
   * Summary stopped.
   */
  Stopped = 'Stopped',
  /**
   * default
   */
  Default = '',
}

/**
 * Meeting query status.
 */
export enum MeetingQueryStatus {
  /**
   * Meeting query started.
   */
  Start = 'Start',
  /**
   * Meeting query paused.
   */
  Paused = 'Paused',
  /**
   * Meeting query stopped.
   */
  Stopped = 'Stopped',
  /**
   * default
   */
  Default = '',
}
/**
 * The parent class of all source video stream processors.
 * > ***Note***: Only available in the video processor worker.
 *
 * @category Global
 */
export abstract class VideoProcessor {
  /**
   * constructor
   * @param port message port
   * @param options customised options
   */
  public constructor(port: MessagePort, options?: any);
  /**
   * The communication port used for messaging between the processor and the main thread.
   */
  protected port: MessagePort;
  /**
   * Function to retrieve an OffscreenCanvas that renders the current output frame or processed result.
   */
  public getOutput(): OffscreenCanvas | null;
  /**
   * Callback triggered during the initialization of the processor.
   */
  public onInit(): void;
  /**
   * Callback triggered during the uninitialization of the processor.
   */
  public onUninit(): void;
  /**
   * Processes a video frame and optionally applies effects or modifications.
   */
  public abstract processFrame(
    /**
     * The input video frame to be processed.
     */
    input: VideoFrame,
    /**
     * The canvas where the processed frame is rendered.
     */
    output: OffscreenCanvas,
  ): boolean | Promise<boolean>;
}
/**
 * The parent class of all source audio stream processors.
 * > ***Note***: AudioProcessor inherits from AudioWorkletProcessor and only available in audio worklet processors.
 *
 * @category Global
 */
export abstract class AudioProcessor extends AudioWorkletProcessor {
  /**
   * constructor
   * @param port message port
   * @param options customised options
   */
  public constructor(port: MessagePort, options?: any);
  /**
   * The communication port used for messaging between the processor and the main thread.
   */
  public port: MessagePort;
  /**
   * Callback triggered during the initialization of the processor.
   */
  public onInit(): void;
  /**
   * Callback triggered during the uninitialization of the processor.
   */
  public onUninit(): void;
}
/**
 * Registers a custom processor class.
 *> ***Note***: Only available in the processor worker.
 * @param name The name of the processor
 * @param processor The processor class
 *
 * @category Global
 */
export function registerProcessor(
  name: string,
  processor: typeof VideoProcessor | typeof AudioProcessor,
): void;
/**
 * Custom web component for video render
 *
 * @category Global
 */
export declare class VideoPlayer extends HTMLElement {
  ['node-id']: string;
  ['video-quality']: string;
}
/**
 * Custom web component for video render container
 *
 * @category Global
 */
export declare class VideoPlayerContainer extends HTMLElement {}

/**
 * CRC device call out return code
 */
export enum CRCReturnCode {
  /**
   * Success
   */
  Success = 0,
  /**
   * Ringing
   */
  Ringing = 1,
  /**
   * Timeout
   */
  Timeout = 2,
  /**
   * Busy
   */
  Busy = 101,
  /**
   * Fail
   */
  Fail = 104,
  /**
   * Unreachable
   */
  Unreachable = 111,
}
/**
 * CRC device protocol
 */
export enum CRCProtocol {
  /**
   * H323
   */
  H323 = 1,
  /**
   * SIP
   */
  SIP = 2,
}

/**
 * Active media failed error code
 */
export enum ActiveMediaFailedCode {
  /**
   * Failed to establish the audio data channel.
   */
  AudioConnectionFailed = 101,
  /**
   * Audio track ended.
   */
  AudioStreamEnded = 102,
  /**
   * Microphone permission denied.
   */
  MicrophonePermissionReset = 103,
  /**
   * Failed to get audio data from the stream.
   */
  AudioStreamFailed = 104,
  /**
   * Microphone muted in the system.
   */
  MicrophoneMuted = 105,
  /**
   * Sent audio playback was interrupted.
   */
  AudioStreamMuted = 106,
  /**
   * Remote audio playback was interrupted.
   */
  AudioPlaybackInterrupted = 107,
  /**
   * Failed to establish the video data channel.
   */
  VideoConnectionFailed = 201,
  /**
   * Video track ended.
   */
  VideoStreamEnded = 202,
  /**
   * Camera permission denied.
   */
  CameraPermissionReset = 203,
  /**
   * WebGL context invalid.
   */
  WebGlContextInvalid = 204,
  /**
   * Out of memory
   */
  WasmOutOfMemory = 205,
  /**
   * Failed to get video data from the stream.
   */
  VideoStreamFailed = 206,
  /**
   * Video stream was interrupted.
   */
  VideoStreamMuted = 207,
  /**
   * Failed to get sharing data from the stream.
   */
  SharingStreamFailed = 301,
}

/**
 * Processor type
 */
type MediaType = 'audio' | 'video' | 'share';

/**
 * Processor instance
 */
export interface Processor {
  /**
   * Processor name
   */
  name: string;
  /**
   * Processor type, currently only supports video
   */
  type: MediaType;
  /**
   * Communication interface with processor
   */
  port: MessagePort;
}

/**
 * Processor construction parameters
 */
export interface ProcessorParams {
  /**
   * Load the processor script from the absolute URL (the processor script must be from the same origin or CORS must be enabled).
   */
  url: string;
  /**
   * Processor name
   */
  name: string;
  /**
   * Processor type, currently only supports video
   */
  type: MediaType;
  /**
   * Parameters to pass into the processor constructor
   */
  options?: any;
}

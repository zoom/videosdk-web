import { RecordingStatus } from './recording';
import { SharePrivilege } from './media';
import { ChatMessage, ChatPrivilege } from './chat';
import {
  SubsessionStatus,
  DialoutState,
  ReconnectReason,
  AudioChangeAction,
  MutedSource,
} from './common';
/**
 * Interface of a ParticipantPropertiesPayload
 */
export interface ParticipantPropertiesPayload {
  /**
   * Identify of the user
   */
  userId: number;
  /**
   * Avatar of the user
   */
  avatar?: string;
  /**
   * Display name
   */
  displayName?: string;
  /**
   * Whether the user is host
   */
  isHost?: boolean;
  /**
   * Whether the user is manager
   */
  isManager: boolean;
  /**
   * Whether the audio is muted
   */
  muted?: boolean;
  /**
   * Whether the user is starting the video
   */
  bVideoOn?: boolean;
  /**
   * Whether the user is starting share
   */
  sharerOn?: boolean;
  /**
   * Whether the sharing is paused
   */
  sharerPause?: boolean;
}
/**
 * The State of Meeting connection.
 */
export declare enum ConnectionState {
  Connected = 'Connected',
  Reconnecting = 'Reconnecting',
  Closed = 'Closed',
}

/**
 * The State of Video
 */
export declare enum VideoActiveState {
  Active = 'Active',
  Inactive = 'Inactive',
}
/**
 * The State of Current User's Video Capturing
 */
export declare enum VideoCapturingState {
  Started = 'Started',
  Stopped = 'Stopped',
  Failed = 'Failed',
}

/**
 * Reason of passively stop screen share
 */
export declare enum PassiveStopShareReason {
  /**
   * Privilege change or others start new sharing
   */
  PrivilegeChange = 'PrivilegeChange',
  /**
   * User click the stop share on the browser control bar
   */
  StopScreenCapture = 'StopScreenCapture',
}
/**
 * Reason of the meeting closed
 * - `kicked by host`: Been kicked by the host.
 * - `ended by host`: The meeting is ended by the hose.
 * - `expeled by host`: Been expeled by the host.
 */
type ClosedReason = 'kicked by host' | 'ended by host' | 'expeled by host';
/**
 * Interface of Connection Changed Payload
 */
interface ConnectionChangePayload {
  /**
   * Connection State
   */
  state: ConnectionState;
  /**
   * Reason of the change.
   */
  reason?: ReconnectReason | ClosedReason;
  /**
   * If the reason is JoinSubsession or MoveToSubsession, this is the subsession name
   */
  subsessionName?: string;
}

/**
 * Interface of active speaker in meeting.
 */
interface ActiveSpeaker {
  /**
   * Identify of user
   */
  userId: number;
  /**
   * Display name of user
   */
  displayName?: string;
}

interface MediaSDKEncDecPayload {
  action: 'encode' | 'decode';
  type: 'audio' | 'video' | 'share';
  result: 'success' | 'fail';
}

/**
 *
 * Occurs when the connection is changed.
 *
 * @param payload The event detail.
 * @event
 * @category Session
 */
export declare function event_connection_change(
  payload: ConnectionChangePayload,
): void;

/**
 * Occurs when new participant join the meeting
 *
 * ```javascript
 * client.on('user-added',(payload)=>{
 *  // You can refresh the participants when
 *  const participants = client.getParticipantsList();
 * })
 * ```
 * @param payload The event detail
 * @event
 * @category Session
 */
export declare function event_user_add(
  payload: Array<ParticipantPropertiesPayload>,
): void;
/**
 * Occurs when the properties of the participants updated.
 * @param payload The event detail
 * @event
 * @category Session
 */
export declare function event_user_update(
  payload: Array<ParticipantPropertiesPayload>,
): void;
/**
 * Occurs when the participants leave the meeting
 * @param payload The event detail
 * @event
 * @category Session
 */
export declare function event_user_remove(
  payload: Array<ParticipantPropertiesPayload>,
): void;

/**
 * Occurs when remote video stream changes.
 *
 * ```javascript
 * client.on('video-active-change', async(payload) => {
 *   try {
 *     if (payload.state === 'Active') {
 *       await stream.renderVideo(canvas,userId,1280,720,0,0,3);
 *     } else {
 *       await astream.stopRenderVideo();
 *     }
 *   } catch (error) {
 *     console.log(error);
 *   }
 * });
 * ```
 * @param payload The event detail
 * @event
 * @category Video
 */
export declare function event_video_active_change(payload: {
  state: VideoActiveState;
  userId: number;
}): void;
/**
 * Occurs when local video capture stream changes.
 *
 * ```javascript
 * client.on('video-capturing-change', (payload) => {
 *   try {
 *     if (payload.state === 'Started') {
 *       console.log('Capture started');
 *     } else if (payload.state === 'Stopped') {
 *       console.log('Capture stopped');
 *     } else {
 *       console.log('Stop capturing Failed');
 *     }
 *   } catch (error) {
 *     console.log(error);
 *   }
 * });
 * ```
 * @param payload The event detail
 * @event
 * @category Video
 */
export declare function event_video_capturing_change(payload: {
  state: VideoCapturingState;
}): void;
/**
 * Occurs when received video content dimension change
 * ```javascript
 * client.on('video-dimension-change', payload=>{
 *  viewportElement.style.width = `${payload.width}px`;
 *  viewportElement.style.height = `${payload.height}px`;
 * })
 * ```
 * @param payload
 * @event
 * @category Video
 */
export declare function event_video_dimension_change(payload: {
  width: number;
  height: number;
  type: 'received';
}): void;
/**
 *
 * Occurs when other participants start/stop video
 *
 * @param payload
 * @event
 * @category Video
 */
export declare function event_peer_video_state_change(payload: {
  action: 'Start' | 'Stop';
  userId: number;
}): void;
/**
 * Occurs when some participants in meeting are talking
 *
 * ```javascript
 * client.on('active-speaker', (payload) => {
 *    console.log(`Active user:`,payload);
 * });
 * ```
 * @param payload active user
 * - Distinguish activity level by the volume, the bigest is the first element.
 * @event
 * @category Audio
 */
export declare function event_audio_active_speaker(
  payload: Array<ActiveSpeaker>,
): void;
/**
 * Occurs when host ask you to unmute audio.
 * @param payload the event detail
 * - reason:
 *  - `Spotlight`: Host spotlighted you, and if you are muted, you will receive the consent.
 *  - `Unmute`: Host ask you to unmute audio.
 *  - `Allow to talk`: You are an attendee of a webinar, the host allowed you to talk.
 *
 * ```javascript
 * client.on('unmute-audio-consent', (payload) => {
 *    console.log(payload.reason);
 * });
 * ```
 * @event
 * @category Audio
 */
export declare function event_audio_unmute_consent(payload: {
  reason: 'Spotlight' | 'Unmute' | 'Allow to talk';
}): void;
/**
 * Occurs when current audio is changed
 * @param payload the event detail
 * - action
 *  - `join`: Join the audio. refer to the `type` attribute get the detail.
 *  - `leave`: Leave the audio.
 *  - `muted`: Audio muted, refer to the `source` attribute get the detail.
 *  - `unmuted`: Audio unmuted,refer to the `source` attribute get the detail.
 * - type
 *  - `computer': Join by the computer audio.
 *  - `phone`: Join by the phone.
 * - source
 *  - `active`: User active action.
 *  - `passive(mute all)`: Muted due to the host muted all.
 *  - `passive(mute one)`: Muted due to the host muted you.
 *  - `passive`: Umnuted due to the host unmuted you.
 *
 * ```javascript
 * client.on('current-audio-change', (payload) => {
 *    if(payload.action==='join'){
 *     console.log('Joined by ',payload.type);
 *    }
 * });
 * ```
 * @event
 * @category Audio
 */
export declare function event_current_audio_change(payload: {
  action: AudioChangeAction;
  type?: 'phone' | 'computer';
  source?: MutedSource;
}): void;
/**
 * Occurs when the SDK try to auto play audio failed. It may occur invoke stream.joinComputerAudio() immediately after join the meeting.
 *
 * ```javascript
 * client.on('auto-play-audio-failed',()=>{
 *  console.log('auto play audio failed, waiting user's interaction');
 * })
 * ```
 * @event
 * @category Audio
 */
export declare function event_auto_play_audio_failed(): void;
/**
 * Occurs when receive a chat
 * @param payload the event detail
 * ```javascript
 * client.on('chat-on-message',payload=>{
 *  console.log('from %s, message:%s',payload.sender.name,payload.message);
 * })
 * ```
 * @event
 * @category Chat
 */
export declare function event_chat_received_message(payload: ChatMessage): void;

/**
 * Occurs when message is deleted
 * @param payload id of message
 * ```javascript
 * client.on('chat-delete-message',payload=>{
 *  console.log('from %s, message:%s',payload.sender.name,payload.message);
 * })
 * ```
 * @event
 * @category Chat
 */
export declare function event_chat_delete_message(payload: { id: string }): void;

/**
 * Occurs when the host change the privilege of chat
 * @param payload the event detail
 * ```javascript
 * client.on('chat-privilege-change',payload=>{
 *  console.log(payload.chatPrivilege);
 * })
 * ```
 * @event
 * @category Chat
 */
export declare function event_chat_privilege_change(payload: {
  chatPrivilege: ChatPrivilege;
}): void;

/**
 * Occurs when the command channel status changed
 * @param payload
 *```javascript
 * client.on('command-channel-status',payload=>{
 *  console.log('from %s, message:%s',payload);
 * })
 * ```
 * @event
 * @category Command channel
 */
export declare function event_command_channel_status(payload: any): void;

/**
 * Occurs when command channel receive msg
 * @param payload the event detail
 * ```javascript
 * client.on('command-channel-message',payload=>{
 *  console.log('from %s, message:%s',payload.senderId, payload.text, payload.timestamp);
 * })
 * ```
 * @event
 * @category Command channel
 */
export declare function event_command_channel_message(payload: any): void;
/**
 * Occurs when cloud recording status changes.
 * @param payload The recording status
 * @event
 * @category Recording
 */
export declare function event_recording_change(payload: {
  state: RecordingStatus;
}): void;
/**
 * Occurs when add or remove the microphone/speaker/camera
 * @event
 * @category Media
 */
export declare function event_device_change(): void;
/**
 * Occurs when the encode or decode state of media sdk changes
 * @param payload
 * @event
 * @category Media
 */
export declare function event_media_sdk_change(payload: MediaSDKEncDecPayload): void;
/**
 * Occurs when some participant is start sharing screen
 *
 * ```javascript
 * client.on('active-share-change',payload=>{
 *  if(payload.state==='Active'){
 *   stream.startRenderScreenShare(payload.userId,canvas);
 *  }else if(payload.state==='Inactive'){
 *   stream.stopRenderScreenShare();
 *  }
 * })
 * ```
 * @param payload
 * @event
 * @category Screen share
 */
export declare function event_active_share_change(payload: {
  state: 'Active' | 'Inactive';
  userId: number;
}): void;
/**
 * Occurs when shared content dimension change
 * ```javascript
 * client.on('share-content-dimension-change',payload=>{
 *  viewportElement.style.width = `${payload.width}px`;
 *  viewportElement.style.height = `${payload.height}px`;
 * })
 * ```
 * @param payload
 * @event
 * @category Screen share
 */
export declare function event_share_content_dimension_change(payload: {
  type: 'sended' | 'received'; // sended: current share; received: others' share
  width: number;
  height: number;
}): void;
/**
 * Occurs when current sharing is passively stopped.
 * @param payload
 * @event
 * @category Screen share
 */
export declare function event_passively_stop_share(
  payload: PassiveStopShareReason,
): void;
/**
 * Occurs when some participant starts or stops screen share.
 *
 * ```javascript
 * client.on('peer-share-state-change',payload=>{
 *  if(payload.action==='Start'){
 *   console.log(`user:${payload.userId} starts share`);
 *  }else if(payload.action==='Stop'){
 *  console.log(`user:${payload.userId} stops share`);
 *  }
 * })
 * ```
 * @param payload
 * @event
 * @category Screen share
 */
export declare function event_peer_share_state_change(payload: {
  userId: number;
  action: 'Start' | 'Stop';
}): void;
/**
 * Occurs when received shared content automatically changed
 * - Maybe host start new sharing, received shared content will be automatically changed
 * @param payload
 * @event
 * @category Screen share
 */
export declare function event_share_content_change(payload: {
  userId: number;
}): void;
/**
 * Occurs when the host change the share privilege
 * @param payload
 * @event
 * @category Screen share
 */
export declare function event_share_privilege_change(payload: {
  privilege: SharePrivilege;
}): void;

/**
 * Occurs when dial out state change
 *
 * ```javascript
 * client.on('dialout-state-change', (payload) => {
 *    console.log(payload.code);
 * });
 * ```
 * @param payload
 * @event
 * @category Phone
 */
export declare function event_dial_out_change(payload: { code: DialoutState }): void;
/**
 * Occurs when share audio state changes. It is usually used to cooperatively change the state of computer audio
 * @param payload
 * @event
 * @category Audio
 */
export declare function event_share_audio_change(payload: {
  state: 'on' | 'off';
}): void;

/**
 * Occur when virtual background is enabled,and vb model is loaded
 * @param payload
 * @event
 * @category Video
 */
export declare function event_video_vb_preload_change(payload: {
  isReady: boolean;
}): void;
/**
 * Occurs when decode (recevied) the audio statistics data is changed
 * @param payload the event detail
 * - `data`
 *  - `encoding`: if encoding is true, means that the data is encoding audio data statisitics.
 *  - `avg_loss`: average package loss for audio
 *  - `jitter`: jitter for audio
 *  - `max_loss`: max package loss for audio
 *  - `rtt`: round trip time for audio .
 *  - `sample_rate`: sample rate audio
 * - `type` : string AUDIO_QOS_DATA
 * ```javascript
 * client.on('audio-statistic-data-change', (payload) => {
 *   console.log('emit', payload);
 *  });
 * ```
 * @event
 * @category Audio
 */

export declare function event_audio_statistic_data_change(payload: {
  data: {
    avg_loss: number;
    encoding: boolean;
    jitter: number;
    max_loss: number;
    rtt: number;
    sample_rate: number;
  };
  type: 'AUDIO_QOS_DATA';
}): void;
/**
 * Occurs when decode (recevied) the video statistics data is changed
 * @param payload the event detail
 * - `data`
 *  - `encoding`: if encoding is true, means that the data is encoding video data statisitics.
 *  - `avg_loss`: average package loss for video
 *  - `jitter`: jitter for video
 *  - `max_loss`: max package loss for video
 *  - `rtt`: round trip time for video .
 *  - `sample_rate`: sample rate video
 *  - `width`: width for video
 *  - `height`: height for video
 *  - `fps`: fps for video
 * - `type` : string VIDEO_QOS_DATA
 *
 * ```javascript
 * client.on('video-statistic-data-change', (payload) => {
 *   console.log('emit', payload);
 *  });
 * ```
 * @event
 * @category Video
 */

export declare function event_video_statistic_data_change(payload: {
  data: {
    avg_loss: number;
    encoding: boolean;
    jitter: number;
    max_loss: number;
    rtt: number;
    sample_rate: number;
    width: number;
    height: number;
    fps: number;
  };
  type: 'VIDEO_QOS_DATA';
}): void;

/** breakout room start */

/**
 *
 * Occurs when the host assigned you in to a subsession, you can decide whether to join the subsession
 * Use `SubsessionClient.joinSubsession(subsessionId)` to join the subsession
 *
 * @param payload
 *
 * @event
 * @category Subsession
 */
export declare function event_bo_invite_to_join(payload: {
  subsessionId: string;
  subsessionName: string;
}): void;

/**
 *
 * Occurs when the subsession has a countdown, this event will be triggered every second until time up
 *
 * @param payload
 *  -countdown: seconds remaining
 *
 * @event
 * @category Subsession
 */
export declare function event_bo_room_countdown(payload: {
  countdown: number;
}): void;

/**
 * Occurs when the countdown is over.
 *
 * @event
 * @category Subsession
 */
export declare function event_bo_room_time_up(): void;

/**
 * Occurs when there is a buffer countdown when the subsession is about to be closed, this event will be triggered every second until countdown is over
 * @param payload
 *  -countdown: seconds remaining
 *
 * @event
 * @category Subsession
 */
export declare function event_bo_closing_room_countdown(payload: {
  countdown: number;
}): void;
/**
 * Occurs when the host broadcasts content to all
 * @param payload
 *
 * @event
 * @category Subsession
 */
export declare function event_bo_broadcast_message(payload: {
  message: string;
}): void;

/**
 * Occurs when the host received the request for help
 * @param payload
 *
 * @event
 * @category Subsession
 */
export declare function event_bo_ask_for_help(payload: {
  userId: number;
  displayName: string;
  subsessionName: string;
  subsessionId: string;
}): void;
export declare enum AskHostHelpResponse {
  Received = 0,
  Busy = 1,
  Ignore = 2,
  AlreadyInRoom = 3,
}
/**
 * Occurs when the attendee received the repose the request for help
 * @param payload
 *
 * @event
 * @category Subsession
 */
export declare function event_bo_ask_for_help_response(payload: {
  result: AskHostHelpResponse;
}): void;
/**
 * Occurs when the status of subsession changed
 * @param payload
 *
 * @event
 * @category Subsession
 */
export declare function event_bo_room_state_change(payload: {
  status: SubsessionStatus;
}): void;
/**
 * Occurs when the host is in subsession,  main session user changed
 * @param payload
 *
 * @event
 * @category Subsession
 */
export declare function event_bo_main_session_change(payload: any): void;
/** breakout room end */

import { RecordingStatus } from './recording';
import {
  ShareCameraRemoteStatus,
  ShareCameraResponse,
  SharePrivilege,
} from './media';
import { ChatMessage, ChatPrivilege } from './chat';
import {
  SubsessionStatus,
  DialoutState,
  ReconnectReason,
  AudioChangeAction,
  MutedSource,
  VideoQuality,
  FarEndCameraControlDeclinedReason,
  PTZCameraCapability,
  SummaryStatus,
  MeetingQueryStatus,
  ChatFileUploadStatus,
  ChatFileDownloadStatus,
  LeaveAudioSource,
  CRCReturnCode,
  CRCProtocol,
  ActiveMediaFailedCode,
  SystemCPUPressureLevel,
  StatsReport,
  MobileVideoFacingMode,
} from './common';
import { LiveTranscriptionMessage } from './live-transcription';
import { LiveStreamStatus } from './live-stream';
import { BroadcastStreamingStatus } from './broadcast-streaming';
import {
  WhiteboardInitiatePermissionCode,
  WhiteboardSharePermissionCode,
  WhiteboardStatus,
} from './whiteboard';
import { RealTimeMediaStreamsStatus } from './real-time-media-streams';
/**
 * Interface of a ParticipantPropertiesPayload.
 */
export interface ParticipantPropertiesPayload {
  /**
   * User ID.
   */
  userId: number;
  /**
   * User's avatar.
   */
  avatar?: string;
  /**
   * User's display name.
   */
  displayName?: string;
  /**
   * User's audio state.
   * - `''`: No audio.
   * - `computer`: Joined by computer audio.
   * - `phone`: Joined by phone.
   */
  audio?: '' | 'computer' | 'phone';
  /**
   * Whether the user is the host.
   */
  isHost?: boolean;
  /**
   * Whether the user is a manager.
   */
  isManager?: boolean;
  /**
   * Whether the audio is muted.
   */
  muted?: boolean;
  /**
   * Whether the user started video.
   */
  bVideoOn?: boolean;
  /**
   * Whether the user started sharing.
   */
  sharerOn?: boolean;
  /**
   * Whether sharing is paused.
   */
  sharerPause?: boolean;
  /**
   * Whether the share is optimized for video.
   */
  bVideoShare?: boolean;
  /**
   * Whether the sharer is also sharing the tab's audio.
   */
  bShareAudioOn?: boolean;
  /**
   *  Whether the sharer is also sharing to the subsession.
   */
  bShareToSubsession?: boolean;
  /**
   *  Whether the user joined via a phone call.
   */
  isPhoneUser?: boolean;
  /**
   * The unified ID of a user within the main session or subsessions.
   */
  userGuid?: string;
  /**
   * Whether to allow individual recordings.
   */
  isAllowIndividualRecording: boolean;
  /*
   * Whether the user has a camera connected to the device.
   */
  isVideoConnect?: boolean;
  /**
   * The `user_identity` from the JWT payload, not the in-session user ID.
   */
  userIdentity?: string;
  /**
   * Whether the user is only connected to the audio speaker, not the microphone.
   */
  isSpeakerOnly?: boolean;
  /**
   * The phone number if the user is a call out user.
   * For the privacy concern, only the calling user has this property.
   */
  phoneNumber?: string;
  /**
   * Subsession ID.
   * It's available if the user is in a subsession.
   */
  subsessionId?: string;
  /**
   * Whether the user is in a failover process.
   */
  isInFailover?: boolean;
}
/**
 * The session's connection state.
 */
export declare enum ConnectionState {
  /**
   * Connected.
   */
  Connected = 'Connected',
  /**
   * Reconnecting (usually occurs in failover).
   */
  Reconnecting = 'Reconnecting',
  /**
   * Closed.
   */
  Closed = 'Closed',
  /**
   * Failed.
   */
  Fail = 'Fail',
}

/**
 * The video state.
 */
export declare enum VideoActiveState {
  /**
   * Active.
   */
  Active = 'Active',
  /**
   * Inactive.
   */
  Inactive = 'Inactive',
}
/**
 * The current user's video capture state.
 */
export declare enum VideoCapturingState {
  /**
   * Started.
   */
  Started = 'Started',
  /**
   * Stopped.
   */
  Stopped = 'Stopped',
  /**
   * Failed.
   */
  Failed = 'Failed',
}

/**
 * Reason for passively stopping screen sharing.
 */
export declare enum PassiveStopShareReason {
  /**
   * Privilege change or another user started sharing.
   */
  PrivilegeChange = 'PrivilegeChange',
  /**
   * User clicked stop share on the browser control bar.
   */
  StopScreenCapture = 'StopScreenCapture',
}
/**
 * Reason for closing the meeting.
 * - `kicked by host`: User kicked off by the host.
 * - `ended by host`: Meeting ended by the host.
 * - `expeled by host`: User expeled by the host.
 */
type ClosedReason = 'kicked by host' | 'ended by host' | 'expeled by host';
/**
 * Connection changed payload interface.
 */
interface ConnectionChangePayload {
  /**
   * Connection state.
   */
  state: ConnectionState;
  /**
   * Reason for the change.
   */
  reason?: ReconnectReason | ClosedReason;
  /**
   * If the reason is `JoinSubsession` or `MoveToSubsession`, this is the subsession name.
   */
  subsessionName?: string;
}

/**
 * Interface of active speaker in meeting.
 */
interface ActiveSpeaker {
  /**
   * User ID.
   */
  userId: number;
  /**
   * User's display name.
   */
  displayName?: string;
}

/**
 * Media worker's status.
 */
interface MediaSDKEncDecPayload {
  /**
   * Encode or decode.
   */
  action: 'encode' | 'decode';
  /**
   * Type of worker.
   */
  type: 'audio' | 'video' | 'share';
  /**
   * Result of initialization.
   */
  result: 'success' | 'fail';
}
/**
 * Remote control approved state
 */
export enum ApprovedState {
  /**
   * Approved
   */
  Approved = 'Approved',
  /**
   * Rejected
   */
  Rejected = 'Rejected',
}
/**
 * Remote control app status
 * @ignore
 */
export enum RemoteControlAppStatus {
  /**
   * Unknown
   */
  Unknown = 'unknown',
  /**
   * Uninstalled
   */
  Uninstalled = 'uninstalled',
  /**
   * Installed
   */
  Installed = 'installed',
  /**
   * Unlaunched
   */
  Unlaunched = 'unlaunched',
  /**
   * Launched
   */
  Launched = 'launched',
}
/**
 * Remote control session status
 * @ignore
 */
export enum RemoteControlSessionStatus {
  /**
   * Started
   */
  Started = 'started',
  /**
   * Ended
   */
  Ended = 'ended',
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
 * Occurs when a new participant joins the session.
 *
 * ```javascript
 * client.on('user-added',(payload)=>{
 *  // You can refresh the participants when
 *  const participants = client.getParticipantsList();
 * })
 * ```
 * @param payload The event detail.
 * @event
 * @category Session
 */
export declare function event_user_add(
  payload: Array<ParticipantPropertiesPayload>,
): void;
/**
 * Occurs when the properties of the participant are updated.
 * @param payload The event detail
 * @event
 * @category Session
 */
export declare function event_user_update(
  payload: Array<ParticipantPropertiesPayload>,
): void;
/**
 * Occurs when the participant leaves the session.
 * @param payload The event detail
 * @event
 * @category Session
 */
export declare function event_user_remove(
  payload: Array<ParticipantPropertiesPayload>,
): void;

/**
 * Occurs when the remote video stream changes.
 *
 * ```javascript
 * client.on("video-active-change", async (payload) => {
 *  try {
 *    if (payload.state === "Active") {
 *      const element = await stream.attachVideo(userId, VideoQuality.Video_720P);
 *      container.appendChild(element);
 *    } else {
 *      const elements = await stream.detachVideo(userId);
 *      if (Array.isArray(elements)) {
 *        elements.forEach((e) => e.remove());
 *      } else {
 *        elements.remove();
 *      }
 *    }
 *  } catch (error) {
 *    console.log(error);
 *  }
 * });
 * ```
 * @param payload The event detail.
 * @event
 * @category Video
 */
export declare function event_video_active_change(payload: {
  /**
   * Active video state.
   */
  state: VideoActiveState;
  /**
   * User ID.
   */
  userId: number;
}): void;
/**
 * Occurs when the local video capture stream changes.
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
 * @param payload The event detail.
 * @event
 * @category Video
 */
export declare function event_video_capturing_change(payload: {
  /**
   * Video capture state.
   */
  state: VideoCapturingState;
}): void;
/**
 * Occurs when the received video content dimension changes.
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
  /**
   * Width.
   */
  width: number;
  /**
   * Height.
   */
  height: number;
  /**
   * Type: Received video.
   */
  type: 'received';
}): void;
/**
 *
 * Occurs when other participants start or stop video.
 *
 * ```javascript
 * client.on("peer-video-state-change", async (payload) => {
 *  if (payload.action === "Start") {
 *    const element = await stream.attachVideo(userId, VideoQuality.Video_720P);
 *    container.appendChild(element);
 *  } else if (payload.action === "Stop") {
 *    const elements = await stream.detachVideo(userId);
 *    if (Array.isArray(elements)) {
 *      elements.forEach((e) => e.remove());
 *    } else {
 *      elements.remove();
 *    }
 *  }
 * });
 * ```
 * @param payload
 * @event
 * @category Video
 */
export declare function event_peer_video_state_change(payload: {
  /**
   * Action of the peer video, `Start` or `Stop`.
   */
  action: 'Start' | 'Stop';
  /**
   * User ID.
   */
  userId: number;
}): void;
/**
 * Occurs when some participants in the session are talking.
 *
 * ```javascript
 * client.on('active-speaker', (payload) => {
 *    console.log(`Active user:`,payload);
 * });
 * ```
 * @param payload Active user.
 * - Distinguish activity level by volume, the largest is the first element.
 * @event
 * @category Audio
 */
export declare function event_audio_active_speaker(
  payload: Array<ActiveSpeaker>,
): void;
/**
 * Occurs when the host asks you to unmute audio.
 * @param payload The event detail.
 * - Reason:
 *  - `Spotlight`: Host spotlighted you. If you are muted, you will receive the consent message.
 *  - `Unmute`: Host asks you to unmute audio.
 *  - `Allow to talk`: You are an attendee of a webinar, the host allowed you to talk.
 *
 * ```javascript
 * client.on('host-ask-unmute-audio', (payload) => {
 *    console.log(payload.reason);
 * });
 * ```
 * @event
 * @category Audio
 */
export declare function event_host_ask_unmute_audio(payload: {
  /**
   * The unmute consent reason.
   */
  reason: 'Unmute';
}): void;
/**
 * Occurs when current audio is changed.
 * @param payload The event detail.
 * - Action:
 *  - `join`: Join audio. Refer to the `type` attribute for details.
 *  - `leave`: Leave audio.
 *  - `muted`: Audio muted, refer to the `source` attribute for details.
 *  - `unmuted`: Audio unmuted, refer to the `source` attribute for details.
 * - Type:
 *  - `computer': Join by computer audio.
 *  - `phone`: Join by phone.
 * - Source:
 *  - `active`: User active action.
 *  - `passive(mute all)`: Muted due to the host muting all.
 *  - `passive(mute one)`: Muted due to the host muting you.
 *  - `passive`: Umnuted due to the host unmuting you.
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
  /**
   * The current audio change action.
   */
  action: AudioChangeAction;
  /**
   * Type of audio.
   */
  type?: 'phone' | 'computer';
  /**
   * If the action is muted, an extra field to show the muted source.
   */
  source?: MutedSource | LeaveAudioSource;
}): void;
/**
 * Occurs when the SDK tried and failed to auto play audio. This may occur when invoking `stream.startAudio()` immediately after joining the session.
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
 * Occurs when receiving a chat.
 * @param payload The event details.
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
 * Occurs when a message is deleted.
 * @param payload Message ID.
 * ```javascript
 * client.on('chat-delete-message',payload=>{
 *  console.log('from %s, message:%s',payload.sender.name,payload.message);
 * })
 * ```
 * @event
 * @category Chat
 */
// export declare function event_chat_delete_message(payload: {
//   /**
//    * Message ID.
//    */
//   id: string;
// }): void;

/**
 * Occurs when the host changes the chat privileges.
 * @param payload The event detail.
 * ```javascript
 * client.on('chat-privilege-change',payload=>{
 *  console.log(payload.chatPrivilege);
 * })
 * ```
 * @event
 * @category Chat
 */
export declare function event_chat_privilege_change(payload: {
  /**
   * Chat privilege.
   */
  chatPrivilege: ChatPrivilege;
}): void;

/**
 * Occurs when the command channel status changes.
 * @param payload
 *```javascript
 * client.on('command-channel-status',payload=>{
 *  console.log('from %s, message:%s',payload);
 * })
 * ```
 * @event
 * @category Command channel
 */
export declare function event_command_channel_status(payload: ConnectionState): void;

/**
 * Occurs when command channel receives a message.
 * @param payload The event details.
 * ```javascript
 * client.on('command-channel-message',payload=>{
 *  console.log('from %s, message:%s',payload.senderId, payload.text, payload.timestamp);
 * })
 * ```
 * @event
 * @category Command channel
 */
export declare function event_command_channel_message(payload: {
  /**
   * Sender's user ID.
   */
  senderId: string;
  /**
   * Sender's display name.
   */
  senderName: string;
  /**
   * Message content.
   */
  text: string;
  /**
   * Timestamp.
   */
  timestamp: number;
  /**
   * Message ID.
   */
  msgid: string;
}): void;
/**
 * Occurs when the cloud recording status changes.
 * @param payload The recording status.
 * @event
 * @category Recording
 */
export declare function event_recording_change(payload: {
  /**
   * Recording status.
   */
  state: RecordingStatus;
}): void;

/**
 * Occurs when the individual cloud recording status changes.
 * - Ask: When the host starts individual cloud recording, ask the user to accept or decline recording.
 * - Accept: When the user accepts individual cloud recording.
 * - Decline: When the user declines individual cloud recording.
 * @param payload The individual recording status.
 * @event
 * @category Recording
 */
export declare function event_individual_recording_change(payload: {
  /**
   * state
   */
  state: RecordingStatus;
  /**
   * The user ID being recorded.
   */
  userId?: number;
}): void;

/**
 * Occurs when adding or removing the microphone, speaker, or camera.
 * @event
 * @category Media
 */
export declare function event_device_change(): void;
/**
 * @deprecated 2.1.10
 * > *** Note: *** This event is deprecated and will always return success so that it does not break legacy integrations.
 * Occurs when the encode or decode state of the media SDK changes.
 * @param payload
 * @event
 * @category Media
 */
export declare function event_media_sdk_change(payload: MediaSDKEncDecPayload): void;
/**
 * Occurs when some participant starts screen sharing.
 *
 * ```javascript
 * client.on('active-share-change',payload=>{
 *  if(payload.state==='Active'){
 *   stream.startShareView(canvas,payload.userId);
 *  }else if(payload.state==='Inactive'){
 *   stream.stopShareView();
 *  }
 * })
 * ```
 * @param payload
 * @event
 * @category Screen share
 */
export declare function event_active_share_change(payload: {
  /**
   * Sharing state.
   */
  state: 'Active' | 'Inactive';
  /**
   * User ID of active share.
   */
  userId: number;
}): void;
/**
 * Occurs when shared content dimensions change.
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
  /**
   * Values: sended: current share; received: others' share.
   */
  type: 'sended' | 'received';
  /**
   * Width.
   */
  width: number;
  /**
   * Height.
   */
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
 * Occurs when some participant starts or stops screen sharing.
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
  /**
   * User ID.
   */
  userId: number;
  /**
   * Peer share action.
   */
  action: 'Start' | 'Stop';
}): void;
/**
 * Occurs when received shared content automatically changes.
 * - For example, if the host start new sharing, received shared content will be automatically changed.
 * @param payload
 * @event
 * @category Screen share
 */
export declare function event_share_content_change(payload: {
  /**
   * User ID currently receiving sharing.
   */
  userId: number;
}): void;
/**
 * Occurs when the host changes the share privileges.
 * @param payload
 * @event
 * @category Screen share
 */
export declare function event_share_privilege_change(payload: {
  /**
   * Share privilege.
   */
  privilege: SharePrivilege;
}): void;

/**
 * Occurs when the dial-out state changes.
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
export declare function event_dial_out_change(payload: {
  /**
   * The state code of the phone call.
   */
  code: DialoutState;
  /**
   * Phone number
   */
  phoneNumber: string;
  /**
   * Unique ID for the call
   */
  uuid: string;
  /**
   * Phone user ID
   */
  userId?: number;
}): void;
/**
 * Occurs when the share audio state changes. Usually used to cooperatively change the state of computer audio.
 * @param payload
 * @event
 * @category Audio
 */
export declare function event_share_audio_change(payload: {
  /**
   * The state of the Chrome browser shared tab audio.
   */
  state: 'on' | 'off';
}): void;

/**
 * Occurs when the virtual background (VB) is enabled and the VB model is loaded.
 * @param payload
 * @event
 * @category Video
 */
export declare function event_video_vb_preload_change(payload: {
  /**
   * Is ready to apply the virtual background.
   */
  isReady: boolean;
}): void;
/**
 * Occurs when the audio statistics data is changed; decode (received).
 *
 * @param payload The event detail.
 * - `data`
 *  - `encoding`: If encoding is true, the following metrics stand for the Send data statistics, otherwise, it stands for the Receive data statistics.
 *  - `avg_loss`: Audio's average package loss.
 *  - `jitter`: Audio's jitter.
 *  - `max_loss`: Audio's maximum package loss.
 *  - `rtt`: Audio's round trip time.
 *  - `sample_rate`: Audio's sample rate.
 * - `type` : String `AUDIO_QOS_DATA`
 * ```javascript
 * client.on('audio-statistic-data-change', (payload) => {
 *   console.log('emit', payload);
 *  });
 * ```
 * @event
 * @category Audio
 */

export declare function event_audio_statistic_data_change(payload: {
  /**
   * Data
   */
  data: {
    /**
     * Audio's Average package loss.
     */
    avg_loss: number;
    /**
     * If encoding is true, the following metrics stand for the Send data statistics, otherwise, it stands for the Receive data statistics.
     */
    encoding: boolean;
    /**
     * Audio's jitter.
     */
    jitter: number;
    /**
     * Audio's maximum package loss.
     */
    max_loss: number;
    /**
     * Audio's round trip time.
     */
    rtt: number;
    /**
     * Audio's sample rate.
     */
    sample_rate: number;
    /**
     * Bandwidth, measured in bits per second (bps)
     */
    bandwidth: number;
    /**
     * Bit rate, measured in bits per second (bps)
     */
    bitrate: number;
  };
  /**
   * Type.
   */
  type: 'AUDIO_QOS_DATA';
}): void;
/**
 * Occurs when the video statistics data is changed; decode (received).
 *
 * @param payload The event detail
 * - `data`
 *  - `encoding`: If encoding is true, the following metrics stand for the Send data statistics, otherwise, it stands for the Receive data statistics.
 *  - `avg_loss`: Video's average package loss.
 *  - `jitter`: Video's jitter.
 *  - `max_loss`: Video's maximum package loss.
 *  - `rtt`: Video's round trip time.
 *  - `sample_rate`: Video's sample rate.
 *  - `width`: Video's width.
 *  - `height`: Video's height.
 *  - `fps`: Video's frame rate in frames per second (FPS).
 * - `type` : String `VIDEO_QOS_DATA`
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
  /**
   * Data.
   */
  data: {
    /**
     * Video's average package loss.
     */
    avg_loss: number;
    /**
     * If encoding is true, the following metrics stand for the Send data statistics, otherwise, it stands for the Receive data statistics.
     */
    encoding: boolean;
    /**
     * Video's jitter.
     */
    jitter: number;
    /**
     * Video's maximum package loss.
     */
    max_loss: number;
    /**
     * Video's round trip time.
     */
    rtt: number;
    /**
     * Video's sample rate.
     */
    sample_rate: number;
    /**
     * Video's resolution width.
     */
    width: number;
    /**
     * Video's resolution height.
     */
    height: number;
    /**
     * Video's frame rate in frames per second (FPS).
     */
    fps: number;
    /**
     * Bandwidth, measured in bits per second (bps)
     */
    bandwidth: number;
    /**
     * Bit rate, measured in bits per second (bps)
     */
    bitrate: number;
  };
  /**
   * Type.
   */
  type: 'VIDEO_QOS_DATA';
}): void;

/**
 * Occurs on video cell statistic data changes.
 * @param payload
 *
 * @event
 *
 * @category Video
 */
export declare function event_video_cell_detailed_change(payload: {
  /**
   * User ID.
   */
  userId: number;
  /**
   * Video resolution width.
   */
  width?: number;
  /**
   * Video resolution height.
   */
  height?: number;
  /**
   * Video quality.
   */
  quality?: VideoQuality;
  /**
   * Video frame rate in frames per second.
   */
  fps?: number;
}): void;

/** Subsession start. */

/**
 *
 * Occurs when the host assigns you to a subsession. You can decide whether to join the subsession or not.
 * Use `SubsessionClient.joinSubsession(subsessionId)` to join the subsession.
 *
 * @param payload
 *
 * @event
 * @category Subsession
 */
export declare function event_bo_invite_to_join(payload: {
  /**
   * Subsession ID.
   */
  subsessionId: string;
  /**
   * Subsession name.
   */
  subsessionName: string;
}): void;

/**
 *
 * Occurs when the subsession has a countdown. This event will be triggered every second until time is up.
 *
 * @param payload
 *  - Countdown: seconds remaining.
 *
 * @event
 * @category Subsession
 */
export declare function event_bo_room_countdown(payload: {
  /**
   * Countdown for subsession.
   */
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
 * Occurs when there is a buffer countdown when the subsession is about to be closed.
 * This event will be triggered every second until the countdown is over.
 * @param payload
 *  - Countdown: seconds remaining.
 *
 * @event
 * @category Subsession
 */
export declare function event_bo_closing_room_countdown(payload: {
  /**
   * Countdown for closing the subsession.
   */
  countdown: number;
}): void;
/**
 * Occurs when the host broadcasts content to all in the subsession.
 * @param payload
 *
 * @event
 * @category Subsession
 */
export declare function event_bo_broadcast_message(payload: {
  /**
   * Broadcast message.
   */
  message: string;
}): void;

/**
 * Occurs when the host receives a request for help from a user in a subsession.
 * @param payload
 *
 * @event
 * @category Subsession
 */
export declare function event_bo_ask_for_help(payload: {
  /**
   * User ID of the user who requested help.
   */
  userId: number;
  /**
   * User's display name.
   */
  displayName: string;
  /**
   * Subsession name.
   */
  subsessionName: string;
  /**
   * Subsession ID.
   */
  subsessionId: string;
}): void;
/**
 * Host's response to request for help.
 */
export declare enum AskHostHelpResponse {
  /**
   * Received.
   */
  Received = 0,
  /**
   * Busy, host is helping other users.
   */
  Busy = 1,
  /**
   * Host postpones the request.
   */
  Ignore = 2,
  /**
   * Host already in the room.
   */
  AlreadyInRoom = 3,
}
/**
 * Occurs when the attendee received the response for the request for help.
 * @param payload
 *
 * @event
 * @category Subsession
 */
export declare function event_bo_ask_for_help_response(payload: {
  /**
   * The response for the request for help.
   */
  result: AskHostHelpResponse;
}): void;
/**
 * Occurs when the status of the subsession changes.
 * @param payload
 *
 * @event
 * @category Subsession
 */
export declare function event_bo_room_state_change(payload: {
  /**
   * Subsession's status.
   */
  status: SubsessionStatus;
}): void;
/**
 * Occurs when the host is in the subsession and the main session user changed.
 * @param payload
 *
 * @event
 * @category Subsession
 */
export declare function event_bo_main_session_change(payload: any): void;
/** Subsession end */
/**
 * Occurs when the live transcription status changes.
 * @param payload the event detail
 * ```javascript
 * client.on('caption-status',payload=>{
 *  console.log(payload);
 * })
 * ```
 * @event
 *
 * @category Live Transcription
 *
 */
export declare function event_caption_status(payload: {
  /**
   * Is auto caption enabled.
   */
  autoCaption: boolean;
  /**
   * Language code.
   */
  lang?: number;
  /**
   * Language [ISO 639](https://www.iso.org/iso-639-language-code) format.
   * Paired with the numeric {@link lang} property.
   * @since 2.2.10
   */
  language?: string;
  /**
   * Session language code. When a user sets the speaking language in session mode, other participants will receive this notification.
   * @since 2.2.10
   */
  sessionLang?: number;
  /**
   * Session-level language ISO 639 format.
   * Paired with the numeric {@link sessionLang} property.
   * @since 2.2.10
   */
  sessionLanguage?: string;
  /**
   * Whether translation captions are enabled in the session.
   * When enabled, other participants receive a notification to set their speaking language.
   * @since 2.2.10
   */
  translationStarted?: boolean;
}): void;
/**
 * Occurs when the SDK receives the live transcription, live translation, or manual captions message.
 * @param payload the event detail
 * ```javascript
 * client.on('caption-message',payload=>{
 *  console.log(payload);
 * })
 * ```
 * @event
 *
 * @category Live Transcription
 */
export declare function event_caption_message(
  payload: LiveTranscriptionMessage,
): void;
/**
 * Occurs if the automatic live transcription enable status changes.
 * @param payload
 *
 * @event
 *
 * @category Live Transcription
 */
export declare function event_caption_enable(payload: boolean): void;

/**
 * Occurs when the `requestReadReceipt` option is true in the `startShareScreen` method. The sharer can receive the event if someone can see the shared screen.
 * @event
 *
 * @category Screen share
 */
export declare function event_share_can_see_screen(): void;

/**
 * Occurs when the SDK received the far end camera request.
 * @param payload the event detail
 *
 * @event
 *
 * @category Camera
 */
export declare function event_far_end_camera_request(payload: {
  /**
   * The user ID who requested control.
   */
  userId: number;
  /**
   * The display name who requested control.
   */
  displayName: string;
  /**
   * The user ID who is controlling the camera.
   */
  currentControllingUserId?: number;
  /**
   * The display name who is controlling the camera.
   */
  currentControllingDisplayName?: string;
}): void;
/**
 * Occurs when the SDK received the far end camera response.
 * @param payload The event detail.
 *
 * @event
 *
 * @category Camera
 */
export declare function event_far_end_camera_response(payload: {
  /**
   * Is approved.
   */
  isApproved: boolean;
  /**
   * User ID.
   */
  userId: number;
  /**
   * Display name.
   */
  displayName: string;
  /**
   * Reason for refusal.
   */
  reason?: FarEndCameraControlDeclinedReason;
}): void;
/**
 * Occurs when the camera in control status changes.
 * @param payload The event detail.
 *
 * @event
 *
 * @category Camera
 */
export declare function event_far_end_camera_in_control_change(payload: {
  /**
   * Is controlled by other user.
   */
  isControlled: boolean;
  /**
   * User ID.
   */
  userId?: number;
}): void;
/**
 * Occurs when camera capability changes.
 * @param payload
 *
 * @event
 * @category Camera
 */
export declare function event_far_end_camera_capability_change(payload: {
  /**
   * User ID.
   */
  userId: number;
  /**
   * Capabilities of Pan-Tilt-Zoom (PTZ) camera.
   */
  ptz: PTZCameraCapability;
}): void;
/**
 * Occurs when network quality changes.
 * The network quality reflects the video quality, so only when the user starts video, the data will broadcast to all users.
 * @param payload the network quality
 *
 * @event
 *
 * @category Video
 */
export declare function event_network_quality_change(payload: {
  /**
   * User ID.
   */
  userId: number;
  /**
   * Uplink or downlink.
   */
  type: 'uplink' | 'downlink';
  /**
   * Level
   * 0,1: bad
   * 2: normal
   * 3,4,5: good
   */
  level: number;
}): void;
/**
 * Occurs when the share statistics data is changed during decoding (received) or encoding (sent)
 * @param payload the event detail
 * - `data`
 *  - `encoding`: If encoding is true, the following metrics stand for the Send data statistics, otherwise, it stands for the Receive data statistics.
 *  - `avg_loss`: average package loss for video
 *  - `jitter`: jitter for video
 *  - `max_loss`: max package loss for video
 *  - `rtt`: round trip time for video
 *  - `sample_rate`: sample rate video
 *  - `width`: width for video
 *  - `height`: height for video
 *  - `fps`: Frames per second (FPS) for video
 * - `type` : string "VIDEOSHARE_QOS_DATA"
 *
 * ```javascript
 * client.on('share-statistic-data-change', (payload) => {
 *   console.log('emit', payload);
 *  });
 * ```
 * @event
 *
 * @category Screen share
 */
export declare function event_share_statistic_data_change(payload: {
  /**
   * Quality of Service (QoS) data.
   */
  data: {
    /**
     * Share's average package loss. (On Safari or Firefox, this value is always 0)
     */
    avg_loss: number;
    /**
     * If encoding is true, the following metrics stand for the Send data statistics, otherwise, it stands for the Receive data statistics.
     */
    encoding: boolean;
    /**
     * Share's jitter. (On Safari or Firefox, this value is always 0)
     */
    jitter: number;
    /**
     * Share's maximum package loss. (On Safari or Firefox, this value is always 0)
     */
    max_loss: number;
    /**
     * Share's round trip time. (On Safari or Firefox, this value is always 0)
     */
    rtt: number;
    /**
     * Share's sample rate. (On Safari or Firefox, this value is always 0)
     */
    sample_rate: number;
    /**
     * Share's resolution width.
     */
    width: number;
    /**
     * Share's resolution height.
     */
    height: number;
    /**
     * Share's frame rate in frames per second (FPS).
     */
    fps: number;
    /**
     * Bandwidth, measured in bits per second (bps)
     */
    bandwidth: number;
    /**
     * Bit rate, measured in bits per second (bps)
     */
    bitrate: number;
  };
  type: 'VIDEOSHARE_QOS_DATA';
}): void;
/**
 * Occurs when the host disables caption.
 * @param payload boolean
 *
 * @event
 *
 * @category Live Transcription
 */
export declare function event_caption_host_disable(payload: boolean): void;

/**
 * Occurs when the controlled user approved or rejected the remote control request
 *
 * ```JavaScript
 * client.on("remote-control-approved-change", (payload) => {
 *   if (payload.state === ApprovedState.Approved) {
 *     stream.startRemoteControl(viewport);
 *   }else{
 *    // prompt a dialog to retry
 *  }
 * });
 * ```
 * @ignore
 * @param payload
 *
 *
 * @category RemoteControl
 */
export declare function event_remote_control_approved_change(payload: {
  /**
   * Approved status
   */
  state: ApprovedState;
}): void;

/**
 * Occurs when the remote sharing user can regain access to control the screen.
 *
 * ```JavaScript
 * client.on("remote-control-in-control-change", (payload) => {
 *   if (payload.isControlling) {
 *     console.log("You are controlling the shared content");
 *   } else {
 *     console.log("You lost the control");
 *   }
 * });
 * ```
 * @ignore
 * @param payload
 *
 * @category RemoteControl
 */
export declare function event_remote_control_in_control_change(payload: {
  /**
   * Whether the user is controlling the screen.
   */
  isControlling: boolean;
}): void;

/**
 * Occurs when the controlling user copies some text during the remote control period.
 *
 * ```JavaScript
 * copyButtonElement.addEventListener("click", (event) => {
 *   event.preventDefault();
 *   // use copy-to-clipboard
 *   copyToClipboard(copyButtonElement.dataset.dataContent);
 * });
 *
 * client.on("remote-control-clipboard-change", (payload) => {
 *   copyButtonElement.style.left = payload.x;
 *   copyButtonElement.style.top = payload.x;
 *   copyButtonElement.dataset.dataContent = payload.content;
 * });
 * ```
 * @ignore
 * @param payload
 *
 * @category RemoteControl
 */
export declare function event_remote_control_clipboard_change(payload: {
  /**
   * Clipboard text content.
   *  */
  content: string;
  /**
   * Position X where the copy action takes place
   */
  x: number;
  /**
   * Position y where the copy action takes place
   */
  y: number;
  /**
   * Error
   */
  error?: string;
}): void;

/**
 * Occurs when the controlled user receives the remote control request
 * @ignore
 * @param payload
 *
 * @category RemoteControl
 */
export declare function event_remote_control_request_change(payload: {
  /**
   * The user's ID.
   */
  userId: number;
  /**
   * The user's display name.
   */
  displayName: string;
  /**
   * Whether the user is sharing entire screen.
   */
  isSharingEntireScreen: boolean;
}): void;
/**
 *  Occurs when the remote control app status changes
 * @ignore
 * @param payload
 *
 * @category RemoteControl
 */
export declare function event_remote_control_app_status_change(
  /**
   * RemoteControlApp status
   */
  payload: RemoteControlAppStatus,
): void;

/**
 * Occurs when the remote control session status changes
 * @ignore
 * @param payload
 *
 * @category RemoteControl
 */
export declare function event_remote_control_controlled_status_change(
  /**
   * Remote control session status.
   */
  payload: RemoteControlSessionStatus,
): void;
/**
 * Occurs when live stream status changes.
 * @param payload
 *
 * @event
 *
 * @category Live Stream
 */
export declare function event_live_stream_status(status: LiveStreamStatus): void;

/**
 * Occurs when the SDK detects that the rendered video aspect ratio is not the same as the actual video aspect ratio.
 * To correct the aspect ratio, update `aspect-ratio` CSS style to correct the ratio.
 *
 * ```javascript
 * client.on("video-aspect-ratio-change", (payload) => {
 *  const { userId, aspectRatio } = payload;
 *  const videoPlayerElement = // look up the video-player element by userId
 *  videoPlayerElement.style.aspectRatio = aspectRatio;
 * });
 * ```
 *
 * @param payload
 *
 * @event
 * @category Video
 */
export declare function event_video_aspect_ratio_change(payload: {
  /**
   *  User ID.
   */
  userId: number;
  /**
   * Aspect ratio.
   */
  aspectRatio: number;
}): void;

/**
 *  Occurs when the SDK detects that the device permission has changed.
 * @param payload
 *
 * @event
 * @category Media
 */
export declare function event_device_permission_change(payload: {
  /**
   * device type
   */
  name: 'microphone' | 'camera';
  /**
   * permission state
   */
  state: 'denied' | 'granted' | 'prompt';
}): void;

/**
 * Occurs when the upload file progress has changed
 * @param payload
 * @event
 * @category Chat
 */
export declare function event_chat_file_upload_progress(payload: {
  /**
   * File name
   */
  fileName: string;
  /**
   * File size
   */
  fileSize: number;
  /**
   * Receiver user ID
   */
  receiverId: number;
  /**
   * Receiver user unified ID.
   */
  receiverGuid?: string;
  /**
   * Upload progress
   */
  progress: number;
  /**
   * Upload status
   */
  status: ChatFileUploadStatus;
  /**
   * Retry token, can be used for re-sending file.
   */
  retryToken?: string;
}): void;
/**
 * Occurs when the download file progress changes
 * @param payload
 * @event
 * @category Chat
 */
export declare function event_chat_file_download_progress(payload: {
  /**
   * Message ID
   */
  id: string;
  /**
   * File name
   */
  fileName: string;
  /**
   * File size
   */
  fileSize: number;
  /**
   * File URL
   */
  fileUrl: string;
  /**
   * File Blob, only available when the `blob` is set to `true` in the `downloadFile` method.
   */
  fileBlob?: Blob;
  /**
   * Sender user ID
   */
  senderId: number;
  /**
   * Sender user unified ID.
   */
  senderGuid?: string;
  /**
   * Upload progress
   */
  progress: number;
  /**
   * Upload status
   */
  status: ChatFileDownloadStatus;
}): void;

/**
 * @ignore
 * Occurs when the smart summary status changes.
 * @param payload
 */
export declare function event_smart_summary_change(payload: {
  support?: boolean;
  status?: SummaryStatus;
}): void;

/**
 * @ignore
 * Occurs when the meeting query status changes.
 * @param payload
 *
 */
export declare function event_meeting_query_change(payload: {
  support?: boolean;
  status?: MeetingQueryStatus;
}): void;

/**
 * Occurs when the user is invited to back to the main session.
 * @param payload
 * @event
 * @category Subsession
 */
export declare function event_subsession_invite_to_back_to_main_session(payload: {
  /**
   * Inviter user ID
   */
  inviterId: number;
  /**
   * Inviter user GUID
   */
  inviterGuid: string;
  /**
   * Inviter name
   */
  inviterName: string;
}): void;
/**
 * Occurs when there is a change in the status of users in the subsession.
 * @param payload
 * @event
 * @category Subsession
 */
export declare function event_subsession_user_update(payload: {
  /**
   * User ID
   */
  userId: number;
  /**
   * User GUID
   */
  userGuid: string;
  /**
   * Subsession ID
   */
  subsessionId: string;
  /**
   * Subsession name
   */
  subsessionName: string;
  /**
   * User's audio state.
   */
  audio: string;
  /**
   * Whether audio is muted.
   */
  muted: boolean;
  /**
   *  Whether the user started video.
   */
  bVideoOn: boolean;
  /**
   * Whether the user started sharing.
   */
  sharerOn: boolean;
  /**
   * Whether the sharer is also sharing the tab audio.
   */
  bShareAudioOn: boolean;
  /**
   * Whether the user is talking.
   */
  isTalking?: boolean;
}): void;
/**
 * Occurs when the broadcasted voice's status changes.
 * @param payload
 * @event
 * @category Subsession
 */
export declare function event_subsession_broadcast_voice(payload: {
  /**
   * Whether the user is receiving the broadcasted voice.
   */
  status: boolean;
}): void;

/**
 * Occurs when the CRC (Cloud Room Connector) device call state changes.
 *
 * ```javascript
 * client.on('crc-call-out-state-change', (payload) => {
 *    console.log(payload.code);
 * });
 * ```
 * @param payload
 * @event
 * @category CRC
 */
export declare function event_crc_device_call_state_change(payload: {
  /**
   * CRC call return code
   */
  code: CRCReturnCode;
  /**
   * IP address
   */
  ip: string;
  /**
   * Protocol
   */
  protocol: CRCProtocol;
  /**
   *  Unique ID for the call
   */
  uuid: string;
}): void;
/**
 * Occurs when the current audio volume changes.
 * @param payload
 * @event
 * @category Audio
 */
export declare function event_current_audio_level_change(payload: {
  /**
   * Volume level,range from 0 to 9.
   */
  level: number;
}): void;

/**
 * Occurs when there is a media internal error, such as an unexpected interruption in media capture or insufficient memory.
 * When receiving this event, we recommend refreshing the page or restarting the browser to resolve the issue.
 * Since the user must do this, we recommend that you provide a popup to guide the user, such as 'We detected an issue with the media stream that we cannot resolve. Please refresh the page to try to fix it.' With two buttons: 'Refresh' and 'Cancel'.
 * @event
 * @category Media
 */
export declare function event_active_media_failed(payload: {
  /**
   * Code
   */
  code: ActiveMediaFailedCode;
  /**
   * Message
   */
  message: string;
  /**
   * Type
   */
  type: 'audio' | 'video' | 'sharing';
}): void;
/**
 * Occurs when the host or manager spotlights a user.
 * ```javascript
 * client.on('video-spotlight-change', (payload) => {
 *  console.log(payload.spotlightList);
 * });
 * ```
 * @param payload
 * @category Video
 * @event
 */
export declare function event_video_spotlight_change(payload: {
  /**
   * spotlighted user list
   */
  spotlightList: Array<{ userId: number }>;
}): void;

/**
 * Occurs when someone in the meeting takes a screenshot of the video
 *
 * @since 2.1.10
 * @category Video
 * @param payload
 * @event
 */
export declare function event_video_screenshot_taken(payload: {
  /**
   * The user ID of the user who took the screenshot
   */
  userId: number;
  /**
   * The display name of the user who took the screenshot
   */
  displayName: string;
}): void;
/**
 * Occurs when someone in the meeting takes a screenshot of the screen share
 *
 * @since 2.1.10
 * @param payload
 * @category Screen share
 * @event
 */
export declare function event_share_content_screenshot_taken(payload: {
  /**
   * The user ID of the user who took the screenshot
   */
  userId: number;
  /**
   * The display name of the user who took the screenshot
   */
  displayName: string;
}): void;
/**
 * Occurs when the sharer changes the annotation privilege of his share session.
 *
 * @since 2.2.0
 * @param payload
 * @category Annotation
 * @event
 */
export declare function event_annotation_privilege_change(payload: {
  /**
   * The userId for who changed the viewer's annotation privilege.
   */
  userId: number;
  /**
   * Whether the annotation is enabled.
   */
  isAnnotationEnabled: boolean;
}): void;
/**
 * Occurs when the availability status of the redo option changes.
 *
 * @since 2.2.0
 * @param payload
 * @category Annotation
 * @event
 */
export declare function event_annotation_redo_status(payload: {
  /**
   * Whether the redo option is available.
   */
  status: boolean;
  /**
   * The annotation presenter's userId.
   */
  presenterId: number;
}): void;
/**
 * Occurs when the availability status of the undo option changes.
 *
 * @since 2.2.0
 * @param payload
 * @category Annotation
 * @event
 */
export declare function event_annotation_undo_status(payload: {
  /**
   * Whether the undo option is available.
   */
  status: boolean;
  /**
   * The annotation presenter's userId.
   */
  presenterId: number;
}): void;
/**
 * Occurs for the presenter when the viewer calls the startAnnotation() function to draw on sharing content.
 *
 * @since 2.2.0
 * @param payload
 * @category Annotation
 * @event
 */
export declare function event_annotation_viewer_draw_request(payload: {
  /**
   * The userId of the viewer who invoked the startAnnotation() function.
   */
  userId: number;
}): void;
/**
 * Occurs when the status of the broadcast streaming changes.
 *
 * @since 2.2.5
 * @param payload
 * @category Broadcast Streaming
 * @event
 */
export declare function event_broadcast_streaming_status(payload: {
  /**
   * The broadcast streaming status
   */
  status: BroadcastStreamingStatus;
}): void;

/**
 * Occurs when the status of the real-time media stream changes.
 * @param payload
 * @since 2.3.5
 * @event
 * @category Real-time media streams
 */
export declare function event_real_time_media_streams_status_change(payload: {
  /**
   * The real-time media streams status
   */
  status: RealTimeMediaStreamsStatus;
}): void;

/**
 * Occurs when the receive the request invoke by requestShareCamera().
 * @param payload
 * @since 2.3.0
 * @event
 * @category Screen share
 * @ignore
 */
export declare function event_share_camera_request(payload: {
  /**
   * The requestId of the share camera request.
   */
  requestId: string;
  /**
   * The userId of the request sender.
   */
  userId: number;
  /**
   * Requested share source, could be 'user' or 'environment'.
   */
  shareSource: MobileVideoFacingMode;
  /**
   * whether to startAnnotation.
   */
  startAnnotation: boolean;
}): void;
/**
 * Occurs when the approve or decline the share camera request.
 * @param payload
 * @since 2.3.0
 * @event
 * @category Screen share
 * @ignore
 */
export declare function event_share_camera_approve_change(payload: {
  /**
   * The requestId of the share camera request.
   */
  requestId: string;
  /**
   * The userId of the request sender.
   */
  userId: number;
  /**
   * Receiver response to the share camera request sender.
   */
  status: ShareCameraResponse;
}): void;
/**
 * Occurs when calling the informShareCameraStatus() about the status of the share camera request.
 * @param payload
 * @since 2.3.0
 * @event
 * @category Screen share
 * @ignore
 */
export declare function event_share_camera_status(payload: {
  /**
   * The requestId of the share camera request.
   */
  requestId: string;
  /**
   * The userId of the request sender.
   */
  userId: number;
  /**
   * Receiver status update to the share camera request sender.
   */
  status: ShareCameraRemoteStatus;
}): void;
/**
 * Occurs when the host locks or unlocks the transcription language during a session.
 * @param payload - `true` if the transcription language is locked, `false` if unlocked.
 *
 * @category Live transcription
 * @since 2.2.10
 * @event
 */
export declare function event_caption_language_lock(payload: boolean): void;
/**
 * Occurs when the user is detected speaking while their audio is muted.
 * This event provides a notification to prompt the user to unmute their audio for better communication.
 *
 * **Use Case:**
 * This event helps improve meeting experience by alerting users when they are trying to speak
 * but their microphone is muted, preventing communication gaps and confusion.
 *
 * **Example Usage:**
 * ```javascript
 * client.on('speaking-while-muted', () => {
 *   // Show unmute reminder to user
 *   showUnmuteReminder();
 *
 *   // Or automatically prompt user to unmute
 *   if (confirm('You are speaking while muted. Would you like to unmute?')) {
 *     stream.unmuteAudio();
 *   }
 * });
 * ```
 * @category Audio
 * @since 2.3.0
 * @event
 */
export declare function event_speaking_while_muted(): void;
/**
 * Occurs when system resource usage changes, particularly CPU pressure levels.
 * This event can be used to monitor system performance and adjust application behavior accordingly.
 *
 * @param payload The event detail containing system resource usage information
 * @category Video
 * @since 2.3.0
 * @event
 */
export declare function event_system_resource_usage_change(payload: {
  cpu_usage: { system_cpu_pressure_level: SystemCPUPressureLevel };
}): void;
/**
 * Occurs when WebRTC statistics report data changes.
 * This event provides comprehensive native WebRTC statistics similar to browser's `RTCPeerConnection.getStats()` API.
 *
 * **Statistics Types**
 * - **RTP Streams**: `inbound-rtp`, `outbound-rtp`, `remote-inbound-rtp`, `remote-outbound-rtp`
 * - **Media Sources**: `media-source` for audio/video input devices
 * - **Network**: `candidate-pair`, `transport` for connection statistics
 *
 * **Key Metrics**
 * - Network: RTT, jitter, packet loss, bandwidth
 * - Video: Resolution, FPS, bitrate, dropped frames
 * - Audio: Audio levels, sample rates, jitter buffer
 *
 * **Example**
 * ```javascript
 * client.on('webrtc-statistic-data-change', (statsReport) => {
 *   for (const [id, stats] of statsReport.entries()) {
 *     if (stats.type === 'inbound-rtp' && stats.kind === 'video') {
 *       console.log(`Video: ${stats.frameWidth}x${stats.frameHeight} @ ${stats.framesPerSecond}fps`);
 *     }
 *   }
 * });
 * ```
 *
 * @param payload WebRTC statistics report as a Map of statistic IDs to extended RTCStats objects
 * @category Video
 * @since 2.3.0
 * @event
 */
export declare function event_webrtc_statistic_data_change(
  payload: StatsReport,
): void;
/**
 * Occurs when the whiteboard session status changes.
 * This event is triggered when a whiteboard session starts, is in progress, or closes.
 *
 * **Status Values:**
 * - `Closed`: Whiteboard session is closed or not started
 * - `Pending`: Whiteboard is initializing
 * - `InProgress`: Whiteboard session is active
 *
 *
 * @param payload The whiteboard status
 * @since 2.3.5
 * @category Whiteboard
 * @event
 */
export declare function event_whiteboard_status_change(
  status: WhiteboardStatus,
): void;

/**
 * Occurs when another participant starts or stops presenting a whiteboard.
 * This event allows you to automatically view whiteboards presented by others.
 *
 * **Actions:**
 * - `Start`: Another user started presenting a whiteboard
 * - `Stop`: The presenter stopped sharing their whiteboard
 *
 *
 * @param payload The event detail
 *
 * @example
 * ```typescript
 * client.on('peer-whiteboard-state-change', async (payload) => {
 *   const { action, userId } = payload;
 *
 *   if (action === 'Start') {
 *     console.log(`User ${userId} started presenting whiteboard`);
 *     await whiteboardClient.startWhiteboardView(whiteboardElement, userId);
 *   } else if (action === 'Stop') {
 *     console.log(`User ${userId} stopped presenting whiteboard`);
 *     await whiteboardClient.stopWhiteboardView();
 *   }
 * });
 * ```
 * @since 2.3.5
 * @category Whiteboard
 * @event
 */
export declare function event_peer_whiteboard_state_change(payload: {
  /**
   * Action type: 'Start' when the user begins presenting, 'Stop' when they end.
   */
  action: 'Start' | 'Stop';
  /**
   * User ID of the person who started or stopped the whiteboard.
   */
  userId: number;
}): void;

/**
 * Occurs when the whiteboard permission settings change.
 * This event is triggered when the host modifies who can start or control whiteboards.
 *
 * **Permission Types:**
 * - **Share Permission**: Controls who can start/grab whiteboard control
 *   - `LockShare (0)`: Only host/co-host can start
 *   - `HostGrab (1)`: Host can grab control from others
 *   - `LockShareSecurity (2)`: Locked with enhanced security
 *   - `AnyoneGrab (3)`: Any participant can grab control
 *
 * - **Initiate Permission**: Controls who can create new whiteboards
 *   - `HostOnly (0)`: Only host/co-host can create
 *   - `InternalUsers (1)`: Internal users only
 *   - `AllParticipants (2)`: Everyone can create
 *
 *
 * @param payload The event detail containing new permission codes
 * @ignore
 * @since 2.3.5
 * @category Whiteboard
 * @event
 */
export declare function event_whiteboard_permission_change(payload: {
  /**
   * Share permission code controlling who can start/grab whiteboard.
   */
  sharePermission: WhiteboardSharePermissionCode;
  /**
   * Initiate permission code controlling who can create new whiteboards.
   */
  initiatePermission: WhiteboardInitiatePermissionCode;
}): void;

/**
 * Occurs when the current user's whiteboard session is passively stopped.
 * This happens when the host changes permissions or another action forces the whiteboard to close.
 *
 * **Common Scenarios:**
 * - Host changes share permissions to lock whiteboard
 * - Host ends the whiteboard session for all
 * - Permission change makes current user ineligible to present
 * @ignore
 * @since 2.3.5
 * @category Whiteboard
 * @event
 */
export declare function event_passively_stop_whiteboard(payload: {
  reason: 'string';
}): void;

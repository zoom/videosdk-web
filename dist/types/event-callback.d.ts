import { RecordingStatus } from './recording';
import { SharePrivilege } from './media';
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
} from './common';
import { LiveTranscriptionMessage } from './live-transcription';
/**
 * Interface of a ParticipantPropertiesPayload
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
   * Whether the share is optimized for video
   */
  bVideoShare?: boolean;
  /**
   * Whether the sharer is also sharing the tab's audio
   */
  bShareAudioOn?: boolean;
  /**
   *  Whether the sharer is also sharing to the subsession
   */
  bShareToSubsession?: boolean;
  /**
   *  Whether the user is phone call user.
   */
  isPhoneUser?: boolean;
  /**
   * The unified ID of a user among the main session or subsessions.
   */
  userGuid?: string;
  /**
   * Whether to allow individual recordings
   */
  isAllowIndividualRecording: boolean;
  /*
   * Whether the user has a camera connected to the device
   */
  isVideoConnect?: boolean;
  /**
   * Customized user identity
   */
  userIdentity?: string;
  /**
   * Whether the user is only connected to the speaker, not the microphone
   */
  isSpeakerOnly?: boolean;
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
 * Occurs when the properties of the participants are updated.
 * @param payload The event detail
 * @event
 * @category Session
 */
export declare function event_user_update(
  payload: Array<ParticipantPropertiesPayload>,
): void;
/**
 * Occurs when the participants leaves the session.
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
 * client.on('video-active-change', async(payload) => {
 *   try {
 *     if (payload.state === 'Active') {
 *       await stream.renderVideo(canvas,userId,1280,720,0,0,3);
 *     } else {
 *       await stream.stopRenderVideo(canvas,userId);
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
export declare function event_video_active_change(payload: {
  /**
   * Active state of video.
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
   * Capture state of video.
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
   * Type: received video.
   */
  type: 'received';
}): void;
/**
 *
 * Occurs when other participants start or stop video.
 *
 * ```javascript
 * client.on('peer-video-state-change', (payload) => {
 * if (payload.action === 'Start') {
 *  stream.renderVideo(document.querySelector('#participants-canvas'), payload.userId, 960, 540, X_CORD, Y_CORD, 3)
 * } else if (payload.action === 'Stop') {
 *  stream.stopRenderVideo(document.querySelector('#participants-canvas'), payload.userId)
 * }
 * })
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
  source?: MutedSource;
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
 * Occurs when individual cloud recording status changes.
 * Ask: when host start individual cloud recording, user will be asked to accept or decline.
 * Accept: when user accepts individual cloud recording.
 * Decline: when user declines individual cloud recording.
 * @param payload The individual recording status.
 */
export declare function event_individual_recording_change(payload: {
  state: RecordingStatus;
  userId?: number;
}): void;

/**
 * Occurs when adding or removing the microphone, speaker, or camera.
 * @event
 * @category Media
 */
export declare function event_device_change(): void;
/**
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
 * Occurs when the dial out state changes.
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
 * @param payload The event detail.
 * - `data`
 *  - `encoding`: If encoding is true, the data is encoding audio data statistics.
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
     * If encoding is true, the data is encoding audio data statistics.
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
  };
  /**
   * Type.
   */
  type: 'AUDIO_QOS_DATA';
}): void;
/**
 * Occurs when the video statistics data is changed; decode (received).
 * @param payload The event detail
 * - `data`
 *  - `encoding`: If encoding is true, the data is encoding video data statistics.
 *  - `avg_loss`: Video's average package loss.
 *  - `jitter`: Video's jitter.
 *  - `max_loss`: Video's maximum package loss.
 *  - `rtt`: Video's round trip time.
 *  - `sample_rate`: Video's sample rate.
 *  - `width`: Video's width.
 *  - `height`: Video's height.
 *  - `fps`: Video's frame rate in frames per second (fps).
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
     * If encoding is true, the data is encoding video data statistics.
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
     * Video's frame rate in frames per second (fps).
     */
    fps: number;
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
 *  @event
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
 */
export declare function event_caption_message(
  payload: LiveTranscriptionMessage,
): void;
/**
 * Occurs if the automatic live transcription enable status changes.
 * @param payload
 */
export declare function event_caption_enable(payload: boolean): void;

/**
 * Occurs when the `requestReadReceipt` option is true in the `startShareScreen` method. The sharer can receive the event if someone can see the shared screen.
 *  @event
 */
export declare function event_share_can_see_screen(): void;

/**
 * Occurs when the SDK received the far end camera request.
 * @param payload the event detail
 *
 * @event
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
 */
export declare function event_far_end_camera_capability_change(payload: {
  /**
   * User ID.
   */
  userId: number;
  /**
   * Capability of PTZ.
   */
  ptz: PTZCameraCapability;
}): void;
/**
 * Occurs when network quality changes.
 * The network quality reflects the video quality, so only the user starts video, the data will broadcast to all users.
 * @param payload the network quality
 *
 * @event
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
 * Occurs when decode (recevied) or encode (sent) the share statistics data is changed
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
 * - `type` : string share
 *
 * ```javascript
 * client.on('share_statistic_data_change', (payload) => {
 *   console.log('emit', payload);
 *  });
 * ```
 * @event
 */
export declare function event_share_statistic_data_change(payload: {
  /**
   * Data.
   */
  data: {
    /**
     * Share's average package loss. (On Safari or Firefox, this value is always 0)
     */
    avg_loss: number;
    /**
     * If encoding is true, the data is encoding video data statistics.
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
     * Share's frame rate in frames per second (fps).
     */
    fps: number;
  };
  type: 'VIDEOSHARE_QOS_DATA';
}): void;

import { ExecutedResult, Participant } from './common';
import { Stream } from './media';
import { ChatClient } from './chat';
import { CommandChannel } from './command';
import { RecordingClient } from './recording';
import { SubsessionClient } from './subsession';

import {
  event_connection_change,
  event_user_add,
  event_user_update,
  event_user_remove,
  event_video_active_change,
  event_audio_active_speaker,
  event_audio_unmute_consent,
  event_current_audio_change,
  event_dial_out_change,
  event_chat_received_message,
  event_chat_privilege_change,
  event_auto_play_audio_failed,
  event_active_share_change,
  event_passively_stop_share,
  event_share_content_dimension_change,
  event_peer_share_state_change,
  event_share_content_change,
  event_device_change,
  event_video_capturing_change,
  event_video_dimension_change,
  event_share_privilege_change,
  event_peer_video_state_change,
  event_chat_delete_message,
  event_command_channel_status,
  event_command_channel_message,
  event_recording_change,
  event_share_audio_change,
  event_video_vb_preload_change,
  event_bo_invite_to_join,
  event_bo_room_countdown,
  event_bo_room_time_up,
  event_bo_closing_room_countdown,
  event_bo_broadcast_message,
  event_bo_ask_for_help,
  event_bo_ask_for_help_response,
  event_bo_room_state_change,
  event_bo_main_session_change,
  event_audio_statistic_data_change,
  event_video_statistic_data_change,
  event_media_sdk_change,
} from './event-callback';
/**
 * Interface for the result of check system requirements.
 */
interface MediaCompatiblity {
  /**
   * If `audio` is `false`, it means the browser is not compatible with voip.
   */
  audio: boolean;
  /**
   * If `video` if `false`, it means the browser is not compatible with video feature.
   */
  video: boolean;
  /**
   * If `screen` if `false`, it means the browser is not compatible with share screen feature.
   */
  screen: boolean;
}

interface SessionInfo {
  /**
   * topic
   */
  topic: string;
  /**
   * password if it exists
   */
  password: string;
  /**
   * user name
   */
  userName: string;
  /**
   * user id
   */
  userId: number;
  /**
   * Whether the user is in the meeting
   */
  isInMeeting: boolean;
  /**
   * session id
   */
  sessionId: string;
}

/**
 * Init options of `init` method
 */
interface InitOptions {
  /**
   * optional spcify the web endpoint,default is zoom.us
   */
  webEndpoint?: string;
  /**
   * optional
   * Enforce multiple videos(up to 3 videos of others and 1 video of self) on Chromium-like browser without SharedArrayBuffer.
   * Note that this may result in high CPU and memory usage.
   */
  enforceMultipleVideos?: boolean;
  /**
   * optional do not load dependent assets
   * Used to address specific edge-cases, please do not use for almost all use-cases
   */
  skipJsMedia?: boolean;
}
export declare namespace VideoClient {
  /**
   * Initilize the ZOOM Video SDK before join a meeting.
   * The ZOOM Video SDK uses an SDK key & Secret for authentication. Login to the Zoom Marketplace and [Create a JWT App](https://devmp.zoomdev.us/guides/getting-started/app-types/create-jwt-app) to get SDK keys & Secrets.
   * @param language The language of Zoom Video Web SDK. Default is `en-US`
   * @param dependentAssets In the ZOOM Video SDK, web workers and web assembly are used to process media stream. This part of the code is separated from the SDK, so it is necessary to specify the dependent assets path.
   * When the SDK is released, the web worker and the web assembly will be also included(the `lib` folder), you can either deploy these assets to your private servers or use the cloud assets provided by ZOOM. The property has following value:
   * - `Global`: The default value. The dependent assets path will be `https://source.zoom.us/videosdk/{version}/lib/`
   * - `CDN`: The dependent assets path will be `https://dmogdx0jrul3u.cloudfront.net/videosdk/{version}/lib/`
   * - `CN`: Only applicable for China. The dependent assets path will be https://jssdk.zoomus.cn/videosdk/{version}/lib
   * - `{FULL_ASSETS_PATH}`: The SDK will load the dependent assets spcified by the developer.
   * @param options optional additional options for initialization
   */
  function init(
    language: string,
    dependentAssets: string | 'CDN' | 'Global' | 'CN',
    options?: InitOptions,
  ): ExecutedResult;
  /**
   * Get the media stream instance for managing the media.
   *
   * This usually the first step of using media.
   */
  function getMediaStream(): typeof Stream;

  /**
   * Listen for the events and handle them.
   * @param event event name
   * @param callback the event handler
   */
  function on(event: string, callback: (payload: any) => void): void;
  /**
   * @param event
   * @param listener Details in {@link event_connection_change}.
   */
  function on(
    event: 'connection-change',
    listener: typeof event_connection_change,
  ): void;
  /**
   * @param event
   * @param listener Details in {@link event_user_add}.
   */
  function on(event: 'user-added', listener: typeof event_user_add): void;
  /**
   * @param event
   * @param listener Details in {@link event_user_update}.
   */
  function on(event: 'user-updated', listener: typeof event_user_update): void;
  /**
   * @param event
   * @param listener Details in {@link event_user_remove}.
   */
  function on(event: 'user-removed', listener: typeof event_user_remove): void;
  /**
   * @param event
   * @param listener Details in {@link event_video_active_change}.
   */
  function on(
    event: 'video-active-change',
    listener: typeof event_video_active_change,
  ): void;
  /**
   * @param event
   * @param listener Details in {@link event_video_dimension_change}.
   */
  function on(
    event: 'video-dimension-change',
    listener: typeof event_video_dimension_change,
  ): void;
  /**
   * @param event
   * @param listener Details in {@link event_audio_active_speaker}.
   */
  function on(
    event: 'active-speaker',
    listener: typeof event_audio_active_speaker,
  ): void;
  /**
   * @param event
   * @param listener Details in {@link event_audio_unmute_consent}.
   */
  function on(
    event: 'unmute-audio-consent',
    listener: typeof event_audio_unmute_consent,
  ): void;
  /**
   * @param event
   * @param listener Details in {@link event_current_audio_change}.
   */
  function on(
    event: 'current-audio-change',
    listener: typeof event_current_audio_change,
  ): void;
  /**
   * @param event
   * @param listener Details in {@link event_dial_out_change}.
   */
  function on(
    event: 'dialout-state-change',
    listener: typeof event_dial_out_change,
  ): void;
  /**
   *
   * @param event
   * @param listener Detail in {@link event_audio_statistic_data_change}.
   */
  function on(
    event: 'audio-statistic-data-change',
    listener: typeof event_audio_statistic_data_change,
  ): void;
  /**
   *
   * @param event
   * @param listener Detail in {@link event_video_statistic_data_change}.
   */
  function on(
    event: 'video-statistic-data-change',
    listener: typeof event_video_statistic_data_change,
  ): void;
  /**
   * @param event
   * @param listener Details in {@link event_chat_received_message}.
   */
  function on(
    event: 'chat-on-message',
    listener: typeof event_chat_received_message,
  ): void;
  /**
   *
   * @param event
   * @param listener
   */
  function on(
    event: 'chat-delete-message',
    listener: typeof event_chat_delete_message,
  ): void;
  /**
   * @param event
   * @param listener Details in {@link event_chat_privilege_change}.
   */
  function on(
    event: 'chat-privilege-change',
    listener: typeof event_chat_privilege_change,
  ): void;
  /**
   *
   * @param event
   * @param listener Details in {@link event_command_channel_status}.
   */
  function on(
    event: 'command-channel-status',
    listener: typeof event_command_channel_status,
  ): void;
  /**
   *
   * @param event
   * @param listener Details in {@link event_command_channel_message}.
   */
  function on(
    event: 'command-channel-message',
    listener: typeof event_command_channel_message,
  ): void;
  /**
   *
   * @param event
   * @param listener Details in {@link event_recording_change}.
   */
  function on(
    event: 'recording-change',
    listener: typeof event_recording_change,
  ): void;
  /**
   * @param event
   * @param listener Details in {@link event_auto_play_audio_failed}.
   */
  function on(
    event: 'auto-play-audio-failed',
    listener: typeof event_auto_play_audio_failed,
  ): void;
  /**
   * @param event
   * @param listener Details in {@link event_device_change}.
   */
  function on(event: 'device-change', listener: typeof event_device_change): void;
  /**
   * @param event
   * @param listener Details in {@link event_video_capturing_change}.
   */
  function on(
    event: 'video-capturing-change',
    listener: typeof event_video_capturing_change,
  ): void;
  /**
   * @param event
   * @param listener Details in {@link event_active_share_change}.
   */
  function on(
    event: 'active-share-change',
    listener: typeof event_active_share_change,
  ): void;
  /**
   * @param event
   * @param listener Details in {@link event_share_content_dimension_change}.
   */
  function on(
    event: 'share-content-dimension-change',
    listener: typeof event_share_content_dimension_change,
  ): void;
  /**
   * @param event
   * @param listener Details in {@link event_peer_share_state_change}.
   */
  function on(
    event: 'peer-share-state-change',
    listener: typeof event_peer_share_state_change,
  ): void;
  /**
   * @param event
   * @param listener Details in {@link event_share_privilege_change}.
   */
  function on(
    event: 'share-privilege-change',
    listener: typeof event_share_privilege_change,
  ): void;
  /**
   * @param event
   * @param listener Details in {@link event_passively_stop_share}.
   */
  function on(
    event: 'passively-stop-share',
    listener: typeof event_passively_stop_share,
  ): void;
  /**
   * @param event
   * @param listener Details in {@link event_share_content_change}.
   */
  function on(
    event: 'share-content-change',
    listener: typeof event_share_content_change,
  ): void;
  /**
   * @param event
   * @param listener Details in {@link event_peer_video_state_change}.
   */
  function on(
    event: 'peer-video-state-change',
    listener: typeof event_peer_video_state_change,
  ): void;
  /**
   *
   * @param event
   * @param listener Details in{@link event_share_audio_change}
   */
  function on(
    event: 'share-audio-change',
    listener: typeof event_share_audio_change,
  ): void;
  /**
   * @param event
   * @param listener Details in {@link event_bo_invite_to_join}.
   */
  function on(
    event: 'subsession-invite-to-join',
    listener: typeof event_bo_invite_to_join,
  ): void;
  /**
   *
   * @param event
   * @param listener Details in {@link event_bo_room_countdown}.
   */
  function on(
    event: 'subsession-countdown',
    listener: typeof event_bo_room_countdown,
  ): void;
  /**
   *
   * @param event
   * @param listener Details in {@link event_bo_room_time_up}.
   */
  function on(
    event: 'subsession-time-up',
    listener: typeof event_bo_room_time_up,
  ): void;
  /**
   *
   * @param event
   * @param listener Details in {@link event_bo_closing_room_countdown}.
   */
  function on(
    event: 'closing-subsession-countdown',
    listener: typeof event_bo_closing_room_countdown,
  ): void;
  /**
   *
   * @param event
   * @param listener Details in {@link event_bo_broadcast_message}.
   */
  function on(
    event: 'subsession-broadcast-message',
    listener: typeof event_bo_broadcast_message,
  ): void;
  /**
   *
   * @param event
   * @param listener  Details in {@link event_bo_ask_for_help}.
   */
  function on(
    event: 'subsession-ask-for-help',
    listener: typeof event_bo_ask_for_help,
  ): void;
  /**
   *
   * @param event
   * @param listener Details in {@link event_bo_ask_for_help_response}.
   */
  function on(
    event: 'subsession-ask-for-help-response',
    listener: typeof event_bo_ask_for_help_response,
  ): void;
  /**
   *
   * @param event
   * @param listener Details in {@link event_bo_room_state_change}.
   */
  function on(
    event: 'subsession-state-change',
    listener: typeof event_bo_room_state_change,
  ): void;
  /**
   *
   * @param event
   * @param listener Details in {@link event_bo_main_session_change}.
   */
  function on(
    event: 'main-session-user-updated',
    listener: typeof event_bo_main_session_change,
  ): void;
  /**
   *
   * @param event
   * @param listener Details in {@link event_video_vb_preload_change}
   */
  function on(
    event: 'video-virtual-background-preload-change',
    listener: typeof event_video_vb_preload_change,
  ): void;
  /**
   *
   * @param event
   * @param listener Details in {@link event_media_sdk_change}
   */
  function on(
    event: 'media-sdk-change',
    listener: typeof event_media_sdk_change,
  ): void;
  /**
   * Remove the event handler.
   * @param event event name
   * @param callback the event handler
   */
  function off(event: string, callback: (payload: any) => void): void;
  /**
   * Join the meeting
   * - Make sure call `init` method before join.
   * @param topic
   * @param token A JWT, should be generated on server.
   * @param userName user name
   * @param password If a password is required when joining the meeting, pass the password, otherwise omit it
   * @param sessionIdleTimeoutMins Idle timeout to end the session
   *
   * @returns a executed promise. Following are the possible error reasons:
   * - `duplicated operation`: Duplicated invoke the `join` method.
   * - `invalid apiKey/sdkKey or signature`: ApiKey/SdkKey or signature is not correct.
   * - `invalid password`: Password is not correct.
   * - `invalid parameters`: Can not join the meeting because the invalid parameters.
   * - `internal error`: Internal error.
   */
  function join(
    topic: string,
    token: string,
    userName: string,
    password?: string,
    sessionIdleTimeoutMins?: number,
  ): ExecutedResult;
  /**
   * Leave or end the meeting
   *
   * @param end optional default false, if true, the session will end. Only the host has the privilege.
   *
   */
  function leave(end?: boolean): ExecutedResult;
  /**
   * Rename your name or other user's name
   * - Only the **host** or **manager** can rename others.
   * - The host can set whether the user are allowed to rename themselves. refer to the `client.isAllowToRename()` get the value.
   *
   * @param name new display name
   * @param userId rename the spcified user
   *
   */
  function changeName(name: string, userId?: number): ExecutedResult;
  /**
   * Remove the participant
   * - Only the **host** or **manager** can remove others.
   *
   * @param userId
   */
  function removeUser(userId: number): ExecutedResult;
  /**
   * Make other participant as the host.
   * - Only the **host** can make host.
   * - There is only one host in the meeting. Once make other as the host, the original host is not the meeting host.
   *
   * @param userId
   */
  function makeHost(userId: number): ExecutedResult;
  /**
   * Make other participants as the manager
   * - Only the **host** can make manager.
   * - There may be multiple managers in session.
   *
   * @param userId
   */
  // function makeManager(userId: number): ExecutedResult;
  /**
   * Revoke the manager permission from the participant
   * - Only the **host** can revoke Manager.
   * @param userId
   */
  // function revokeManager(userId: number): ExecutedResult;

  /**
   * Get current user info.
   */
  function getCurrentUserInfo(): Participant;
  /**
   * Get the in meeting users of the meeting.
   */
  function getAllUser(): Array<Participant>;

  /**
   * Get the user by userId.
   */
  function getUser(userId: number): Participant | undefined;

  /**
   * Get chat client.
   */
  function getChatClient(): typeof ChatClient;
  /**
   * Get Command client.
   */
  function getCommandClient(): typeof CommandChannel;
  /**
   * Get Recording client.
   */
  function getRecordingClient(): typeof RecordingClient;
  /**
   * Get Breakout Room client.
   */
  function getSubsessionClient(): typeof SubsessionClient;
  /**
   * Gets the current session’s info.
   */
  function getSessionInfo(): SessionInfo;
  /**
   * Whether current user is host
   */
  function isHost(): boolean;
  /**
   * Get the host of the session
   */
  function getSessionHost(): Participant | undefined;
  /**
   * Whether current user is manager
   */
  // function isManager(): boolean;
}

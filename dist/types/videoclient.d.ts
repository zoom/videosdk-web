import { ExecutedResult, LoggerInitOption, Participant } from './common';
import { Stream } from './media';
import { ChatClient } from './chat';
import { CommandChannel } from './command';
import { RecordingClient } from './recording';
import { SubsessionClient } from './subsession';
import { LiveTranscriptionClient } from './live-transcription';
import { LoggerClient } from './logger';
import { LiveStreamClient } from './live-stream';
import {
  event_connection_change,
  event_user_add,
  event_user_update,
  event_user_remove,
  event_video_active_change,
  event_audio_active_speaker,
  event_host_ask_unmute_audio,
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
  // event_chat_delete_message,
  event_command_channel_status,
  event_command_channel_message,
  event_recording_change,
  event_individual_recording_change,
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
  event_video_cell_detailed_change,
  event_caption_status,
  event_caption_message,
  event_caption_enable,
  event_share_can_see_screen,
  event_far_end_camera_request,
  event_far_end_camera_response,
  event_far_end_camera_in_control_change,
  event_far_end_camera_capability_change,
  event_network_quality_change,
  event_share_statistic_data_change,
  event_caption_host_disable,
  event_remote_control_approved_change,
  event_remote_control_in_control_change,
  event_remote_control_clipboard_change,
  event_remote_control_request_change,
  event_remote_control_app_status_change,
  event_remote_control_controlled_status_change,
  event_live_stream_status,
  event_video_aspect_ratio_change,
  event_device_permission_change,
  event_chat_file_upload_progress,
  event_chat_file_download_progress,
  event_smart_summary_change,
  event_meeting_query_change,
  event_subsession_user_update,
  event_crc_device_call_state_change,
  event_subsession_broadcast_voice,
  event_subsession_invite_to_back_to_main_session,
  event_current_audio_level_change,
  event_video_spotlight_change,
  event_active_media_failed,
  event_video_screenshot_taken,
  event_share_content_screenshot_taken,
  event_annotation_privilege_change,
  event_annotation_redo_status,
  event_annotation_undo_status,
  event_annotation_viewer_draw_request,
} from './event-callback';
// import AIClient from '../src/summary';

/**
 * Checks system requirements result interface.
 */
interface MediaCompatiblity {
  /**
   * If `audio` is `false`, the browser is not compatible with Voice over IP (VoIP).
   */
  audio: boolean;
  /**
   * If `video` if `false`, the browser is not compatible with the video feature.
   */
  video: boolean;
  /**
   * If `screen` if `false`, the browser is not compatible with the share screen feature.
   */
  screen: boolean;
}

/**
 * Interface for the result of `checkFeatureRequirements` information on a user's platform.
 * If a feature is in the `supportFeatures` array, it means the current platform supports this feature.
 * If a feature is in the `unSupportFeatures` array, means the current platform does not support this feature.
 */
export interface SupportFeatures {
  /**
   * @ignore
   */
  platform: string;
  /**
   * @ignore
   */
  supportFeatures: Array<string>;
  /**
   * @ignore
   */
  unSupportFeatures: Array<string>;
}

/**
 * Session info
 */
interface SessionInfo {
  /**
   * The session topic.
   */
  topic: string;
  /**
   * Password (if it exists).
   */
  password: string;
  /**
   * User name.
   */
  userName: string;
  /**
   * User ID.
   */
  userId: number;
  /**
   * Whether the user is in the session.
   */
  isInMeeting: boolean;
  /**
   * Session ID.
   */
  sessionId: string;
}

/**
 * Initializes options of the `init` method.
 */
interface InitOptions {
  /**
   * Optional
   * Specifies the web endpoint. The default is zoom.us.
   */
  webEndpoint?: string;
  /**
   * Optional
   * Enforces multiple videos if true (up to 3 videos of others and 1 video of self) on platform without SharedArrayBuffer.
   * If false, limits the view to one video.
   * This may result in high CPU and memory usage.
   * To increase the limit to up to 25 videos, set `disableRenderLimits` to `true`:
   * `enforceMultipleVideos({ disableRenderLimits: true })`
   * Note that the video quality may be poor and unreliable.
   * See [browser support](https://developers.zoom.us/docs/video-sdk/web/browser-support/) for details.
   */
  enforceMultipleVideos?:
    | boolean
    | {
        /**
         * Remove the maximum video render limit, default is to limit to 4.
         * For best performance when rendering multiple videos, use SharedArrayBuffer.
         * If you cannot enable SharedArrayBuffer and need to render multiple videos,
         * set enforceMultipleVideos to true. To render more than 4 without SharedArrayBuffer,
         * for advanced use cases, set disableRenderLimits: true
         */
        disableRenderLimits?: boolean;
      };
  /**
   * Optional
   * Enforces virtual background on browser without SharedArrayBuffer.
   * This may result in high CPU and memory usage. Use CanvasElement to render the self video.
   * See [browser support](https://developers.zoom.us/docs/video-sdk/web/browser-support/) for details.
   *
   */
  enforceVirtualBackground?: boolean;
  /**
   * Optional
   * Do not load dependent assets. Used to address specific edge-cases. Do not use for almost all use-cases.
   */
  skipJsMedia?: boolean;
  /**
   * Prevents devices from dimming or locking the screen when in a session.
   */
  stayAwake?: boolean;
  /**
   * Quickly leave the session when refreshing or closing the page, instead of experiencing session failover.
   *
   * > ***Note**: Due to limitations in Firefox support, this feature is not available on the Firefox browser.
   *
   * Caveat for two scenarios:
   * - PSTN: Phone user who is bound to the current user. The phone will hang up instead of staying connected.
   * - Subsession: Users in a subsession need to be assigned again instead of having been assigned and auto-joining the subsession.
   */
  leaveOnPageUnload?: boolean;
  /**
   * Optional
   * Automatically apply the latest media dependency fixes. Default is `false`, but as a best practice, we recommend that you set it to `true`.
   */
  patchJsMedia?: boolean;
  /**
   * Alternative name for Zoom Video Player to avoid name conflict with existing web component.
   */
  alternativeNameForVideoPlayer?: string;
  /**
   * Whether to enable the detailed log report.
   * > ***Note**: Default is true.
   *
   * If enabled, the detailed log will be reported to the Zoom server when the session ends or the user leaves the session.
   */
  isLogDetailed?: boolean;
}
/**
 * The video client is the core of the Video SDK.
 */
export declare namespace VideoClient {
  /**
   * Initializes the Zoom Video SDK before join a session.
   * The Zoom Video SDK uses an [SDK key & secret](https://developers.zoom.us/docs/video-sdk/auth/) for authentication.
   * @param language The language of the Video SDK. The default is `en-US`.
   * @param dependentAssets The Zoom Video SDK uses web workers and web assembly to process the media stream.
   * This part of the code is separate from the SDK code, so you must specify the dependent assets path.
   * Each SDK release includes the web worker and the web assembly assets in the `lib` folder.
   * You can either deploy these assets to your private servers or use the cloud assets provided by Zoom.
   * The property has following value:
   * - `Global`: The default value. The dependent assets path will be `https://source.zoom.us/videosdk/{version}/lib/`
   * - `CDN`: The dependent assets path will be `https://dmogdx0jrul3u.cloudfront.net/videosdk/{version}/lib/`
   * - `CN`: Only applicable for China. The dependent assets path will be https://jssdk.zoomus.cn/videosdk/{version}/lib
   * - `{FULL_ASSETS_PATH}`: The SDK will load the dependent assets specified by the developer.
   * @param options Optional additional options for initialization.
   */
  function init(
    language: string,
    dependentAssets: string | 'CDN' | 'Global' | 'CN',
    options?: InitOptions,
  ): ExecutedResult;
  /**
   * Gets the media stream instance for managing the media.
   *
   * This usually the first step of using media.
   */
  function getMediaStream(): typeof Stream;

  /**
   * Listens for events and handles them.
   * @param event Event name.
   * @param callback Ehe event handler.
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
    event: 'host-ask-unmute-audio',
    listener: typeof event_host_ask_unmute_audio,
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
  // /**
  //  *
  //  * @param event
  //  * @param listener
  //  */
  // function on(
  //   event: 'chat-delete-message',
  //   listener: typeof event_chat_delete_message,
  // ): void;
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
   *
   * @param event
   * @param listener Details in {@link event_iso_recording_change}.
   */
  function on(
    event: 'individual-recording-change',
    listener: typeof event_individual_recording_change,
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
   * @deprecated
   * > ***Note:*** This event is deprecated and will always return success so that it does not break legacy integrations.
   * @param event
   * @param listener Details in {@link event_media_sdk_change}
   *
   */
  function on(
    event: 'media-sdk-change',
    listener: typeof event_media_sdk_change,
  ): void;
  /**
   *
   * @param event
   * @param listener Details in {@link event_video_cell_detailed_change}
   */
  function on(
    event: 'video-detailed-data-change',
    listener: typeof event_video_cell_detailed_change,
  ): void;
  /**
   *
   * @param event
   * @param listener Details in {@link event_caption_status}
   */
  function on(event: 'caption-status', listener: typeof event_caption_status): void;
  /**
   *
   * @param event
   * @param listener Details in {@link event_caption_message}
   */
  function on(
    event: 'caption-message',
    listener: typeof event_caption_message,
  ): void;
  /**
   *
   * @param event
   * @param listener Details in {@link event_caption_enable}
   */
  function on(event: 'caption-enable', listener: typeof event_caption_enable): void;
  /**
   *
   * @param event
   * @param listener Details in {@link event_share_can_see_screen}
   */
  function on(
    event: 'share-can-see-screen',
    listener: typeof event_share_can_see_screen,
  ): void;
  /**
   *
   * @param event
   * @param listener Details in {@link event_far_end_camera_request}
   */
  function on(
    event: 'far-end-camera-request-control',
    listener: typeof event_far_end_camera_request,
  ): void;
  /**
   *
   * @param event
   * @param listener Details in {@link event_far_end_camera_response}
   */
  function on(
    event: 'far-end-camera-response-control',
    listener: typeof event_far_end_camera_response,
  ): void;
  /**
   *
   * @param event
   * @param listener Details in {@link event_far_end_camera_in_control_change}
   */
  function on(
    event: 'far-end-camera-in-control-change',
    listener: typeof event_far_end_camera_in_control_change,
  ): void;
  /**
   *
   * @param event
   * @param listener Details in {@link event_far_end_camera_capability_change}
   */
  function on(
    event: 'far-end-camera-capability-change',
    listener: typeof event_far_end_camera_capability_change,
  ): void;
  /**
   *
   * @param event
   * @param listener Details in {@link event_network_quality_change}
   */
  function on(
    event: 'network-quality-change',
    listener: typeof event_network_quality_change,
  ): void;
  /**
   *
   * @param event
   * @param listener Details in {@link event_share_statistic_data_change}
   */
  function on(
    event: 'share-statistic-data-change',
    listener: typeof event_share_statistic_data_change,
  ): void;
  /**
   *
   * @param event
   * @param listener Details in {@link event_caption_host_disable}
   */
  function on(
    event: 'caption-host-disable',
    listener: typeof event_caption_host_disable,
  ): void;
  /**
   *
   * @param event
   * @param listener Details in {@link event_remote_control_approved_change}
   */
  function on(
    event: 'remote-control-approved-change',
    listener: typeof event_remote_control_approved_change,
  ): void;
  /**
   *
   * @param event
   * @param listener Details in {@link event_remote_control_in_control_change}
   */
  function on(
    event: 'remote-control-in-control-change',
    listener: typeof event_remote_control_in_control_change,
  ): void;
  /**
   *
   * @param event
   * @param listener Details in {@link event_remote_control_clipboard_change}
   */
  function on(
    event: 'remote-control-clipboard-change',
    listener: typeof event_remote_control_clipboard_change,
  ): void;
  /**
   *
   * @param event
   * @param listener Details in {@link event_remote_control_request_change}
   */
  function on(
    event: 'remote-control-request-change',
    listener: typeof event_remote_control_request_change,
  ): void;
  /**
   *
   * @param event
   * @param listener Details in {@link event_remote_control_app_status_change}
   */
  function on(
    event: 'remote-control-app-status-change',
    listener: typeof event_remote_control_app_status_change,
  ): void;
  /**
   *
   * @param event
   * @param listener Details in {@link event_remote_control_controlled_status_change}
   */
  function on(
    event: 'remote-control-controlled-status-change',
    listener: typeof event_remote_control_controlled_status_change,
  ): void;
  /**
   *
   * @param event
   * @param listener Details in {@link event_live_stream_status}
   */
  function on(
    event: 'live-stream-status',
    listener: typeof event_live_stream_status,
  ): void;
  /**
   *
   * @param event
   * @param listener Details in {@link event_video_aspect_ratio_change}
   */
  function on(
    event: 'video-aspect-ratio-change',
    listener: typeof event_video_aspect_ratio_change,
  ): void;
  /**
   *
   * @param event
   * @param listener Details in {@link event_device_permission_change}
   */
  function on(
    event: 'device-permission-change',
    listener: typeof event_device_permission_change,
  ): void;
  /**
   *
   * @param event
   * @param listener Details in {@link event_chat_file_upload_progress}
   */
  function on(
    event: 'chat-file-upload-progress',
    listener: typeof event_chat_file_upload_progress,
  ): void;
  /**
   *
   * @param event
   * @param listener Details in {@link event_chat_file_download_progress}
   */
  function on(
    event: 'chat-file-download-progress',
    listener: typeof event_chat_file_download_progress,
  ): void;

  /**
   *
   * @param event
   * @param listener Details in {@link event_smart_summary_change}
   */
  function on(
    event: 'summary-status-change',
    listener: typeof event_smart_summary_change,
  ): void;

  /**
   *
   * @param event
   * @param listener Details in {@link event_meeting_query_change}
   */
  function on(
    event: 'meeting-query-status-change',
    listener: typeof event_meeting_query_change,
  ): void;
  /**
   *
   * @param event
   * @param listener Details in {@link event_subsession_invite_to_back_to_main_session}
   */
  function on(
    event: 'subsession-invite-back-to-main-session',
    listener: typeof event_subsession_invite_to_back_to_main_session,
  ): void;
  /**
   *
   * @param event
   * @param listener Details in {@link event_subsession_user_update}
   */
  function on(
    event: 'subsession-user-update',
    listener: typeof event_subsession_user_update,
  ): void;
  /**
   *
   * @param event
   * @param listener Details in {@link event_subsession_broadcast_voice}
   */
  function on(
    event: 'subsession-broadcast-voice',
    listener: typeof event_subsession_broadcast_voice,
  ): void;
  /**
   *
   * @param event
   * @param listener Details in {@link event_crc_device_call_state_change}
   */
  function on(
    event: 'crc-call-out-state-change',
    listener: typeof event_crc_device_call_state_change,
  ): void;
  /**
   *
   * @param event
   * @param listener Details in {@link event_current_audio_level_change}
   */
  function on(
    event: 'current-audio-level-change',
    listener: typeof event_current_audio_level_change,
  ): void;
  /**
   *
   * @param event
   * @param listener Details in {@link event_active_media_failed}
   */
  function on(
    event: 'active-media-failed',
    listener: typeof event_active_media_failed,
  ): void;
  /**
   *
   * @param event
   * @param listener Details in {@link event_video_spotlight_change}
   */
  function on(
    event: 'video-spotlight-change',
    listener: typeof event_video_spotlight_change,
  ): void;
  /**
   *
   * @param event
   * @param listener  Details in {@link event_video_screenshot_taken}
   */
  function on(
    event: 'video-screenshot-taken',
    listener: typeof event_video_screenshot_taken,
  ): void;
  /**
   *
   * @param event
   * @param listener  Details in {@link event_share_content_screenshot_taken}
   */
  function on(
    event: 'share-content-screenshot-taken',
    listener: typeof event_share_content_screenshot_taken,
  ): void;
  /**
   *
   * @param event
   * @param listener  Details in {@link event_annotation_privilege_change}
   */
  function on(
    event: 'annotation-privilege-change',
    listener: typeof event_annotation_privilege_change,
  ): void;
  /**
   *
   * @param event
   * @param listener  Details in {@link event_annotation_redo_status}
   */
  function on(
    event: 'annotation-redo-status',
    listener: typeof event_annotation_redo_status,
  ): void;
  /**
   *
   * @param event
   * @param listener  Details in {@link event_annotation_undo_status}
   */
  function on(
    event: 'annotation-undo-status',
    listener: typeof event_annotation_undo_status,
  ): void;
  /**
   *
   * @param event
   * @param listener  Details in {@link event_annotation_viewer_draw_request}
   */
  function on(
    event: 'annotation-viewer-draw-request',
    listener: typeof event_annotation_viewer_draw_request,
  ): void;
  /**
   * Removes the event handler.
   * @param event Event name.
   * @param callback The event handler.
   */
  function off(event: string, callback: (payload: any) => void): void;
  /**
   * - Make sure to call the `init` method before joining.
   * @param topic Required. A session name of your choice or the name of the session you are joining (must match the SWK JWT `tpc` value).
   * @param token Required. Your [Video SDK JWT](https://developers.zoom.us/docs/video-sdk/auth/), which you should generate on the server.
   * @param userName Required. A name for the user.
   * @param sessionPassword Optional, unless it was set with the host. A session password of your choice. If set with the host, all attendees must provide the same password value or they will fail to join the session.
   * @param sessionIdleTimeoutMins Optional. The number of minutes your session can idle before ending, with one user present and without cloud recording. The default is 40 minutes.
   *
   * @returns an executed promise. Following are the possible error reasons:
   * - `duplicated operation`: Duplicated invoking of the `join` method.
   * - `invalid apiKey/sdkKey or signature`: API key, SDK key, or signature is not correct.
   * - `invalid password`: Password is not correct.
   * - `invalid parameters`: Can not join the session because of invalid parameters.
   * - `internal error`: Internal error.
   */
  function join(
    topic: string,
    token: string,
    userName: string,
    sessionPassword?: string,
    sessionIdleTimeoutMins?: number,
  ): ExecutedResult;
  /**
   * Leaves or ends the session.
   *
   * @param end Optional. Default is false. If true, the session ends. Only the host has the privilege to do this.
   *
   */
  function leave(end?: boolean): ExecutedResult;
  /**
   * Renames your name or another user's name.
   * - Only the **host** or **manager** can rename others.
   * - The host can set whether the user is allowed to rename themselves. See `client.isAllowToRename()` to get the value.
   *
   * @param name New display name.
   * @param userId User ID of the user to rename.
   *
   */
  function changeName(name: string, userId?: number): ExecutedResult;
  /**
   * Removes the participant.
   * - Only the **host** or **manager** can remove others.
   *
   * @param userId
   */
  function removeUser(userId: number): ExecutedResult;
  /**
   * Makes other participant the host.
   * - Only the **host** can make someone else the host.
   * - There is only one host in a session. Once the host makes another user the host, the original host will no longer be the host.
   *
   * @param userId
   */
  function makeHost(userId: number): ExecutedResult;
  /**
   * Makes another participant a manager.
   * - Only the **host** can make others into managers.
   * - There may be multiple managers in session.
   *
   * @param userId
   */
  function makeManager(userId: number): ExecutedResult;
  /**
   * Revokes the manager permission from the participant.
   * - Only the **host** can revoke manager permissions.
   * @param userId
   */
  function revokeManager(userId: number): ExecutedResult;
  /**
   * Reclaims the host privilege if the user is now the host.
   * - Only the **original host** can do this.
   */
  function reclaimHost(): ExecutedResult;

  /**
   * Gets the current user info.
   */
  function getCurrentUserInfo(): Participant;
  /**
   * Get the in-session participants of the session.
   */
  function getAllUser(): Array<Participant>;

  /**
   * Gets the user by user ID.
   */
  function getUser(userId: number): Participant | undefined;

  /**
   * Gets the chat client.
   */
  function getChatClient(): typeof ChatClient;
  /**
   * Gets the command client.
   */
  function getCommandClient(): typeof CommandChannel;
  /**
   * Gets the recording client.
   */
  function getRecordingClient(): typeof RecordingClient;
  /**
   * Gets the subsession client.
   */
  function getSubsessionClient(): typeof SubsessionClient;

  /**
   * Gets the LiveTranscription client.
   */
  function getLiveTranscriptionClient(): typeof LiveTranscriptionClient;
  /**
   * Gets the logger client.
   * @param options logger option
   */
  function getLoggerClient(options?: LoggerInitOption): typeof LoggerClient;

  /**
   * Gets the AI client.
   * @param options AI option
   */
  // function getAIClient(): typeof AIClient;
  /**
   * Gets the liveStream client.
   */
  function getLiveStreamClient(): typeof LiveStreamClient;
  /**
   * Gets the current session’s information.
   */
  function getSessionInfo(): SessionInfo;
  /**
   * Determines whether the current user is the host.
   */
  function isHost(): boolean;
  /**
   * Gets the host of the session.
   */
  function getSessionHost(): Participant | undefined;
  /**
   * Determines whether the current user is a manager.
   */
  function isManager(): boolean;
  /**
   * Determines whether the current user is the original host.
   * `role_type` in JWT payload =1 is the original host.
   */
  function isOriginalHost(): boolean;
}

/**
 * @module ZoomBroadcastStreaming
 */
/**
 * Streaming watermark
 */
export interface StreamingWatermark {
  /**
   * Watermark text
   */
  text: string;
  /**
   * Watermark opacity
   */
  opacity: number;
  /**
   * Whether the watermark is repeat
   */
  repeat: boolean;
  /**
   * Watermark position
   */
  position: 'top' | 'bottom' | 'left' | 'middle' | 'right';
}
/**
 * Options of Zoom Broadcast streaming
 */
export interface ZoomBroadcastStreamingOptions {
  /**
   * Optional.  The Zoom Video SDK uses web workers and web assembly to process the media stream.
   * - `Global`: The default value. The dependent assets path will be `https://source.zoom.us/videosdk/{version}/lib/`
   * - `CDN`: The dependent assets path will be `https://dmogdx0jrul3u.cloudfront.net/videosdk/{version}/lib/`
   * - `CN`: Only applicable for China. The dependent assets path will be https://jssdk.zoomus.cn/videosdk/{version}/lib
   * - `{FULL_ASSETS_PATH}`: The SDK will load the dependent assets specified by the developer.
   */
  dependentAssets?: string;
  /**
   * Optional. Alternative name for Zoom Live Video to avoid name conflict with any existing web components you may be using.
   */
  alternativeNameForLiveVideo?: string;
  /**
   * Optional. Specifies the web endpoint. The default is zoom.us.
   */
  webEndpoint?: string;
  /**
   * Optional. Specifies the watermark.
   */
  watermark?: StreamingWatermark;
}
export declare class LiveVideoContainer extends HTMLElement {}
export declare class LiveVideo extends HTMLElement {
  /**
   * Channel ID
   */
  ['live-session-id']: string;
  /**
   * Video quality
   *  - 0: 90P
   *  - 1: 360P
   *  - 2: 640P
   *  - 3: 720P
   *  - 4: 1080P
   */
  ['size']: string;
  /**
   * Is audio muted
   */
  ['muted']: 'true' | 'false';
  /**
   * 0-1
   */
  ['volume']: string;
  /**
   * Show default controls? Default false.
   */
  ['controls']: 'true' | 'false';
  /**
   * Is rewind mode,default false
   */
  ['rewind']: 'true' | 'false';
  /**
   * Rewind time for seek
   */
  currentTime: number;
  /**
   * Playback rate of video rewind
   */
  playbackRate: number;
  /**
   * Play video
   */
  play: () => void;
  /**
   * Pause video
   */
  pause: () => void;
}
/**
 *  Occurs when streaming is ended.
 * ```javascript
 * liveVideo.addEventListener('ended', () => {
 *
 * });
 * ```
 */
export declare const onEnded: ((this: LiveVideo, ev: CustomEvent) => any) | null;
/**
 * Occurs when streaming is playing.
 * ```javascript
 * liveVideo.addEventListener('playing', () => {
 *
 * });
 * ```
 */
export declare const onPlaying: ((this: LiveVideo, ev: CustomEvent) => any) | null;
/**
 * Occurs when streaming is blocked, for example, when there is insufficient network bandwidth, which prevents the next playback segment from being prepared in time to stream. This is similar to buffer loading on other streaming platforms. Best practice is to show that the content is loading.
 * ```javascript
 * liveVideo.addEventListener('waiting', () => {
 *
 * });
 * ```
 */
export declare const onwaiting: ((this: LiveVideo, ev: CustomEvent) => any) | null;
/**
 * Occurs when resolution of the streaming changes.
 * ```javascript
 * liveVideo.addEventListener('resolution-change', (event) => {
 *   const {
 *     detail: { oldVal, newVal },
 *   } = event;
 *   console.log(`resulotion changes from ${oldVal}P to ${newVal}P`);
 * });
 * ```
 */
export declare const onResulutionChange:
  | ((this: LiveVideo, ev: CustomEvent<{ oldVal: number; newVal: number }>) => any)
  | null;
/**
 * Occurs when a new TS (Transport Stream) segment is updated, the detail indicates the maximum rewind duration available at that moment.
 * ```javascript
 * liveVideo.addEventListener('rewind-total-time', (event) => {
 *   const {
 *     detail: totalTime,
 *   } = event;
 *   console.log(`Current max rewind time: ${totalTime}`);
 * });
 * ```
 */
export declare const onRewindTotalTime:
  | ((this: LiveVideo, ev: CustomEvent<number>) => any)
  | null;
/**
 * Occurs in rewind mode, when the time indicated by the currentTime attribute has been updated.
 */
export declare const onTimeupdate:
  | ((this: LiveVideo, ev: CustomEvent) => any)
  | null;
/**
 * Occurs when the rewind capability of the stream changes.
 * ```javascript
 * liveVideo.addEventListener('rewind-config', (event) => {
 *   const {
 *     detail: isSupported,
 *   } = event;
 *   console.log(`Current streaming supports rewind:${isSupported}`);
 * });
 * ```
 */
export declare const onRewindConfig:
  | ((this: LiveVideo, ev: CustomEvent<boolean>) => any)
  | null;
/**
 * Occurs when the connection is changed.
 * @param payload
 * @event
 */
export declare function event_connection_change(payload: {
  state: 'Connected' | 'Fail';
}): void;
/**
 * Occurs when the video statistics data is changed;
 * @param payload The event detail
 * @event
 */
export declare function event_video_statistic_data_change(payload: {
  /**
   * Video's average package loss.
   */
  avg_loss: number;
  /**
   * If encoding is true, the following metrics stand for the Send data statistics; otherwise, they stand for the Receive data statistics.
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
}): void;
/**
 * Occurs when the audio statistics data is changed;
 * @param payload The event detail.
 * @event
 */
export declare function event_audio_statistic_data_change(payload: {
  /**
   * Audio's Average package loss.
   */
  avg_loss: number;
  /**
   * If encoding is true, the following metrics stand for the Send data statistics; otherwise, they stand for the Receive data statistics.
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
}): void;
/**
 * Occurs when the SDK tried and failed to auto play audio.
 * This is usually because the streaming was played without any prior user interaction with the page.
 * In this callback, you need to manually set the `muted` attribute of the live-video element to 'false'.
 */
export declare function event_auto_play_audio_failed(): void;
/**
 * Zoom Broadcast streaming for web platform.
 */
declare class ZoomBroadcastStreaming {
  /**
   * Get an instance for managing the streaming.
   * This method will return a same instance if called multiple times.
   *
   * @since 2.2.5
   * @param options Optional. Specifies the init options.
   */
  static createClient(
    options?: ZoomBroadcastStreamingOptions,
  ): ZoomBroadcastStreaming;
  /**
   * Destroys the client.
   * @since 2.2.5
   */
  static destroyClient(): void;
  /**
   * Version
   */
  static VERSION: string;
  /**
   * Create a LiveVideo or reuse the existing LiveVideo and attach the streaming to it.
   * > **Note** the returned live-video{@link LiveVideo} element must be a child node of the live-video-container {@link LiveVideoContainer}.
   *
   * ```html
   * <live-video-container class="streaming-container">
   *  <!-- Other html tags -->
   *  </live-video-container>
   * ```
   *
   * ```javascript
   * const element = await streaming.attachStreaming(
   *   channelId,
   *   token,
   *   VideoQuality.Video_720P
   * );
   * document.querySelector(".streaming-container").appendChild(element);
   * ```
   * @since 2.2.5
   *
   * @param channelId Required. The channel ID.
   * @param token Required. The JWT token.
   * @param videoQuality Required. Quality of the video. One of the following: 90P/360P/640P/720P/1080P.
   * @param element Optional. Empty value: create a new element; String value: LiveVideo element selector specified by document.querySelector; LiveVideo Element value: Specified element
   */
  attachStreaming(
    channelId: string,
    token: string,
    videoQuality: number,
    element?: string | LiveVideo,
  ): Promise<LiveVideo | { type: string; reason: string }>;
  /**
   * Detach the streaming from all previously attached LiveVideo elements or specific elements.
   *
   * ```javascript
   * const elements = await streaming.detachStreaming(channelId);
   * if (Array.isArray(elements)) {
   *  elements.forEach((e) => e.remove());
   * } else {
   *  elements.remove();
   * }`
   * ```
   *
   * @since 2.2.5
   *
   * @param channelId Required. The channel ID.
   * @param element Optional. Empty value: detach all streamings. String value:LiveVideo element selector specified by document.querySelector; LiveVideo Element value: Specified element
   *
   */
  detachStreaming(
    channelId: string,
    element?: string | LiveVideo,
  ): Promise<LiveVideo | { type: string; reason: string }>;
  /**
   * Listens for events and handles them.
   *
   * @since 2.2.5
   * @param event Event name.
   * @param callback The event handler.
   */
  on(event: string, callback: (payload: any) => void): void;
  /**
   *
   * @param event
   * @param listener Details in {@link event_connection_change}
   */
  on(event: 'connection-change', listener: typeof event_connection_change): void;
  /**
   *
   * @param event
   * @param listener listener Details in {@link event_video_statistic_data_change}
   */
  on(
    event: 'video-statistic-data-change',
    listener: typeof event_video_statistic_data_change,
  ): void;
  /**
   *
   * @param event
   * @param listener listener Details in {@link event_audio_statistic_data_change}
   */
  on(
    event: 'audio-statistic-data-change',
    listener: typeof event_audio_statistic_data_change,
  ): void;
  /**
   *
   * @param event
   * @param listener listener Details in {@link event_auto_play_audio_failed}
   */
  on(
    event: 'auto-play-audio-failed',
    listener: typeof event_auto_play_audio_failed,
  ): void;
  /**
   *  Removes the event handler.
   *
   * @since 2.2.5
   * @param event Event name.
   * @param callback The event handler.
   */
  off(event: string, callback: (payload: any) => void): void;
}
/**
 * Video Quality
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
export default ZoomBroadcastStreaming;

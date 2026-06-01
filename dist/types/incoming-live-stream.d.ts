/**
 * Status of the incoming live stream
 */
export interface IncomingLiveStreamStatus {
  /**
   * Whether the streaming software (OBS, vMix, etc.) has connected to the Zoom RTMP endpoint.
   * - `false`: Streaming software hasn't connected yet. Check your RTMP URL and stream key configuration.
   * - `true`: Connected to the Zoom RTMP endpoint.
   */
  isRTMPConnected: boolean;
  /**
   * Whether the stream is active as a virtual participant in the session.
   * - `false`: Streaming software is connected but `startIncomingLiveStream` has not yet been called (or has not completed).
   * - `true`: Stream is active as a virtual participant. Call `stopIncomingLiveStream` to remove it.
   */
  isStreamPushed: boolean;
  /**
   * The stream key ID (`stream_id`) obtained from the Zoom OpenAPI.
   * Empty string if no stream is currently bound.
   */
  streamId: string;
}

/**
 * The client for incoming live stream (RTMP ingest).
 *
 * The Incoming LiveStream feature allows you to ingest external RTMP streams (such as from OBS, vMix,
 * or other streaming software) into your Zoom Video SDK session as a special virtual participant.
 * This enables scenarios where pre-recorded content or external live sources can be shared in the session.
 *
 * ## Prerequisites
 * - Zoom Video SDK properly initialized and session joined
 * - **Host privileges** in the session (only the session host can manage incoming livestreams)
 * - A stream ingestion must be created via the Zoom OpenAPI before calling `bindIncomingLiveStream`
 * - Currently, only **one incoming stream** is supported per session
 *
 * ## Workflow
 *
 * ### Step 1 — Create a Stream Ingestion via Zoom OpenAPI
 * ```
 * POST https://api.zoom.us/v2/videosdk/stream_ingestions
 * Body: { "session_id": "your_session_id", "stream_name": "My Incoming Stream" }
 * ```
 * The response contains:
 * - `stream_id` — use as the `streamId` parameter in all SDK methods
 * - `stream_url` — the RTMP server URL to configure in your streaming software
 * - `stream_key` — the stream key to configure in your streaming software
 *
 * ### Step 2 — Bind, Configure, and Start
 * ```javascript
 * const incomingLiveStream = client.getIncomingLiveStreamClient();
 *
 * // 1. Bind the stream to the session
 * await incomingLiveStream.bindIncomingLiveStream(streamId);
 *
 * // 2. Configure your streaming software (OBS/vMix) with stream_url and stream_key
 * //    and start pushing video
 *
 * // 3. Poll status or listen to 'incoming-live-stream-status' event
 * //    until both isRTMPConnected and isStreamPushed are true
 * const status = incomingLiveStream.getIncomingLiveStreamStatus();
 * if (status.isRTMPConnected && !status.isStreamPushed) {
 *   // 4. Start the stream as a virtual participant
 *   await incomingLiveStream.startIncomingLiveStream(streamId);
 * }
 * ```
 *
 * ### Step 3 — Subscribe to the Stream
 * Once started, the stream appears as a virtual participant named **"Incoming livestream"**.
 * Subscribe to its video/audio via the `user-added` event and the participant's video pipe.
 *
 * ### Step 4 — Cleanup
 * ```javascript
 * await incomingLiveStream.stopIncomingLiveStream(streamId);
 * await incomingLiveStream.unbindIncomingLiveStream(streamId);
 * ```
 * @since 2.4.5
 * @category Incoming Live Stream
 */
export declare namespace IncomingLiveStreamClient {
  /**
   * Binds an incoming live stream to the current session using a stream key ID obtained from the Zoom OpenAPI.
   *
   * **Prerequisites:**
   * - Must be the session host
   * - Session must be active and joined
   * - Cannot be called from within a breakout room
   * - Cannot bind a new stream while the current stream is already RTMP-connected
   *
   * **Before calling this method**, create a stream ingestion via the Zoom OpenAPI:
   * ```
   * POST https://api.zoom.us/v2/videosdk/stream_ingestions
   * Body: { "session_id": "your_session_id", "stream_name": "My Incoming Stream" }
   * ```
   * Use the `stream_id` from the response as the `streamId` parameter.
   *
   * After binding, configure your streaming software (OBS/vMix) with the `stream_url` and `stream_key`
   * from the OpenAPI response and start pushing video before calling `startIncomingLiveStream`.
   *
   * @param streamId The stream key ID (`stream_id`) obtained from the Zoom OpenAPI stream ingestion response.
   * @returns A promise that resolves when the stream is successfully bound.
   * @throws `INCOMING_LIVE_STREAM_INVALID_PARAMETER` if `streamId` is empty.
   * @throws `INCOMING_LIVE_STREAM_MISMATCH_STATE` if called from a breakout room, or if another stream is already RTMP-connected.
   */
  function bindIncomingLiveStream(streamId: string): Promise<void>;

  /**
   * Unbinds the currently bound incoming live stream and releases its resources.
   *
   * **Prerequisites:**
   * - Must be the session host
   * - Session must be active and joined
   * - The `streamId` must match the currently bound stream
   * - If the stream is active (`isStreamPushed: true`), call `stopIncomingLiveStream` first
   * - **The streaming software must have stopped pushing** (`isRTMPConnected` must be `false`) before this method is called.
   *   Stop the stream in your software (OBS, vMix, etc.) and wait for the `incoming-live-stream-status` event
   *   to confirm `isRTMPConnected: false` before calling unbind.
   *
   * @param streamId The stream key ID (`stream_id`) of the currently bound stream.
   * @returns A promise that resolves when the stream is successfully unbound.
   * @throws `INCOMING_LIVE_STREAM_INVALID_PARAMETER` if `streamId` is empty or does not match the bound stream.
   * @throws `INCOMING_LIVE_STREAM_MISMATCH_STATE` if the streaming software is still connected (`isRTMPConnected: true`).
   */
  function unbindIncomingLiveStream(streamId: string): Promise<void>;

  /**
   * Starts the bound incoming live stream as a virtual participant in the session.
   *
   * **Prerequisites:**
   * - Must be the session host
   * - Session must be active and joined
   * - The stream must first be bound via `bindIncomingLiveStream`
   * - Streaming software must be configured with the correct `stream_url` and `stream_key` and actively pushing video
   * - `getIncomingLiveStreamStatus()` must return `isRTMPConnected: true` before calling this method
   *
   * Once started, the stream appears as a special virtual participant named **"Incoming livestream"** in the session.
   * Other participants can subscribe to this user's video/audio like any other participant.
   * The stream participant can be identified by checking `participant.isRtmpUser === true`.
   *
   * @param streamId The stream key ID (`stream_id`) of the bound stream to start.
   * @returns A promise that resolves when the stream is successfully started as a virtual participant (i.e., `isStreamPushed` becomes `true`).
   * @throws `INCOMING_LIVE_STREAM_MISMATCH_STATE` if the stream is not yet RTMP-connected.
   */
  function startIncomingLiveStream(streamId: string): Promise<void>;

  /**
   * Stops the incoming live stream and removes it as a virtual participant from the session.
   *
   * **Prerequisites:**
   * - Must be the session host
   * - Session must be active and joined
   * - The stream must be currently connected (`isRTMPConnected: true`)
   *
   * After stopping, the virtual participant is removed from the session. Call `unbindIncomingLiveStream`
   * afterwards to fully release resources before leaving the session.
   *
   * @param streamId The stream key ID (`stream_id`) of the active stream to stop.
   * @returns A promise that resolves when the stream virtual participant is successfully removed (i.e., `isStreamPushed` becomes `false`).
   * @throws `INCOMING_LIVE_STREAM_MISMATCH_STATE` if the stream is not currently RTMP-connected.
   */
  function stopIncomingLiveStream(streamId: string): Promise<void>;

  /**
   * Gets the current status of the incoming live stream.
   *
   * Whenever a stream is bound, calling this method always triggers an on-demand status refresh
   * from the server. Listen to the `incoming-live-stream-status` event for real-time push
   * notifications of status changes.
   *
   * **Check stream readiness before starting:**
   * ```javascript
   * const status = incomingLiveStream.getIncomingLiveStreamStatus();
   * if (status.isRTMPConnected && !status.isStreamPushed) {
   *   // Streaming software is connected — ready to start as a virtual participant
   *   await incomingLiveStream.startIncomingLiveStream(streamId);
   * }
   * ```
   *
   * @returns The current status of the incoming live stream:
   *   - `isRTMPConnected`: whether streaming software is connected to the Zoom RTMP endpoint
   *   - `isStreamPushed`: whether video is actively being pushed into the session
   *   - `streamId`: the currently bound stream key ID, or empty string if no stream is bound
   */
  function getIncomingLiveStreamStatus(): IncomingLiveStreamStatus;
}

import {
  DialoutState,
  ExecutedResult,
  MobileVideoFacingMode,
  Participant,
  VideoQuality,
  CameraControlCmd,
  PTZCameraCapability,
} from './common';

/**
 * Media device interface.
 */
interface MediaDevice {
  /**
   * Device label.
   */
  label: string;
  /**
   * Device ID.
   */
  deviceId: string;
}
/**
 * Phone call country interface.
 */
interface PhoneCallCountry {
  /** Country name. */
  name: string;
  /** Country code. */
  code: string;
  /**
   * @ignore
   */
  id: string;
}
/**
 * Mask shape - Rectangle
 */
interface MaskRectangle {
  /**
   * type
   */
  type: 'rectangle';
  /**
   * width
   */
  width: number;
  /**
   * height
   */
  height: number;
}
/**
 * Mask shape - Squal
 */
interface MaskSquare {
  /**
   * type
   */
  type: 'square';
  /**
   * side length
   */
  length: number;
}
/**
 * Mask shape - Circle
 */
interface MaskCircle {
  /**
   * type
   */
  type: 'circle';
  /**
   * radius
   */
  radius: number;
}
/**
 * Mask shape- SVG
 */
interface MaskSVG {
  /**
   * type
   */
  type: 'svg';
  /**
   * svg url
   */
  svg: string;
  /**
   * width
   */
  width: number;
  /**
   * height
   */
  height: number;
}
/**
 * Mask shape
 */
type MaskShape = MaskRectangle | MaskSquare | MaskCircle | MaskSVG;
/**
 * Mask clip
 */
type MaskClip = {
  /**
   * x
   */
  x: number;
  /**
   * y
   */
  y: number;
} & MaskShape;
/**
 * Mask option
 */
export interface MaskOption {
  /**
   * background image url
   */
  imageUrl?: string | null;
  /**
   * Determines whether to crop the background image to an appropriate aspect ratio (16/9), default is false.
   */
  cropped?: boolean;
  /**
   * width of clip canvas, default is 1280
   */
  rootWidth?: number;
  /**
   * height of clip canvas, default is 720
   */
  rootHeight?: number;
  /**
   * clip
   */
  clip?: MaskClip | Array<MaskClip>;
}
/**
 * Share privilege.
 */
export declare enum SharePrivilege {
  /**
   * One participant can share at a time, only the host or manager can start sharing when someone else is sharing.
   */
  Unlocked = 0,
  /**
   * Only the host or manager can share.
   */
  Locked = 1,
  /**
   * Multiple participants can share simultaneously.
   */
  MultipleShare = 3,
}
/**
 * Start audio option interface.
 */
interface AudioOption {
  /**
   * Join audio only with the speaker, the microphone is not connected.
   */
  speakerOnly?: boolean;
  /**
   * Start audio automatically in Safari.
   *
   * In the Safari browser, when calling `startAudio` automatically or programmatically without any gesture
   * (such as a click or touch on the document), the value of `autoStartAudioInSafari` should be `true`.
   * Other than that, the value should always be `false` or unset.
   */
  autoStartAudioInSafari?: boolean;
}

/**
 * Dial out option interface.
 */
export interface DialOutOption {
  /**
   * Determines whether phone audio is bound to current user.
   */
  callMe?: boolean;
  /**
   * Determines whether to require a greeting before being connected.
   */
  greeting?: boolean;
  /**
   * Determines whether to require pressing 1 before being connected.
   */
  pressingOne?: boolean;
}
/**
 * Capture video option interface.
 */
export interface CaptureVideoOption {
  /**
   * Camera ID for the camera capturing the video, if not specified, use system default.
   */
  cameraId?: typeof MobileVideoFacingMode | string;
  /**
   * Customized width of capture, default is 640p.
   */
  captureWidth?: number;
  /**
   * Customized height of capture, default is 360p.
   */
  captureHeight?: number;
  /**
   * Determines whether self video is mirrored.
   */
  mirrored?: boolean;
  /**
   * Video element. Only used in Android platform or non-SharedArrayBuffer Chromium-like browsers.
   */
  videoElement?: HTMLVideoElement;
  /**
   * Determines whether capture 720p video enabled.
   */
  hd?: boolean;
  /**
   * Virtual background options.
   */
  virtualBackground?: {
    /**
     * Image URL for the virtual background.
     * - If set a specific image, the URL can be a regular HTTP or HTTPS URL, base64 format, or ObjectURL.
     * - 'blur' : Blurs the background.
     * - undefined : no virtual background.
     */
    imageUrl: string | 'blur' | undefined;
    /**
     * Determines whether to crop the background image to an appropriate aspect ratio (16/9), default is false.
     */
    cropped?: boolean;
  };
  /**
   * mask option
   * Note virtual background and mask are mutually exclusive, you can only enable either virtual background or mask
   */
  mask?: MaskOption;
  /**
   * Whether to capture the video in the original ratio, the default is to crop the ratio to 16:9.
   */
  originalRatio?: boolean;
  /**
   *  Determines whether to enable ptz when capturing video
   */
  ptz?: boolean;
}
/**
 * Audio QoS data interface.
 */
export interface AudioQosData {
  /**
   * Audio sample rate.
   */
  sample_rate: number;
  /**
   * Audio round trip time.
   */
  rtt: number;
  /**
   * Audio jitter.
   */
  jitter: number;
  /**
   * Audio average loss.
   */
  avg_loss: number;
  /**
   * Audio maximum loss.
   */
  max_loss: number;
}
/**
 * Statistic option interface.
 */
interface StatisticOption {
  /**
   * Subscribe or unsubscribe to encoding data (sending ).
   */
  encode?: boolean;
  /**
   * Subscribe or unsubscribe to decoding data (receiving).
   */
  decode?: boolean;
}
/**
 * Share screen option interface.
 */
export interface ScreenShareOption {
  /**
   * Whether the sharing is broadcast to subsessions. Only host or co-host have the privilege
   */
  broadcastToSubsession?: boolean;
  /**
   * Whether the screen sharing user can receive 'share-can-see-screen' event
   */
  requestReadReceipt?: boolean;
  /**
   * Secondary camera ID.
   * Share a secondary camera connected to your computer; for example, a document camera or the integrated camera on your laptop.
   */
  secondaryCameraId?: string;
  /**
   * The capture with of share video, only enabled when the value of `secondaryCameraId` is not undefined.
   */
  captureWidth?: number;
  /**
   * The capture height of share video, only enabled when the value of `secondaryCameraId` is not undefined.
   */
  captureHeight?: number;
  /**
   * Option to show (default, false) or hide (true) the "Share Audio" checkbox when sharing a Chrome tab
   */
  hideShareAudioOption?: boolean;
  /**
   * optimized for video share
   * If sharing a video file that is stored locally on the computer, we recommend using the video share feature, which will provide better quality due to decreased CPU usage.
   */
  optimizedForSharedVideo?: boolean;
  /**
   * Specifies the types of display surface that the user may select.
   * See the MDN link https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints/displaySurface
   */
  displaySurface?: string;
}
/**
 * Share audio status interface.
 */
interface ShareAudioStatus {
  /**
   * Determines whether share audio is enabled for the current share.
   */
  isShareAudioEnabled: boolean;
  /**
   * Determines whether share audio is muted for the current share.
   */
  isShareAudioMuted: boolean;
  /**
   * Determines whether share audio is on for the current share.
   */
  isSharingAudio: boolean;
}

/**
 * Underlying color interface.
 */
interface UnderlyingColor {
  /**
   * Decimal, red/255.
   */
  R: number;
  /**
   * Decimal, green/255.
   */
  G: number;
  /**
   * Decimal, black/255.
   */
  B: number;
  /**
   * Decimal, 1 - opaque, 0 - transparent.
   */
  A?: number;
}
/**
 * Video QoS data interface.
 */
export interface VideoQosData {
  /**
   * Video sample rate.
   */
  sample_rate: number;
  /**
   * Video round trip time.
   */
  rtt: number;
  /**
   * Video jitter.
   */
  jitter: number;
  /**
   * Video average loss.
   */
  avg_loss: number;
  /**
   * Video maximum loss.
   */
  max_loss: number;
  /**
   * Video width.
   */
  width: number;
  /**
   * Video height.
   */
  height: number;
  /**
   * Video frame rate, in frames per second (fps).
   */
  fps: number;
}
/**
 * Video statistic option interface.
 */
interface VideoStatisticOption {
  /**
   * Subscribe or unsubscribe encoding data (sending video).
   */
  encode?: boolean;
  /**
   * Subscribe or subscribe decoding data (receiving video).
   */
  decode?: boolean;
  /**
   * Get the detailed data of each received video, such as frames per second, or resolution.
   */
  detailed?: boolean;
}
/**
 * Status of virtual background.
 */
interface VirtualBackgroundStatus {
  /**
   * Determines whether the virtual background model is ready.
   */
  isVBPreloadReady?: boolean | undefined;
  /**
   * Determines whether the virtual background is configured.
   */
  isVBConfigured?: boolean | undefined;
  /**
   * The current virtual background image.
   */
  imageSrc?: string | undefined;
}
/**
 * Share status.
 */
export enum ShareStatus {
  /**
   * Sharing.
   */
  Sharing = 'sharing',
  /**
   * Sharing paused.
   */
  Paused = 'paused',
  /**
   * Sharing ended.
   */
  End = 'ended',
}
/**
 * Local camera control command.
 */
type LocalCameraControlCmd = Exclude<
  CameraControlCmd,
  CameraControlCmd.SwitchCamera
>;
/**
 * Local camera control option interface.
 */
interface CameraControlOption {
  /**
   * Control command.
   */
  cmd: LocalCameraControlCmd;
  /**
   * The range of this operation.Total range is 100.
   */
  range: number;
  /**
   * Is reset?
   */
  reset?: boolean;
}
/**
 * Far end camera control command.
 */
interface FarEndCameraControlOption {
  /**
   * Control command.
   */
  cmd: CameraControlCmd;
  /**
   * Controlling user ID.
   */
  userId: number;
  /**
   * The range of this operation.
   */
  range?: number;
}
/**
 * Network quality interface.
 */
interface NetworkQuality {
  /**
   * Uplink level:
   * 0,1: bad
   * 2: normal
   * 3,4,5: good
   */
  uplink?: number;
  /**
   * Downlink level:
   * 0,1: bad
   * 2: normal
   * 3,4,5: good
   */
  downlink?: number;
}
/**
 * The stream interface provides methods that define the behaviors of a stream object, such as mute audio or capture video.
 *
 * The stream object is created by the `getMediaStream` method.
 */
export declare namespace Stream {
  // ------------------------------------------------[audio]------------------------------------------------------------
  /**
   * Joins audio by microphone and speaker.
   * - If the participant has joined audio by phone, they cannot join using computer audio.
   *
   * ```javascript
   * await client.init();
   * await client.join(topic, signature, username, password);
   * const stream = client.getMediaStream();
   * await stream.startAudio();
   * ```
   *
   * Safari browser is different:
   * ```javascript
   * let audioDecode, audioEncode;
   * // wait until the encoding and decoding process is ready for the audio
   * client.on("media-sdk-change", (payload) => {
   *    const { action, type, result } = payload;
   *    if (type === "audio" && result === "success") {
   *      if (action === "encode") {
   *        audioEncode = true;
   *      } else if (action === "decode") {
   *        audioDecode = true;
   *      }
   *      if (audioDecode && audioEncode) {
   *        try {
   *          // start audio automatically in Safari
   *          stream.startAudio({ autoStartAudioInSafari: true });
   *        } catch (err) {
   *          console.warn(err);
   *        }
   *      }
   *    }
   *  });
   *
   *  // Start audio in 'click' callback in Safari
   *  joinAudioButton.addEventListener("click", () => {
   *    if (audioDecode && audioDecode) {
   *      try {
   *        stream.startAudio();
   *      } catch (err) {
   *         console.warn(err);
   *      }
   *    }
   *  });
   *
   * ```
   * @returns Executed promise. Following are the possible error reasons:
   * - type=`USER_FORBIDDEN_MICROPHONE`: The user has blocked accesses to the microphone from the SDK. Try to grant the privilege and rejoin the session.
   * @category Audio
   */
  function startAudio(options?: AudioOption): ExecutedResult;

  /**
   * Leaves computer audio.
   * @returns Executed promise.
   * @category Audio
   */
  function stopAudio(): ExecutedResult;

  /**
   * Mutes audio.
   * - If `userId` is not specified, this will mute self.
   * - Only the **host** or **manager** can mute others.
   * - If a participant is allowed to talk, the host can also mute them.
   * @param userId Default `undefined`.
   * @returns Executed promise.
   * @category Audio
   */
  function muteAudio(userId?: number): ExecutedResult;
  /**
   * Unmute audio.
   * - If `userId` is not specified, this will unmute self.
   * - For privacy and security concerns, the host can not unmute the participant's audio directly, instead, the participant will receive an unmute audio consent message.
   *
   * ```javascript
   * // unmute myself
   *  await stream.unmuteAudio();
   *
   * // host unmute others
   * await stream.unmuteAudio(userId);
   * // participant side
   * client.on('host-ask-unmute-audio',(payload)=>{
   *  console.log('Host ask me to unmute');
   * })
   * ```
   * @param userId Default `undefined`.
   * @returns Executed promise.
   * @category Audio
   *
   */
  function unmuteAudio(userId?: number): ExecutedResult;
  /**
   * Invites a user to join by phone.
   *
   * You can join a Zoom session by means of teleconferencing or audio conferencing (using a traditional phone). This is useful when:
   * - You do not have a microphone or speaker on your PC or macOS machine.
   * - You do not have a smartphone (iOS or Android) while on the road.
   * - You cannot connect to a network for video and VoIP (computer audio).
   *
   * If a number is not listed or has asterisks (***) in place of some of the numbers, it means that number is not available on the account that you're currently logged into.
   * Check the `stream.getSupportCountryInfo()` method to get available countries.
   *
   * - This method will trigger the `dialout-state-change` event, add a listener to get the latest value.
   * ```javascript
   * const countryCode = '+1'
   * const phoneNumber ='8801'
   * if(stream.getSupportCountryInfo().findIndex(country=>country.code===countryCode)>-1){
   *  await stream.inviteByPhone(countryCode,phoneNumber,name);
   * }
   * client.on('dialout-state-change',({code})=>{
   *  console.log('dial out stats:',code);
   * });
   * ```
   * @param countryCode Country code.
   * @param phoneNumber Phone number.
   * @param name Name.
   * @param option Optional options of the call out.
   *
   * @returns Executed promise.
   * @category Phone
   */
  function inviteByPhone(
    countryCode: string,
    phoneNumber: string,
    name: string,
    options?: DialOutOption,
  ): ExecutedResult;
  /**
   * Cancels the dial out request before it is complete.
   *
   * @param countryCode Country code.
   * @param phoneNumber Phone number.
   *
   * @returns Executed promise.
   * @category Phone
   */
  function cancelInviteByPhone(
    countryCode: string,
    phoneNumber: string,
    options?: { callMe?: boolean },
  ): ExecutedResult;
  /**
   * Hangs up the phone. Only used when the current audio was joined by phone.
   *
   * @return Executed promise.
   * @category Phone
   */
  function hangup(): ExecutedResult;
  /**
   * Mutes self share audio or other's share audio locally.
   * If `userId` is empty, will mute share audio. Other participants will not be able to hear the share audio.
   * If `userId` is set, will mute share audio locally, other participants are not affected.
   *
   * @param userId Optional empty value will mute self share audio.
   *
   * @return Executed promise.
   * @category Audio
   */
  function muteShareAudio(userId?: number): ExecutedResult;
  /**
   * Unmutes self share audio or other's share audio locally.
   * If `userId` is empty, will unmute share audio, other participants will be able to hear the share audio.
   * If `userId` is set, will unmute share audio locally, other participants are not affected.
   *
   * @param userId Optional empty value will unmute self share audio.
   *
   * @return Executed promise.
   * @category Audio
   */
  function unmuteShareAudio(userId?: number): ExecutedResult;
  /**
   * Switches the microphone.
   *
   * ```javascript
   *  const microphones = stream.getMicList();
   *  const microphone = // choose another microphone
   *  await switchMicrophone(microphone.deviceId);
   * ```
   * @param microphoneId Device ID of the microphone.
   * @returns Executed promise.
   * @category Audio
   *
   */
  function switchMicrophone(microphoneId: string): ExecutedResult;
  /**
   * Switches the speaker.
   *
   * @param speakerId Device ID of the speaker.
   * @returns Executed promise.
   * @category Audio
   *
   */
  function switchSpeaker(speakerId: string): ExecutedResult;
  /**
   * Subscribes to audio statistic data based on the type parameter.
   * Client will receive audio quality data every second.
   *
   * **Note**
   *   If type is not specified, this will subscribe to both encode and decode audio statistics.
   *    - Client only handles the encode (send) audio statistic data when:
   *      1. Current user's audio is connected.
   *      2. Current user is not muted.
   *      3. There is another participant who is listening to the current user's audio.
   *    - Client only handles the decode (receive) audio statistic data when:
   *      1. Current user's audio is connected.
   *      2. There is another participant who is sending audio.
   *
   * **Example**
   * ```javascript
   * try{
   *   await stream.subscribeAudioStatisticData();
   * } catch (error)  {
   *   console.log(error);
   * }
   * ```
   *
   * @param type Optional. `Object { encode: Boolean, decode: Boolean }` can specify which type of audio to subscribe to.
   *
   * @returns
   * - `''`: Success.
   * - `Error`: Failure. Details in {@link ErrorTypes}.
   *
   * @category Audio
   */
  function subscribeAudioStatisticData(type?: StatisticOption): ExecutedResult;
  /**
   * Unsubscribes to audio statistic data based on the type parameter.
   *
   * **Note**
   *    If type is not specified, this will unsubscribe to both encode and decode audio statistics.
   * **Example**
   * ```javascript
   * try{
   *   await stream.unsubscribeAudioStatisticData();
   * } catch (error)  {
   *   console.log(error);
   * }
   * ```
   *
   * @param type Optional. `Object { encode: Boolean, decode: Boolean }` can specify which type of audio to unsubscribe to.
   *
   * @returns   * - `''`: Success.
   * - `Error`: Failure. Details in {@link ErrorTypes}.
   *
   * @category Audio
   */
  function unsubscribeAudioStatisticData(type?: StatisticOption): ExecutedResult;

  /**
   * Mutes someone's audio locally. This operation doesn't affect other participants' audio.
   * @param userId User ID.
   *
   * @returns   * - `''`: Success.
   * - `Error`: Failure. Details in {@link ErrorTypes}.
   *
   * @category Audio
   */
  function muteUserAudioLocally(userId: number): ExecutedResult;
  /**
   * Unmutes someone's audio locally. This operation doesn't affect other participants' audio.
   * @param userId User ID.
   *
   * @returns   * - `''`: Success.
   * - `Error`: Failure. Details in {@link ErrorTypes}.
   *
   * @category Audio
   */
  function unmuteUserAudioLocally(userId: number): ExecutedResult;
  /**
   * Adjust someone's audio locally, this operation doesn't affect other participants' audio
   * @param userId userId
   * @param volume number
   *
   * @category Audio
   */
  function adjustUserAudioVolumeLocally(
    userId: number,
    volume: number,
  ): ExecutedResult;
  /**
   * Determines whether the user is muted.
   * - If the user ID is not specified, gets the muted status of the current user.
   * @param userId Default `undefined`
   * @return boolean
   * @category Audio
   */
  function isAudioMuted(userId?: number): boolean;

  /**
   * Gets the available microphones.
   * @returns Microphone list.
   * @category Audio
   */
  function getMicList(): Array<MediaDevice>;
  /**
   * Gets the available speakers.
   * @return Speaker list.
   * @category Audio
   */
  function getSpeakerList(): Array<MediaDevice>;

  /**
   * Gets the active device ID of the microphone.
   * @returns Device ID.
   * @category Audio
   */
  function getActiveMicrophone(): string;
  /**
   * Gets the active device of the speaker.
   * @returns Device ID.
   * @category Audio
   */
  function getActiveSpeaker(): string;

  /**
   * Determines whether the phone call feature is supported.
   * @returns Boolean.
   * @category Phone
   */
  function isSupportPhoneFeature(): boolean;
  /**
   * Get supported countries.
   * @returns Supported phone call countries.
   * @category Phone
   */
  function getSupportCountryInfo(): Array<PhoneCallCountry>;
  /**
   * Gets phone call status.
   * @returns Phone call status.
   * @category Phone
   */
  function getInviteByPhoneStatus(): DialoutState;
  /**
   * Gets the share audio status.
   * @returns Share audio status.
   * @category Audio
   */
  function getShareAudioStatus(): ShareAudioStatus;
  /**
   * Determines whether share audio is muted locally. Refers to the audio shared by other participants.
   * @param userId User ID.
   * @returns Boolean.
   * @category Audio
   *
   */
  function isOthersShareAudioMutedLocally(userId: number): boolean;
  /**
   * Gets the audio statistic data.
   * @returns {@link AudioQosData}
   * @category Audio
   */
  function getAudioStatisticData(): { encode: AudioQosData; decode: AudioQosData };
  /**
   * Determines whether someone's audio is muted locally.
   * @param userId User ID.
   * @returns Boolean.
   * @category Audio
   */
  function isUserAudioMutedLocally(userId: number): boolean;
  /**
   * Get the user's volume.
   * @param userId User ID.
   * @returns Number.
   * @category Audio
   */
  function getUserVolumeLocally(userId: number): number;

  // -------------------------------------------------[video]-----------------------------------------------------------

  /**
   * Starts capturing video from a specified camera.
   *
   * **Note**
   * - It may take the user some time to allow browser access to the camera device. Therefore there is no default timeout.
   *
   * **Example**
   * ```javascript
   * try {
   *   await stream.startVideo();
   * } catch (error) {
   *   console.log(error);
   * }
   * ```
   *
   * @param {CaptureVideoOption} [option] Optional options for starting video capture.
   *
   * @returns
   * - `''`: Success
   * - `Error`: Failure. Errors besides {@link ErrorTypes} that may be returned include the following:
   *   - `CAN_NOT_DETECT_CAMERA`: Cannot detect camera device.
   *   - `CAN_NOT_FIND_CAMERA`: The provided camera device ID is not included in the camera device list.
   *   - `VIDEO_USER_FORBIDDEN_CAPTURE`: The user has forbidden the use of the camera. They can allow camera and rejoin the session.
   *   - `VIDEO_ESTABLISH_STREAM_ERROR`: Video WebSocket is broken.
   *   - `VIDEO_CAMERA_IS_TAKEN`: User's camera is taken by other programs.
   * @category Video
   */
  function startVideo(option?: CaptureVideoOption): ExecutedResult;

  /**
   *
   * Stops current video capturing.
   *
   * **Example**
   * ```javascript
   * try{
   *   await stream.stopVideo();
   * } catch (error) {
   *   console.log(error);
   * }
   * ```
   *
   * @returns
   * - `''`: Success
   * - `Error`: Failure. Details in {@link ErrorTypes}.
   * @category Video
   */
  function stopVideo(): ExecutedResult;

  /**
   *
   * Changes camera device for capturing video.
   *
   * **Note**
   * - The camera device ID is accessible only after the user allows the browser to access camera devices.
   * - If the using on the mobile devices, using the {@link MobileVideoFacingMode} as the camera ID.
   *
   * **Example**
   * ```javascript
   * try{
   *   const cameras = stream.getCameraList();
   *   const camera =  // choose your camera
   *   await stream.switchCamera(camera.deviceId);
   * } catch (error) {
   *   console.log(error);
   * }
   * ```
   *
   * @param cameraDeviceId Camera device ID.
   *   - {@link Stream.getCameraList} Can be used to get a list of currently accessible camera devices.
   *
   * @category Video
   *
   */
  function switchCamera(
    cameraDeviceId: string | typeof MobileVideoFacingMode,
  ): ExecutedResult;

  /**
   *
   * Starts rendering video.
   *
   *
   * **Example**
   * ```javascript
   * try{
   *   const canvas = document.querySelector('#canvas-id');
   *   await stream.renderVideo(canvas,userId,300,200,0,0,1);
   * } catch (error)  {
   *   console.log(error);
   * }
   * ```
   *
   * @param canvas Required. The canvas to render the video.
   * @param userId Required. The user ID which to render the video.
   * @param width Required. Video width.
   * @param height Required. Video height.
   *
   * ** Note **
   *
   * The origin of the coordinates is in the lower left corner of the canvas.
   *
   * @param x Required. Coordinate x of video.
   * @param y Required. Coordinate y of video.
   * @param videoQuality Required. Video quality: 90p, 180p, 360p, 720p. Currently supports up to 720p.
   * @param additionalUserKey Optional. Used to render the same video on different coordinates of the canvas.
   *
   * @returns
   * - `''`: Success
   * - `Error`: Failure. Details in {@link ErrorTypes}.
   * @category Video
   */
  function renderVideo(
    canvas: HTMLCanvasElement,
    userId: number,
    width: number,
    height: number,
    x: number,
    y: number,
    videoQuality: VideoQuality,
    additionalUserKey?: string,
  ): Promise<'' | Error>;

  /**
   * Stops rendering the video.
   *
   *
   * **Example**
   * ```javascript
   * try{
   *   await stream.stopRenderVideo();
   * } catch (error)  {
   *   console.log(error);
   * }
   * ```
   * @param canvas Required. The canvas to render the video.
   * @param userId Required. The user ID which to render the video.
   * @param additionalUserKey Optional. Must be paired with `renderVideo`.
   * @param underlyingColor Optional. Underlying color when video is stopped. Default is transparent.
   * @param isKeepLastFrame Optional. Determines whether to keep the last frame when stopping the video.
   * @returns
   * - `''`: Success.
   * - `Error`: Failure. Details in {@link ErrorTypes}.
   * @category Video
   */
  function stopRenderVideo(
    canvas: HTMLCanvasElement,
    userId: number,
    additionalUserKey?: string,
    underlyingColor?: UnderlyingColor | string,
    isKeepLastFrame?: boolean,
  ): ExecutedResult;

  /**
   * Updates the dimension of the canvas.
   *  Used to update the width or height when the styled width or height changed.
   *
   * @param canvas Required. The canvas to render the video.
   * @param width Required. Canvas's new width.
   * @param height Required. Canvas's new height.
   *
   * * @returns
   * - `''`: Success.
   * - `Error`: Failure. Details in {@link ErrorTypes}.
   * @category Video
   */
  function updateVideoCanvasDimension(
    canvas: HTMLCanvasElement,
    width: number,
    height: number,
  ): ExecutedResult;
  /**
   * Adjusts the coordinates and dimension of the rendered video.
   *
   * @param canvas Required. The canvas to render the video.
   * @param userId Required. The user ID which to render the video.
   * @param width Required. Video width.
   * @param height Required. Video height.
   * @param x Required. Coordinate x of video.
   * @param y Required. Coordinate y of video.
   * @param additionalUserKey Optional. Must be paired with `renderVideo`.
   *
   * @returns
   * - `''`: Success.
   * - `Error`: Failure. Details in {@link ErrorTypes}.
   * @category Video
   */
  function adjustRenderedVideoPosition(
    canvas: HTMLCanvasElement,
    userId: number,
    width: number,
    height: number,
    x: number,
    y: number,
    additionalUserKey?: string,
  ): ExecutedResult;
  /**
   * Clears the canvas.
   * @param canvas Required. The canvas to render the video.
   * @param underlyingColor Optional. Underlying color when video is stopped. Default is transparent.
   *
   * * @returns
   * - `''`: Success.
   * - `Error`: Failure. Details in {@link ErrorTypes}.
   * @category Video
   */
  function clearVideoCanvas(
    canvas: HTMLCanvasElement,
    underlyingColor?: UnderlyingColor | string,
  ): ExecutedResult;

  /**
   * Mirrors current video.
   * @param mirrored
   *
   * @returns
   * - `''`: Success.
   * - `Error`: Failure. Details in {@link ErrorTypes}.
   *
   * @category Video
   */
  function mirrorVideo(mirrored: boolean): ExecutedResult;
  /**
   * Tries to enable hardware acceleration.
   *
   * @param enable boolean or specific encode or decode.
   *
   * @returns Promise&lt;boolean&gt; true: success, false: fail.
   *
   * @category Video
   */
  function enableHardwareAcceleration(
    enable: boolean | { encode?: boolean; decode?: boolean },
  ): Promise<boolean>;
  /**
   * Previews the virtual background. If the video is on, preview virtual background applies to the current video.
   * @param canvas
   * @param imageUrl Virtual background image.
   * @param cropped Cropped to 16/9 aspect ratio. Default is false.
   *
   * @returns
   * - `''`: Success.
   * - `Error`: Failure. Details in {@link ErrorTypes}.
   *
   * @category Video
   */
  function previewVirtualBackground(
    canvas: HTMLCanvasElement,
    imageUrl: string | 'blur' | undefined,
    cropped?: boolean,
  ): ExecutedResult;
  /**
   * Updates the virtual background image.
   * @param imageUrl Virtual background image.
   * @param cropped Cropped to 16/9 aspect ratio. Default is false.
   * @returns
   * - `''`: Success.
   * - `Error`: Failure. Details in {@link ErrorTypes}.
   *
   *  @category Video
   */
  function updateVirtualBackgroundImage(
    imageUrl: string | 'blur' | undefined,
    cropped?: boolean,
  ): ExecutedResult;
  /**
   * Stops previewing the virtual background.
   *
   * @returns
   * - `''`: Success.
   * - `Error`: Failure. Details in {@link ErrorTypes}.
   *
   * @category Video
   */
  function stopPreviewVirtualBackground(): ExecutedResult;
  /**
   * Preview the video mask, if the video is on, preview mask will apply to current video.
   * @param canvas
   * @param option mask option
   * @returns
   * - `''`: Success.
   * - `Error`: Failure. Details in {@link ErrorTypes}.
   *
   * @category Video
   */
  function previewVideoMask(
    canvas: HTMLCanvasElement,
    option: MaskOption,
  ): ExecutedResult;
  /**
   * Update the option of video mask, you can update each option individually
   * @param option mask option
   *  @returns
   * - `''`: Success.
   * - `Error`: Failure. Details in {@link ErrorTypes}.
   *
   *  @category Video
   */
  function updateVideoMask(option: MaskOption): ExecutedResult;
  /**
   * Stop previewing the video mask
   * @returns
   * - `''`: Success.
   * - `Error`: Failure. Details in {@link ErrorTypes}.
   *
   * @category Video
   */
  function stopPreviewVideoMask(): ExecutedResult;
  /**
   * Subscribes to video statistic data based on the type parameter.
   * Client will receive video quality data every second.
   *
   * **Note**
   *   If type is not specified, this subscribes to both encode and decode video statistics.
   *   - Client only handles the encode (send) video statistic data when:
   *      - 1. Current user turns on video.
   *      - 2. There is other participant watching the current user's video.
   *   - Client only handles the decode (receive) video statistic data when:
   *      - 1. There is other participant sending video.
   *
   * **Example**
   * ```javascript
   * try{
   *   await stream.subscribeVideoStatisticData();
   * } catch (error)  {
   *   console.log(error);
   * }
   * ```
   *
   * @param type Optional. `Object { encode: Boolean, decode: Boolean }` can specify which type of audio should be subscribed to.
   *
   * @returns
   * - `''`: Success.
   * - `Error`: Failure. Details in {@link ErrorTypes}.
   *
   * @category Video
   */
  function subscribeVideoStatisticData(type?: VideoStatisticOption): ExecutedResult;

  /**
   * Unsubscribes to video statistic data based on the type parameter.
   *
   * **Note**
   *   If type is not specified, this will unsubscribe to both encode and decode audio statistics.
   * **Example**
   * ```javascript
   * try{
   *   await stream.unsubscribeVideoStatisticData();
   * } catch (error)  {
   *   console.log(error);
   * }
   * ```
   *
   * @param type Optional. `Object { encode: Boolean, decode: Boolean }` can specify which type of audio should be unsubscribed to.
   *
   * @returns
   * - `''`: Success.
   * - `Error`: Failure. Details in {@link ErrorTypes}.
   *
   * @category Video
   */
  function unsubscribeVideoStatisticData(
    type?: VideoStatisticOption,
  ): ExecutedResult;
  /**
   *
   * Gets the `isCapturingVideo` flag status.
   *
   * @returns
   * - `true`: The stream object is capturing video.
   * - `false`: The stream object is not capturing video or the video flag is `false` in media constraints.
   *
   * @category Video
   */
  function isCapturingVideo(): boolean;

  /**
   *
   * Gets the `isCameraTaken` flag status.
   *
   * @returns
   * - `true`: The camera is taken by another program.
   * - `false`: The camera is taken by another program or the video flag is `false` in media constraints.
   *
   * @category Video
   */
  function isCameraTaken(): boolean;

  /**
   * Gets the `isCaptureForbidden` flag status.
   *
   * @returns
   * - `true`: The capture is forbidden by the user.
   * - `false`: The capture is not forbidden by user or the video flag is `false` in media constraints.
   *
   * @category Video
   */
  function isCaptureForbidden(): boolean;

  /**
   * Gets the current camera devices list.
   *
   * **Note**
   * - This camera device list is collected from the browser's `navigator.mediaDevices` object and maintained by the stream object.
   * - If the user does not allow permission to access the camera, this list will have a default `CameraDevice` object with all properties set to empty strings.
   *
   *
   * @returns
   * - `[]`: The video flag is `false` in media constraints.
   * - `Array<CameraDevice>`: A CameraDevice interface has following property:
   *   - `label: string`: The label of camera device.
   *   - `deviceId: string`: The string of camera device.
   *
   * @category Video
   */
  function getCameraList(): Array<MediaDevice>;

  /**
   * Gets the recently active camera devices ID.
   *
   *
   * @returns
   * - `''`: The video flag is `false` in media constraints.
   * - `'default'`: No camera device ID is passed to `startCaptureVideo` and it will use system default camera.
   * - `string`: Recently active camera devices ID.
   *
   * @category Video
   */
  function getActiveCamera(): string;

  /**
   * Gets the recently active video ID.
   *
   * @returns
   * - `0`: No video is active or the video flag is `false` in media constraints.
   * - `number`: ID of current active video.
   *
   * @category Video
   */
  function getActiveVideoId(): number;
  /**
   *
   * Gets the maximum quality of video.
   * @returns Highest video quality. See the definition {@link VideoQuality}
   * @category Video
   *
   */
  function getVideoMaxQuality(): number;

  /**
   * Gets the dimension of received video.
   * Note this is only available when multi-video rendering is not supported.
   *  For the case of multi-video rendering, get each video's resolution from the `video-detailed-data-change` event
   * @return Received video dimension.
   * @category Video
   */
  function getReceivedVideoDimension(): { height: number; width: number };

  /**
   * Determines whether the browser can support multiple videos.
   * @returns Whether the current platform supports multiple videos.
   * @category Video
   */
  function isSupportMultipleVideos(): boolean;
  /**
   * Determines whether HD video is supported.
   * @returns Whether the current account supports sending 720p video.
   * @category Video
   */
  function isSupportHDVideo(): boolean;
  /**
   * Determines whether the current platform supports virtual backgrounds.
   * @returns Whether the current platform supports virtual backgrounds.
   * @category Video
   */
  function isSupportVirtualBackground(): boolean;
  /**
   * Gets the status of the virtual backgrounds.
   *
   * @returns Status of the virtual background. {@link VirtualBackgroundStatus}
   *
   * @category Video
   */
  function getVirtualbackgroundStatus(): VirtualBackgroundStatus;
  /**
   * Gets the video statistic data.
   * @returns Video statistic date. {@link VideoQosData}
   * @category Video
   */
  function getVideoStatisticData(): { encode: VideoQosData; decode: VideoQosData };
  /**
   * Whether to use video element to render self-view.
   * @returns Boolean.
   * @category Video
   */
  function isRenderSelfViewWithVideoElement(): boolean;
  /**
   * Get network quality,only the network quality of users who start video is meaningful.
   * @param userId optional, default is current user
   *
   * @category Video
   */
  function getNetworkQuality(userId?: number): NetworkQuality;
  /**
   * Get captured video resolution
   * @category Video
   */
  function getCapturedVideoResolution(): { height: number; width: number };
  /**
   * Get video mask status
   * @category Video
   */
  function getVideoMaskStatus(): MaskOption;

  // -------------------------------------------------[share]-----------------------------------------------------------

  /**
   * Renders the received screen share content.
   * - It is usually called in the `active-share-change` callback.
   *
   * ```javascript
   * client.on('active-share-change',payload=>{
   *  if(payload.state==='Active'){
   *   stream.startShareView(canvas,payload.activeUserId);
   *  }else if(payload.state==='Inactive'){
   *   stream.stopShareView();
   *  }
   * })
   * ```
   *
   * @param canvas Required. The canvas to render the share content.
   * @param activeUserId Required. Active share user ID.
   *
   * @returns Executed promise.
   * @category Screen Share
   */
  function startShareView(
    canvas: HTMLCanvasElement,
    activeUserId: number,
  ): ExecutedResult;
  /**
   * Stops rendering received screen share content.
   * @returns Executed promise.
   * @category Screen Share
   */
  function stopShareView(): ExecutedResult;

  /**
   * Switch to another share content.
   *
   * When there are multiple users sharing the screen in the session,you can have a chance to switch to another one's screen.
   *
   * ```javascript
   * const sharingUserList = stream.getShareUserList();
   * // click handler of sharing user list menu
   * switchButton.addEventListener('click',(event)=>{
   *  if(event.dataId!==stream.getActiveShareUserId()){
   *   stream.switchShareView(event.dataId);
   *  }
   * })
   *
   * ```
   *
   * @param activeNodeId Required. Active share user ID.
   *
   * @returns Executed promise.
   * @category Screen Share
   */
  function switchShareView(activeNodeId: number): ExecutedResult;
  /**
   * Starts screen share.
   *
   * - Check the share privilege before starting screen share.
   * - If you start screen share, you will stop receiving others' shared content.
   * - Users with legacy Chrome browsers need to install a chrome extension before starting screen share. Check the promise return value.
   * @param canvas Required. The canvas which renders the screen share content.
   * @param options Optional options for screen share.
   *
   * @returns Executed promise.
   * - {type:'INVALID_OPERATION', reason:'required extension', extensionUrl:'url'} : Install the extension before starting share.
   *
   * @category Screen Share
   */
  function startShareScreen(
    canvas: HTMLCanvasElement | HTMLVideoElement,
    options?: ScreenShareOption,
  ): ExecutedResult;
  /**
   * Pauses screen share.
   * @returns Executed promise.
   * @category Screen Share
   */
  function pauseShareScreen(): ExecutedResult;

  /**
   * Resumes screen share.
   * @returns Executed promise.
   * @category Screen Share
   */
  function resumeShareScreen(): ExecutedResult;
  /**
   * Stops screen share.
   * @returns Executed promise.
   * @category Screen Share
   */
  function stopShareScreen(): ExecutedResult;
  /**
   * Locks the privilege of screen share. Only the host or manager can share.
   * - Only the **host** or **manager** has the permission.
   * - If a participant (non-host or manager) is sharing the screen, once the host locks screen share, their share will be forcibly stopped.
   *
   * ```javascript
   * // host
   * stream.lockShare(true);
   * // sharing user
   * client.on('passively-stop-share',payload=>{
   *  if(payload.reason==='PrivilegeChange'){
   *  console.log('passively stop share because of privilege change')
   *  }
   * })
   * ```
   * @param isLocked Set to `true` to lock share, or `false` to unlock.
   * @returns Executed promise.
   * @category Screen Share
   */
  function lockShare(isLocked: boolean): ExecutedResult;
  /**
   * Sets the dimension of the canvas rendering the received share content.
   *
   * @param width Canvas width.
   * @param height Canvas height.
   * @returns Executed promise.
   * @category Screen Share
   */
  function updateSharingCanvasDimension(
    width: number,
    height: number,
  ): ExecutedResult;
  /**
   * Switch camera for sharing.
   * @param cameraId Camera ID.
   * @returns Executed promise.
   * @category Screen Share
   */
  function switchSharingSecondaryCamera(cameraId: string): ExecutedResult;
  /**
   * Set the privilege of screen share.
   *
   * @param privilege The privilege
   * @returns Executed promise.
   *
   * @category Screen Share
   */
  function setSharePrivilege(privilege: SharePrivilege): ExecutedResult;
  /**
   * When screen sharing is started, host or manager can determine whether the shared content is broadcast to subsessions.
   *
   * @returns Executed promise.
   * @category Screen Share
   */
  function shareToSubsession(): ExecutedResult;
  /**
   * Stop broadcasting the shared content to subsessions.
   *
   * @returns Executed promise.
   * @category Screen Share
   */
  function stopShareToSubsession(): ExecutedResult;
  /**
   * Enable or disable video share optimization
   * @param enable boolean
   * @returns executed promise.
   * @category Screen Share
   */
  function enableOptimizeForSharedVideo(enable: boolean): ExecutedResult;
  /**
   * Update the share quality when video share enabled
   * Note: high resolution will lead to low FPS
   * @param quality quality
   * @returns executed promise.
   * @category Screen Share
   */
  function updateSharedVideoQuality(quality: VideoQuality): ExecutedResult;
  /**
   * Subscribe share statistic data base on the type parameter.
   * Client will receive video quality data every second.
   * @param type optional. Object { encode: Boolean, decode: Boolean }, Can specify which type of share to subscribe to.
   *
   * @returns
   * - `''`: Success.
   * - `Error`: Failure. Details in {@link ErrorTypes}.
   *
   * @category Screen Share
   */
  function subscribeShareStatisticData(type?: StatisticOption): ExecutedResult;
  /**
   * Unsubscribe to share statistic data bases on the parameter type.
   * * @param type optional. Object { encode: Boolean, decode: Boolean }, Can specify which type of share to subscribe to.
   *
   * @returns
   * - `''`: Success.
   * - `Error`: Failure. Details in {@link ErrorTypes}.
   *
   * @category Video
   */
  function unsubscribeShareStatisticData(type?: StatisticOption): ExecutedResult;
  /**
   * Determines whether the host locked the share.
   * @returns Whether screen share is locked.
   * @category Screen Share
   */
  function isShareLocked(): boolean;
  /**
   * Get the share privilege.
   * @returns Share privilege.
   * @category Screen Share
   */
  function getSharePrivilege(): SharePrivilege;
  /**
   * Gets the user ID of the received shared content.
   * @returns Active shared user ID.
   * @category Screen Share
   */
  function getActiveShareUserId(): number;
  /**
   * Gets the status of share.
   * @returns Share status.
   * @category Screen Share
   */
  function getShareStatus(): ShareStatus;
  /**
   * Get the list of users who are screen sharing.
   * @returns shared user list
   * @category Screen Share
   */
  function getShareUserList(): Array<Participant>;
  /**
   * Whether to use video element to start screen sharing.
   * @returns boolean
   * @category Screen Share
   */
  function isStartShareScreenWithVideoElement(): boolean;
  /**
   ** Whether video sharing is enabled
   * @returns
   * @category Screen Share
   */
  function isOptimizeForSharedVideoEnabled(): boolean;
  /**
   * Whether current platform supports video share
   * @returns
   * @category Screen Share
   */
  function isSupportOptimizedForSharedVideo(): boolean;
  /**
   * Get the share statistic data
   * @returns data of video statistic.{@link VideoQosData}
   * @category Screen Share
   */
  function getShareStatisticData(): {
    encode?: VideoQosData;
    decode?: VideoQosData;
  };

  // -------------------------------------------------[camera]-----------------------------------------------------------

  /**
   * Request control on far-end PTZ camera
   *
   * ```javascript
   * // UserA
   * // request control of UserB's camera
   * stream.requestFarEndCameraControl(userBId);
   *
   * // UserB
   * client.on("far-end-camera-request-control", (payload) => {
   *   const { userId, displayName } = payload;
   *  // popup a confirm window, approve or decline the request
   *  stream.approveFarEndCameraControl(userId);
   * });
   *
   * // UserA
   * let isFarEndCameraApproved = false;
   * let capability = undefined;
   * client.on("far-end-camera-response-control", (payload) => {
   *   const { isApproved, userId, displayName } = payload;
   *   isFarEndCameraApproved = isApproved;
   * });
   *
   * client.on("far-end-camera-capability-change", (payload) => {
   *   const { userId, ptz } = payload;
   *   capability = ptz;
   *   if (capability.pan) {
   *     // pan the camera left
   *     stream.controlFarEndCamera({
   *       userId,
   *       cmd: CameraControlCmd.Left,
   *       range: 10,
   *     });
   *   }
   * });
   * ```
   *
   * @param userId the controlling user ID.
   * @returns
   * - `''`: Success
   * - `Error`: Failure. Details in {@link ErrorTypes}.
   *
   * @category Camera
   */
  function requestFarEndCameraControl(userId: number): ExecutedResult;
  /**
   * Approve the control request.
   *
   * @param userId the requesting user ID.
   * @returns
   * - `''`: Success
   * - `Error`: Failure. Details in {@link ErrorTypes}.
   *
   * @category Camera
   */
  function approveFarEndCameraControl(userId: number): ExecutedResult;
  /**
   * Decline the control request.
   *
   * @param userId The requesting user ID.
   * @returns
   * - `''`: Success
   * - `Error`: Failure. Details in {@link ErrorTypes}.
   *
   * @category Camera
   */
  function declineFarEndCameraControl(userId: number): ExecutedResult;
  /**
   * Give up control of far end camera.
   * @param userId The controlling user ID.
   * @returns
   * - `''`: Success
   * - `Error`: Failure. Details in {@link ErrorTypes}.
   *
   * @category Camera
   */
  function giveUpFarEndCameraControl(userId: number): ExecutedResult;
  /**
   * Control the local camera.
   * @param option The cmd option.
   * @returns
   * - `''`: Success
   * - `Error`: Failure. Details in {@link ErrorTypes}.
   *
   * @category Camera
   */
  function controlCamera(option: CameraControlOption): ExecutedResult;
  /**
   * Control the far-end camera.
   * @param option The cmd option.
   *
   *  @returns
   * - `''`: Success
   * - `Error`: Failure. Details in {@link ErrorTypes}.
   *
   * @category Camera
   */
  function controlFarEndCamera(option: FarEndCameraControlOption): ExecutedResult;
  /**
   * Get the capability of the far-end camera.
   * @param userId
   *
   * @category Camera
   */
  function getFarEndCameraPTZCapability(userId: number): PTZCameraCapability;
  /**
   * Get the capability of the camera on current device
   * @param cameraId default is active camera ID
   * @category Camera
   */
  function getCameraPTZCapability(cameraId?: string): PTZCameraCapability;
  /**
   * Whether current browser supports Pan-Tilt-Zoom (PTZ) function
   * @category Camera
   */
  function isBrowserSupportPTZ(): boolean;
}

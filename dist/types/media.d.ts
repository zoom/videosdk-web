import {
  DialoutState,
  ExecutedResult,
  MobileVideoFacingMode,
  VideoQuality,
} from './common';

/**
 * Interface of media device
 */
interface MediaDevice {
  /**
   * Label of the device
   */
  label: string;
  /**
   * Identify of device
   */
  deviceId: string;
}
/**
 * Interface of phone call country
 */
interface PhoneCallCountry {
  /** country name */
  name: string;
  /** country code */
  code: string;
  /**
   * @ignore
   */
  id: string;
}
/**
 * Share privilege
 */
export declare enum SharePrivilege {
  /**
   * One participant can share at a time, only the host or manager can start sharing when someone else is sharing.
   */
  Unlocked = 0,
  /**
   * Only the host or manager can share
   */
  Locked = 1,
}
/**
 * Interface of start audio option
 */
interface AudioOption {
  /**
   * Join audio only with the speaker, the microphoe is not connected.
   */
  speakerOnly?: boolean;
  /**
   * start audio automatically in Safari
   *
   * It's a little different in the Safari browser, when calling `startAudio` automatically or programmatically without any gesture (click or touch on the document),
   * the value of `autoStartAudioInSafari` should be `true`, other than that, the value should always be `false` or unset.
   */
  autoStartAudioInSafari?: boolean;
}
/**
 * Interface of dial out option
 */
export interface DialOutOption {
  /**
   * Is call me, phone audio bind to current user
   */
  callMe?: boolean;
  /**
   * Is require greeting before being connected
   */
  greeting?: boolean;
  /**
   * Is require pressing 1 before being connected
   */
  pressingOne?: boolean;
}
/**
 * Interface of capture video option
 */
interface CaptureVideoOption {
  /**
   * Id of the camera for capturing the video, if not specified, use system default
   */
  cameraId?: string | MobileVideoFacingMode;
  /**
   * Customized width of capture, 640 as default
   */
  captureWidth?: number;
  /**
   * Customized height of capture, 360 as default
   */
  captureHeight?: number;
  /**
   * Is self video mirrored
   */
  mirrored?: boolean;
  /**
   * video element, only used in android platform or non-SharedArrayBuffer Chromium-like browser
   */
  videoElement?: HTMLVideoElement;
  /**
   * Is capture 720P video
   */
  hd?: boolean;
  /**
   * virtual background option
   */
  virtualBackground?: {
    /**
     * image url for virtual background
     * - If set a specific image, the url can be  a regular http|https url, base64 format or ObjectURL
     * - 'blur' : blur your background
     * - undefined : no virtual backround
     */
    imageUrl: string | 'blur' | undefined;
    /**
     * cropping the background image to an appropriate aspect ratio(16/9), default is false
     */
    cropped?: boolean;
  };
}
/**
 * Interface of audio qos data
 */
export interface AudioQosData {
  /**
   * audio sample rate
   */
  sample_rate: number;
  /**
   * audio round trip time
   */
  rtt: number;
  /**
   * audio jitter
   */
  jitter: number;
  /**
   * audio average loss
   */
  avg_loss: number;
  /**
   * audio max loss
   */
  max_loss: number;
}
/**
 * Interface of audio statistic option
 */
interface AudioStatisticOption {
  /**
   * Subscribe/unsubscribe encoding data(sending audio)
   */
  encode?: boolean;
  /**
   * Subscribe/ubsubscribe decoding data(receiving audio)
   */
  decode?: boolean;
}
/**
 * Interface of share screen option
 */
export interface ScreenShareOption {
  /**
   * the cameraId
   * Share a secondary camera connected to your computer; for example, a document camera or the integrated camera on your laptop.
   */
  secondaryCameraId?: string;
  /**
   * The capture with of share video, only enabled when the value of secondaryCameraId is not undefined
   */
  captureWidth?: number;
  /**
   * The capture height of share video, only enabled when the value of secondaryCameraId is not undefined
   */
  captureHeight?: number;
}
/**
 * Interface of share audio status
 */
interface ShareAudioStatus {
  /**
   * Is share audio enabled for the current sharing
   */
  isShareAudioEnabled: boolean;
  /**
   * Is share audio muted for the current sharing
   */
  isShareAudioMuted: boolean;
  /**
   * Is share audio on for the current sharing
   */
  isSharingAudio: boolean;
}

/**
 * Interface of underlying color
 */
interface UnderlyingColor {
  /**
   * decimal, red/255
   */
  R: number;
  /**
   * decimal, green/255
   */
  G: number;
  /**
   * decimal, black/255
   */
  B: number;
  /**
   * decimal, 1 - opaque, 0 - transparent
   */
  A?: number;
}
/**
 * Interface of video qos data
 */
export interface VideoQosData {
  /**
   * video sample rate
   */
  sample_rate: number;
  /**
   * video round trip time
   */
  rtt: number;
  /**
   * video jitter
   */
  jitter: number;
  /**
   * video average loss
   */
  avg_loss: number;
  /**
   * video max loss
   */
  max_loss: number;
  /**
   * video width
   */
  width: number;
  /**
   * video height
   */
  height: number;
  /**
   * video FPS
   */
  fps: number;
}
/**
 * Interface of video statistic option
 */
interface VideoStatisticOption {
  /**
   * Subscribe/unsubscribe encoding data(sending video)
   */
  encode?: boolean;
  /**
   * Subscribe/ubsubscribe decoding data(receiving video)
   */
  decode?: boolean;
  /**
   * Get the detailed data of each received video, such as fps,resolution
   */
  detailed?: boolean;
}
/**
 * Status of virtual background
 */
interface VirtualBackgroundStatus {
  /**
   * is the virtual background model ready
   */
  isVBPreloadReady?: boolean | undefined;
  /**
   * is virtual background configured
   */
  isVBConfigured?: boolean | undefined;
  /**
   * current virtual background image
   */
  imageSrc?: string | undefined;
}
/**
 * Share status
 */
export enum ShareStatus {
  /**
   * Sharing
   */
  Sharing = 'sharing',
  /**
   * Sharing paused
   */
  Paused = 'paused',
  /**
   * Sharing ended
   */
  End = 'ended',
}
/**
 * The Stream interface provides methods that define the behaviors of a Stream object, such as the mute audio, capture video.
 *
 * The Stream object is created by the `getMediaStream` method..
 */
export declare namespace Stream {
  // ------------------------------------------------[audio]------------------------------------------------------------
  /**
   * Join audio by the microphone and speaker.
   * - If the participant has joined audio by the phone, he/she cannot join the computer audio.
   *
   * ```javascript
   * await client.init();
   * await client.join(topic, signature, username, password);
   * const stream = client.getMediaStream();
   * await stream.startAudio();
   * ```
   *
   * It's a little different in Safari browser.
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
   * @returns executed promise. Following are the possible error reasons:
   * - type=`USER_FORBIDDEN_MICROPHONE`: The user has blocked accesses to the microphone from the sdk, try to grant the privilege and rejoin the meeting.
   * @category Audio
   */
  function startAudio(options?: AudioOption): ExecutedResult;

  /**
   * Leave the computer audio
   * @returns executed promise.
   * @category Audio
   */
  function stopAudio(): ExecutedResult;

  /**
   * Mute audio
   * - If userId is not specified, this will mute muself.
   * - Only the **host** or **manager** can mute others.
   * - If an attendee is allowed to talk, the host can also mute him/her.
   * @param userId Default `undefined`
   * @returns executed promise.
   * @category Audio
   */
  function muteAudio(userId?: number): ExecutedResult;
  /**
   * Unmute audio
   * - If userId is not specified, this will unmute self.
   * - For privacy and security concerns, the host can not unmute the participant's audio directly, instead, the participant will receive an unmute audio consent.
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
   * @param userId Default `undefined`
   * @returns executed promise.
   * @category Audio
   *
   */
  function unmuteAudio(userId?: number): ExecutedResult;
  /**
   * You can join a Zoom meeting by means of teleconferencing/audio conferencing (using a traditional phone).This is useful when:
   * - you do not have a microphone or speaker on your PC/Mac,
   * - you do not have a smartphone (iOS or Android) while on the road, or
   * - you cannot connect to a network for video and VoIP (computer audio)
   *
   * If a number is not listed or has asterisks (***) in place of some of the numbers, it means that number is not available on the account that you're currently logged into.
   * Check the `stream.getSupportCountryInfo()` method to get available countries.
   *
   * - This method will triggle `dialout-state-change` event, add listener to get the latest value.
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
   * @param countryCode country code
   * @param phoneNumber phone number
   * @param name name
   * @param option optional option of the call out
   *
   * @returns executed promise.
   * @category Phone
   */
  function inviteByPhone(
    countryCode: string,
    phoneNumber: string,
    name: string,
    options?: DialOutOption,
  ): ExecutedResult;
  /**
   * Cancel the dial out request before it is complete.
   *
   * @param countryCode country code
   * @param phoneNumber phone number
   *
   * @returns executed promise.
   * @category Phone
   */
  function cancelInviteByPhone(
    countryCode: string,
    phoneNumber: string,
    options?: { callMe?: boolean },
  ): ExecutedResult;
  /**
   * Hang up the phone. Only used when current audio joined by the phone
   *
   * @return executed promise.
   * @category Phone
   */
  function hangup(): ExecutedResult;
  /**
   * Mute self share audio or other's share audio locally
   * If `userId` leaves empty, will mute share audio, other participants cannot hear the share audio.
   * If set the `userId`, will mute share views audio locally, other participants are not affected.
   *
   * @param userId Optional empty value will mute self share audio
   *
   * @return executed promise.
   * @category Audio
   */
  function muteShareAudio(userId?: number): ExecutedResult;
  /**
   * Unmute self share audio or other's share audio locally
   * If `userId` leaves empty, will unmute share audio, other participants can hear the share audio.
   * If set the `userId`, will unmute share views audio locally, other participants are not affected.
   *
   * @param userId Optional empty value will unmute self share audio
   *
   * @return executed promise.
   * @category Audio
   */
  function unmuteShareAudio(userId?: number): ExecutedResult;
  /**
   * Switch the microphone
   *
   * ```javascript
   *  const microphones = stream.getMicList();
   *  const microphone = // choose another microphone
   *  await switchMicrophone(microphone.deviceId);
   * ```
   * @param microphoneId the device id of microphone
   * @returns executed promise.
   * @category Audio
   *
   */
  function switchMicrophone(microphoneId: string): ExecutedResult;
  /**
   * Switch the speaker
   *
   * @param speakerId the device id of speaker
   * @returns executed promise.
   * @category Audio
   *
   */
  function switchSpeaker(speakerId: string): ExecutedResult;
  /**
   * Subscribe audio statistic data base on the type parameter.
   * Client will receive audio quality data every second.
   *
   * **Note**
   *   If type are not specified, this will subscribe both encode and decode audio statistics.
   *    - client only handles the encode (send) audio statistic data when:
   *      1. Current user connected audio.
   *      2. Current user is not muted
   *      3. There is other participant who is listening to current user's audio.
   *    - client only handles the decode (receive) audio statistic data when:
   *      1. Current user has connected audio
   *      2. There is other participant who is sending audio.
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
   * @param type optional. Object { encode: Boolean, decode: Boolean }, Can specify which type of audio should be subscribe.
   *
   * @returns
   * - `''`: Success.
   * - `Error`: Failure. Details in {@link ErrorTypes}.
   *
   * @category Audio
   */
  function subscribeAudioStatisticData(type?: AudioStatisticOption): ExecutedResult;
  /**
   * unsubscribe audio statistic data base on the type parameter.
   *
   * **Note**
   *    If type are not specified, this will unsubscribe both encode and decode audio statistics.
   * **Example**
   * ```javascript
   * try{
   *   await stream.unsubscribeAudioStatisticData();
   * } catch (error)  {
   *   console.log(error);
   * }
   * ```
   *
   * @param type optional. Object { encode: Boolean, decode: Boolean }, Can specify which type of audio should be unsubscribe.
   *
   * @returns   * - `''`: Success.
   * - `Error`: Failure. Details in {@link ErrorTypes}.
   *
   * @category Audio
   */
  function unsubscribeAudioStatisticData(
    type?: AudioStatisticOption,
  ): ExecutedResult;

  /**
   * Mute someone's audio locally, this operation doesn't affect other participants' audio
   * @param userId userId
   *
   * @returns   * - `''`: Success.
   * - `Error`: Failure. Details in {@link ErrorTypes}.
   *
   * @category Audio
   */
  function muteUserAudioLocally(userId: number): ExecutedResult;
  /**
   * Unmute someone's audio locally, this operation doesn't affect other participants' audio
   * @param userId userId
   *
   * @returns   * - `''`: Success.
   * - `Error`: Failure. Details in {@link ErrorTypes}.
   *
   * @category Audio
   */
  function unmuteUserAudioLocally(userId: number): ExecutedResult;
  /**
   * Whether the user is muted.
   * - If not specified the user id, get the muted of current user.
   * @param userId Default `undefined`
   * @return boolean
   * @category Audio
   */
  function isAudioMuted(userId?: number): boolean;

  /**
   * Get the available microphones.
   * @returns camera list
   * @category Audio
   */
  function getMicList(): Array<MediaDevice>;
  /**
   * Get the available speakers.
   * @return speaker list
   * @category Audio
   */
  function getSpeakerList(): Array<MediaDevice>;

  /**
   * Get the active device id of microphone.
   * @returns device id
   * @category Audio
   */
  function getActiveMicrophone(): string;
  /**
   * Get the active device of speaker.
   * @returns device id
   * @category Audio
   */
  function getActiveSpeaker(): string;

  /**
   * Is support phone call feature
   * @returns
   * @category Phone
   */
  function isSupportPhoneFeature(): boolean;
  /**
   * Get supported countries
   * @returns supported phone call countries
   * @category Phone
   */
  function getSupportCountryInfo(): Array<PhoneCallCountry>;
  /**
   * Get phone call status
   * @returns phone call status
   * @category Phone
   */
  function getInviteByPhoneStatus(): DialoutState;
  /**
   * Get the status of share audio
   * @returns status of share audio
   * @category Audio
   */
  function getShareAudioStatus(): ShareAudioStatus;
  /**
   * Is share audio muted in local. The share audio here refers to the audio shared by other participants.
   * @param userId userId
   * @returns boolean
   * @category Audio
   *
   */
  function isOthersShareAudioMutedLocally(userId: number): boolean;
  /**
   * Get the audio statistic data
   * @returns {@link AudioQosData}
   * @category Audio
   */
  function getAudioStatisticData(): { encode: AudioQosData; decode: AudioQosData };
  /**
   * Is someone's audio muted locally
   * @param userId userId
   * @returns boolean
   * @category Audio
   */
  function isUserAudioMutedLocally(userId: number): boolean;

  // -------------------------------------------------[video]-----------------------------------------------------------

  /**
   * Start capture video by a specified camera.
   *
   * **Note**
   * - It may take user some time to allow browser access camera device. Therefore there is no default timeout.
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
   * @param {CaptureVideoOption} [option] Optional options for starting video capture
   *
   * @returns
   * - `''`: Success
   * - `Error`: Failure. Errors besides {@link ErrorTypes} that may be returned are listed below.
   *   - `CAN_NOT_DETECT_CAMERA`: Cannot detect camera device.
   *   - `CAN_NOT_FIND_CAMERA`: The provided camera device id is not included in camera device list.
   *   - `VIDEO_USER_FORBIDDEN_CAPTURE`: The user has forbidden use camera, he/she can allow camera and rejoin the meeting.
   *   - `VIDEO_ESTABLISH_STREAM_ERROR`: Video websocket is broken.
   *   - `VIDEO_CAMERA_IS_TAKEN`: User's camera is taken by other programs.
   * @category Video
   */
  function startVideo(option?: CaptureVideoOption): ExecutedResult;

  /**
   *
   * Stop current video capturing.
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
   * Change camera device for capturing video.
   *
   * **Note**
   * - The camera device id is accessible only after the user allows the browser to access camera devices.
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
   * @param cameraDeviceId The id of camera device.
   *   - {@link Stream.getCameraList} can be used to get current accessible camera device.
   *
   * @category Video
   *
   */
  function switchCamera(
    cameraDeviceId: string | MobileVideoFacingMode,
  ): ExecutedResult;

  /**
   *
   * Start render video
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
   * @param userId Required. The user id which to render the video.
   * @param width Required. Width of the video.
   * @param height Required. Height of the video.
   *
   * ** Note **
   *
   * The origin of the coordinates is in the lower left corner of the canvas
   *
   * @param x Required. Coordinate x of video.
   * @param y Required. Coordinate y of video.
   * @param videoQuality Required. Quality of the video. 90P/180P/360P/720P. Currently supports up to 720P
   * @param additionalUserKey Optional. Used for render the same video on different coordinate of the canvas.
   *
   * @returns
   * - `''`: Success
   * - `Error`: Failure. Deatils in {@link ErrorTypes}.
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
   * Stop render the video.
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
   * @param userId Required. The user id which to render the video.
   * @param additionalUserKey Optional. Must be paired with `renderVideo`.
   * @param underlyingColor Optional. Underlying color when video is stopped,default is transparent.
   * @param isKeepLastFrame Optional. Whether keep the last frame when stop the video.
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
   * Update the dimension of the canvas
   *  Used to update the width/height when the styed width/height changed.
   *
   * @param canvas Required. The canvas to render the video.
   * @param width Required. New width of canvas
   * @param height Required. New height of canvas
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
   * Adjust the coordinates and dimension of rendered video.
   *
   * @param canvas Required. The canvas to render the video.
   * @param userId Required. The user id which to render the video.
   * @param width Required. Width of the video.
   * @param height Required. Height of the video.
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
   * Clear all the canvas
   * @param canvas Required. The canvas to render the video.
   * @param underlyingColor Optional. Underlying color when video is stopped,default is transparent.
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
   * Mirror current video
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
   * Try to enable hardware acceleration
   *
   * @param enable boolean or specific encode or decode
   *
   * @returns Promise<boolean> true: success, false: fail
   *
   * @category Video
   */
  function enableHardwareAcceleration(
    enable: boolean | { encode?: boolean; decode?: boolean },
  ): Promise<boolean>;
  /**
   * Preview the virtual background, if the video is on, preview virtual background will apply to current video.
   * @param canvas
   * @param imageUrl virtual background image
   * @param cropped  cropped to 16/9 aspect ratio, default is false
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
   * Update the image of virtual background
   * @param imageUrl virtual background image
   * @param cropped cropped to 16/9 aspect ratio, default is false
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
   * Stop previewing the virtual background
   *
   * @returns
   * - `''`: Success.
   * - `Error`: Failure. Details in {@link ErrorTypes}.
   *
   * @category Video
   */
  function stopPreviewVirtualBackground(): ExecutedResult;
  /**
   * Subscribe video statistic data base on the type parameter.
   * Client will receive video quality data every second.
   *
   * **Note**
   *   If type are not specified, this will subscribe both encode and decode video statistics.
   *   - client only handles the encode (send) video statistic data when
   *      - 1.Current user turns on video.
   *      - 2.There is other participant who is watching current user's video.
   *   - client only handles the decode (receive) video statistic data when
   *      - 1.there is other participant who is sending video.
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
   * @param type optional. Object { encode: Boolean, decode: Boolean }, Can specify which type of audio should be subscribe.
   *
   * @returns
   * - `''`: Success.
   * - `Error`: Failure. Details in {@link ErrorTypes}.
   *
   * @category Video
   */
  function subscribeVideoStatisticData(type?: VideoStatisticOption): ExecutedResult;

  /**
   * unsubscribe video statistic data base on the type parameter.
   *
   * **Note**
   *   If type are not specified, this will unsubscribe both encode and decode audio statistics.
   * **Example**
   * ```javascript
   * try{
   *   await stream.unsubscribeVideoStatisticData();
   * } catch (error)  {
   *   console.log(error);
   * }
   * ```
   *
   * @param type optional. Object { encode: Boolean, decode: Boolean }, Can specify which type of audio should be subscribe.
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
   * Get the isCapturingVideo flag status.
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
   * Get the isCameraTaken flag status.
   *
   * @returns
   * - `true`: The camera is taken by other program.
   * - `false`: The camera is taken by other program or the video flag is `false` in media constraints.
   *
   * @category Video
   */
  function isCameraTaken(): boolean;

  /**
   * Get the isCaptureForbidden flag status.
   *
   * @returns
   * - `true`: The capture is forbidden by user.
   * - `false`: The capture is not forbidden by user or the video flag is `false` in media constraints.
   *
   * @category Video
   */
  function isCaptureForbidden(): boolean;

  /**
   * Get the current camera devices list.
   *
   * **Note**
   * - This camera device list is collected from browser's navigator.mediaDevices object and maintained by the stream object.
   * - If the user does not allow permission to access the camera, this list will have a default CameraDevice object with all property set to empty string.
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
   * Get the recently active camera devices id.
   *
   *
   * @returns
   * - `''`: The video flag is `false` in media constraints.
   * - `'default'`: No camera device id is passed to `startCaptureVideo` and it will use system default camera.
   * - `string`: Recently active camera devices id.
   *
   * @category Video
   */
  function getActiveCamera(): string;

  /**
   * Get the recently active video id.
   *
   * @returns
   * - `0`: No video is active or the video flag is `false` in media constraints.
   * - `number`: Id of current active video.
   *
   * @category Video
   */
  function getActiveVideoId(): number;
  /**
   *
   * Get the max quality of video.
   * @returns highest video quality. See the definition {@link VideoQuality}
   * @category Video
   *
   */
  function getVideoMaxQuality(): number;

  /**
   * Get the dimension of received video.
   * @return received video dimension
   * @category Video
   */
  function getReceivedVideoDimension(): { height: number; width: number };

  /**
   * Whether the browser is support multiple video
   * @returns is current platform supporting multiple videos
   * @category Video
   */
  function isSupportMultipleVideos(): boolean;
  /**
   * Whether video sdk supports HD video
   * @returns is current account supporting sending 720P video
   * @category Video
   */
  function isSupportHDVideo(): boolean;
  /**
   * Whether current platform support virtual background
   * @returns is current platform supporting virtual background
   * @category Video
   */
  function isSupportVirtualBackground(): boolean;
  /**
   * Get status of virtual background
   *
   * @returns status of virtual background. {@link VirtualBackgroundStatus}
   *
   * @category Video
   */
  function getVirtualbackgroundStatus(): VirtualBackgroundStatus;
  /**
   * Get the video statistic data
   * @returns data of video statistic.{@link VideoQosData}
   * @category Video
   */
  function getVideoStatisticData(): { encode: VideoQosData; decode: VideoQosData };
  /**
   * Render the received screen share content.
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
   * @param canvas Required. the canvas to render the share content
   * @param activeUserId Required. active share user id
   *
   * @returns executed promise.
   * @category Screen Share
   */
  function startShareView(
    canvas: HTMLCanvasElement,
    activeUserId: number,
  ): ExecutedResult;
  /**
   * Stop render received screen share content.
   * @returns executed promise.
   * @category Screen Share
   */
  function stopShareView(): ExecutedResult;
  /**
   * Start screen share.
   *
   * - Check the share privilege before start screen share.
   * - If you start screen share, you will stop reveived others shared content.
   * - Legacy Chrome browser need to install chrome extension before start screen share, check the promise return value.
   * @param canvas Required. The canvas which renders the screen share content.
   * @param options Optional. options for screen share
   *
   * @returns executed promise.
   * - {type:'INVALID_OPERATION', reason:'required extension', extensionUrl:'url'} : Installed the extension before start share
   *
   * @category Screen Share
   */
  function startShareScreen(
    canvas: HTMLCanvasElement,
    options?: ScreenShareOption,
  ): ExecutedResult;
  /**
   * Pause screen share
   * @returns executed promise.
   * @category Screen Share
   */
  function pauseShareScreen(): ExecutedResult;

  /**
   * Resume screen share
   * @returns executed promise.
   * @category Screen Share
   */
  function resumeShareScreen(): ExecutedResult;
  /**
   * Stop screen share
   * @returns executed promise.
   * @category Screen Share
   */
  function stopShareScreen(): ExecutedResult;
  /**
   * Lock the privilege of screen share, only the host(manager) can share.
   * - Only the **host** or **manager** has the permission.
   * - If the non-host is sharing the screen, once the host locked screen share, his/her sharing will be forcibly stopped.
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
   * @param isLocked set true to lock share, or false to unlock.
   * @returns executed promise.
   * @category Screen Share
   */
  function lockShare(isLocked: boolean): ExecutedResult;
  /**
   * Set the dimension of canvas which rendering the received sharing content.
   *
   * @param width width of canvas
   * @param height height of canvas
   * @returns executed promise.
   * @category Screen Share
   */
  function updateSharingCanvasDimension(
    width: number,
    height: number,
  ): ExecutedResult;
  /**
   * Switch camera for sharing
   * @param cameraId camera id
   * @returns executed promise.
   * @category Screen Share
   */
  function switchSharingSecondaryCamera(cameraId: string): ExecutedResult;
  /**
   * Whether the host locked the share
   * @returns is screen share locked
   * @category Screen Share
   */
  function isShareLocked(): boolean;
  /**
   * Get the user id of received shared content
   * @returns active shared user id
   * @category Screen Share
   */
  function getActiveShareUserId(): number;
  /**
   * Get the status of share
   * @returns share status
   * @category Screen Share
   */
  function getShareStatus(): ShareStatus;
}

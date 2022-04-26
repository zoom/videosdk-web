import { DialoutState, ExecutedResult } from './common';

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
interface CaptureVideoOption {
  /**
   * Id of the camera for capturing the video, if not specified, use system default
   */
  cameraId?: string;
  /**
   * Customized width of capture, 640 as default
   */
  captureWidth?: number;
  /**
   * Customized height of capture, 360 as
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
}

export declare enum VideoQuality {
  Video_90P = 0,
  Video_180P = 1,
  Video_360P = 2,
  Video_720P = 3,
}
interface UnderlyingColor {
  R: number;
  G: number;
  B: number;
  A: number;
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
   */
  function startAudio(options?: AudioOption): ExecutedResult;

  /**
   * Leave the computer audio
   */
  function stopAudio(): ExecutedResult;

  /**
   * Mute audio
   * - If userId is not specified, this will mute muself.
   * - Only the **host** or **manager** can mute others.
   * - If an attendee is allowed to talk, the host can also mute him/her.
   * @param userId Default `undefined`
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
   * client.on('unmute-audio-consent',(payload)=>{
   *  console.log('Host ask me to unmute');
   * })
   * ```
   * @param userId Default `undefined`
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
   */
  function hangup(): ExecutedResult;

  /**
   * Whether the user is muted.
   * - If not specified the user id, get the muted of current user.
   * @param userId Default `undefined`
   * @return boolean
   */
  function isAudioMuted(userId?: number): boolean;

  /**
   * Get the available microphones.
   */
  function getMicList(): Array<MediaDevice>;
  /**
   * Get the available speakers.
   */
  function getSpeakerList(): Array<MediaDevice>;

  /**
   * Get the active device id of microphone.
   * @returns device id
   */
  function getActiveMicrophone(): string;
  /**
   * Get the active device of speaker.
   * @returns device id
   */
  function getActiveSpeaker(): string;

  /**
   * Switch the microphone
   *
   * ```javascript
   *  const microphones = stream.getMicList();
   *  const microphone = // choose another microphone
   *  await switchMicrophone(microphone.deviceId);
   * ```
   * @param microphoneId the device id of microphone
   *
   */
  function switchMicrophone(microphoneId: string): ExecutedResult;
  /**
   * Switch the speaker
   *
   * @param speakerId the device id of speaker
   *
   */
  function switchSpeaker(speakerId: string): ExecutedResult;
  /**
   * Is support phone call feature
   */
  function isSupportPhoneFeature(): boolean;
  /**
   * Get supported countries
   */
  function getSupportCountryInfo(): Array<PhoneCallCountry>;
  /**
   * Get phone call status
   */
  function getInviteByPhoneStatus(): DialoutState;

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
   */
  function switchCamera(cameraDeviceId: string): ExecutedResult;

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
   *  * @returns
   * - `''`: Success.
   * - `Error`: Failure. Details in {@link ErrorTypes}.
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
   */
  function clearVideoCanvas(
    canvas: HTMLCanvasElement,
    underlyingColor?: UnderlyingColor | string,
  ): ExecutedResult;

  /**
   * Mirror current video
   * @param mirrored
   * - `''`: Success.
   * - `Error`: Failure. Details in {@link ErrorTypes}.
   */
  function mirrorVideo(mirrored: boolean): ExecutedResult;
  /**
   * Try to enable hardware acceleration
   *
   * @param enable boolean or specific encode or decode
   *
   * @returns Promise<boolean> true: success, false: fail
   */
  function enableHardwareAcceleration(
    enable: boolean | { encode?: boolean; decode?: boolean },
  ): Promise<boolean>;
  /**
   *
   * Get the isCapturingVideo flag status.
   *
   *
   * @returns
   * - `true`: The stream object is capturing video.
   * - `false`: The stream object is not capturing video.
   */
  function isCapturingVideo(): boolean;

  /**
   *
   * Get the isCameraTaken flag status.
   *
   * @returns
   * - `true`: The camera is taken by other program.
   * - `false`: The camera is taken by other program.
   */
  function isCameraTaken(): boolean;

  /**
   * Get the isCaptureForbidden flag status.
   *
   *
   *
   * @returns
   * - `true`: The capture is forbidden by user.
   * - `false`: The capture is not forbidden by user or the video flag is `false` in media constraints.
   */
  function isCaptureForbidden(): boolean;

  /**
   * Get the current camera devices list.
   *
   * **Note**
   * - This camera device list is collected from browser's navigator.mediaDevices object and maintained by the stream object.
   * - If the user does not allow permission to access the camera, this list will have a default CameraDevice object with all properties set to empty string.
   *
   *
   * @returns
   * - `[]`: The video flag is `false` in media constraints.
   * - `Array<CameraDevice>`: A CameraDevice interface has following property:
   *   - `label: string`: The label of camera device.
   *   - `deviceId: string`: The string of camera device.
   */
  function getCameraList(): Array<MediaDevice>;

  /**
   * Get the recently active camera devices id.
   *
   *
   * @returns
   * - `''`: The video flag is `false` in media constraints.
   * - `'default'`: No camera device id is passed to `startVideo` and it will use system default camera.
   * - `string`: Recently active camera devices id.
   */
  function getActiveCamera(): string;

  /**
   *
   * Get the active video id.
   *
   * @returns
   * - `number`: Id of current active video.
   */
  function getActiveVideoId(): number;
  /**
   *
   * Get the max quality of video.
   *
   */
  function getVideoMaxQuality(): number;

  /**
   * Get the dimension of received video.
   */
  function getReceivedVideoDimension(): { height: number; width: number };

  /**
   * Whether the browser is support render multiple videos simultaneously
   */
  function isSupportMultipleVideos(): boolean;
  /**
   * Whether video sdk supports HD video
   */
  function isSupportHDVideo(): boolean;
  /**
   * Render the received screen share content.
   * - It is usually called in the `active-share-change` callback.
   *
   * ```javascript
   * client.on('active-share-change',payload=>{
   *  if(payload.state==='Active'){
   *   stream.startShareView(payload.activeUserId,canvas);
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
   */
  function startShareView(
    canvas: HTMLCanvasElement,
    activeUserId: number,
  ): ExecutedResult;
  /**
   * Stop render received screen share content.
   * @returns executed promise.
   */
  function stopShareView(): ExecutedResult;
  /**
   * Start screen share.
   * - Check the share privilege before start screen share.
   * - If you start screen share, you will stop reveived others shared content.
   * - Legacy Chrome browser need to install chrome extension before start screen share, check the promise return value.
   * @param canvas Required. The canvas which renders the screen share content.
   *
   * @returns executed promise.
   * - {type:'INVALID_OPERATION', reason:'required extension', extensionUrl:'url'} : Installed the extension before start share
   */
  function startShareScreen(canvas: HTMLCanvasElement): ExecutedResult;
  /**
   * Pause screen share
   *
   */
  function pauseShareScreen(): ExecutedResult;

  /**
   * Resume screen share
   *
   */
  function resumeShareScreen(): ExecutedResult;
  /**
   * Stop screen share
   *
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
   *
   */
  function lockShare(isLocked: boolean): ExecutedResult;
  /**
   * Set the dimension of canvas which rendering the received sharing content.
   *
   * @param width width of canvas
   * @param height height of canvas
   */
  function updateSharingCanvasDimension(
    width: number,
    height: number,
  ): ExecutedResult;
  /**
   * Whether the host locked the share
   */
  function isShareLocked(): boolean;
  /**
   * Get the user id of received shared content
   */
  function getActiveShareUserId(): number;
}

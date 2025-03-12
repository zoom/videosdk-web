/**
 * Definition of exception code
 */
export enum ExceptionCode {
  /**
   * Operation timeout
   * > This type of error is caused by a Zoom service issue. If you encounter this error, please report it to Zoom.
   * @category Common
   */
  OPERATION_TIMEOUT = 1,
  /**
   * Internal error
   * > This type of error is caused by a Zoom service issue. If you encounter this error, please report it to Zoom.
   * @category Common
   */
  INTERNAL_ERROR = 2,
  /**
   * Session creation or retrieval error—this is usually caused by an incorrect field value in the JWT token.
   * - connection error
   * - The token has expired, is over 2 days old, or is ineffective
   * - Password max of 10 characters
   * - This account does not exist or does not belong to you
   * - Verify JWT failed
   * - invalid session key
   *
   * @category Session
   */
  SESSION_FETCH_INFO_ERROR = 200,
  /**
   * @ignore
   * User already in another session
   * > MSDK only
   *
   * @category Session
   */
  SESSION_IN_ANOTHER_SESSION = 3000,
  /**
   * The session passcode is incorrect.
   *
   * @category Session
   */
  SESSION_INCORRECT_PASSCODE = 3004,
  /**
   * @ignore
   * The session has not been not started
   * > MSDK only
   *
   * @category Session
   */
  SESSION_NOT_STARTED = 3008,
  /**
   * The user was removed by the session host and is prevented from rejoining the same session.
   *
   * @category Session
   */
  SESSION_USER_REMOVED = 3009,
  /**
   * The role type in jwt token is incorrect.
   *
   * @category Session
   */
  SESSION_ROLE_TYPE_ERROR = 3010,
  /**
   * @ignore
   * The webinar user has been blocked.
   * > MSDK only
   *
   * @category Session
   */
  SESSION_WEBINAR_USER_REMOVED = 3620,
  /**
   *  Incorrect parameters for connecting to the Zoom server. If you encounter this issue, please report it to Zoom.
   *
   * @category Session
   */
  SESSION_INVALID_PARAMETER = 4003,
  /**
   * The session has been ended.
   *
   * @category Session
   */
  SESSION_ENDED = 4004,
  /**
   * The number of users in the session exceeds the capacity.
   *
   * @category Session
   */
  SESSION_EXCEED_CAPACITY = 4005,
  /**
   * @ignore
   * he session is locked by the session host.
   * > MSDK only
   *
   * @category Session
   */
  SESSION_LOCKED = 4006,
  /**
   * @ignore
   * The session is blocked by the IB.
   * > MSDK only
   *
   * @category Session
   */
  SESSION_IB_BLOCKED = 4007,
  /**
   * @ignore
   * The user is already in the session.
   * > MSDK only
   *
   * @category Session
   */
  SESSION_PARTICIPANT_EXIST = 4008,
  /**
   * Occur in the `client.init` method because the platform does not meet the basic WebRTC requirements.
   *
   * @category Client
   */
  CLIENT_PLATFORM_UNSUPPORTED = 5000,
  /**
   * Occur in the `client.init` method, due to the inability to access self-deployed dependent assets
   * @category Client
   */
  CLIENT_DEPENDENT_ASSETS_INACCESSIBLE = 5001,
  /**
   * Called a function that requires the user to be in a session, but the session is closed.
   * @category Client
   */
  CLIENT_SESSION_STATE_CLOSED = 5002,
  /**
   * Called a function that requires the user to be in a session, but the session is reconnecting.
   * @category Client
   */
  CLIENT_SESSION_STATE_RECONNECTING = 5003,
  /**
   * @ignore
   * Session state is on hold
   * > MSDK only
   *
   * @category Client
   */
  CLIENT_SESSION_STATE_ON_HOLD = 5004,
  /**
   * @ignore
   * Session state is not a webinar
   * > MSDK only
   *
   * @category Client
   */
  CLIENT_SESSION_NOT_WEBINAR = 5005,
  /**
   * Operation requires host or manager permission
   * @category Client
   */
  CLIENT_HOST_OR_MANAGER_PERMISSION_REQUIRED = 5006,
  /**
   * Operation requires host permission.
   * @category Client
   */
  CLIENT_HOST_PERMISSION_REQUIRED = 5007,
  /**
   * Operation requires origin host or manager permission.
   * @category Client
   */
  CLIENT_ORIGIN_HOST_PERMISSION_REQUIRED = 5008,
  /**
   * @ignore
   * Operation only applies for webinar attendees.
   * > MSDK only
   *
   * @category Client
   */
  CLIENT_ATTENDEE_APPLICABLE_ONLY = 5009,
  /**
   * @ignore
   * Operation only applies for webinar participants
   * > MSDK only
   *
   * @category Client
   */
  CLIENT_PARTICIPANT_APPLICABLE_ONLY = 5010,
  /**
   * User ID doesn't match
   * @category Client
   */
  CLIENT_MISMATCH_USER = 5011,
  /**
   * Occurs in `client.join` method due to a duplicate call while the user is already in a session.
   * @category Client
   */
  CLIENT_DUPLICATED_JOIN = 5012,
  /**
   * Occurs in `client.join` method due to the parameter is incorrect.
   * - invalid  signature
   * - Topic, token and userName must be string and required
   * - The maximum length of topic is 200
   * - The maximum length of username is 200
   * - The maximum length of password is 10
   *
   * @category Client
   */
  CLIENT_INVALID_JOIN_PARAMETER = 5013,
  /**
   * Occurs in `client.changeName` method due to the host disallowing users from changing their names themselves.
   * @category Client
   */
  CLIENT_HOST_DISALLOW_RENAME = 5014,
  /**
   * The device ID (microphone, audio speaker, camera) does not match any device in the list.
   * @category Common stream
   */
  STREAM_MISMATCH_DEVICE = 6000,
  /**
   * User ID doesn't match
   * @category Common stream
   */
  STREAM_MISMATCH_USER = 6001,
  /**
   * Occurs when a method is called before the `client.join` method has resolved.
   * @category Common stream
   */
  STREAM_SESSION_JOIN_REQUIRED = 6002,
  /**
   * Occurs in video or sharing-related functions when the target element does not match the required render element type.
   * @category Common stream
   */
  STREAM_MISMATCH_RENDER_ELEMENT = 6003,
  /**
   * Occurs in `stream.startAudio` method, the sub reason as follows:
   * - 1- Permission denied by user
   * - 2- Permission denied by system
   * - 3- Device in use
   * - 4- No device found
   * - 5- Unknown reason
   * - 6- Constraint violation
   * - 7- Permission dismissed by user
   *
   * @category Audio
   */
  AUDIO_CAPTURE_FAILED = 6010,
  /**
   * Occurs in `stream.startAudio` or `stream.stopAudio` method, the audio capture is in loading
   * @category Audio
   */
  AUDIO_CAPTURE_LOADING = 6011,
  /**
   * Occurs in `stream.startAudio` method, the audio is already connected by a PSTN call.
   * @category Audio
   */
  AUDIO_IN_PSTN = 6012,
  /**
   * Occurs in stream.startAudio method, only occurs on legacy Safari browser, the audio decoding/encoding is required.
   * > Legacy Safari Only
   *
   * @category Audio
   */
  AUDIO_ENCODING_REQUIRED = 6013,
  /**
   * Occurs in `stream.stopAudio` method, only occurs on legacy Chrome browsers when sharing tab audio or system audio.
   * > Legacy Chrome Only
   *
   * @category Audio
   */
  AUDIO_SHARE_AUDIO_CONFLICT = 6014,
  /**
   * Occurs in the `stream.mute/unmuteAudio` or `stream.mute/unmuteShareAudio` methods when audio or shared audio has not been started.
   * @category Audio
   */
  AUDIO_NOT_STARTED = 6015,
  /**
   * @ignore
   * Occurs in `stream.unmuteAudio` method due to webinar attendees are not allowed to unmute themselves.
   * > MSDK only
   *
   * @category Audio
   */
  AUDIO_ATTENDEE_NOT_ALLOWED = 6016,
  /**
   * Occurs in `stream.startSecondaryAudio` method due to the platform being unsupported.
   * @category Audio
   */
  SECONDARY_AUDIO_UNSUPPORTED = 6017,
  /**
   * Occurs in `stream.startSecondaryAudio` method due to the microphone ID being used for session audio.
   * @category Audio
   */
  SECONDARY_AUDIO_DEVICE_CONFLICT = 6018,
  /**
   * Occurs in `stream.startSecondaryAudio` method due to screen sharing being in progress.
   * @category Audio
   */
  SECONDARY_AUDIO_SCREEN_SHARING_CONFLICT = 6019,
  /**
   * Occurs in `stream.stopSecondaryAudio` method, due to the secondary audio not being started.
   * @category Audio
   */
  SECONDARY_AUDIO_NOT_STARTED = 6020,
  /**
   * Occurs in `stream.inviteByPhone` method due to the country code does not match any code in the list.
   * @category PSTN
   */
  PSTN_MISMATCH_COUNTRY_CODE = 6021,
  /**
   * Occurs in `stream.hangup` method due to the PSTN being not being connected.
   *  @category PSTN
   */
  PSTN_NOT_CONNECTED = 6022,
  /**
   * Occurs in `stream.cancelCallCRCDevice` method due to the CRC device not being connected.
   *  @category CRC
   */
  CRC_NOT_CONNECTED = 6023,
  /**
   * @ignore
   * Occurs in `stream.allowAttendeeToTalk` method due to the target user being unsupported.
   * > MSDK only
   *
   *  @category Audio
   */
  AUDIO_ALLOW_TALK_UNSUPPORTED = 6024,
  /**
   * @ignore
   * Occurs in `stream.allowAttendeeToTalk` method due to the user mismatch.
   * > MSDK only
   *
   *  @category Audio
   */
  AUDIO_ALLOW_TALK_MISMATCH_USER = 6025,
  /**
   * Occurs in `stream.startVideo` method due to the user denied camera permission.
   * @category Video
   */
  VIDEO_CAMERA_PERMISSION_DENIED = 6100,
  /**
   * Occurs in `stream.startVideo` method due to no camera.
   * @category Video
   */
  VIDEO_NO_CAMERA = 6101,
  /**
   * Occurs in `stream.startVideo` method due to the camera does not match the device list.
   * @category Video
   */
  VIDEO_MISMATCH_CAMERA = 6102,
  /**
   * Occurs in `stream.startVideo` method due to the camera is taken by another program.
   * @category Video
   */
  VIDEO_CAMERA_TAKEN = 6103,
  /**
   * Occurs in `stream.startVideo` method due to the virtual background initialization error.
   * @category Video
   */
  VIDEO_VB_INITIALIZE_ERROR = 6104,
  /**
   * Occurs in `stream.startVideo` or `stream.stopVideo` method due to the video capture is in loading.
   * @category Video
   */
  VIDEO_CAPTURE_LOADING = 6105,
  /**
   * @ignore
   * Occurs in `stream.startVideo` method due to the video being muted by the host.
   * > MSDK only
   *
   * @category Video
   */
  VIDEO_MUTED_BY_HOST = 6106,
  /**
   * Occurs in `stream.startVideo` method due to the virtual background is not supported on the platform.
   * @category Video
   */
  VIDEO_VB_UNSUPPORTED = 6107,
  /**
   * Occurs in `stream.startVideo` method due to the virtual processor is in progress.
   * @category Video
   */
  VIDEO_VB_PROCESSOR_CONFLICT = 6108,
  /**
   * Occurs in `stream.startVideo` or `stream.stopVideo` method due to the video state is not matched.
   * @category Video
   */
  VIDEO_MISMATCH_STATE = 6109,
  /**
   * Occurs in `stream.startVideo` method due to the video stream establish error.
   * @category Video
   */
  VIDEO_ESTABLISH_STREAM_ERROR = 6110,
  /**
   * Occurs in `stream.renderVideo` or `stream.attachVideo` method due to number of rendered video exceed the limit.
   * @category Video
   */
  VIDEO_RENDER_LIMIT_EXCEED = 6111,
  /**
   * Occurs in `stream.renderVideo`  method due to the method is not applicable for WebRTC video.
   * @category Video
   */
  VIDEO_METHOD_DEPRECATED = 6112,
  /**
   * Occurs in `stream.previewVirtualBackgroundmethod` due to the virtual background image is inaccessible.
   * @category Video
   */
  VIDEO_VB_IMAGE_INACCESSIBLE = 6113,
  /**
   * Occurs in `stream.previewVirtualBackground` method due to the virtual background state is not matched.
   * @category Video
   */
  VIDEO_VB_MISMATCH_STATE = 6114,
  /**
   * Occurs in `stream.previewMask` due to the mask image is inaccessible.
   * @category Video
   */
  VIDEO_MASK_IMAGE_INACCESSIBLE = 6115,
  /**
   * Occurs in `stream.previewMask` method due to the virtual processor is in progress.
   * @category Video
   */
  VIDEO_MASK_PROCESSOR_CONFLICT = 6116,
  /**
   * Occurs in `stream.spotlightVideo` method due to video not been started or been spotlighted.
   * @category Video
   */
  VIDEO_SPOTLIGHT_MISMATCH_STATE = 6117,
  /**
   * Occurs in `stream.removeSpotlightedVideo` method due to multiple spotlighted videos cannot be removed.
   * @category Video
   */
  VIDEO_SPOTLIGHT_MULTI_CONFLICT = 6118,
  /**
   * Occurs in `stream.createProcessor` method due to video processor being unsupported on the platform.
   * @category Video processor
   */
  VIDEO_PROCESSOR_UNSUPPORTED = 6119,
  /**
   * Occurs in `stream.addProcessor` method due to adding more than 1 video processor at the same time.
   * @category Video processor
   */
  VIDEO_PROCESSOR_LIMIT_EXCEED = 6120,
  /**
   * Occurs in `stream.createProcessor` method due to a duplicate video processor creation.
   * @category Video processor
   */
  VIDEO_PROCESSOR_DUPLICATE_CREATE = 6121,
  /**
   * Occurs in `stream.addProcessor` method because unable to find the target processor.
   * @category Video processor
   */
  VIDEO_PROCESSOR_MISMATCH_PROCESSOR = 6122,
  /**
   * Occurs in `stream.controlCamera` or `stream.controlFarEndCamera` or `stream.requestFarEndCameraControl` methods due to camera control being unsupported on the platform.
   * @category Camera control
   */
  FAR_END_CAMERA_CONTROL_DEVICE_UNSUPPORTED = 6150,
  /**
   * Occurs in `stream.requestFarEndCameraControl` or `stream.approveFarEndCameraControl` or `stream.declineFarEndCameraControl` or `stream.giveUpFarEndCameraControl` or `stream.controlCamera` methods due to the camera control is mismatch.
   * @category Camera control
   */
  FAR_END_CAMERA_CONTROL_MISMATCH_STATE = 6151,
  /**
   * Occurs in `stream.controlFarEndCamera` method because the camera control permission is not granted.
   * @category Camera control
   */
  FAR_END_CAMERA_PERMISSION_REQUIRED = 6152,
  /**
   * Occurs in `stream.controlFarEndCamera` method because the range is invalid.
   * @category Camera control
   */
  FAR_END_CAMERA_INVALID_RANGE = 6153,
  /**
   * Occurs in `stream.controlFarEndCamera` method because the method call rate has exceeded the limit.
   * @category Camera control
   */
  FAR_END_CAMERA_RATE_LIMIT = 6154,
  /**
   * Occurs in `stream.startShareScreen` method because the user denied the screen share.
   * @category Screen share
   */
  SCREEN_SHARE_USER_DENIED = 6200,
  /**
   * Occurs in `stream.startShareScreen` method because the permission in the system setting is not allowed.
   * @category Screen share
   */
  SCREEN_SHARE_SYSTEM_DENIED = 6201,
  /**
   * Occurs in `stream.startShareScreen` method because the platform does not support getDisplayMedia method.
   * @category Screen share
   */
  SCREEN_SHARE_UNSUPPORTED = 6202,
  /**
   * Occurs in `stream.startShareScreen` method because the user attempted to share their screen to subsessions while already in a subsession.
   * @category Screen share
   */
  SCREEN_SHARE_SUBSESSION_CONFLICT = 6203,
  /**
   * Occurs in `stream.startShareScreen` method because only the host has the share privilege
   * @category Screen share
   */
  SCREEN_SHARE_HOST_PRIVILEGE_REQUIRED = 6204,
  /**
   * Occurs in `stream.startShareScreen` or `stream.shareToBreakoutRoom` or `stream.enableOptimizeForSharedVideo` or `stream.muteOthersScreenShare` methods because the screen share state does not match.
   * @category Screen share
   */
  SCREEN_SHARE_MISMATCH_STATE = 6205,
  /**
   * Occurs in `stream.startShareScreen` or `stream.enableOptimizeForSharedVideo` methods because the platform does not support the video share.
   * @category Screen share
   */
  SCREEN_SHARE_OPTIMIZE_VIDEO_UNSUPPORTED = 6206,
  /**
   * Occurs in `stream.enableOptimizeForSharedVideo` method because multiple screen sharing is being enabled.
   * @category Screen share
   */
  SCREEN_SHARE_OPTIMIZE_VIDEO_CONFLICT = 6207,
  /**
   * Occurs in `stream.setScreenSharePrivilege` method because privilege is invalid.
   * @category Screen share
   */
  SCREEN_SHARE_INVALID_PRIVILEGE = 6208,
  /**
   * @ignore
   * Occurs in `stream.startShareScreen` method because the information barrier policy in the account.
   * > MSDK only
   *
   * @category Screen share
   */
  SCREEN_SHARE_IB_DENIED = 6209,
  /**
   * Remote control exception
   */
  /**
   * @ignore
   * Occurs in `stream.requestRemoteControl` method because the function is not enabled in the account setting.
   * > ZCC only
   *
   * @category Remote control
   */
  REMOTE_CONTROL_ACCOUNT_DISABLE = 6300,
  /**
   * @ignore
   * Occurs in `stream.requestRemoteControl` or `stream.grabRemoteControl` or `stream.approveRemoteControl` methods because the remote control state does not match.
   * > ZCC only
   *
   * @category Remote control
   */
  REMOTE_CONTROL_MISMATCH_STATE = 6301,
  /**
   * @ignore
   * Occurs in `stream.startRemoteControl` method because the permission has not been granted.
   * > ZCC only
   *
   * @category Remote control
   */
  REMOTE_CONTROL_PERMISSION_REQUIRED = 6302,
  /**
   * @ignore
   * Occurs in `stream.approveRemoteControl` method because the shared display surface is not the entire screen.
   * > ZCC only
   *
   * @category Remote control
   */
  REMOTE_CONTROL_MISMATCH_DISPLAY_SURFACE = 6303,
  /**
   * @ignore
   * Occurs in `stream.launchRemoteControlApp` method because the launch URL scheme is invalid.
   * > ZCC only
   *
   * @category Remote control
   */
  REMOTE_CONTROL_INVALID_LAUNCH_SCHEME = 6304,
  /**
   * Occurs in `chat.send` method because the message is empty.
   * @category Chat
   */
  CHAT_EMPTY_MESSAGE = 7000,
  /**
   * Occurs in `chat.send` method because the user does not match.
   * @category Chat
   */
  CHAT_MISMATCH_USER = 7001,
  /**
   * Occurs in `chat.send` method because the privilege is not allowed.
   * @category Chat
   */
  CHAT_INSUFFICIENT_PRIVILEGE = 7002,
  /**
   * Occurs in `chat.setPrivilege` method because only the host or manager can set the privilege.
   * @category Chat
   */
  CHAT_INVALID_PRIVILEGE = 7003,
  /**
   * Occurs in `chat.setPrivilege` or `chat.sendFile` methods because the user is in a subsession.
   * @category Chat
   */
  CHAT_SUBSESSION_CONFLICT = 7004,
  /**
   * Occurs in `chat.sendFile` method because the file is empty.
   * @category Chat
   */
  CHAT_EMPTY_FILE = 7005,
  /**
   * Occurs in `chat.sendFile` method because the retry token is invalid.
   * @category Chat
   */
  CHAT_INVALID_RETRY_TOKEN = 7006,
  /**
   * Occurs in `chat.sendFile` method because the file is not in the allowed file type. Refer to the account setting update the allowed file types.
   * @category Chat
   */
  CHAT_MISMATCH_FILE_TYPE = 7007,
  /**
   * Occurs in `chat.sendFile` method because the file size exceed the max size. Refer to the account setting update the file size limit.
   * @category Chat
   */
  CHAT_EXCEED_FILE_SIZE = 7008,
  /**
   * Occurs in `chat.downloadFile` method because the message ID or file URL is invalid.
   * @category Chat
   */
  CHAT_INVALID_MSG_ID_OR_URL = 7009,
  /**
   * Occurs in `chat.sendFile` method because the file transfer function is disabled in the account.
   * @category Chat
   */
  CHAT_FILE_ACCOUNT_DISABLE = 7010,
  /**
   * Occurs in `chat.deleteMessage` method because the delete chat message is disabled in the account.
   * @category Chat
   */
  CHAT_DELETE_ACCOUNT_DISABLE = 7011,
  /**
   * Occurs in `cmd.send` method because the message is empty.
   * @category Command channel
   */
  CMD_EMPTY_MESSAGE = 7100,
  /**
   * Occurs in `cmd.send` method because the user does not match.
   * @category Command channel
   */
  CMD_MISMATCH_USER = 7101,
  /**
   * Occurs in `cmd.send` method because the message type is not a string.
   * @category Command channel
   */
  CMD_INVALID_MESSAGE_TYPE = 7102,
  /**
   * Occurs in `cmd.send` method because the message length exceed the max length(512 bytes).
   * @category Command channel
   */
  CMD_EXCEED_MESSAGE_LENGTH = 7103,
  /**
   * Occurs in `cmd.send` method because the channel is not ready.
   * @category Command channel
   */
  CMD_CHANNEL_NOT_READY = 7104,
  /**
   * Occurs in `recording.startCloudRecording` method because the cloud recording is not enabled in the account setting.
   * @category Recording
   */
  RECORDING_ACCOUNT_DISABLE = 7200,
  /**
   * Occurs in `recording.startCloudRecording` method because pausing/stopping  cloud recording is forbidden in the account setting.
   * @category Recording
   */
  RECORDING_STOP_FORBIDDEN = 7201,
  /**
   * Occurs in `recording.startCloudRecording` method because the recording state does not match.
   * @category Recording
   */
  RECORDING_MISMATCH_STATE = 7202,
  /**
   * Occurs in `recording.acceptIndividualRecording` method because the individual recording is not enabled.
   * @category Recording
   */
  RECORDING_ISO_DISABLE = 7203,
  /**
   * @ignore
   * Occurs in `recording.enableRecordingWithIQ` method because the account does not support Zoom IQ.
   * > ZCC only
   *
   * @category Recording
   */
  RECORDING_IQ_DISABLE = 7204,
  /**
   * @ignore
   * Occurs in `recording.enableRecordingWithIQ` method because only the host has the permission.
   * > ZCC only
   *
   * @category Recording
   */
  RECORDING_IQ_PERMISSION_REQUIRED = 7205,
  /**
   * @ignore
   * Occurs in `recording.enableRecordingWithIQ` method because the state does not match.
   * > ZCC only
   *
   * @category Recording
   */
  RECORDING_IQ_MISMATCH_STATE = 7206,
  /**
   * @ignore
   * Occurs in `recording.askLocalRecordingPermission` method because the local recording is not enabled
   * > MSDK only
   *
   * @category Recording
   */
  LOCAL_RECORDING_ACCOUNT_DISABLE = 7207,
  /**
   * @ignore
   * Occurs in `recording.startLocalRecording` method because the permission value is invalid.
   * > MSDK only
   *
   * @category Recording
   */
  LOCAL_RECORDING_INVALID_VALUE = 7208,
  /**
   * @ignore
   * Occurs in `recording.startLocalRecording`  or `recording.grantLocalRecordingPermission` methods because the state does not match.
   * > MSDK only
   *
   * @category Recording
   */
  LOCAL_RECORDING_MISMATCH_STATE = 7209,
  /**
   * Occurs in `liveTranscription.startLiveTranscription` method because the feature is disabled in the account.
   * @category Transcription
   */
  TRANSCRIPTION_ACCOUNT_DISABLE = 7300,
  /**
   * Occurs in `liveTranscription.startLiveTranscription` method because the feature is disabled by the session host.
   * @category Transcription
   */
  TRANSCRIPTION_FEATURE_DISABLE = 7301,
  /**
   * Occurs in `liveTranscription.setSpeakingLanguage` method because the language is not supported.
   * @category Transcription
   */
  TRANSCRIPTION_LANGUAGE_UNSUPPORTED = 7302,
  /**
   * Occurs in `liveTranscription.setSpeakingLanguage` or `liveTranscription.setTranslationLanguage` methods because the transcription has not been supported.
   * @category Transcription
   */
  TRANSCRIPTION_MISMATCH_STATE = 7303,
  /**
   * Occurs in `liveTranscription.setTranslationLanguage`  method because the feature is disabled in the account.
   * @category Transcription
   */
  TRANSLATION_ACCOUNT_DISABLE = 7304,
  /**
   * Occurs in `liveTranscription.setTranslationLanguage` method because the translation language is not supported.
   * @category Transcription
   */
  TRANSLATION_LANGUAGE_UNSUPPORTED = 7305,
  /**
   * @ignore
   * Occurs in `liveTranscription.enableManualCaptioner` method because the manual caption is disabled in the account.
   * > MSDK only
   *
   * @category Transcription
   */
  MANUAL_CAPTION_ACCOUNT_DISABLE = 7306,
  /**
   * @ignore
   * Occurs in `liveTranscription.enableManualCaptioner` method because the manual caption is disabled by the host.
   * > MSDK only
   *
   * @category Transcription
   */
  MANUAL_CAPTION_FEATURE_DISABLE = 7307,
  /**
   * @ignore
   * Occurs in `liveTranscription.assignManualCaption` method because the user is not matched.
   * > MSDK only
   *
   * @category Transcription
   */
  MANUAL_CAPTION_MISMATCH_USER = 7308,
  /**
   * @ignore
   * Occurs in `liveTranscription.sendCaptionTextManually` method because the user does not have the privilege.
   * > MSDK only
   *
   * @category Transcription
   */
  MANUAL_CAPTION_INSUFFICIENT_PRIVILEGE = 7309,

  /**
   * Occurs in `liveStream.startLiveStream` method because the live stream is disabled in the account.
   *
   * @category Live streaming
   */
  LIVE_STREAM_ACCOUNT_DISABLE = 7400,
  /**
   * Occurs in `liveStream.startLiveStream` method because the parameter is invalid.
   * @category Live streaming
   */
  LIVE_STREAM_INVALID_PARAMETER = 7401,
  /**
   * Occurs in `liveStream.startLiveStream` method because the live stream is in progress.
   * @category Live streaming
   */
  LIVE_STREAM_MISMATCH_STATE = 7402,
  /**
   * Occurs in `subsession.createSubsessions` method because the subsession function is disabled in the account.
   * @category Subsession
   */
  SUBSESSION_ACCOUNT_DISABLE = 7500,
  /**
   * Occurs in `subsession.createSubsessions` method because the number of created subsessions has exceeded the maximum limit(100).
   * @category Subsession
   */
  SUBSESSION_EXCEED_CAPACITY = 7501,
  /**
   * Occurs in `subsession.openSubsessions` or `subsession.joinSubsession` or `subsession.assignUserToSubsession` or `subsession.moveUserToSubsession` methods because the subsession ID is incorrect.
   * @category Subsession
   */
  SUBSESSION_MISMATCH_ID = 7502,
  /**
   * Occurs in `subsession.openSubsessions` or `subsession.moveBackToMainSession` or `subsession.assignUserToSubsession` or `subsession.moveUserToSubsession` methods because the user ID is incorrect.
   * @category Subsession
   */
  SUBSESSION_MISMATCH_USER = 7503,
  /**
   * Occurs in `subsession.openSubsessions` or other methods because the subsession status is not correct.
   * @category Subsession
   */
  SUBSESSION_MISMATCH_STATE = 7504,
  /**
   * Occurs in `subsession.leaveSubsession` because the host restricts users from leaving the subsession.
   * @category Subsession
   */
  SUBSESSION_EXIT_RESTRICTED = 7505,
  /**
   * Occurs in `subsession.broadcast` because broadcast message function is disabled in the account.
   * @category Subsession
   */
  SUBSESSION_BROADCAST_DISABLE = 7506,
  /**
   *  Occurs in `subsession.broadcast` because the message is empty or an invalid string.
   * @category Subsession
   */
  SUBSESSION_BROADCAST_INVALID_CONTENT = 7507,
  /**
   * Occurs in `subsession.startBroadcastVoice` because broadcast voice is disabled in the account.
   * @category Subsession
   */
  SUBSESSION_BROADCAST_VOICE_DISABLE = 7508,
  /**
   * Occurs in `subsession.startBroadcastVoice` because the host cannot broadcast voice with in a subsession.
   * @category Subsession
   */
  SUBSESSION_BROADCAST_VOICE_RESTRICTED = 7509,
  /**
   * Occurs in `subsession.startBroadcastVoice` because the host cannot broadcast voice without an active audio connection during the session.
   * @category Subsession
   */
  SUBSESSION_BROADCAST_VOICE_MISMATCH_STATE = 7510,
  /**
   * @ignore
   * Occurs in `reaction.sendEmojiReactionRequest` method because  reaction is disabled in the account.
   * > MSDK only
   *
   * @category Reaction
   */
  REACTION_ACCOUNT_DISABLE = 7600,
  /**
   * @ignore
   * Occurs in `reaction.sendEmojiReactionRequest` method because  the parameter is incorrect.
   * > MSDK only
   *
   * @category Reaction
   */
  REACTION_INVALID_PARAMETER = 7601,
  /**
   * @ignore
   * Occurs in `summary.startSummary` or `summary.startMeetingQuery` methods because the feature is disabled in the account setting.
   * > ZCC only
   *
   * @category Summary
   */
  SUMMARY_ACCOUNT_DISABLE = 7700,
  /**
   * @ignore
   * Occurs in `qa.askQuestion` or `qa.answerQuestion` methods because the parameter is incorrect.
   * > MSDK only
   *
   * @category QA
   */
  QA_INVALID_PARAMETER = 7800,
  /**
   * @ignore
   * Occurs in `qa.commentQuestion` or `qa.upvoteQuestion` methods because the session host disable the function.
   * > MSDK only
   *
   * @category QA
   */
  QA_INSUFFICIENT_PRIVILEGE = 7801,
}

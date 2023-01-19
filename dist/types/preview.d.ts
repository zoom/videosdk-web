/**
 * Interface for test speaker options.
 */
interface TestSpeakerOption {
  /**
   * The speaker ID. If not specified, the SDK uses the default speaker.
   */
  speakerId?: string;
  /**
   * The sample audio file to play, usually an mp3 file. If not specified, the SDK uses the ring audio.
   */
  sampleAudioUrl?: string;
  /**
   * The average frequency of the stream, usually used to create audio visualization.
   */
  onAnalyseFrequency?: (averageFrequency: number) => void;
}
/**
 * Interface for the test speaker return.
 */
interface TestSpeakerReturn {
  /**
   * Stop the tester.
   */
  stop: () => void;
  /**
   *  Destroy the tester.
   */
  destroy: () => void;
}
/**
 * Interface for test microphone options.
 */
interface TestMicrophoneOption {
  /**
   * The microphone ID. If not specified, the SDK uses the default microphone.
   */
  microphoneId?: string;
  /**
   *  The speaker ID. The Speaker to play the recording.
   */
  speakerId?: string;
  /**
   * Whether the user needs to record and play an audio fragment to test the microphone.
   */
  recordAndPlay?: boolean;
  /**
   * The maximum seconds to record, the user needs to record. Default is 10 seconds.
   */
  maxRecordDuration?: number;
  /**
   * The average frequency of the stream, usually used to create audio visualization.
   */
  onAnalyseFrequency?: (averageFrequency: number) => void;
  /**
   * When to start recording.
   */
  onStartRecording?: () => void;
  /**
   * When to stop recording.
   */
  onStopRecording?: () => void;
  /**
   * When to start playing the recording.
   */
  onStartPlayRecording?: () => void;
  /**
   * When to stop playing the recording.
   */
  onStopPlayRecording?: () => void;
}
interface TestMicrophoneReturn {
  /**
   * Stop the tester.
   */
  stop: () => void;
  /**
   * Stop recording audio.
   */
  stopRecording: () => void;
  /**
   *  Destroy the tester.
   */
  destroy: () => void;
}
/**
 * Interface for starting or stopping local video capture.
 */
export interface LocalVideoTrack {
  /**
   * Starts local video capture and plays it back in a video DOM element.
   *
   * @param videoDOMElement Video DOM element that will contain the video playback.
   */
  start(videoDOMElement: HTMLVideoElement): Promise<void | Error>;
  /**
   * Stops local video capture.
   */
  stop(): Promise<void | Error>;
}
/**
 * Interface for managing local audio capture.
 */
export interface LocalAudioTrack {
  /**
   * Starts local audio capture with microphone muted.
   */
  start(): Promise<void | Error>;
  /**
   * Unmutes microphone if audio was started, and microphone is not already unmuted.
   */
  unmute(): Promise<void | Error>;
  /**
   * Mutes microphone if audio was started, and microphone is not already muted.
   */
  mute(): Promise<void | Error>;
  /**
   * Returns the current volume of the local input device.
   */
  getCurrentVolume(): number;
  /**
   * Stops local audio capture.
   */
  stop(): Promise<void | Error>;
  /**
   * Test the speaker, usually used to test the speaker before a meeting.
   * @param options The test speaker option.
   */
  testSpeaker(options?: TestSpeakerOption): TestSpeakerReturn | undefined;
  /**
     Test the microphone, usually used to test the microphone before a meeting. 
     * @param options the test microphone option.
     */
  testMicrophone(options?: TestMicrophoneOption): TestMicrophoneReturn | undefined;
}

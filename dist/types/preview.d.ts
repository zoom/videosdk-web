/**
 * Interface for testSpeaker options
 */
interface TestSpeakerOption {
  /**
   * The speaker id. If it is not specified, use the default speaker
   */
  speakerId?: string;
  /**
   * The sample audio file to play, usually it is a mp3 file. If it is not specified, use the ring audio
   */
  sampleAudioUrl?: string;
  /**
   * The average frequency of the stream, usually it is used to create audio visualization.
   */
  onAnalyseFrequency?: (averageFrequency: number) => void;
}
/**
 * Interface of the return of testSpeaker
 */
interface TestSpeakerReturn {
  /**
   * Stop the tester
   */
  stop: () => void;
  /**
   *  Destroy the tester
   */
  destroy: () => void;
}
/**
 * Interface for testMicrophone options
 */
interface TestMicrophoneOption {
  /**
   * The microphone id. If it is not specified, use the default microphone
   */
  microphoneId?: string;
  /**
   *  The speaker id. The Speaker to play the recording.
   */
  speakerId?: string;
  /**
   * Whether need to record and play an audio fragment to test the microphone.
   */
  recordAndPlay?: boolean;
  /**
   * The maxmum seconds if allowing to record. Default is 10 second
   */
  maxRecordDuration?: number;
  /**
   * The average frequency of the stream, usually it is used to create audio visualization.
   */
  onAnalyseFrequency?: (averageFrequency: number) => void;
  /**
   * The timing when start recording
   */
  onStartRecording?: () => void;
  /**
   * The timing when stop recording
   */
  onStopRecording?: () => void;
  /**
   * The timing when start playing the recording
   */
  onStartPlayRecording?: () => void;
  /**
   * The timing when stop playing the recording
   */
  onStopPlayRecording?: () => void;
}
interface TestMicrophoneReturn {
  /**
   * Stop the tester
   */
  stop: () => void;
  /**
   * Stop recording the audio
   */
  stopRecording: () => void;
  /**
   *  Destroy the tester
   */
  destroy: () => void;
}
/**
 * Interface for starting/stopping local video capture
 */
export interface LocalVideoTrack {
  /**
   * Starts local video capture and plays it back in a video DOM element
   *
   * @param videoDOMElement Video DOM element that will contain the video playback
   */
  start(videoDOMElement: HTMLVideoElement): Promise<void | Error>;
  /**
   * Stops local video capture
   */
  stop(): Promise<void | Error>;
}
/**
 * Interface for managing local audio capture
 */
export interface LocalAudioTrack {
  /**
   * Starts local audio capture with mic muted
   */
  start(): Promise<void | Error>;
  /**
   * Unmutes mic if audio was started, and mic is not already unmuted
   */
  unmute(): Promise<void | Error>;
  /**
   * Mutes mic if audio was started, and mic is not already muted
   */
  mute(): Promise<void | Error>;
  /**
   * Returns the current volume of the local input device
   */
  getCurrentVolume(): number;
  /**
   * Stops local audio capture
   */
  stop(): Promise<void | Error>;
  /**
   * Test the speaker, usually it is used to test the speaker before a meeting
   * @param options the option of tester
   */
  testSpeaker(options?: TestSpeakerOption): TestSpeakerReturn | undefined;
  /**
     Test the microphone, usually it is used to test the microphone before a meeting. 
     * @param options the option of tester
     */
  testMicrophone(options?: TestMicrophoneOption): TestMicrophoneReturn | undefined;
}

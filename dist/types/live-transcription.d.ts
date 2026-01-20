import { ExecutedResult } from './common';

/**
 * Source of the live transcription message.
 */
export enum LiveTranscriptionMessageSource {
  /**
   * Unspecified.
   */
  Unspecified = 0,
  /**
   * User-typed caption in the meeting.
   */
  InMeetingManual = 1,
  /**
   * Using the external captioner.
   */
  ExternalCaptioner = 2,
  /**
   * Automatic speech recognition.
   */
  ASR = 4,
}
/**
 * Language code of the live transcription.
 */
export enum LiveTranscriptionLanguageCode {
  /**
   * English
   */
  English = 0,
  /**
   * Chinese (Simplified)
   */
  'Chinese (Simplified)' = 1,
  /**
   * Japanese
   */
  Japanese = 2,
  /**
   * German
   */
  German = 3,
  /**
   * French
   */
  French = 4,
  /**
   * Russian
   */
  Russian = 5,
  /**
   * Portuguese
   */
  Portuguese = 6,
  /**
   * Spanish
   */
  Spanish = 7,
  /**
   * Korean
   */
  Korean = 8,
  /**
   * Italian
   */
  Italian = 9,
  /**
   * Reserved
   */
  Reserved = 10,
  /**
   * Vietnamese
   */
  Vietnamese = 11,
  /**
   * Dutch
   */
  Dutch = 12,
  /**
   * Ukrainian
   */
  Ukrainian = 13,
  /**
   * Arabic
   */
  Arabic = 14,
  /**
   * Bengali
   */
  Bengali = 15,
  /**
   * Chinese (Traditional)'
   */
  'Chinese (Traditional)' = 16,
  /**
   * Czech
   */
  Czech = 17,
  /**
   * Estonian
   */
  Estonian = 18,
  /**
   * Finnish
   */
  Finnish = 19,
  /**
   * Greek
   */
  Greek = 20,
  /**
   * Hebrew
   */
  Hebrew = 21,
  /**
   * Hindi
   */
  Hindi = 22,
  /**
   * Hungarian
   */
  Hungarian = 23,
  /**
   * Indonesian
   */
  Indonesian = 24,
  /**
   * Malay
   */
  Malay = 25,
  /**
   * Persian
   */
  Persian = 26,
  /**
   * Polish
   */
  Polish = 27,
  /**
   * Romanian
   */
  Romanian = 28,
  /**
   * Swedish
   */
  Swedish = 29,
  /**
   * Tamil
   */
  Tamil = 30,
  /**
   * Telugu
   */
  Telugu = 31,
  /**
   * Tagalog
   */
  Tagalog = 32,
  /**
   * Turkish
   */
  Turkish = 33,
  /**
   * French (Canada)
   */
  'French (Canada)' = 34,
  /**
   * Danish
   */
  Danish = 35,
  /**
   * Norwegian
   */
  Norwegian = 36,
  /**
   * Thai
   */
  Thai = 37,
  /**
   * Cantonese
   */
  Cantonese = 44,
  /**
   * Somali
   */
  Somali = 45,
  /**
   * Catalan
   */
  Catalan = 48,
  /**
   * Afrikaans
   */
  Afrikaans = 49,
  /**
   * Arabic (Gulf)
   */
  'Arabic (Gulf)' = 50,
  /**
   * Croatian
   */
  Croatian = 51,
  /**
   * Galician
   */
  Galician = 56,
  /**
   * German (Switzerland)
   */
  'German (Switzerland)' = 57,
  /**
   * Latvian
   */
  Latvian = 58,
  /**
   * Serbian
   */
  Serbian = 59,
  /**
   * Slovak
   */
  Slovak = 60,
  /**
   * Zulu
   */
  Zulu = 61,
  /**
   * No translation.
   */
  NoTranslation = 400,
  /**
   * Manual caption.
   */
  DefaultManualInput = 401,
}

/**
 * Live transcription language.
 */
export enum LiveTranscriptionLanguage {
  /**
   * English
   */
  English = 'en',
  /**
   * Chinese (Simplified)
   */
  'Chinese (Simplified)' = 'zh',
  /**
   * Japanese
   */
  Japanese = 'ja',
  /**
   * German
   */
  German = 'de',
  /**
   * French
   */
  French = 'fr',
  /**
   * Russian
   */
  Russian = 'ru',
  /**
   * Portuguese
   */
  Portuguese = 'pt',
  /**
   * Spanish
   */
  Spanish = 'es',
  /**
   * Korean
   */
  Korean = 'ko',
  /**
   * Italian
   */
  Italian = 'it',
  /**
   * Reserved
   */
  Reserved = 'en1',
  /**
   * Vietnamese
   */
  Vietnamese = 'vi',
  /**
   * Dutch
   */
  Dutch = 'nl',
  /**
   * Ukrainian
   */
  Ukrainian = 'uk',
  /**
   * Arabic
   */
  Arabic = 'ar',
  /**
   * Chinese (Traditional)
   */
  'Chinese (Traditional)' = 'zh-hant',
  /**
   * Czech
   */
  Czech = 'cs',
  /**
   * Estonian
   */
  Estonian = 'et',
  /**
   * Finnish
   */
  Finnish = 'fi',
  /**
   * Hebrew
   */
  Hebrew = 'he',
  /**
   * Hindi
   */
  Hindi = 'hi',
  /**
   * Hungarian
   */
  Hungarian = 'hu',
  /**
   * Indonesian
   */
  Indonesian = 'id',
  /**
   * Malay
   */
  Malay = 'ms',
  /**
   * Persian
   */
  Persian = 'fa',
  /**
   * Polish
   */
  Polish = 'pl',
  /**
   * Romanian
   */
  Romanian = 'ro',
  /**
   * Swedish
   */
  Swedish = 'sv',
  /**
   * Tamil
   */
  Tamil = 'ta',
  /**
   * Telugu
   */
  Telugu = 'te',
  /**
   * Tagalog
   */
  Tagalog = 'tl',
  /**
   * Turkish
   */
  Turkish = 'tr',
  /**
   * French (Canada)
   */
  'French (Canada)' = 'fr-ca',
  /**
   * Danish
   */
  Danish = 'da',
  /**
   * Thai
   */
  Thai = 'th',
  /**
   * Cantonese
   */
  Cantonese = 'zh-yue',
  /**
   * Catalan
   */
  Catalan = 'ca',
  /**
   * Bengali
   */
  Bengali = 'bn',
  /**
   * Greek
   */
  Greek = 'el',
  /**
   * Norwegian
   */
  Norwegian = 'no',
  /**
   * Somali
   */
  Somali = 'so',
  /**
   * Afrikaans
   */
  Afrikaans = 'af',
  /**
   * Arabic (Gulf)
   */
  'Arabic (Gulf)' = 'ar-gulf',
  /**
   * Croatian
   */
  Croatian = 'hr',
  /**
   * Galician
   */
  Galician = 'gl',
  /**
   * German (Switzerland)
   */
  'German (Switzerland)' = 'de-ch',
  /**
   * Latvian
   */
  Latvian = 'lv',
  /**
   * Serbian
   */
  Serbian = 'sr',
  /**
   * Slovak
   */
  Slovak = 'sk',
  /**
   * Zulu
   */
  Zulu = 'zu',
}
/**
 * Specifies the transcription mode.
 */
export enum TranscriptionMode {
  /**
   * Individual mode — each user sets their own transcription language.
   */
  Individual = 'individual',
  /**
   * Session mode — the transcription language is set for the entire session.
   */
  Session = 'session',
}
/**
 *  Live transcription message.
 */
interface LiveTranscriptionMessage {
  /**
   * Message ID.
   */
  msgId: string;
  /**
   * User ID of the message.
   */
  userId: number;
  /**
   * Display name.
   */
  displayName: string;
  /**
   * Text content.
   */
  text: string;
  /**
   * Source of the live transcription message.
   */
  source: LiveTranscriptionMessageSource;
  /**
   * Language code of the live translation.
   */
  language: LiveTranscriptionLanguageCode;
  /**
   * Timestamp.
   */
  timestamp: number;
  /**
   * Whether the sentence is over.
   */
  done?: boolean;
}

/**
 * Status of live transcription.
 */
interface LiveTranscriptionStatus {
  /**
   * Is live transcription enabled?
   */
  isLiveTranscriptionEnabled: boolean;
  /**
   * Is live translation enabled?
   */
  isLiveTranslationEnabled: boolean;
  /**
   * Has the host disabled captions?
   */
  isHostDisableCaptions: boolean;
  /**
   * Indicates whether the host has locked the transcription language.
   * @since 2.2.10
   */
  isHostLockTranscriptionLanguage: boolean;
  /**
   * Are manual captions enabled?
   */
  isManualCaptionerEnabled: boolean;
  /**
   * Supported transcription language, separated by semicolons.
   */
  transcriptionLanguage: string;
  /**
   * Supported translation language, a list of speaking language and supported translation language pairs.
   */
  translationLanguage: Array<{
    /**
     * Speaking language.
     */
    speakingLanguage: string;
    /**
     * Translation language, separated by semicolons.
     */
    translatedToLanguage: string;
  }>;
}
/**
 * Language.
 */
interface Language {
  /**
   * Language code.
   */
  code: string;
  /**
   * Language name.
   */
  name: string;
}
/**
 * The client of live transcription.
 */
export declare namespace LiveTranscriptionClient {
  /**
   * Start live transcription.
   *
   * ``` javascript
   * zmClient.on('caption-message',(payload)=>{
   *  console.log(`receive new transcription:${payload.text}`)
   * });
   *
   * const lttClient = zmClient.getLiveTranscriptionClient();
   * lttClient.startLiveTranscription();
   * ```
   *
   */
  function startLiveTranscription(): ExecutedResult;
  /**
   * Sets the speaking language.
   * @param language - The language to set for speech transcription.
   * @param options - Optional configuration.  @since 2.2.10
   * @param options.mode - The transcription mode to use (defaults to `Individual`)
   *
   * @returns An {@link ExecutedResult} indicating the success or failure of the operation.
   */
  function setSpeakingLanguage(
    language: LiveTranscriptionLanguage,
    options?: { mode: TranscriptionMode },
  ): ExecutedResult;
  /**
   * Set translation language.
   * Notes:
   *  - Check the `translatedSetting` from the `getLiveTranscriptionStatus` to verify whether the language is in the supported list.
   *  - Need to start live transcription before calling this function.
   * @param language Undefined is no translation.
   */
  function setTranslationLanguage(
    language?: LiveTranscriptionLanguage,
  ): ExecutedResult;
  /**
   * Disable or enable captions. Only the host can call this function.
   * @param disable
   */
  function disableCaptions(disable: boolean): ExecutedResult;
  /**
   * Locks or unlocks the transcription language during a session.
   * **Note:** Only the host can call this function
   *
   * @param isLock - `true` to lock, `false` to unlock the transcription language.
   * @returns An {@link ExecutedResult} indicating the success or failure of the operation.
   * @since 2.2.10
   */
  function lockTranscriptionLanguage(isLock: boolean): ExecutedResult;
  /**
   * Get the live transcription status.
   */
  function getLiveTranscriptionStatus(): LiveTranscriptionStatus;
  /**
   * Get the current transcription language.
   */
  function getCurrentTranscriptionLanguage(): Language | null;
  /**
   * Get the current translation language.
   */
  function getCurrentTranslationLanguage(): Language | null;
  /**
   * Get the latest transcription message.
   */
  function getLatestTranscription(): string;
  /**
   * Get the latest translation message.
   */
  function getLatestTranslation(): string;
  /**
   * Get the full records of live transcription.
   * Usually the return value is an array type, when the number of records exceeds 100,000, it will be an Promise type.
   */
  function getFullTranscriptionHistory():
    | Array<LiveTranscriptionMessage>
    | Promise<Array<LiveTranscriptionMessage>>;
}

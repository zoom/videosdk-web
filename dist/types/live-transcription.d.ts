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
   * Chinese
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
   * Bengali
   */
  Bengali = 'bn',
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
   * Greek
   */
  Greek = 'el',
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
   * Is manual caption enabled?
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
   * Set speaking language.
   * Note:
   *  - Need to start live transcription before calling this function.
   * @param language
   */
  function setSpeakingLanguage(language: LiveTranscriptionLanguage): ExecutedResult;
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

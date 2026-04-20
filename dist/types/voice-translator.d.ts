import { ExecutedResult, Language } from './common';

/**
 * Voice timbre configuration
 */
interface VoiceTimbre {
  /**
   * Timbre index ID.
   */
  timbreIndex: number;
  /**
   * Timbre display name.
   */
  name: string;
  /**
   * Sample audio URL for this voice timbre.
   */
  voiceUrl: string;
}

/**
 * Status of voice translator.
 */
interface VoiceTranslatorStatus {
  /**
   * Is voice translator feature enabled in the account setting.
   */
  isVoiceTranslatorEnabled: boolean;
  /**
   * Is voice translator currently running for current user.
   */
  isVoiceTranslatorOn: boolean;
  /**
   * Supported languages for voice translator, separated by semicolons.
   */
  voiceTranslatorLanguage: string;
  /**
   * Available voice timbre list for translated voice.
   */
  voiceTranslatorVoiceTimberList: Array<VoiceTimbre>;
  /**
   * Supported translation language, a list of speaking language and supported translation language pairs.
   */
  voiceTranslatorLanguagePair: Array<{
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
 * The client of voice translator.
 * @ignore
 */
export declare namespace VoiceTranslatorClient {
  /**
   * Start voice translator.
   *
   * ``` javascript
   * zmClient.on('voice-translator-started',(payload)=>{
   *  console.log('Voice translator started receiving audio')
   * });
   *
   * const vtClient = zmClient.getVoiceTranslatorClient();
   * vtClient.startVoiceTranslator();
   * ```
   *
   * @throws {ExceptionCode.VOICE_TRANSLATOR_ACCOUNT_DISABLE} - Voice translator is not enabled for this account
   * @throws {ExceptionCode.VOICE_TRANSLATOR_NO_AVAILABLE_LANGUAGE_LIST} - Voice translator language list is not available
   */
  function startVoiceTranslator(): ExecutedResult;

  /**
   * Stop voice translator.
   *
   * ``` javascript
   * const vtClient = zmClient.getVoiceTranslatorClient();
   * vtClient.stopVoiceTranslator();
   * ```
   */
  function stopVoiceTranslator(): ExecutedResult;

  /**
   * Set speaking language (the language you are speaking).
   *
   * Note:
   *  - Check the `voiceTranslatorLanguage` from `getVoiceTranslatorStatus` to verify the language is supported.
   *
   * ``` javascript
   * const vtClient = zmClient.getVoiceTranslatorClient();
   * vtClient.setSpeakingLanguage('en'); // Set speaking language to English
   * ```
   *
   * @param language - The speaking language code (e.g., 'en', 'zh', 'ja').
   * @throws {ExceptionCode.VOICE_TRANSLATOR_ACCOUNT_DISABLE} - Voice translator is not enabled for this account
   * @throws {ExceptionCode.VOICE_TRANSLATOR_NO_AVAILABLE_LANGUAGE_LIST} - Voice translator language list is not available
   * @throws {ExceptionCode.VOICE_TRANSLATOR_LANGUAGE_UNSUPPORTED} - The specified speaking language is not supported
   */
  function setSpeakingLanguage(language: string): ExecutedResult;

  /**
   * Set listening language (the language you want to hear).
   *
   * Note:
   *  - Voice translator must be started before calling this function.
   *  - Check the `voiceTranslatorLanguage` from `getVoiceTranslatorStatus` to verify the language is supported.
   *
   * ``` javascript
   * const vtClient = zmClient.getVoiceTranslatorClient();
   * vtClient.setListeningLanguage('zh'); // Set listening language to Chinese
   * ```
   *
   * @param language - The target language code to translate audio into (e.g., 'en', 'zh', 'ja').
   * @throws {ExceptionCode.VOICE_TRANSLATOR_MISMATCH_STATE} - Voice translator must be started before performing this action
   * @throws {ExceptionCode.VOICE_TRANSLATOR_LANGUAGE_UNSUPPORTED} - The specified listening language is not supported
   */
  function setListeningLanguage(language: string): ExecutedResult;

  /**
   * Set original audio balance.
   *
   * Controls the volume balance between original audio and translated audio.
   * - 0: Only translated audio.
   * - 0.5: Equal mix of original and translated audio.
   * - 1: Only original audio.
   *
   * Note:
   *  - Voice translator must be started before calling this function.
   *
   * ``` javascript
   * const vtClient = zmClient.getVoiceTranslatorClient();
   * vtClient.setOriginalAudioBalance(0.3); // Mostly translated audio with some original
   * ```
   *
   * @param balance - Balance value between 0 and 1 (inclusive).
   * @throws {ExceptionCode.VOICE_TRANSLATOR_MISMATCH_STATE} - Voice translator must be started before performing this action.
   * @throws {ExceptionCode.VOICE_TRANSLATOR_INCORRECT_BALANCE_RANGE} - The balance value must be between 0 and 1.
   */
  function setOriginalAudioBalance(balance: number): ExecutedResult;

  /**
   * Set translated voice style (timbre).
   *
   * Note:
   *  - Voice translator must be started before calling this function.
   *  - Check the `voiceTranslatorVoiceTimberList` from `getVoiceTranslatorStatus` to get available timbre IDs.
   *
   * ``` javascript
   * const vtClient = zmClient.getVoiceTranslatorClient();
   * const status = vtClient.getVoiceTranslatorStatus();
   * const timbreId = status.voiceTranslatorVoiceTimberList[0].timbreIndex;
   * vtClient.setTranslatedVoiceStyle(timbreId);
   * ```
   *
   * @param timbreId - The timbre index ID from the available voice timbre list.
   * @throws {ExceptionCode.VOICE_TRANSLATOR_MISMATCH_STATE} - Voice translator must be started before performing this action.
   * @throws {ExceptionCode.VOICE_TRANSLATOR_INCORRECT_TIMBRE} - The specified voice timbre ID is invalid or not found.
   */
  function setTranslatedVoiceStyle(timbreId: number): ExecutedResult;

  /**
   * Get voice translator status.
   *
   * ``` javascript
   * const vtClient = zmClient.getVoiceTranslatorClient();
   * const status = vtClient.getVoiceTranslatorStatus();
   * console.log('Is enabled:', status.isVoiceTranslatorEnabled);
   * console.log('Is running:', status.isVoiceTranslatorOn);
   * console.log('Supported languages:', status.voiceTranslatorLanguage);
   * ```
   *
   * @returns Voice translator status information.
   */
  function getVoiceTranslatorStatus(): VoiceTranslatorStatus;

  /**
   * Get the current speaking language.
   *
   * ``` javascript
   * const vtClient = zmClient.getVoiceTranslatorClient();
   * const language = vtClient.getCurrentSpeakingLanguage();
   * if (language) {
   *   console.log(`Speaking: ${language.name} (${language.code})`);
   * }
   * ```
   *
   * @returns Current speaking language or null if not set.
   */
  function getCurrentSpeakingLanguage(): Language | null;

  /**
   * Get current listening language.
   *
   * ``` javascript
   * const vtClient = zmClient.getVoiceTranslatorClient();
   * const language = vtClient.getCurrentListeningLanguage();
   * if (language) {
   *   console.log(`Listening: ${language.name} (${language.code})`);
   * }
   * ```
   *
   * @returns Current listening language or null if not set.
   */
  function getCurrentListeningLanguage(): Language | null;

  /**
   * Get current voice timbre.
   *
   * ``` javascript
   * const vtClient = zmClient.getVoiceTranslatorClient();
   * const timbre = vtClient.getCurrentTimbre();
   * if (timbre) {
   *   console.log(`Current voice: ${timbre.name}`);
   *   console.log(`Sample URL: ${timbre.voiceUrl}`);
   * }
   * ```
   *
   * @returns Current voice timbre configuration or null if not set.
   */
  function getCurrentTimbre(): VoiceTimbre | null;
  /**
   * Get original audio balance.
   */
  function getOriginalAudioBalance(): number | null;
}

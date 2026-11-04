import { ExecutedResult } from './common';

/**
 * The reactions client.
 * @category Reactions
 */
export declare namespace ReactionsClient {
  /**
   * Sends an emoji reaction in the session.
   *
   * ```javascript
   * const reactions = client.getReactionsClient();
   * await reactions.sendEmojiReaction('1f44f');
   * ```
   * @param emojiCode The emoji unicode code point(s), such as `1f44f`. Use `-` to join multiple code points, such as `2764-fe0f`.
   */
  function sendEmojiReaction(emojiCode: string): ExecutedResult;
}

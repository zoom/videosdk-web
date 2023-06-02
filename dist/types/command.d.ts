import { ExecutedFailure } from './common';
/**
 * Command channel message object.
 */
export interface CommandChannelMsg {
  /**
   * Sender ID.
   */
  senderId: number;
  /**
   * Sender name.
   */
  senderName?: string;
  /**
   * Receiver ID. When sent to all, there is no `receiverId`.
   */
  receiverId?: number;
  /**
   * Message content.
   */
  text: string;
  /**
   * Timestamp.
   */
  timestamp: number;
  /**
   * Message ID.
   */
  msgid?: string;
}
/**
 * Use the `getCommandClient` method for the `VideoClient` to access the command channel client.
 */
export declare namespace CommandChannel {
  /**
   * Sends string text through the command channel.
   * #### Example
   * ```js
   *  const cmdChannel = client.getCommandClient()
   *  cmdChannel.send('test', userId)
   * ```
   *
   * @param text The text to send.
   * @param userId User to send to. If you don't pass a `userId`, the SDK sends the message to all users.
   *
   * @return ExecutedResult
   */
  function send(
    text: string,
    userId?: number,
  ): Promise<ExecutedFailure | CommandChannelMsg>;
}

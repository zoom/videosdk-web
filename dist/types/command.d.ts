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
   * Sender Guid.
   */
  senderGuid?: string;
  /**
   *  Receiver ID. When sent to all, there is no `receiverId`.
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
 * Address a specific recipient of a command channel message.
 *
 * `userKey` and `userGuid` can locate the same user across the main session and
 * subsessions, so they can be used to message a user in a different session.
 * A recipient and a broadcast {@link CommandChannelBroadcastTarget | scope} are
 * mutually exclusive.
 */
export interface CommandChannelDirectTarget {
  /**
   * The developer-supplied external key of the recipient (the `userIdentity`
   * passed when the user joined). Stable while the user stays in the session.
   */
  userKey?: string;
  /**
   * The SDK-internal global id of the recipient (`userGUID`). Stable across the
   * main session and all subsessions.
   */
  userGuid?: string;
  scope?: never;
}

/**
 * Broadcast a command channel message when no specific recipient is given.
 */
export interface CommandChannelBroadcastTarget {
  /**
   * - `'currentSession'`: broadcast within the current session only.
   * - `'all'`: broadcast to the main session and all subsessions.
   */
  scope: 'currentSession' | 'all';
}

/**
 * The target of a command channel message.
 *
 * - `number`: a recipient `userId` in the current session.
 * - {@link CommandChannelDirectTarget}: a recipient addressed by `userKey` or `userGuid`, which may be in a different session.
 * - {@link CommandChannelBroadcastTarget}: a broadcast scope.
 */
export type CommandChannelTarget =
  | number
  | CommandChannelDirectTarget
  | CommandChannelBroadcastTarget;

/**
 * Use the `getCommandClient` method for the `VideoClient` to access the command channel client.
 */
export declare namespace CommandChannel {
  /**
   * Send a string text through the command channel.
   * #### example only work to VideoSDK
   * ```js
   *  const cmdChannel = client.getCommandClient();
   *  // send to a user in the current session
   *  cmdChannel.send('test', userId)
   *  // send to a user by external key / guid (may be in another session)
   *  cmdChannel.send('test', { userKey: 'my-key' })
   *  cmdChannel.send('test', { userGuid: 'xxxx' })
   *  // broadcast to the main session and all subsessions
   *  cmdChannel.send('test', { scope: 'all' })
   *  .then(() => {
   *      // success
   *  })
   *     .catch(v => {
   *      // fail
   *      console.log(v)
   *  })
   * ```
   *
   * @param text The text to send.
   * @param target The recipient or broadcast scope. If omitted, the message is broadcast to the current session.
   *
   * @return ExecutedResult
   */
  function send(
    text: string,
    target?: CommandChannelTarget,
  ): Promise<ExecutedFailure | CommandChannelMsg>;
}

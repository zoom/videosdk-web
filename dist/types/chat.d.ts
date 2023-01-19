import { ExecutedResult } from './common';

/**
 * Message record.
 */
interface ChatMessage {
  /**
   * Message ID, used to delete or modify the message.
   */
  id?: string;
  /**
   * Message content.
   */
  message: string;
  /**
   * Sender information.
   */
  sender: {
    /**
     * Sender name.
     */
    name: string;
    /**
     * Sender user ID.
     */
    userId: number;
    /**
     * @ignore
     */
    avatar?: string;
  };
  /**
   * Receiver information.
   */
  receiver: {
    /**
     * Receiver name.
     */
    name: string;
    /**
     * Receiver user ID.
     */
    userId: number;
  };
  /**
   * Message timestamp.
   */
  timestamp: number;
}

/**
 * Receiver
 */
interface ChatUserItem {
  /**
   * User ID.
   */
  userId: number;
  /**
   * Display name.
   */
  displayName: string;
  /**
   * Whether the user is the host.
   */
  isHost: boolean;
  /**
   * Whether the user is a manager.
   */
  isManager: boolean;
}
/**
 * Chat privileges for users.
 */
export declare enum ChatPrivilege {
  /**
   * Everyone can send messages.
   */
  All = 1,
  /**
   * No one can send messages.
   */
  NoOne = 4,
  /**
   * Everyone can send public messages, but not private messages.
   */
  EveryonePublicly = 5,
}

export declare enum ChatMsgType {
  All = 0,
}
/**
 * After joining a session, call `client.getChatClient()` to get the chat client.
 *
 * ```javascript
 * const chat = client.getChatClient()
 * ```
 */
export declare namespace ChatClient {
  /**
   * Sends a chat message to a specific participant.
   * #### Example
   * ```js
   *  chat.send('test', userId)
   * ```
   * @param text
   * @param userId
   *
   * @return
   * - `ChatMessage`: success
   * - `Error`: Failure. Here are the error states and details:
   *     - `IMPROPER_MEETING_STATE`: Chat works only when the user is in meeting.
   *     - `INSUFFICIENT_PRIVILEGES`: The user does not have the privilege to send the chat.
   *     - `INVALID_PARAMETERS`: Issue with the parameter sent.
   */
  function send(text: string, userId: number): Promise<ChatMessage | Error>;

  /**
   * Sends a chat message to all participants.
   * @param text Message to send.
   * @returns ExecutedPromise
   */
  function sendToAll(text: string): Promise<ChatMessage | Error>;

  /**
   * The host or manager can control chat privileges in the session. The following table shows privilege values and descriptions:
   *
   
   | Value                          | Description                                          |
   |--------------------------------|------------------------------------------------------|
   | ChatPrivilege.All              | The user can chat to everyone.                       |
   | ChatPrivilege.NoOne            | The user can chat to no one.                         |
   | ChatPrivilege.EveryonePublicly | The user can chat to the host, manager, and everyone.|
   *
   * #### Example
   *
   * ```js
   * chat.setPrivilege(ChatPrivilege.All)
   * ```
   *
   * @param privilege
   *
   * @return executedPromise
   */
  function setPrivilege(privilege: ChatPrivilege): ExecutedResult;

  /**
   * Gets the current chat privilege.
   * #### Example
   * ```js
   * const privilege = chat.getPrivilege();
   * ```
   * @return
   */
  function getPrivilege(): ChatPrivilege;
  /**
   * Gets the chat list history.
   * #### Example
   * ```js
   * const historyChatList = chat.getHistory();
   * ```
   * @return
   */
  function getHistory(): Array<ChatMessage>;
  /**
   * Gets the list of available chat receivers.
   */
  function getReceivers(): Array<ChatUserItem>;
}

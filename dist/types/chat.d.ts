import { ExecutedResult } from './common';

/**
 * Message record
 */
interface ChatMessage {
  /**
   * message id,used for delete/modify message
   */
  id?: string;
  /**
   * message content
   */
  message: string;
  /**
   * sender
   */
  sender: {
    /**
     * name
     */
    name: string;
    /**
     * userId
     */
    userId: number;
    /**
     * @ignore
     */
    avatar?: string;
  };
  /**
   * receiver
   */
  receiver: {
    /**
     * name
     */
    name: string;
    /**
     * userId
     */
    userId: number;
  };
  /**
   * timestamp
   */
  timestamp: number;
}

/**
 * Receiver
 */
interface ChatUserItem {
  /**
   * userId
   */
  userId: number;
  /**
   * display name
   */
  displayName: string;
  /**
   * is host
   */
  isHost: boolean;
  /**
   * is manager
   */
  isManager: boolean;
}
/**
 * Privilege of the chat
 */
export declare enum ChatPrivilege {
  /**
   * Everyone
   */
  All = 1,
  /**
   * No one, cannot send message
   */
  NoOne = 4,
  /**
   * Everyone but cannot send private message
   */
  EveryonePublicly = 5,
}

export declare enum ChatMsgType {
  All = 0,
}
/**
 * After joining a session, call client.getChatClient() to get the chat client.
 *
 * ```javascript
 * const chat = client.getChatClient()
 * ```
 */
export declare namespace ChatClient {
  /**
   * To send a chat to a specific participant, call the chat.send() function.
   * #### example
   * ```js
   *  chat.send('test', userId)
   * ```
   * @param text
   * @param userId
   *
   * @return
   * - `ChatMessage`: success
   * - `Error`: Failure. Following the details of Error:
   *     - `IMPROPER_MEETING_STATE`: It works only when user is in meeting
   *     - `INSUFFICIENT_PRIVILEGES`: chat privilege limited
   *     - `INVALID_PARAMETERS`: invalid parameter
   */
  function send(text: string, userId: number): Promise<ChatMessage | Error>;

  /**
   * To send a chat to all participants, call the chat.sendToAll() function.
   * @param text message
   * @returns ExecutedPromise
   */
  function sendToAll(text: string): Promise<ChatMessage | Error>;

  /**
   * The host or manager can control the chat privilege in the session. Following are the definition of the privilege:
   *
   
   | value                          | description                                            |
   |--------------------------------|-----------------------------------------------------|
   | ChatPrivilege.All              | user can chat to everyone                      |
   | ChatPrivilege.NoOne            | user can chat to no one                         |
   | ChatPrivilege.EveryonePublicly | user can chat to host, manager and everyone    |
   *
   * #### example
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
   * Get the current chat privilege
   * #### example
   * ```js
   * const privilege = chat.getPrivilege();
   * ```
   * @return
   */
  function getPrivilege(): ChatPrivilege;
  /**
   * get the history chat list
   * #### example
   * ```js
   * const historyChatList = chat.getHistory();
   * ```
   * @return
   */
  function getHistory(): Array<ChatMessage>;
  /**
   * Get available chat receivers list
   */
  function getReceivers(): Array<ChatUserItem>;
}

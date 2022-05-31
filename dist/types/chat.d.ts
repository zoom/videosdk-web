import { ExecutedResult } from './common';

interface ChatMessage {
  /**
   * message id,used for delete/modify message
   */
  id?: string;
  message: string;
  sender: { name: string; userId: number; avatar?: string };
  receiver: {
    name: string;
    userId: number;
  };
  timestamp: number;
}

interface ChatUserItem {
  userId: number;
  displayName: string;
  isHost: boolean;
  isManager: boolean;
}
export declare enum ChatPrivilege {
  All = 1,
  NoOne = 4,
  EveryonePublicly = 5,
}

export declare enum ChatMsgType {
  All = 0,
}
/**
 * The chat client provides the methods define the chat behavior
 *  ```js
 * const client = ZoomVideo.createClient();
 *
 * ```
 *
 * After joining meeting success, chat client is available
 *
 * ```js
 * const chat = client.getChatClient();
 * // start to receive chat message
 * client.on('chat-on-message', (v) => {
 *  console.log(v);
 *  // do something
 * })
 * ```
 */
export declare namespace ChatClient {
  /**
   * send chat message to other
   * #### example
   * ```js
   *  chat.sendMessage('test', userId)
   *  .then(() => {
   *      // success
   *  }).catch(v => {
   *      // fail
   *      console.log(v)
   *  })
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
   * Send message to everyone
   * @param text message
   * @returns ExecutedPromise
   */
  function sendToAll(text: string): Promise<ChatMessage | Error>;

  /**
   * host or manager use it to change chat privilege which defines what kind of role of user that user can chat to, there are the different privilege as following.
   *
   
   |         | privilege value                | describe                                            |
   |---------|--------------------------------|-----------------------------------------------------|
   | meeting | ChatPrivilege.All              | user can chat to everyone                      |
   |         | ChatPrivilege.NoOne            | user can chat to no one                         |
   |         | ChatPrivilege.EveryonePublicly | user can chat to host, manager and everyone    |
   *
   * #### example
   *
   * ```js
   * chat.setPrivilege(ChatPrivilege.All)
   * .then((v) => {
   *      const { chatPrivilege } = v;
   *      // success
   *  })
   * .catch(v => {
   *      // fail
   *      console.log(v)
   *  })
   * ```
   *
   * @param privilege
   *
   * @return executedPromise
   */
  function setPrivilege(privilege: number): ExecutedResult;

  /**
   * return the current privilege value
   * #### example
   * ```js
   * const privilege = chat.getPrivilege();
   * console.log(privilege);
   * ```
   * @return
   */
  function getPrivilege(): number;
  /**
   * get the history chat list
   * #### example
   * ```js
   * const historyChatList = chat.getHistory();
   * console.log(historyChatList);
   * ```
   * @return
   */
  function getHistory(): Array<ChatMessage>;
  /**
   * Get available chat receivers list
   */
  function getReceivers(): Array<ChatUserItem>;
}

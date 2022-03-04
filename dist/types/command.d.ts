import { ExecutedFailure } from './common';
export interface CommandChannelMsg {
  /**
   * sender id
   */
  senderId: number;
  /**
   * sender name
   */
  senderName?: string;
  /**
   * receiver id, when send to all no receiverId
   */
  receiverId?: number;
  /**
   * content
   */
  text: string;
  /**
   * timestamp
   */
  timestamp: number;
  /**
   * msgid
   */
  msgid?: string;
}

export declare namespace CommandChannel {
  /**
   * send string text through command channel
   * #### example only work to VideoSDK
   * ```js
   *  const cmdChannel = client.getCommandClient()
   *  cmdChannel.send('test', userId)
   *  .then(() => {
   *      // success
   *  })
   *     .catch(v => {
   *      // fail
   *      console.log(v)
   *  })
   * ```
   *
   * @param text
   * @param userId is not pass userId, will send to all
   *
   * @return ExecutedResult
   */
  function send(
    text: string,
    userId?: number,
  ): Promise<ExecutedFailure | CommandChannelMsg>;
}

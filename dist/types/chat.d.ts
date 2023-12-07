import {
  ChatFileDownloadStatus,
  ChatFileUploadStatus,
  ExecutedResult,
} from './common';

/**
 * File info
 */
interface FileInfo {
  /**
   * File name
   */
  name: string;
  /**
   * File size
   */
  size: number;
  /**
   * File type
   */
  type: string;
  /**
   * File URL
   */
  fileUrl?: string;
  /**
   * Upload status
   */
  upload?: {
    /**
     * Upload status
     */
    status: ChatFileUploadStatus;
    /**
     * Upload progress
     */
    progress: number;
  };
  /**
   * Download status
   */
  download?: {
    /**
     * Download status
     */
    status: ChatFileDownloadStatus;
    /**
     * Download progress
     */
    progress: number;
  };
}
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
  message?: string;
  /**
   * File info
   */
  file?: FileInfo;
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
     * Sender user unified ID.
     */
    userGuid?: string;
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
    /**
     * Receiver user unified ID.
     */
    userGuid?: string;
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
   * Indicates whether the user is the host or not.
   */
  isHost: boolean;
  /**
   * Indicates whether the user is a manager or not.
   */
  isManager: boolean;
}
/**
 * File transfer cancel function
 */
type FileTransferCancelFunction = () => undefined;
/**
 * File transfer setting
 */
interface FileTransferSetting {
  /**
   * Allowed file types in comma-separated suffix format; if empty, any file type is allowed for sending
   */
  typeLimit?: string;
  /**
   * Maximum allowed file size for sending; if empty, the default is 2GB
   */
  sizeLimit?: number;
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
   * Send file
   * The file will be securely encrypted and then uploaded to Zoom's file server.
   * It may take some time to encrypt and upload the file. However, you have the option to cancel the upload process by invoking the returned method at any time.
   * @param file file or retryToken
   * @param userId
   */
  function sendFile(
    file: File | string,
    userId: number,
  ): Promise<FileTransferCancelFunction | Error>;
  /**
   * Download the file
   * The file cannot be downloaded directly from the file UL as it is encrypted. To download the file, please follow this method.
   * It may take some time to decrypt and download the file. However, you have the option to cancel the download process by invoking the returned method at any time.
   * @param id The msg id of the record containing file info.
   * @param fileUrl file URL
   * @param blob Optional default is false.  Determine whether to provide raw data in blob format instead of directly downloading the file. This is useful for displaying images in chat records.
   */
  function downloadFile(
    id: string,
    fileUrl: string,
    blob?: boolean,
  ): Promise<FileTransferCancelFunction | Error>;

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
  /**
   * Is file transfer in meeting chat enabled
   */
  function isFileTransferEnabled(): boolean;
  /**
   * Get file transfer setting
   */
  function getFileTransferSetting(): FileTransferSetting;
}

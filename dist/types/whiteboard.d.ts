/**
 * Whiteboard status '' => init -> ready -> loading -> open/error -> close
 */
export enum WHITEBOARD_STATUS {
  DEFAULT = '',
  INIT = 'init', // init whiteboard sdk
  READY = 'ready', // get whiteboard token success
  OPEN = 'open', // can open whiteboard
  LOADING = 'loading', // after call openWhiteboard, waiting for whiteboard to be opened
  OPENED = 'opened', // whiteboard is opened
  LEAVE = 'leave', // whiteboard is leave
  CLOSE = 'close', // whiteboard closed
  ERROR = 'error', // whiteboard error
}
export enum WHITEBOARD_EXPORT_FORMAT {
  PDF = 'pdf',
}
/**
 * The `WhiteboardClient` namespace provides methods that define the behaviors of a WhiteboardClient object, such as start/stop whiteboard.
 *
 * The WhiteboardClient object can be accessed by `getFeatureModule` method of a `ZoomMtgCm` instance if recording is enabled when init ZoomMtgCm instance since whiteboard is an additional feature.
 */
export declare namespace WhiteboardClient {
  /**
   * Opens a whiteboard instance
   * @param element The DOM element to render the whiteboard in
   * @param wbInfo Optional whiteboard configuration options
   * host/manager can start whiteboard
   * participant can can start whiteboard when host/manager unlock the whiteboard
   * can't start whiteboard if the whiteboard is already open
   * can't start whiteboard if have other sharing screen
   */
  export function startWhiteboard(
    element: HTMLElement,
    wbInfo?: {
      docId?: string;
      docName?: string;
      isDisableExport?: boolean;
    },
  ): Promise<void>;

  /**
   * Stop the currently open whiteboard
   * whiteboard is temporary, if you close whiteboard, you can't open it again.
   */
  export function stopWhiteboard(): Promise<string | boolean>;

  /**
   * Leaves the current whiteboard session
   * If you are the user who create the whiteboard, you can't leave the whiteboard. need use stopWhiteboard instead.
   */
  export function leaveWhiteboard(): Promise<void | string>;

  /**
   * Gets the current status of the whiteboard
   */
  export function getStatus(): {
    wb: WHITEBOARD_STATUS;
    url: string;
    enable: boolean;
    wbInfo: {
      docId?: string;
      dcsID?: string;
      presenterID?: number;
    };
    isLock: boolean;
    error?: {
      errorCode: number;
      errorMessage: string;
    };
  };

  /**
   * Exports the whiteboard as PNG or PDF
   * @param name Optional filename for the export
   * @param includeComments Optional flag to include comments in export
   */
  export function exportWhiteboard(
    name?: string,
    includeComments?: boolean,
  ): Promise<void>;

  /**
   * Checks if the user can start whiteboard
   */
  export function canStartWhiteboard(): boolean;

  /**
   * Checks if the user can stop whiteboard
   */
  export function canStopWhiteboard(): boolean;

  /**
   * Checks if the user is sharing whiteboard
   */
  export function isOtherSharingWhiteboard(): boolean;

}

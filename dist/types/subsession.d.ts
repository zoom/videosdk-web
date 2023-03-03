import { ExecutedResult, Participant, SubsessionStatus } from './common';

/**
 * Subsession interface.
 */
export interface Subsession {
  /**
   * Subsession ID.
   */
  subsessionId: string;
  /**
   * Subsession name.
   */
  subsessionName: string;
  /**
   * Subsession user list.
   */
  userList: Array<
    Pick<Participant, 'userId' | 'displayName' | 'avatar' | 'userGuid'>
  >;
}
/**
 * Subsession interface.
 */
interface Subsession2 {
  /**
   * Subsession ID.
   */
  subsessionId: string;
  /**
   * Subsession name.
   */
  subsessionName: string;
  /**
   * Subsession user list.
   */
  userList: Array<Participant>;
}
/**
 * Subsession creation options.
 */
export interface SubsessionOption {
  /**
   * Whether a participant should automatically join the subsession when assigned to one.
   */
  isAutoJoinSubsession?: boolean;
  /**
   * Whether to allow participants in the subsession to return to the main session.
   */
  isBackToMainSessionEnabled?: boolean;
  /**
   * Whether to set a timer for the subsession.
   */
  isTimerEnabled?: boolean;
  /**
   * Duration of the timer.
   */
  timerDuration?: number;
  /**
   * Whether to automatically return to the main session when time is up.
   */
  isTimerAutoEnabled?: boolean;
  /**
   * When the subsession is closing, the buffer time to leave the subsession.
   */
  waitSeconds?: number;
}
/**
 * Allocation pattern of the subsession.
 */
export enum SubsessionAllocationPattern {
  /**
   * Automatically create and assign subsessions according to the user number.
   */
  Automatically = 1,
  /**
   * Manually create the subsessions.
   */
  Manually = 2,
}

/**
 * User's subsession status.
 */
export enum SubsessionUserStatus {
  /**
   * Unassigned.
   */
  Initial = 'initial',
  /**
   * Assigned but not in subsession.
   */
  Invited = 'invited',
  /**
   * Joining the subsession.
   */
  Joining = 'joining',
  /**
   * In subsession.
   */
  InSubsession = 'in room',
  /**
   * Leaving the subsession.
   */
  Leaving = 'leaving',
  /**
   * In the main session.
   */
  MainSession = 'main session',
}
/**
 * The `SubsessionClient` provides methods that define subsession functionalities, such as create subsession, join subsession, and leave subsession.
 *
 */
export declare namespace SubsessionClient {
  /**
   * Creates subsessions.
   *
   * @param data
   * Accepts the following parameters:
   *  - number : the number of subsessions to create. The SDK will create the specified number of subsessions, automatically named.
   *  - string : the name of the subsession. The SDK will create a subsession with the specified name.
   *  - Array&lt;string&gt;: a list of named subsessions. The specified subsession will be created.
   * @param pattern How to assign users to subsessions:
   *  - `SubsessionAllocationPattern.Automatically`: Distribute users evenly to each subsession.
   *  - `SubsessionAllocationPattern.Manually`: The users will be assigned manually later. This is the default.
   *
   * @returns Promise&lt;Array&lt;Subsession&gt; | Error&gt;
   *  - Subsession List: success
   *  - Error
   *    - `INVALID_OPERATION` (Subsession has started!)
   *    - `INVALID_PARAMETERS` (Exceed maximum size): `maximum_size` = 50; if support big subsessions plan, up to 100
   */
  function createSubsessions(
    data: number | string | Array<string>,
    pattern?: SubsessionAllocationPattern,
  ): Promise<Array<Subsession> | Error>;
  /**
   *
   * Opens the created subsessions.
   *
   * @param subsessions Subsession list required. Must include subsession ID and name.
   * @param options Subsession option; Default options =
   * ```javascript
   * {
   *  isAutoJoinSubsession: false,
   *  isBackToMainSessionEnabled: true,
   *  isTimerEnabled: false,
   *  timerDuration: 1800,
   *  isTimerAutoEnabled: false,
   *  waitSeconds: 60,
   * }
   * ```
   *
   * @returns Executed promise.
   */
  function openSubsessions(
    subsessions: Array<Subsession>,
    options?: SubsessionOption,
  ): ExecutedResult;

  /**
   *
   * Joins a subsession.
   *  - Join only after the subsession is open.
   *
   * @param subsessionId Subsession ID.
   *
   * @returns Executed promise.
   */
  function joinSubsession(subsessionId: string): ExecutedResult;

  /**
   * Leaves the subsession.
   * - If the user is not allowed to leave the subsession, they cannot return to the main session.
   *
   * @returns Executed promise.
   */
  function leaveSubsession(): ExecutedResult;

  /**
   * Asks the host to join the subsession to help, host can decline or postpone the request for help.
   * - Only a user (not the host) can call this method.
   *
   * @returns Executed promise.
   */
  function askForHelp(): ExecutedResult;

  /**
   * Postpones the request for help.
   * @param userId User ID of the user who requested help.
   *
   * @returns Executed promise.
   */
  function postponeHelping(userId: number): ExecutedResult;
  /**
   * Broadcasts content in the main session and all subsessions. Only available to the host.
   *
   * @param content Content to broadcast.
   *
   * @returns Executed promise.
   */
  function broadcast(content: string): ExecutedResult;

  /**
   *
   * Assigns an unassigned participant to a subsession. Only available to the host.
   *
   * @param userId User ID.
   * @param targetSubsessionId Subsession ID.
   *
   * @returns Executed promise.
   */
  function assignUserToSubsession(
    userId: number,
    targetSubsessionId: string,
  ): ExecutedResult;

  /**
   *
   * Moves a participant from one subsession to the specified subsession. Only available to the host.
   *
   * @param userId User ID.
   * @param targetSubsessionId Subsession ID.
   *
   * @returns Executed promise.
   */
  function moveUserToSubsession(
    userId: number,
    targetSubsessionId: string,
  ): ExecutedResult;

  /**
   * Closes all the subsession. Only available to the host.
   *
   * @returns Executed promise
   */
  function closeAllSubsessions(): ExecutedResult;

  /**
   * Assigns participants to certain subsessions in advance. Available to the host when scheduling a session.
   * Loads preset subsessions.
   *
   * @returns Executed promise.
   */
  // function loadPreAssignedRooms(): ExecutedResult;

  /**
   * Gets the unassigned list of users.
   */
  function getUnassignedUserList(): Array<Participant>;
  /**
   * Gets the list of subsessions.
   * If you are the host, will get all the subsessions.
   * If you are the participant, will get the assigned subsession.
   */
  function getSubsessionList(): Array<Subsession2>;
  /**
   * Gets the subsession status of the user.
   */
  function getUserStatus(): SubsessionUserStatus;
  /**
   * Gets the status of the subsession.
   */
  function getSubsessionStatus(): SubsessionStatus;

  /**
   * Gets the current subsession information.
   */
  function getCurrentSubsession(): {
    /**
     * User status.
     */
    userStatus: SubsessionUserStatus;
    /**
     * Subsession name.
     */
    subsessionName: string;
    /**
     * Subsession ID.
     */
    subsessionId: string;
  };
  /**
   * Get subsession options
   */
  function getSubsessionOptions(): SubsessionOption;
}

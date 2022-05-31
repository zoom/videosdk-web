import { ExecutedResult, Participant, SubsessionStatus } from './common';

/**
 * Interface of subsession
 */
export interface Subsession {
  /**
   * Subsession Id
   */
  subsessionId: string;
  /**
   * Subsession Name
   */
  subsessionName: string;
  /**
   * user in subsession
   */
  userList: Array<Pick<Participant, 'userId' | 'displayName' | 'avatar'>>;
}
/**
 * Interface of subsession
 */
interface Subsession2 {
  /**
   * Subsession Id
   */
  subsessionId: string;
  /**
   * Subsession Name
   */
  subsessionName: string;
  /**
   * user in subsession
   */
  userList: Array<Participant>;
}
/**
 * Options of subsession creation
 */
export interface SubsessionOption {
  /**
   * whether to automatically join the subsession when the participant is assigned to a subsession
   */
  isAutoJoinSubsession?: boolean;
  /**
   * whether to allow participants in the subsession to return to the main session
   */
  isBackToMainSessionEnabled?: boolean;
  /**
   * Whether to set a timer for the subsession
   */
  isTimerEnabled?: boolean;
  /**
   * duration of the timer
   */
  timerDuration?: number;
  /**
   * whether to automatically return to the main session when time up
   */
  isTimerAutoEnabled?: boolean;
  /**
   * when the subsession is closing, the buffer time to leave the subsession
   */
  waitSeconds?: number;
}
/**
 * Allocation pattern of subsession
 */
export enum SubsessionAllocationPattern {
  /**
   * Automatically create and assign subsessions according to the user number
   */
  Automatically = 1,
  /**
   * Manully create the subsessions
   */
  Manually = 2,
}

/**
 * Subsession Status of user
 */
export enum SubsessionUserStatus {
  /**
   * Unassigned
   */
  Initial = 'initial',
  /**
   * Assigned but not in subsession
   */
  Invited = 'invited',
  /**
   * Joining the subsession
   */
  Joining = 'joining',
  /**
   * In subsession
   */
  InSubsession = 'in room',
  /**
   * Leaving the subsession
   */
  Leaving = 'leaving',
  /**
   * In the main session
   */
  MainSession = 'main session',
}
/**
 * The SubsessionClient provides methods that define the functionalities of subsession, such as create subsession, join subsession, leave subsession.
 *
 */
export declare namespace SubsessionClient {
  /**
   * Create subsessions
   *
   * @param data number | string | Array<string>, three types of parmeters, following is the detail:
   *  - number : the number of subsession. The specified number of subsessions will be created, and the subsession name will be automatically named
   *  - string : the name of the subsession. The specified name of subsession will be created.
   *  - Array<string>: name of subsessions list. The specified subsession  will be created.
   * @param pattern SubsessionAllocationPattern; How to assign the users to the subsessions. Default is `Manually`
   *  - `SubsessionAllocationPattern.Automatically`: Distribute users evenly to each subsession
   *  - `SubsessionAllocationPattern.Manually`: The users will be assigned manually later.
   *
   * @returns Promise<Array<Subsession> | Error>
   *  - Subsession List: success
   *  - Error
   *    - INVALID_OPERATION (Subsession has started!)
   *    - INVALID_PARAMETERS (exceed maximum size): maximum_size = 50; if support big subsessions plan, up to 100
   */
  function createSubsessions(
    data: number | string | Array<string>,
    pattern?: SubsessionAllocationPattern,
  ): Promise<Array<Subsession> | Error>;
  /**
   *
   * Open the created subsessions
   * 
   * @param subsessions Subsession list Required; Need to include subsessionId and subsessionName, subsessionName can be renamed.
   * @param options Subsession option; Default options = {
      isAutoJoinSubsession: false,
      isBackToMainSessionEnabled: true,
      isTimerEnabled: false,
      timerDuration: 1800,
      isTimerAutoEnabled: false,
      waitSeconds: 60,
    }

   *
   * @returns Executed promise
   */
  function openSubsessions(
    subsessions: Array<Subsession>,
    options?: SubsessionOption,
  ): ExecutedResult;

  /**
   *
   * Join a subsession
   *  - Join only after the subsession is open
   *
   * @param subsessionId id a subsession
   *
   * @returns Executed promise
   */
  function joinSubsession(subsessionId: string): ExecutedResult;

  /**
   * Leave the subsession
   * - If the subsession is not allowed to leave, can not return to main session.
   *
   * @returns Executed promise
   */
  function leaveSubsession(): ExecutedResult;

  /**
   * Ask the host to join the subsession to help, host can decline or postpone the request for help
   * - Only user(non-host) can call the method
   *
   * @returns Executed promise
   */
  function askForHelp(): ExecutedResult;

  /**
   * Postpone the request for help
   * @param userId user id of requested help
   *
   * @returns Executed promise
   */
  function postponeHelping(userId: number): ExecutedResult;
  /**
   * Host can broadcast content in the main session and all subsessions
   *
   * @param content content of broadcast
   *
   * @returns Executed promise
   */
  function broadcast(content: string): ExecutedResult;

  /**
   *
   * Host assign an unassigned participant to a subsession
   *
   * @param userId user id
   * @param targetSubsessionId subsession id
   *
   * @returns Executed promise
   */
  function assignUserToSubsession(
    userId: number,
    targetSubsessionId: string,
  ): ExecutedResult;

  /**
   *
   * Host move an participant in subsession to the specified subsession
   *
   * @param userId user id
   * @param targetSubsessionId subsession id
   *
   * @returns Executed promise
   */
  function moveUserToSubsession(
    userId: number,
    targetSubsessionId: string,
  ): ExecutedResult;

  /**
   * Host close all the subsession
   *
   * @returns Executed promise
   */
  function closeAllSubsessions(): ExecutedResult;

  /**
   * When scheduling a meeting, you can assign participants to certain subsessions in advance。
   * Load these preset.
   *
   * @returns Executed promise
   */
  // function loadPreAssignedRooms(): ExecutedResult;

  /**
   * Get the unassigned list of user
   */
  function getUnassignedUserList(): Array<Participant>;
  /**
   * If you are the host, will get all the subsessions
   * If you are the participant, will get the assigned subsession
   */
  function getSubsessionList(): Array<Subsession2>;
  /**
   * The subsession status of user
   */
  function getUserStatus(): SubsessionUserStatus;
  /**
   * The status of subsession
   */
  function getSubsessionStatus(): SubsessionStatus;

  /**
   * Get the current subsession
   */
  function getCurrentSubsession(): {
    userStatus: SubsessionUserStatus;
    subsessionName: string;
    subsessionId: string;
  };
  /**
   * Get subsession options
   */
  function getSubsessionOptions(): SubsessionOption;
}

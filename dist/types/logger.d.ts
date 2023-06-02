/**
 * Log encrypt mode.
 */
export enum LogEncryptMode {
  /**
   * PLAINTEXT
   */
  PLAIN = 0,
  /**
   * RSA
   */
  RSA = 1,
  /**
   * AESGCM256
   */
  AESGCM256 = 2,
}
/**
 * Log level.
 */
export enum LogLevel {
  /**
   * info
   */
  info = 0,
  /**
   * debug
   */
  debug = 1,
  /**
   * log
   */
  log = 2,
  /**
   * warn
   */
  warn = 3,
  /**
   * error
   */
  error = 4,
}
/**
 * Define types of Tags.
 */
export type Tags = Array<string>;
/**
 * Interface of log item.
 */
export interface CachedLogItem {
  /**
   * Encrypt mode.
   */
  encryptMode: LogEncryptMode;
  /**
   * Log item ID.
   */
  id: number;
  /**
   * Laplace session ID.
   */
  laplaceSessionId?: string;
  /**
   * L:og level.
   */
  logLevel: LogLevel;
  /**
   * Log item message.
   */
  message: string;
  /**
   * Log item tags.
   */
  tags: Tags;
  /**
   * Log record time.
   */
  timestamp: number;
  /**
   * Meeting number.
   */
  meetingNumber?: number;
  /**
   * User ID.
   */
  userId?: number;
  /**
   * User email.
   */
  userEmail?: string;
  /**
   * User name.
   */
  userName?: string;
}
/**
 * Define type of functional filter.
 */
export type FunctionFilter = (logItem: CachedLogItem) => boolean;
/**
 * Interface of Object filter.
 */
export interface ObjectFilter {
  /**
   * Log tags.
   */
  tags?: string | Tags;
  /**
   * Log function filter.
   */
  filter?: FunctionFilter;
}
/**
 * Define type of log filter.
 */
export type LogFilter = string | Tags | FunctionFilter | ObjectFilter | undefined;
/**
 * Define type of log array; getLogs's returns.
 */
export type CachedLogArray = Array<CachedLogItem>;
/**
 * Interface of log store; getStore's returns.
 */
export interface CachedLogStore {
  /**
   * Log by tag.
   */
  byTag: {
    [x: string]: Map<number, CachedLogItem>;
  };
  /**
   * Log by time.
   */
  byTime: Map<number, CachedLogItem>;
}

/**
 * The logger client.
 */
export declare namespace LoggerClient {
  /**
   * Gets logs.
   * @param filter Log filter.
   */
  function getLogs(filter?: LogFilter): CachedLogArray;

  /**
   * Gets store.
   */
  function getStore(): CachedLogStore;

  /**
   * Reports to global tracing.
   * GlobalTracing is Zoom's internal log system.
   * @param filter Log filter.
   */
  function reportToGlobalTracing(filter?: LogFilter): Promise<void>;
}

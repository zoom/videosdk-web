/**
 *
 * The logger client enabled to report client side issues to Zoom. This helps increase visibility into any client side connection issues, crashes, etc, allowing Zoom to investigate and fix any issues quickly.
 *
 */
export declare namespace LoggerClient {
  /**
   * Reports to global tracing.
   * GlobalTracing is Zoom's internal log system.
   * @param filter Log filter.
   */
  function reportToGlobalTracing(): Promise<void>;
}

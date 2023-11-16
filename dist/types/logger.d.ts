/**
 *
 * The logger client enabled to report client side issues to Zoom. This helps increase visibility into any client side connection issues, crashes, etc, allowing Zoom to investigate and fix any issues quickly.
 *
 */
export declare namespace LoggerClient {
  /**
   * Reports to global tracing.
   * GlobalTracing is Zoom's internal log system.
   */
  function reportToGlobalTracing(): Promise<void>;
  /**
   * Report subjective rating to Zoom.
   * @param rating subjective rating scale  1-5, 1:bad, 5 good.
   * @param feedback text-based feedback
   *
   */
  function reportRating(rating: number, feedback?: string): Promise<void>;
}

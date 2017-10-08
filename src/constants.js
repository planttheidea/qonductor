/**
 * @constant {Object} DEFAULTS
 */
export const DEFAULTS = {
  autoStart: true,
  keepHistory: true,
  maxConcurrency: 10,
  type: 'fifo'
};

/**
 * @constant {Object} STATUSES
 */
export const STATUSES = {
  CANCELLED: 'CANCELLED',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
  PENDING: 'PENDING',
  RUNNING: 'RUNNING'
};

/**
 * @constant {Object} TYPES
 */
export const TYPES = {
  FIFO: 'fifo',
  LIFO: 'lifo',
  SIRO: 'siro'
};

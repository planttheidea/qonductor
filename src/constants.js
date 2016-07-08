const STATUSES = {
  CANCELLED: 'CANCELLED',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
  PENDING: 'PENDING',
  RUNNING: 'RUNNING'
};

const TYPES = {
  FIFO: 'fifo',
  LIFO: 'lifo',
  SIRO: 'siro'
};

export {STATUSES as statuses};
export {TYPES as types};

export default {
  statuses: STATUSES,
  types: TYPES
};

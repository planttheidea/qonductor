// classes
import CustomError from './CustomError';

// constants
import {STATUSES} from './constants';

/**
 * @class QueueError
 * @classdesc the instance of the custom error
 */
class QueueError extends CustomError {
  constructor(message = '', type = STATUSES.FAILED) {
    super(`Queue promise was rejected with status ${type}${message ? `: ${message}.` : '.'}`);
  }
}

export default QueueError;

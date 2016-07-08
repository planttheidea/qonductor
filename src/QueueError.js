import {
  statuses
} from './constants';

class CustomError extends Error {
  constructor(message) {
    super();

    if (Error.hasOwnProperty('captureStackTrace')) {
      Error.captureStackTrace(this, this.constructor);
    } else {
      Object.defineProperty(this, 'stack', {
        value: (new Error()).stack
      });
    }

    Object.defineProperty(this, 'message', {
      value: message
    });
  }
}

class QueueError extends CustomError {
  constructor(message = '', type = statuses.FAILED) {
    super(`Queue promise was rejected with status ${type}${message ? ': ' : '.'}${message}`);
  }
}

export default QueueError;

const toString = (object) => {
  return Object.prototype.toString.call(object);
};

/**
 * determine whether object is a function
 *
 * @param {any} object
 * @return {boolean}
 */
const isFunction = (object) => {
  return toString(object) === '[object Function]' || typeof object === 'function';
};

/**
 * determine whether object is an object
 *
 * @param {any} object
 * @return {boolean}
 */
const isObject = (object) => {
  return toString(object) === '[object Object]' && !!object;
};

export {isFunction};
export {isObject};

export default {
  isFunction,
  isObject
};

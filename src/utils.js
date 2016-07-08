const toString = (object) => {
  return Object.prototype.toString.call(object);
};

const isFunction = (object) => {
  return toString(object) === '[object Function]' || typeof object === 'function';
};

const isPromise = (object) => {
  return !!object && isFunction(object.then);
};

export {isFunction};
export {isPromise};

export default {
  isFunction,
  isPromise
};

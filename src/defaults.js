const DEFAULTS = {
  autoStart: true,
  keepHistory: true,
  maxConcurrency: 10,
  type: 'fifo'
};

let currentDefaults = {
  ...DEFAULTS
};

/**
 * get the current defaults
 *
 * @return {{autoStart: boolean, keepHistory: boolean, maxConcurrency: number, type: string}}
 */
const getDefaults = () => {
  return currentDefaults;
};

/**
 * reset the defaults to their original setting
 * 
 * @return {object}
 */
const resetDefaults = () => {
  currentDefaults = {
    ...DEFAULTS
  };
  
  return currentDefaults;
};

/**
 * assign the keys in newDefaults to those in defaults if they exist in defaults
 *
 * @param {object} newDefaults={}
 * @return {{autoStart: boolean, keepHistory: boolean, maxConcurrency: number, type: string}}
 */
const setDefaults = (newDefaults = {}) => {
  Object.keys(newDefaults).forEach((key) => {
    if (currentDefaults.hasOwnProperty(key)) {
      currentDefaults[key] = newDefaults[key];
    }
  });
  
  return currentDefaults;
};

export {getDefaults};
export {resetDefaults};
export {setDefaults};

export default {
  getDefaults,
  resetDefaults,
  setDefaults
};

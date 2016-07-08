let defaults = {
  autoStart: true,
  keepHistory: true,
  maxConcurrency: 10,
  type: 'fifo'
};

/**
 * get the current defaults
 *
 * @return {{autoStart: boolean, keepHistory: boolean, maxConcurrency: number, type: string}}
 */
const getDefaults = () => {
  return defaults;
};

/**
 * assign the keys in newDefaults to those in defaults if they exist in defaults
 *
 * @param {object} newDefaults={}
 * @return {{autoStart: boolean, keepHistory: boolean, maxConcurrency: number, type: string}}
 */
const setDefaults = (newDefaults = {}) => {
  Object.keys(newDefaults).forEach((key) => {
    if (defaults.hasOwnProperty(key)) {
      defaults[key] = newDefaults[key];
    }
  });
  
  return defaults;
};

export {getDefaults};
export {setDefaults};

export default {
  getDefaults,
  setDefaults
};

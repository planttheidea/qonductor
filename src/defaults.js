// constants
import {DEFAULTS} from './constants';

export let currentDefaults = {...DEFAULTS};

/**
 * @function getDefaults
 *
 * @description
 * get the current defaults
 *
 * @return {{autoStart: boolean, keepHistory: boolean, maxConcurrency: number, type: string}}
 */
export const getDefaults = () => {
  return currentDefaults;
};

/**
 * @function resetDefaults
 *
 * @description
 * reset the defaults to their original setting
 *
 * @return {object}
 */
export const resetDefaults = () => {
  currentDefaults = {...DEFAULTS};

  return currentDefaults;
};

/**
 * @function setDefaults
 *
 * @description
 * assign the keys in newDefaults to those in defaults if they exist in defaults
 *
 * @param {object} newDefaults={}
 * @return {{autoStart: boolean, keepHistory: boolean, maxConcurrency: number, type: string}}
 */
export const setDefaults = (newDefaults = {}) => {
  return Object.keys(newDefaults).reduce((mergedDefaults, key) => {
    if (DEFAULTS.hasOwnProperty(key)) {
      mergedDefaults[key] = newDefaults[key];
    }

    return mergedDefaults;
  }, currentDefaults);
};

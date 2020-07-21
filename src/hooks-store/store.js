import { useState, useEffect } from 'react';

/** Using Custom Hooks approach. Advantages:
 * This is betther than Context Api, and
 * Is not require two extra redux libs
 */

let globalState = {};
let listeners = [];
let actions = {};

export const useStore = () => {
  const setState = useState(globalState)[1];

  const dispath = (actionIdentifier) => {
    const newState = actions[actionIdentifier](globalState);
    // mounting the new globalState
    globalState = { ...globalState, ...newState };

    listeners.forEach((listener) => listener(globalState));
  };
  useEffect(() => {
    listeners.push(setState);

    return () => {
      // removing listener in the unmounting component
      listeners = listeners.filter((li) => li !== setState);
    };
  }, [setState]);

  return [globalState, dispath];
};

export const initStore = (userActions, initialState) => {
  if (initialState) {
    globalState = { ...globalState, ...initialState };
  }

  actions = { ...actions, ...userActions };
};

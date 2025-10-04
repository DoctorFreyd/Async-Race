import type { RootState } from '../app/storeTypes';

export const loadState = (): RootState | undefined => {
  try {
    const serializedState = localStorage.getItem('appState');
    if (!serializedState) return undefined;
    return JSON.parse(serializedState) as RootState;
  } catch (e) {
    return undefined;
  }
};

export const saveState = (state: RootState): void => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('appState', serializedState);
  } catch (e) {}
};

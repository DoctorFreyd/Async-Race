import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';
import { loadState, saveState } from '../utils/localStorage';

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: loadState(),
});

export type AppDispatch = typeof store.dispatch;

store.subscribe(() => {
  saveState(store.getState());
});

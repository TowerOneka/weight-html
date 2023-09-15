import { configureStore } from '@reduxjs/toolkit';

import cableReducer from './cabels';
import { sliceName as sliceNameCable } from './cabels/constants';

export const store = configureStore({
  reducer: {
    [sliceNameCable]: cableReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

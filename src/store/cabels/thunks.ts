import { createAsyncThunk } from '@reduxjs/toolkit';
import { sliceName } from './constants';
import { stubRequest } from '../../utils/request';

import stub from './stubs/weights.json';
import { Cable } from './types';

export const getCablesThunk = createAsyncThunk<Cable>(
  `${sliceName}/getCablesThunk`,
  async () => {
    const data = await stubRequest<Cable>(stub as Cable);

    return data;
  }
);

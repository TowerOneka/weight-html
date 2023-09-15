import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const rootSelector = createSelector(
  (state: RootState) => state,
  (state) => state.cable
);

export const categoriesSelector = createSelector(rootSelector, (state) =>
  Object.keys(state.data)
);

export const categorySelector = createSelector(
  rootSelector,
  (state) => state.fields.category
);

export const subcategorySelector = createSelector(
  rootSelector,
  (state) => state.fields.subcategory
);

export const statusSelector = createSelector(
  rootSelector,
  (state) => state.status
);

export const valueSelector = createSelector(
  rootSelector,
  (state) => state.fields.value
);

export const subcategoriesSelector = createSelector(
  [rootSelector, categorySelector],
  (state, category) =>
    category !== 'default' ? Object.keys(state.data[category]) : null
);

export const valueResultSelector = createSelector(rootSelector, (state) => {
  if (
    state.fields.category !== 'default' &&
    state.fields.subcategory !== 'default' &&
    state.fields.value.length
  ) {
    const value = state.data[state.fields.category][
      state.fields.subcategory
    ].find((item) => item.name === 'Расчетная масса (вес)')?.value;

    if (value) {
      return (value * parseFloat(state.fields.value)).toFixed(2);
    } else {
      return false;
    }
  } else {
    return null;
  }
});

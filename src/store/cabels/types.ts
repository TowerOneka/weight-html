export type CableSlice = {
  data: Cable;
  fields: {
    category: string;
    subcategory: string;
    value: string;
  };

  status: 'init' | 'loading' | 'success' | 'error';
};

export type Cable = Record<string, CategoryValue>;

export type CategoryValue = Record<string, SubcategoryValue>;

export type SubcategoryValue = { name: string; value: number; unit: string }[];

export type CableWeight = {
  name: 'Расчетная масса (вес)';
  value: number;
  unit: 'кг/км';
};

export type CableDiameter = {
  name: 'Наружный диаметр';
  value: number;
  unit: 'мм';
};

import React, { useCallback, useEffect } from 'react';
import { useActionsCreator } from '@/hooks/useActionCreator';
import { getCablesThunk } from '@/store/cabels/thunks';
// import { useSelector } from '';
import {
  categoriesSelector,
  categorySelector,
  statusSelector,
  subcategoriesSelector,
  subcategorySelector,
  valueResultSelector,
  valueSelector,
} from '@/store/cabels/selectors';
import { useSelector } from '@/hooks/useSelector';
import { cableActions } from '@/store/cabels/slice';

import s from './Home.module.scss';
import Loader from '@/components/common/Loader';

const allActions = {
  ...cableActions,
  getCables: getCablesThunk,
};

const Home = () => {
  const { setField, setCategory, getCables } = useActionsCreator(allActions);

  const handleChangeValue = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      if (e.target.name === 'category') {
        setCategory(e.target.value);
      } else {
        setField({
          key: e.target.name as 'category' | 'subcategory' | 'value',
          value: e.target.value,
        });
      }
    },
    [setCategory, setField]
  );

  const categories = useSelector(categoriesSelector);

  const status = useSelector(statusSelector);

  const category = useSelector(categorySelector);

  const subcategory = useSelector(subcategorySelector);

  const subcategories = useSelector(subcategoriesSelector);

  const value = useSelector(valueSelector);

  const valueResult = useSelector(valueResultSelector);

  useEffect(() => {
    getCables();
  }, [getCables]);

  return (
    <div className={s.wrapper}>
      <div className={s.root}>
        <h1>Калькулятор массы кабеля</h1>
        <p>
          Чтобы рассчитать массу кабеля требуется выбрать категорию, затем
          подкатегорию и ввести значение.
        </p>

        {status === 'error' && (
          <div className={s.errorWrapper}>
            <p>При загрузке данных произошла ошибка</p>
            <button onClick={getCables} type="button" className={s.button}>
              Попробовать снова
            </button>
          </div>
        )}

        {status === 'loading' && <Loader />}

        {status === 'success' && (
          <>
            <select
              name="category"
              className={s.select}
              onChange={handleChangeValue}
              value={category}
            >
              <option value={'default'}>Категория</option>
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            {category !== 'default' &&
              (!subcategories!.length ? (
                <p>Для этой категории отсутсвуют данные</p>
              ) : (
                <select
                  name="subcategory"
                  className={s.select}
                  value={subcategory}
                  onChange={handleChangeValue}
                >
                  <option value={'default'}>Подкатегория</option>
                  {subcategories!.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              ))}

            {subcategory !== 'default' && (
              <>
                <label htmlFor="value" className={s.inputText}>
                  Длина кабеля (км)
                </label>
                <input
                  id="value"
                  name="value"
                  className={s.input}
                  onChange={handleChangeValue}
                  value={value}
                  type="number"
                />
              </>
            )}

            {!!value.length &&
              valueResult !== null &&
              (valueResult !== false ? (
                <p className={s.result}>Вес кабеля: {valueResult} кг</p>
              ) : (
                <p className={s.result}>
                  Для этой категории кабеля отсутсвуют данные
                </p>
              ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;

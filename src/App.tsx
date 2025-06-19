import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

const SORT_FIELD_ALF = 'alf';
const SORT_FIELD_LENGTH = 'length';

export const goodsFromServer: string[] = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

function getSortInfo(
  goods: string[],
  options: { sortField: string; isRevesed: boolean },
): string[] {
  let prepedGoods = [...goods];

  if (options.sortField) {
    prepedGoods.sort((a, b) => {
      switch (options.sortField) {
        case SORT_FIELD_ALF:
          return a.localeCompare(b);
        case SORT_FIELD_LENGTH:
          return a.length - b.length;
        default:
          return 0;
      }
    });
  }

  if (options.isRevesed) {
    prepedGoods = prepedGoods.reverse();
  }

  return prepedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<string>('');
  const [isReversed, setIsRevesed] = useState<boolean>(false);

  const start = getSortInfo(goodsFromServer, {
    sortField,
    isRevesed: isReversed,
  });

  const reset = () => {
    setSortField('');
    setIsRevesed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => {
            setSortField(SORT_FIELD_ALF);
          }}
          type="button"
          className={`button is-info ${sortField !== SORT_FIELD_ALF ? 'is-light' : ''} `}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
          type="button"
          className={`button is-success ${sortField !== SORT_FIELD_LENGTH ? 'is-light' : ''}`}
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsRevesed(!isReversed)}
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
        >
          Reverse
        </button>

        {sortField || isReversed ? (
          <button
            onClick={reset}
            type="button"
            className="button is-warning is-light"
          >
            Reset
          </button>
        ) : null}
      </div>

      <ul>
        {start.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};

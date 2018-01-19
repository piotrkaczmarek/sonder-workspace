import { partiesReducer } from './parties.reducer';
import { partiesInitialState } from './parties.init';
import { Parties } from './parties.interfaces';
import { DataLoaded } from './parties.actions';

describe('partiesReducer', () => {
  it('should work', () => {
    const state: Parties = {};
    const action: DataLoaded = {type: 'DATA_LOADED', payload: {}};
    const actual = partiesReducer(state, action);
    expect(actual).toEqual({});
  });
});

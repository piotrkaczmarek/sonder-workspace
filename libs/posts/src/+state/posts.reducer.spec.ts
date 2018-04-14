import { postsReducer } from './posts.reducer';
import { postsInitialState } from './posts.init';
import { Posts } from './posts.interfaces';
import { DataLoaded } from './posts.actions';

describe('postsReducer', () => {
  it('should work', () => {
    const state: Posts = {};
    const action: DataLoaded = {type: 'DATA_LOADED', payload: {}};
    const actual = postsReducer(state, action);
    expect(actual).toEqual({});
  });
});

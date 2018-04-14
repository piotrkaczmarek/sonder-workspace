import { postsReducer } from './posts.reducer';
import { postsInitialState } from './posts.init';
import { PostsState } from './posts.interfaces';
import * as fromPostActions from './posts.actions';

describe('postsReducer', () => {
  describe('CreatePost', () => {
    describe('when group has posts', () => {
      let state: PostsState;
      const groupId1 = 1;
      const groupId2 = 2;
      const postId1 = 2;
      const postId2 = 3;
      const newPostId = 4;
      beforeEach(() => {
        state = {
          ...postsInitialState,
          posts: {
            entities: {
              [groupId1]: {
                entities: {
                  [postId1]: { id: postId1, body: 'post 1 body' },
                  [postId2]: { id: postId2, body: 'post 2 body'}
                },
                loaded: true,
                loading: false
              },
              [groupId2]: {
                entities: {
                  [postId1]: { id: postId1, body: 'post 3 body' },
                  [postId2]: { id: postId2, body: 'post 4 body'}
                },
                loaded: true,
                loading: false
              }
            }
          }
        }
      })

      describe('when new post is created', () => {
        let payload, actual;
        beforeEach(() => {
          payload = {
            id: newPostId,
            body: 'Hello world',
          }
          const action: fromPostActions.PostCreated = { type: fromPostActions.POST_CREATED, payload: payload, groupId: groupId1 };
          actual = postsReducer(state, action);
        });

        it('adds post to given group', () => {
          const returnedPostIds = Object.keys(actual.posts.entities[groupId1].entities);
          const expectedPostIds = [String(postId1), String(postId2), String(newPostId)];
          expect(returnedPostIds).toEqual(expectedPostIds);
        })
      })
    })
  })
});

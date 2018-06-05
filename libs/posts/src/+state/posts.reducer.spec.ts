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
              [postId1]: {
                id: postId1,
                body: 'post 1 body',
                title: 'title 1',
                authorId: 1,
                voted: 0,
                points: 5,
                commentCount: 0 },
              [postId2]: {
                id: postId2,
                body: 'post 2 body',
                title: 'title 2',
                authorId: 2,
                voted: 1,
                points: 3,
                commentCount: 0
              }
            },
            loaded: true,
            loading: false
          },
          postsByGroups: {
            entities: {
              [groupId1]: {
                entities: [postId1, postId2],
                loaded: true,
                loading: false
              },
              [groupId2]: {
                entities: [postId1, postId2],
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
          const returnedPostIds = actual.postsByGroups.entities[groupId1].entities;
          expect(returnedPostIds).toEqual([postId1, postId2, newPostId]);
        })
      })
    })
  })
});

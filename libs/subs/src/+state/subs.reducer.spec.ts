import { subsReducer } from './subs.reducer';
import { subsInitialState } from './subs.init';
import { Subs } from './subs.interfaces';
import * as fromActions from './subs.actions';

describe('subsReducer', () => {
  describe('SuggestedSubsLoaded', () => {
    describe('when initial state was empty', () => {
      let state: Subs;
      beforeEach(() => {
        state = subsInitialState;
      })

      describe('when payload has subs', () => {
        let payload, actual;
        beforeEach(() => {
          payload = [{ id: 1, name: "Sub A" }, { id: 2, name: "Sub B" }];
          const action: fromActions.SuggestedSubsLoaded = { type: fromActions.SUGGESTED_PARTIES_LOADED, payload: payload };
          actual = subsReducer(state, action);
        })

        it('adds new suggested subs', () => {
          expect(Object.keys(actual.suggested.entities)).toEqual(["1", "2"]);
          expect(Object.values(actual.suggested.entities)).toEqual(payload);
        })

        it('sets loaded flag to true', () => {
          expect(actual.suggested.loaded).toEqual(true);
        })

        it("sets loading flag to false", () => {
          expect(actual.suggested.loading).toEqual(false);
        });
      })
    })
  })

  describe('RejectApplicant', () => {
    describe('when intial state has applicants', () => {
      let state: Subs;
      const subId1 = 1;
      const subId2 = 2;
      const applicantId1 = 2;
      const applicantId2 = 3;
      beforeEach(() => {
        state = {
          ...subsInitialState,
          applicants: {
            entities: {
              [subId1]: {
                entities: {
                  [applicantId1]: { id: applicantId1, first_name: 'Bob' },
                  [applicantId2]: { id: applicantId2, first_name: 'John'}
                },
                loaded: true,
                loading: false
              },
              [subId2]: {
                entities: {
                  [applicantId1]: { id: applicantId1, first_name: 'Bob' },
                  [applicantId2]: { id: applicantId2, first_name: 'John'}
                },
                loaded: true,
                loading: false
              }
            }
          }
        }
      })

      describe('when payload has existing subId and applicantId', () => {
        let payload, actual;
        beforeEach(() => {
          payload = { subId: subId1, applicantId: applicantId1 };
          const action: fromActions.ApplicantRejected = { type: fromActions.APPLICANT_REJECTED, payload: payload };
          actual = subsReducer(state, action);
        });

        it('removes applicant from given sub', () => {
          expect(Object.keys(actual.applicants.entities[subId1].entities)).toEqual([String(applicantId2)]);
        })

        it("does not remove applicant from other sub", () => {
          expect(Object.keys(actual.applicants.entities[subId2].entities)).toEqual([String(applicantId1), String(applicantId2)])
        });
      })
    })
  })

  describe('AcceptApplicant', () => {
    describe('when intial state has applicants', () => {
      let state: Subs;
      const subId1 = 1;
      const subId2 = 2;
      const applicantId1 = 2;
      const applicantId2 = 3;
      beforeEach(() => {
        state = {
          ...subsInitialState,
          accepted: {
            ...subsInitialState.accepted,
            entities: {
              [subId1]: {
                id: subId1,
                name: 'Sub A',
                size: 5,
                members: []
              }
            }
          },
          applicants: {
            entities: {
              [subId1]: {
                entities: {
                  [applicantId1]: { id: applicantId1, first_name: 'Bob' },
                  [applicantId2]: { id: applicantId2, first_name: 'John'}
                },
                loaded: true,
                loading: false
              },
              [subId2]: {
                entities: {
                  [applicantId1]: { id: applicantId1, first_name: 'Bob' },
                  [applicantId2]: { id: applicantId2, first_name: 'John'}
                },
                loaded: true,
                loading: false
              }
            }
          }
        }
      })

      describe('when payload has existing subId and applicantId', () => {
        let payload, actual;
        beforeEach(() => {
          payload = { subId: subId1, applicantId: applicantId1 };
          const action: fromActions.ApplicantAccepted = { type: fromActions.APPLICANT_ACCEPTED, payload: payload };
          actual = subsReducer(state, action);
        });

        it('removes applicant from given sub', () => {
          expect(Object.keys(actual.applicants.entities[subId1].entities)).toEqual([String(applicantId2)]);
        })

        it("does not remove applicant from other sub", () => {
          expect(Object.keys(actual.applicants.entities[subId2].entities)).toEqual([String(applicantId1), String(applicantId2)])
        });

        it("adds applicant to sub members", () => {
          expect(actual.accepted.entities[subId1].members).toContain({ id: applicantId1, first_name: 'Bob'})
        })
      })
    })
  })

  describe('CreatePost', () => {
    describe('when sub has posts', () => {
      let state: Subs;
      const subId1 = 1;
      const subId2 = 2;
      const postId1 = 2;
      const postId2 = 3;
      const newPostId = 4;
      beforeEach(() => {
        state = {
          ...subsInitialState,
          feed: {
            entities: {
              [subId1]: {
                entities: {
                  [postId1]: { id: postId1, body: 'post 1 body' },
                  [postId2]: { id: postId2, body: 'post 2 body'}
                },
                loaded: true,
                loading: false
              },
              [subId2]: {
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
          const action: fromActions.PostCreated = { type: fromActions.POST_CREATED, payload: payload, subId: subId1 };
          actual = subsReducer(state, action);
        });

        it('adds post to given sub', () => {
          const returnedPostIds = Object.keys(actual.feed.entities[subId1].entities);
          const expectedPostIds = [String(postId1), String(postId2), String(newPostId)];
          expect(returnedPostIds).toEqual(expectedPostIds);
        })
      })
    })
  })
});

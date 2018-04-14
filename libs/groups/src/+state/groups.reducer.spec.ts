import { groupsReducer } from './groups.reducer';
import { groupsInitialState } from './groups.init';
import { Groups } from './groups.interfaces';
import * as fromActions from './groups.actions';

describe('groupsReducer', () => {
  describe('SuggestedGroupsLoaded', () => {
    describe('when initial state was empty', () => {
      let state: Groups;
      beforeEach(() => {
        state = groupsInitialState;
      })

      describe('when payload has groups', () => {
        let payload, actual;
        beforeEach(() => {
          payload = [{ id: 1, name: "Group A" }, { id: 2, name: "Group B" }];
          const action: fromActions.SuggestedGroupsLoaded = { type: fromActions.SUGGESTED_GROUPS_LOADED, payload: payload };
          actual = groupsReducer(state, action);
        })

        it('adds new suggested groups', () => {
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
      let state: Groups;
      const groupId1 = 1;
      const groupId2 = 2;
      const applicantId1 = 2;
      const applicantId2 = 3;
      beforeEach(() => {
        state = {
          ...groupsInitialState,
          applicants: {
            entities: {
              [groupId1]: {
                entities: {
                  [applicantId1]: { id: applicantId1, first_name: 'Bob' },
                  [applicantId2]: { id: applicantId2, first_name: 'John'}
                },
                loaded: true,
                loading: false
              },
              [groupId2]: {
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

      describe('when payload has existing groupId and applicantId', () => {
        let payload, actual;
        beforeEach(() => {
          payload = { groupId: groupId1, applicantId: applicantId1 };
          const action: fromActions.ApplicantRejected = { type: fromActions.APPLICANT_REJECTED, payload: payload };
          actual = groupsReducer(state, action);
        });

        it('removes applicant from given group', () => {
          expect(Object.keys(actual.applicants.entities[groupId1].entities)).toEqual([String(applicantId2)]);
        })

        it("does not remove applicant from other group", () => {
          expect(Object.keys(actual.applicants.entities[groupId2].entities)).toEqual([String(applicantId1), String(applicantId2)])
        });
      })
    })
  })

  describe('AcceptApplicant', () => {
    describe('when intial state has applicants', () => {
      let state: Groups;
      const groupId1 = 1;
      const groupId2 = 2;
      const applicantId1 = 2;
      const applicantId2 = 3;
      beforeEach(() => {
        state = {
          ...groupsInitialState,
          accepted: {
            ...groupsInitialState.accepted,
            entities: {
              [groupId1]: {
                id: groupId1,
                name: 'Group A',
                size: 5,
                members: []
              }
            }
          },
          applicants: {
            entities: {
              [groupId1]: {
                entities: {
                  [applicantId1]: { id: applicantId1, first_name: 'Bob' },
                  [applicantId2]: { id: applicantId2, first_name: 'John'}
                },
                loaded: true,
                loading: false
              },
              [groupId2]: {
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

      describe('when payload has existing groupId and applicantId', () => {
        let payload, actual;
        beforeEach(() => {
          payload = { groupId: groupId1, applicantId: applicantId1 };
          const action: fromActions.ApplicantAccepted = { type: fromActions.APPLICANT_ACCEPTED, payload: payload };
          actual = groupsReducer(state, action);
        });

        it('removes applicant from given group', () => {
          expect(Object.keys(actual.applicants.entities[groupId1].entities)).toEqual([String(applicantId2)]);
        })

        it("does not remove applicant from other group", () => {
          expect(Object.keys(actual.applicants.entities[groupId2].entities)).toEqual([String(applicantId1), String(applicantId2)])
        });

        it("adds applicant to group members", () => {
          expect(actual.accepted.entities[groupId1].members).toContain({ id: applicantId1, first_name: 'Bob'})
        })
      })
    })
  })
});

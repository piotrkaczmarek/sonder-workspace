import { partiesReducer } from './parties.reducer';
import { partiesInitialState } from './parties.init';
import { Parties } from './parties.interfaces';
import * as fromActions from './parties.actions';

describe('partiesReducer', () => {
  describe('SuggestedPartiesLoaded', () => {
    describe('when initial state was empty', () => {
      let state: Parties;
      beforeEach(() => {
        state = partiesInitialState;
      })

      describe('when payload has parties', () => {
        let payload, actual;
        beforeEach(() => {
          payload = [{ id: 1, name: "Party A" }, { id: 2, name: "Party B" }];
          const action: fromActions.SuggestedPartiesLoaded = { type: fromActions.SUGGESTED_PARTIES_LOADED, payload: payload };
          actual = partiesReducer(state, action);
        })

        it('adds new suggested parties', () => {
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
      let state: Parties;
      const partyId1 = 1;
      const partyId2 = 2;
      const applicantId1 = 2;
      const applicantId2 = 3;
      beforeEach(() => {
        state = {
          ...partiesInitialState,
          applicants: {
            entities: {
              [partyId1]: {
                entities: {
                  [applicantId1]: { id: applicantId1, first_name: 'Bob' },
                  [applicantId2]: { id: applicantId2, first_name: 'John'}
                },
                loaded: true,
                loading: false
              },
              [partyId2]: {
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

      describe('when payload has existing partyId and applicantId', () => {
        let payload, actual;
        beforeEach(() => {
          payload = { partyId: partyId1, applicantId: applicantId1 };
          const action: fromActions.ApplicantRejected = { type: fromActions.APPLICANT_REJECTED, payload: payload };
          actual = partiesReducer(state, action);
        });

        it('removes applicant from given party', () => {
          expect(Object.keys(actual.applicants.entities[partyId1].entities)).toEqual([String(applicantId2)]);
        })

        it("does not remove applicant from other party", () => {
          expect(Object.keys(actual.applicants.entities[partyId2].entities)).toEqual([String(applicantId1), String(applicantId2)])
        });
      })
    })
  })
});

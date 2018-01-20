import { createSelector, createFeatureSelector } from "@ngrx/store";
import { Party } from "../models/party.model"

export interface SuggestedPartiesState {
  entities: { [id: number]: Party };
  loaded: boolean;
  loading: boolean;
}
export interface AcceptedPartiesState {
  entities: { [id: number]: Party };
  loaded: boolean;
  loading: boolean;
}
export interface Parties {
  // define state here
  suggested: SuggestedPartiesState;
  accepted: AcceptedPartiesState;
}

export interface PartiesState {
  readonly parties: Parties;
}

export const getAllParties = createSelector(createFeatureSelector<PartiesState>("parties"), state => state);
export const getSuggestedPartiesEntities = createSelector(getAllParties, (state: any) => {
  return Object.keys(state.suggested.entities).map(id => state.suggested.entities[parseInt(id, 10)]);
})

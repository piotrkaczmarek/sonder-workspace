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
  suggested: SuggestedPartiesState;
  accepted: AcceptedPartiesState;
}
export interface PartiesState {
  readonly parties: Parties;
}

export const getAllParties = createSelector(createFeatureSelector<PartiesState>("parties"), state => state);

export const getSuggestedParties = createSelector(getAllParties, (parties: any) => parties.suggested);
export const getSuggestedPartiesLoaded = createSelector(getSuggestedParties, suggestedParties => suggestedParties.loaded);
export const getSuggestedPartiesEntities = createSelector(getSuggestedParties, (suggestedParties: any) => {
  return Object.keys(suggestedParties.entities).map(id => suggestedParties.entities[parseInt(id, 10)]);
})

export const getAcceptedParties = createSelector(getAllParties, (parties: any) => parties.accepted);
export const getAcceptedPartiesLoaded = createSelector(getAcceptedParties, acceptedParties => acceptedParties.loaded);
export const getAcceptedPartiesEntities = createSelector(getAcceptedParties, (acceptedParties: any) => {
  return Object.keys(acceptedParties.entities).map(id => acceptedParties.entities[parseInt(id, 10)]);
})

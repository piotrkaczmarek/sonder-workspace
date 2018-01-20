import { createSelector, createFeatureSelector } from "@ngrx/store";

export interface Party {
  id: number;
  name: string;
}

export interface Parties {
  // define state here
  suggested: Party[];
  accepted: Party[];
}

export interface PartiesState {
  readonly parties: Parties;
}

export const getAllParties = createSelector(createFeatureSelector<PartiesState>("parties"), state => state);
export const getSuggestedParties = createSelector(getAllParties, (state: any) => state.suggested)

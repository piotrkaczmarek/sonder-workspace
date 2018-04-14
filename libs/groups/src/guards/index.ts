import { AcceptedGroupsLoadedGuard } from "./accepted-groups-loaded.guard";
import { SuggestedGroupsLoadedGuard } from "./suggested-groups-loaded.guard";
import { ApplicantsLoadedGuard } from "./applicants-loaded.guard";
export const guards: any[] = [
  AcceptedGroupsLoadedGuard,
  SuggestedGroupsLoadedGuard,
  ApplicantsLoadedGuard
];

export * from "./accepted-groups-loaded.guard";
export * from "./suggested-groups-loaded.guard";
export * from "./applicants-loaded.guard";

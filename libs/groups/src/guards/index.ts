import { AcceptedGroupsLoadedGuard } from "./accepted-groups-loaded.guard";
import { SuggestedGroupsLoadedGuard } from "./suggested-groups-loaded.guard";
import { ApplicantsLoadedGuard } from "./applicants-loaded.guard";
import { GroupPostsLoadedGuard } from "./group-posts-loaded.guard";

export const guards: any[] = [
  AcceptedGroupsLoadedGuard,
  SuggestedGroupsLoadedGuard,
  ApplicantsLoadedGuard,
  GroupPostsLoadedGuard
];

export * from "./accepted-groups-loaded.guard";
export * from "./suggested-groups-loaded.guard";
export * from "./applicants-loaded.guard";
export * from "./group-posts-loaded.guard";

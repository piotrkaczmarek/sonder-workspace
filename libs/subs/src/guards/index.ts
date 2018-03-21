import { AcceptedSubsLoadedGuard } from "./accepted-subs-loaded.guard";
import { SuggestedSubsLoadedGuard } from "./suggested-subs-loaded.guard";
import { ApplicantsLoadedGuard } from "./applicants-loaded.guard";
import { FeedLoadedGuard } from "./feed-loaded.guard";

export const guards: any[] = [
  AcceptedSubsLoadedGuard,
  SuggestedSubsLoadedGuard,
  ApplicantsLoadedGuard,
  FeedLoadedGuard
];

export * from "./accepted-subs-loaded.guard";
export * from "./suggested-subs-loaded.guard";
export * from "./applicants-loaded.guard";
export * from "./feed-loaded.guard";

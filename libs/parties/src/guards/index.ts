import { AcceptedSubsLoadedGuard } from "./accepted-subs-loaded.guard";
import { SuggestedSubsLoadedGuard } from "./suggested-subs-loaded.guard";
import { ApplicantsLoadedGuard } from "./applicants-loaded.guard";

export const guards: any[] = [AcceptedSubsLoadedGuard, SuggestedSubsLoadedGuard, ApplicantsLoadedGuard];

export * from "./accepted-subs-loaded.guard";
export * from "./suggested-subs-loaded.guard";
export * from "./applicants-loaded.guard";

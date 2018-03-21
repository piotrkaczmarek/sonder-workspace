import { AcceptedSubsLoadedGuard } from "./accepted-parties-loaded.guard";
import { SuggestedSubsLoadedGuard } from "./suggested-parties-loaded.guard";
import { ApplicantsLoadedGuard } from "./applicants-loaded.guard";

export const guards: any[] = [AcceptedSubsLoadedGuard, SuggestedSubsLoadedGuard, ApplicantsLoadedGuard];

export * from "./accepted-parties-loaded.guard";
export * from "./suggested-parties-loaded.guard";
export * from "./applicants-loaded.guard";

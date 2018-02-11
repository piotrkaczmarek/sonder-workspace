import { AcceptedPartiesLoadedGuard } from "./accepted-parties-loaded.guard";
import { SuggestedPartiesLoadedGuard } from "./suggested-parties-loaded.guard";
import { ApplicantsLoadedGuard } from "./applicants-loaded.guard";

export const guards: any[] = [AcceptedPartiesLoadedGuard, SuggestedPartiesLoadedGuard, ApplicantsLoadedGuard];

export * from "./accepted-parties-loaded.guard";
export * from "./suggested-parties-loaded.guard";
export * from "./applicants-loaded.guard";

import { AcceptedPartiesLoadedGuard } from "./accepted-parties-loaded.guard";
import { SuggestedPartiesLoadedGuard } from "./suggested-parties-loaded.guard";

export const guards: any[] = [AcceptedPartiesLoadedGuard, SuggestedPartiesLoadedGuard];

export * from "./accepted-parties-loaded.guard";
export * from "./suggested-parties-loaded.guard";

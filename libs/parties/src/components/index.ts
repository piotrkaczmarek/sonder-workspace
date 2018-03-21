import { NewSubPageComponent } from "./new-party-page/new-party-page.component";
import { SuggestedSubsComponent } from "./suggested-parties/suggested-parties.component";
import { SuggestedSubItemComponent } from "./suggested-party-item/suggested-party-item.component";
import { AcceptedSubsComponent } from "./accepted-parties/accepted-parties.component";
import { AcceptedSubItemComponent } from "./accepted-party-item/accepted-party-item.component";
import { AcceptedSubShowComponent } from "./accepted-party-show/accepted-party-show.component";
import { ApplicantsComponent } from "./applicants/applicants.component";

export const components: any[] = [SuggestedSubItemComponent, NewSubPageComponent, AcceptedSubsComponent, AcceptedSubItemComponent, SuggestedSubsComponent, AcceptedSubShowComponent, ApplicantsComponent];

export * from "./new-party-page/new-party-page.component";
export * from "./suggested-parties/suggested-parties.component";
export * from "./suggested-party-item/suggested-party-item.component";
export * from "./accepted-parties/accepted-parties.component";
export * from "./accepted-party-item/accepted-party-item.component";
export * from "./accepted-party-show/accepted-party-show.component";
export * from "./applicants/applicants.component";

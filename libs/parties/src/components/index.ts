import { NewPartyPageComponent } from "./new-party-page/new-party-page.component";
import { SuggestedPartiesComponent } from "./suggested-parties/suggested-parties.component";
import { SuggestedPartyItemComponent } from "./suggested-party-item/suggested-party-item.component";
import { AcceptedPartiesComponent } from "./accepted-parties/accepted-parties.component";
import { AcceptedPartyItemComponent } from "./accepted-party-item/accepted-party-item.component";
import { AcceptedPartyShowComponent } from "./accepted-party-show/accepted-party-show.component";
import { ApplicantsComponent } from "./applicants/applicants.component";

export const components: any[] = [SuggestedPartyItemComponent, NewPartyPageComponent, AcceptedPartiesComponent, AcceptedPartyItemComponent, SuggestedPartiesComponent, AcceptedPartyShowComponent, ApplicantsComponent];

export * from "./new-party-page/new-party-page.component";
export * from "./suggested-parties/suggested-parties.component";
export * from "./suggested-party-item/suggested-party-item.component";
export * from "./accepted-parties/accepted-parties.component";
export * from "./accepted-party-item/accepted-party-item.component";
export * from "./accepted-party-show/accepted-party-show.component";
export * from "./applicants/applicants.component";

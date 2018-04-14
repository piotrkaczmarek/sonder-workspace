import { NewGroupPageComponent } from "./new-group-page/new-group-page.component";
import { SuggestedGroupsComponent } from "./suggested-groups/suggested-groups.component";
import { SuggestedGroupItemComponent } from "./suggested-groups/suggested-group-item/suggested-group-item.component";
import { AcceptedGroupsComponent } from "./accepted-groups/accepted-groups.component";
import { AcceptedGroupItemComponent } from "./accepted-groups/accepted-group-item/accepted-group-item.component";
import { AcceptedGroupShowComponent } from "./accepted-groups/accepted-group-show/accepted-group-show.component";
import { ApplicantsComponent } from "./applicants/applicants.component";
import { GroupPostsComponent } from "./group-posts/group-posts.component";
import { PostItemComponent } from "./group-posts/post-item/post-item.component";
import { NewPostFormComponent } from "./group-posts/new-post-form/new-post-form.component";

export const components: any[] = [
  SuggestedGroupItemComponent,
  NewGroupPageComponent,
  AcceptedGroupsComponent,
  AcceptedGroupItemComponent,
  SuggestedGroupsComponent,
  AcceptedGroupShowComponent,
  ApplicantsComponent,
  GroupPostsComponent,
  PostItemComponent,
  NewPostFormComponent
];

export * from "./new-group-page/new-group-page.component";
export * from "./suggested-groups/suggested-groups.component";
export * from "./suggested-groups/suggested-group-item/suggested-group-item.component";
export * from "./accepted-groups/accepted-groups.component";
export * from "./accepted-groups/accepted-group-item/accepted-group-item.component";
export * from "./accepted-groups/accepted-group-show/accepted-group-show.component";
export * from "./applicants/applicants.component";
export * from "./group-posts/group-posts.component";
export * from "./group-posts/post-item/post-item.component";
export * from "./group-posts/new-post-form/new-post-form.component";

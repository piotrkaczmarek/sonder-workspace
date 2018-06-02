import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Route } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import {
  components,
  guards,
  PostsService,
  PostShowComponent,
  PostsListComponent,
  NewPostFormComponent,
  postsReducer,
  postsInitialState,
  PostsEffects,
  PostLoadedGuard,
  PostsLoadedGuard,
  PostCommentsLoadedGuard
} from "@sonder-workspace/posts";
import { BottomActionButtonComponent } from "@sonder-workspace/web-ui";
import {
  AcceptedGroupsLoadedGuard
} from "@sonder-workspace/groups";

import { AuthenticatedGuard, BACKEND_SERVICE } from "@sonder-workspace/auth";
import {
  MatExpansionModule,
  MatButtonModule,
  MatListModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatSelectModule
} from "@angular/material";

export const postsRoutes: Route[] = [
  {
    path: '',
    canActivate: [AuthenticatedGuard, PostsLoadedGuard],
    component: PostsListComponent
  },
  {
    path: "new",
    canActivate: [AuthenticatedGuard, AcceptedGroupsLoadedGuard],
    component: NewPostFormComponent
  },
  {
    path: ":postId",
    canActivate: [AuthenticatedGuard, PostLoadedGuard, PostCommentsLoadedGuard],
    component: PostShowComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatExpansionModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forFeature("posts", postsReducer, {
      initialState: postsInitialState
    }),
    EffectsModule.forFeature([PostsEffects])
  ],
  declarations: [...components, BottomActionButtonComponent],
  exports: [...components],
  providers: [
    PostsEffects,
    PostsService,
    ...guards
  ]
})
export class PostsModule {}

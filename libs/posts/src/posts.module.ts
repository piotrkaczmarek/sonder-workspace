import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { postsReducer } from './+state/posts.reducer';
import { postsInitialState } from './+state/posts.init';
import { PostsEffects } from './+state/posts.effects';
import { PostShowComponent } from './components/post-show/post-show.component';
import { CommentTreeComponent } from './components/comment-tree/comment-tree.component';
import { CommentItemComponent } from './components/comment-tree/comment-item/comment-item.component';
import { PostVoteButtonsComponent } from './components/vote-buttons/post-vote-buttons/post-vote-buttons.component';
import { CommentVoteButtonsComponent } from './components/vote-buttons/comment-vote-buttons/comment-vote-buttons.component';
import { PostsListComponent } from './components/posts-list/posts-list.component';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature("posts", postsReducer, {
      initialState: postsInitialState
    }),
    EffectsModule.forFeature([PostsEffects])
  ],
  providers: [PostsEffects],
  declarations: [CommentTreeComponent, PostShowComponent, CommentItemComponent, PostVoteButtonsComponent, CommentVoteButtonsComponent, PostsListComponent]
})
export class PostsModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { postsReducer } from './+state/posts.reducer';
import { postsInitialState } from './+state/posts.init';
import { PostsEffects } from './+state/posts.effects';

@NgModule({
  imports: [CommonModule, StoreModule.forFeature('posts', postsReducer, {initialState: postsInitialState}), EffectsModule.forFeature([PostsEffects])],
  providers: [PostsEffects]
})
export class PostsModule {
}

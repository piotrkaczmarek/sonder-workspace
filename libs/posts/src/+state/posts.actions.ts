import { Action } from "@ngrx/store";

export const LOAD_GROUP_POSTS = "[Groups] Load Group Posts";
export const GROUP_POSTS_LOADED = "[Groups] Group Posts Loaded";

export const CREATE_POST = "[Groups] Create Post";
export const POST_CREATED = "[Groups] Post Created";

export class LoadGroupPosts implements Action {
  readonly type = LOAD_GROUP_POSTS;
  constructor(public groupId: number) {}
}

export class GroupPostsLoaded implements Action {
  readonly type = GROUP_POSTS_LOADED;
  constructor(public data: any, public groupId: number) {}
}

export class CreatePost implements Action {
  readonly type = CREATE_POST;
  constructor(public payload: any, public groupId: number) {}
}

export class PostCreated implements Action {
  readonly type = POST_CREATED;
  constructor(public payload: any, public groupId: number) {}
}

export type PostsAction = LoadGroupPosts | GroupPostsLoaded | CreatePost | PostCreated;

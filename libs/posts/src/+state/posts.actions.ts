import { Action } from "@ngrx/store";

export const LOAD_GROUP_POSTS = "[Posts] Load Group Posts";
export const GROUP_POSTS_LOADED = "[Posts] Group Posts Loaded";

export const CREATE_POST = "[Posts] Create Post";
export const POST_CREATED = "[Posts] Post Created";

export const LOAD_POST_COMMENTS = "[Posts] Load Post Comments";
export const POST_COMMENTS_LOADED = "[Posts] Post Comments Loaded";

export const CREATE_COMMENT = "[Posts] Create Comment";
export const COMMENT_CREATED = "[Posts] Comment Created";

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

export class LoadPostComments implements Action {
  readonly type = LOAD_POST_COMMENTS;
  constructor(public postId: number) {}
}

export class PostCommentsLoaded implements Action {
  readonly type = POST_COMMENTS_LOADED;
  constructor(public data: any, public postId: number) {}
}

export class CreateComment implements Action {
  readonly type = CREATE_COMMENT;
  constructor(public payload: any, public postId: number) {}
}

export class CommentCreated implements Action {
  readonly type = COMMENT_CREATED;
  constructor(public data: any, public postId: number) {}
}

export type PostsAction =
  | LoadGroupPosts
  | GroupPostsLoaded
  | CreatePost
  | PostCreated
  | LoadPostComments
  | PostCommentsLoaded
  | CreateComment
  | CommentCreated;

import { Action } from "@ngrx/store";

export const LOAD_GROUP_POSTS = "[Posts] Load Group Posts";
export const GROUP_POSTS_LOADED = "[Posts] Group Posts Loaded";

export const LOAD_POST = "[Posts] Load Post";
export const POST_LOADED = "[Posts] Post Loaded";

export const LOAD_POSTS = "[Posts] Load Posts";
export const POSTS_LOADED = "[Posts] Posts Loaded";

export const CREATE_POST = "[Posts] Create Post";
export const POST_CREATED = "[Posts] Post Created";

export const LOAD_POST_COMMENTS = "[Posts] Load Post Comments";
export const POST_COMMENTS_LOADED = "[Posts] Post Comments Loaded";

export const CREATE_COMMENT = "[Posts] Create Comment";
export const COMMENT_CREATED = "[Posts] Comment Created";

export const UPVOTE_COMMENT = "[Posts] Upvote Comment";
export const COMMENT_UPVOTED = "[Posts] Comment Upvoted";

export const DOWNVOTE_COMMENT = "[Posts] Downvote Comment";
export const COMMENT_DOWNVOTED = "[Posts] Comment Downvoted";

export const UPVOTE_POST = "[Posts] Upvote Post";
export const POST_UPVOTED = "[Posts] Post Upvoted"

export const DOWNVOTE_POST = "[Posts] Downvote Post";
export const POST_DOWNVOTED = "[Posts] Post Downvoted";

export const REVOKE_POST_VOTE = "[Posts] Revoke Post Vote";
export const POST_VOTE_REVOKED = "[Posts] Post Vote Revoked";

export const REVOKE_COMMENT_VOTE = "[Posts] Revoke Comment Vote";
export const COMMENT_VOTE_REVOKED = "[Posts] Comment Vote Revoked";

export class LoadGroupPosts implements Action {
  readonly type = LOAD_GROUP_POSTS;
  constructor(public groupId: number) {}
}

export class GroupPostsLoaded implements Action {
  readonly type = GROUP_POSTS_LOADED;
  constructor(public data: any, public groupId: number) {}
}

export class LoadPost implements Action {
  readonly type = LOAD_POST;
  constructor(public postId: number) {}
}

export class PostLoaded implements Action {
  readonly type = POST_LOADED;
  constructor(public payload: any, public postId: number) {}
}

export class LoadPosts implements Action {
  readonly type = LOAD_POSTS;
  constructor() {}
}

export class PostsLoaded implements Action {
  readonly type = POSTS_LOADED;
  constructor(public payload: any) {}
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

export class UpvoteComment implements Action {
  readonly type = UPVOTE_COMMENT;
  constructor(public commentId: number, public postId: number) {}
}

export class CommentUpvoted implements Action {
  readonly type = COMMENT_UPVOTED;
  constructor(public commentId: number, public postId: number) {}
}

export class DownvoteComment implements Action {
  readonly type = DOWNVOTE_COMMENT;
  constructor(public commentId: number, public postId: number) {}
}

export class CommentDownvoted implements Action {
  readonly type = COMMENT_DOWNVOTED;
  constructor(public commentId: number, public postId: number) {}
}

export class UpvotePost implements Action {
  readonly type = UPVOTE_POST;
  constructor(public postId: number) {}
}

export class PostUpvoted implements Action {
  readonly type = POST_UPVOTED;
  constructor(public postId: number) {}
}

export class DownvotePost implements Action {
  readonly type = DOWNVOTE_POST;
  constructor(public postId: number) {}
}

export class PostDownvoted implements Action {
  readonly type = POST_DOWNVOTED;
  constructor(public postId: number) {}
}

export class RevokePostVote implements Action {
  readonly type = REVOKE_POST_VOTE;
  constructor(public postId: number) {}
}

export class PostVoteRevoked implements Action {
  readonly type = POST_VOTE_REVOKED;
  constructor(public postId: number) {}
}

export class RevokeCommentVote implements Action {
  readonly type = REVOKE_COMMENT_VOTE;
  constructor(public commentId, public postId: number) {}
}

export class CommentVoteRevoked implements Action {
  readonly type = COMMENT_VOTE_REVOKED;
  constructor(public commentId, public postId: number) {}
}

export type PostsAction =
  | LoadGroupPosts
  | GroupPostsLoaded
  | LoadPost
  | PostLoaded
  | LoadPosts
  | PostsLoaded
  | CreatePost
  | PostCreated
  | LoadPostComments
  | PostCommentsLoaded
  | CreateComment
  | CommentCreated
  | UpvoteComment
  | CommentUpvoted
  | DownvoteComment
  | CommentDownvoted
  | UpvotePost
  | PostUpvoted
  | DownvotePost
  | PostDownvoted
  | RevokePostVote
  | PostVoteRevoked
  | RevokeCommentVote
  | CommentVoteRevoked;

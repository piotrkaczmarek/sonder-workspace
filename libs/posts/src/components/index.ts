import { GroupPostsComponent } from "./group-posts/group-posts.component";
import { PostItemComponent } from "./group-posts/post-item/post-item.component";
import { NewPostFormComponent } from "./group-posts/new-post-form/new-post-form.component";
import { PostShowComponent } from "./post-show/post-show.component";
import { CommentTreeComponent } from "./comment-tree/comment-tree.component";
import { CommentItemComponent } from "./comment-tree/comment-item/comment-item.component";

export const components: any[] = [
  GroupPostsComponent,
  PostItemComponent,
  NewPostFormComponent,
  PostShowComponent,
  CommentTreeComponent,
  CommentItemComponent
];

export * from "./group-posts/group-posts.component";
export * from "./group-posts/post-item/post-item.component";
export * from "./group-posts/new-post-form/new-post-form.component";
export * from "./post-show/post-show.component";
export * from "./comment-tree/comment-tree.component";
export * from "./comment-tree/comment-item/comment-item.component";

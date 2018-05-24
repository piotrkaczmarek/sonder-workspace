import { PostsState } from "./posts.interfaces";

export const postsInitialState: PostsState = {
  posts: {
    entities: {
    },
    loaded: false,
    loading: false
  },
  postsByGroups: {
    entities: {
    }
  },
  commentsByPosts: {
    entities: {
    }
  }
};

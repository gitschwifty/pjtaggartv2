import {
  PostState,
  PostActionType,
  UPDATE_POSTS,
  CLEAR_POST
} from '../Types/postTypes';

const initialState: PostState = {
  posts: []
};

export default function postReducer(
  state = initialState,
  action: PostActionType
): PostState {
  switch (action.type) {
    case UPDATE_POSTS:
      return {
        posts: [...state.posts, ...action.payload]
      };
    case CLEAR_POST:
      return {
        posts: state.posts.filter(post => post.url !== action.key)
      };
    default:
      return state;
  }
}

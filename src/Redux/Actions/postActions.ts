import { Discussion } from 'dsteem';
import { UPDATE_POSTS, CLEAR_POST } from '../Types/postTypes';

export function updatePosts(newPosts: Discussion[]) {
  return {
    type: UPDATE_POSTS,
    payload: newPosts
  };
}

export function clearPost(key: string) {
  return {
    type: CLEAR_POST,
    key: key
  };
}

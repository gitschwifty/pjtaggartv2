import { Discussion } from 'dsteem';

export interface PostState {
  posts: Discussion[];
}

export const UPDATE_POSTS = 'UPDATE_POSTS';
export const CLEAR_POST = 'CLEAR_POST';

interface UpdatePostAction {
  type: typeof UPDATE_POSTS;
  payload: Discussion[];
}

interface ClearPostAction {
  type: typeof CLEAR_POST;
  key: string;
}

export type PostActionType = UpdatePostAction | ClearPostAction;

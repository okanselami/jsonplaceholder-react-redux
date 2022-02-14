import postReducer from '../state/post/postSlice';
import userReducer from '../state/user/userSlice';
import commentReducer from '../state/comment/commentSlice';
import replyReducer from '../state/reply/replySlice';
import tagsReducer from '../state/tag/tagSlice';

export const reducer = {
  posts: postReducer,
  users: userReducer,
  comments: commentReducer,
  replies: replyReducer,
  tags: tagsReducer,
};

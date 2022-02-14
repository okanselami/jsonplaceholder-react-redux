import { request } from '../../utils/request';
import { User, Post } from './types';

const API = {
  getUsers: () => request.get('/users'),
  getPosts: () => request.get('/posts'),
  getCommentsByPostId: (postId: string) =>
    request.get(`/posts/${postId}/comments`),
};

export type { User, Post };

export default API;

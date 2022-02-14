import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';

import { getCommentsByPostIdAsync } from '../../state/comment/commentSlice';
import { postReply } from '../../state/reply/replySlice';
import { postTags, selectTags } from '../../state/tag/tagSlice';

import styles from './index.module.css';
import { Card, Typography } from 'antd';

import { ReplyComment, TagsComment } from './types';

// Components
import Reply from '../../components/reply';
import Tag from '../../components/tag';

function Comments() {
  const dispatch = useAppDispatch();
  const selectedPostId = useAppSelector((state) => state.posts.selectedPostId);
  const { data, loading, error } = useAppSelector((state) => state.comments);

  const reply = useAppSelector((state) => state.replys);
  const tags = useAppSelector((state) => state.tags);
  const currentTags = useAppSelector((state) => selectTags(state.tags));

  /**
   *
   */
  useEffect(() => {
    if (selectedPostId) {
      dispatch(getCommentsByPostIdAsync(selectedPostId));
    }
  }, [selectedPostId]);

  /**
   *
   * @param postId
   * @param commentId
   */
  const handlePost = ({ postId, commentId, reply }: ReplyComment) => {
    dispatch(
      postReply({
        postId,
        commentId,
        reply,
      })
    );
  };

  const handleTags = ({ postId, commentId, tag }: TagsComment) => {
    dispatch(
      postTags({
        postId,
        commentId,
        tag,
      })
    );
  };

  /**
   * load comments
   */
  if (loading) {
    return <div>Loading...</div>;
  }
  /**
   * Error
   */
  if (error) {
    return <div>{Error}</div>;
  }

  /**
   *  No comments
   */
  if (!data) {
    return <div>No comments</div>;
  }

  // early return if no post selected
  if (selectedPostId === null) {
    return null;
  }

  return (
    <>
      <Typography.Title>Comments</Typography.Title>
      {data.map((item) => {
        const commentReply = reply.data.find(
          (reply) => reply.commentId === item.id && reply.postId === item.postId
        );

        const commentTags = tags.data.find(
          (tag) => tag.commentId === item.id && tag.postId === item.postId
        );

        return (
          <Card
            key={item.id}
            actions={[
              <Tag
                {...item}
                commentTags={commentTags?.tags}
                handleTags={handleTags}
                currentTags={currentTags}
              />,
            ]}
            id={styles['card--container']}
          >
            <Reply
              {...item}
              handlePost={handlePost}
              commentReply={commentReply}
            />
          </Card>
        );
      })}
    </>
  );
}

export default Comments;

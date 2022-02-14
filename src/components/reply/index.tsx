import React from 'react';
import { Comment, Form, Input, Button } from 'antd';

type ReplyProps = {
  body?: string;
  id?: number;
  email?: string;
  postId?: number;
  commentReply?: { reply?: string };
  handlePost?: any;
};

const Reply: React.FC<ReplyProps> = (props) => {
  const [reply, setReply] = React.useState('');
  const [replyTo, setReplyTo] = React.useState(false);
  const { body, id, postId, email, commentReply, handlePost } = props;

  return (
    <>
      <Comment
        actions={
          !commentReply
            ? [
                <span
                  onClick={() => setReplyTo(true)}
                  key='comment-nested-reply-to'
                >
                  Reply to
                </span>,
              ]
            : []
        }
        author={<a>{email}</a>}
        content={<p>{body}</p>}
      >
        <div key={postId}>
          {commentReply && (
            <>
              <Comment
                author={<a>Anonymous User</a>}
                content={<p>{commentReply.reply}</p>}
              ></Comment>
            </>
          )}
        </div>
      </Comment>
      {replyTo && !commentReply && (
        <>
          <Form.Item>
            <Input.TextArea
              rows={4}
              onChange={(e) => setReply(e.target.value)}
              value={reply}
            />
          </Form.Item>
          <Form.Item>
            <Button
              htmlType='submit'
              onClick={() =>
                handlePost({ postId: postId, commentId: id, reply })
              }
              type='primary'
            >
              Add Reply
            </Button>
          </Form.Item>
        </>
      )}
    </>
  );
};

export default Reply;

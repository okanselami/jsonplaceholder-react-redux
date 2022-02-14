import React from 'react';
import { Select } from 'antd';

type TagProps = {
  body?: string;
  id?: number;
  postId?: number;
  handleTags: any;
  commentTags?: any;
  currentTags?: string[];
};

const Tag: React.FC<TagProps> = (props) => {
  const { postId, id, commentTags,  currentTags, handleTags } = props;

  return (
    <>
      <Select
        mode='tags'
        style={{ width: '80%' }}
        placeholder='Enter tags'
        onDeselect={() => false}
        value={commentTags}
        onChange={(value) => handleTags({ postId, commentId: id, tag: value })}
      >
        {currentTags?.map((tag) => (
          <Select.Option key={tag} value={tag}>
            {tag}
          </Select.Option>
        ))}
      </Select>
    </>
  );
};

export default Tag;

import { useState, useEffect, useRef, useCallback } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { useOnScreen } from '../../hooks/useOnScreen';

import { selectPostId } from '../../state';

// constants
import { PAGE_SIZE } from '../../utils/constants';

// components
import { Card } from 'antd';

import styles from './index.module.css';

function Posts() {
  const dispatch = useAppDispatch();

  // create ref object to attach bottomline detection
  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useOnScreen(ref);

  // set page number to infinite scroll
  const [page, setPage] = useState<number>(0);

  // selectors
  const posts = useAppSelector((state) => state.posts);
  const users = useAppSelector((state) => state.users);

  /**
   *
   */
  useEffect(() => {
    if (entry && !posts.loading) {
      setPage((state) => state + 1);
    }
  }, [entry, posts.loading]);

  // filter posts by user
  const filterPostsByUser = useCallback(() => {
    return users.selectedUser
      ? posts.data.filter(
          (post) => post.userId.toString() === users.selectedUser
        )
      : posts.data;
  }, [posts, users.selectedUser]);

  return (
    <div className={styles.container}>
      <div className={styles.posts}>
        {filterPostsByUser()
          .slice(0, page + 1 * PAGE_SIZE)
          .map((post) => (
            <Card
              key={post.id}
              style={{
                cursor: 'pointer',
                margin: '10px',
                backgroundColor:
                  posts.selectedPostId === post.id ? '#f5f5f5' : '#fff',
              }}
              actions={[
                <div>
                  By {users.data.find((user) => user.id === post.userId)?.name}
                </div>,
              ]}
              onClick={() => dispatch(selectPostId(post.id))}
              title={post.title}
            >
              <div>{post.body}</div>
              <div></div>
            </Card>
          ))}
      </div>
      <div
        ref={ref}
        id='bottom'
        style={{ width: '10px', height: '10px' }}
      ></div>
    </div>
  );
}

export default Posts;

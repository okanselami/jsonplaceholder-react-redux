import React, { useEffect } from 'react';
import { Comment, Filter, Post } from './container';

import 'antd/dist/antd.css';

import { Layout, Row, Col } from 'antd';

// redux dispatchers
import { getPostsAsync } from './state/post/postSlice';
import { getUsersAsync } from './state/user/userSlice';
import { useAppDispatch } from './app/hooks';

function App() {
  const dispatch = useAppDispatch();

  /**
   *
   */
  useEffect(() => {
    dispatch(getPostsAsync());
    dispatch(getUsersAsync());
  }, []);

  const { Header, Content, Sider } = Layout;

  return (
    <>
      <Layout>
        <Header className='header'>
          <Filter />
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Layout style={{ padding: '24px 0' }}>
            <Sider
              style={{ backgroundColor: 'transparent' }}
              width={400}
            >
              <Post />
            </Sider>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
              <Comment />
            </Content>
          </Layout>
        </Content>
      </Layout>
    </>
  );
}

export default App;

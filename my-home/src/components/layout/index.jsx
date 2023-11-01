import { useContext, useState } from 'react';

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  CalendarOutlined
} from '@ant-design/icons';

import { Layout, Menu, Button, theme } from 'antd';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { SearchContexts } from '../../context/Context';

const { Header, Sider, Content } = Layout;


const Layouts = () => {
  const { setSearchContext } = useContext(SearchContexts)

  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false);
  const currentYear = new Date().getFullYear().toString().slice(-2);

  function handleClick(index) {
    setSearchContext(`20${index}`)
  }

  const items = []
  for (let index = 15; index <= currentYear; index++) {
    items.push({
      key: `/${index}`,
      icon: <CalendarOutlined />,
      label: <Link to={`/20${index}`} onClick={() => handleClick(index)}>20{index}</Link>,
    });
  }


  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout className='admin-layout'>
      <Sider trigger={null} collapsible collapsed={collapsed}>
      <Link className="demo-logo-vertical" to='/'>MY HOME</Link>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[location.pathname]}
          items={items}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default Layouts;
import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { AppstoreAddOutlined, DashboardOutlined } from '@ant-design/icons';
import './Sidebar.css';

const { Sider } = Layout;

const Sidebar = () => {
  return (
    <Sider width={200} className="sidebar">
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        style={{ height: '100%', borderRight: 0 }}
      >
        <Menu.Item key="1" icon={<DashboardOutlined />}>
          <Link to="/dashboard">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<AppstoreAddOutlined />}>
          <Link to="/add-student">Add Student</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;

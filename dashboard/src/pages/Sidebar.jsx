import React from 'react';
import { Layout, Menu } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import {
  AppstoreAddOutlined,
  UserAddOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import './Sidebar.css';
import logo from '../assets/smu emblem.png';

const { Sider } = Layout;

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <Sider width={240} className="sidebar">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="sidebar-logo" />
        <div className="menu-header">Main Menu</div>
      </div>

      <div className="menu-top">
        <Menu mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<AppstoreAddOutlined />}>
            <Link to="/add-student">Add Student</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<UserAddOutlined />}>
            <Link to="/user-management">Manage User</Link>
          </Menu.Item>
        </Menu>
      </div>

      <div className="menu-bottom">
        <Menu mode="inline">
          <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
            Logout
          </Menu.Item>
        </Menu>
      </div>
    </Sider>
  );
};

export default Sidebar;

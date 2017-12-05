import React from 'react';
import { Menu, Icon } from 'antd';
import styles from './style.scss';
const SubMenu = Menu.SubMenu;
import { Link } from 'dva/router';

function Header({ location, navs }) {
  const menu_nav = navs && navs.map((nav) => {
    return (
      <Menu.Item key={nav.value.name}>
        <Link to={nav.value.link}>{nav.value.name}</Link>
      </Menu.Item>
    );
  });
  return (
    <Menu
      selectedKeys={[location.pathname]}
      mode="horizontal"
      theme="dark"x
    >
      <Menu.Item key="/">
        <Link to="/"><Icon type="apple-o" />Logo</Link>
      </Menu.Item>
      {menu_nav}
    </Menu>
  );
}

export default Header;

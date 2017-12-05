import React from 'react';
import { Menu, Icon } from 'antd';
import styles from './style.scss';
const SubMenu = Menu.SubMenu;
import { Link } from 'dva/router';

function Header({ location, navs }) {
  // console.info('header', navs);
  const menu_nav = navs && navs.map((nav,idx) => {
    return (
      <Menu.Item key={idx}>
        <Link to={nav.link}>{nav.caption}</Link>
      </Menu.Item>
    );
  });
  return (
    <Menu
      selectedKeys={[location.pathname]}
      mode="horizontal"
      theme="dark"
    >
      <Menu.Item key="/">
        <Link to="/"><Icon type="apple-o" />Logo</Link>
      </Menu.Item>
      {menu_nav}
    </Menu>
  );
}

export default Header;

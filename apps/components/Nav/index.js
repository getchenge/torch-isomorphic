import React, { Component } from 'react';
// import { List, ListItem, makeSelectable } from 'material-ui/List';
// import styles from './style.css';
import { NavLink, Link } from 'react-router-dom';
import styles from './style.scss';
console.info('styles', styles);

class Nav extends Component {
  render() {
    const nav_item = [{ name: 'google', link: 'http://google.com' },
    { name: 'facebook', link: 'http://facebook.com' },
    { name: 'twitter', link: 'http://twitter.com' }];
    const list = nav_item.map((item) => {
      return (<li className={styles.item}><a href={item.link}>{item.name}</a></li>);
    });
    return (
      <ul className={styles.nav}>
        {list}
      </ul>
    );
  }
}

export default Nav;
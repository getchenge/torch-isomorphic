import React, { Component } from 'react';
// import { List, ListItem, makeSelectable } from 'material-ui/List';
// import styles from './style.css';
import { NavLink, Link } from 'react-router-dom';
import styles from './style.scss';
console.info('styles', styles);

class Nav extends Component {
  render() {
    const nav_item = [{ name: 'google', link: 'http://google.com', tabs: [{ name: 'google+', link: 'http://google.com/plus' }, { name: 'google-', link: 'http://google.com/minus' }] },
    { name: 'facebook', link: 'http://facebook.com', tabs: [{ name: 'google+', link: 'http://google.com/plus' }, { name: 'google-', link: 'http://google.com/minus' }] },
    { name: 'twitter', link: 'http://twitter.com', tabs: [{ name: 'google+', link: 'http://google.com/plus' }, { name: 'google-', link: 'http://google.com/minus' }] }];
    const list = nav_item.map((item) => {
      let tabs = '';
      if (item.tabs) {
        console.info('item.tabs', item.tabs);
        const tabs_obj = item.tabs.map(tab => {
          return (<li><a href={tab.link}>{tab.name}</a></li>);
        });
        tabs = (<ul className={styles.tabnpms}>{tabs_obj}</ul>);
      }
      return (<li className={styles.item}><a href={item.link}>{item.name}</a>{tabs}</li>);
    });
    return (
      <ul className={styles.nav}>
        {list}
      </ul>
    );
  }
}

export default Nav;
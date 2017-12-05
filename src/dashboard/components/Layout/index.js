import React, { Component, PropTypes } from 'react';
import styles from './style.css';
import NavBar from '../../components/NavBar';
class Layout extends Component {
  render() {
    const { clildren, left, right, location, list } = this.props;
    return (
      <div className={styles.container}>
        <NavBar className={styles.left} location={location} list={list} />
        <div className={styles.right}>{right}</div>
      </div>
    );
  }
}

export default Layout;

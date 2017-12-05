import React from 'react';
import styles from './MainLayout.css';
// import Header from './Header';

function MainLayout({ header, children, location }) {
  return (
    <div className={styles.normal}>
      <div>{header}</div>
      {/* <Header location={location} /> */}
      <div className={styles.content}>
        <div className={styles.main}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default MainLayout;

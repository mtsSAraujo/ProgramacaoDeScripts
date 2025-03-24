import React from 'react';
import Header from './Header';
import MenuContainer from './MenuContainer';
import styles from '@/app/pastelaria/css/layout.module.css';

const Layout = ({ children }) => {
  return (
    <div className={styles.mainLayout}>
      <Header />
      <MenuContainer>
        {children}
      </MenuContainer>
    </div>
  );
};

export default Layout;
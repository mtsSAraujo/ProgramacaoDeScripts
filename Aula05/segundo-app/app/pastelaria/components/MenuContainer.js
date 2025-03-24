import React from 'react';
import styles from '@/app/pastelaria/css/menu.module.css';

const MenuContainer = ({ children }) => {
  return (
    <div className={styles.menuWrapper}>
      <div className={styles.menuContent}>
        {children}
      </div>
    </div>
  );
};

export default MenuContainer;
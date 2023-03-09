import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import styles from './style.module.scss';

const Header = () => (
  <header>
    <Link to='/'>
      <h1 className={styles.h1}>React SSR</h1>
    </Link>

    <hr />
  </header>
);

export default memo(Header);

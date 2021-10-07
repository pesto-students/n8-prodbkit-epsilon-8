import React from 'react';

import styles from './loader.module.scss';

const Loader: React.FC = () => {
  return (
    <div className={styles.lds_ellipsis}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Loader;

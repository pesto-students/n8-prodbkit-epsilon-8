import React from 'react';

import AntDButton from '../button/Button';
import styles from './errorUI.module.scss';

interface IError {
  error: Error;
  resetErrorBoundary: (...args: Array<unknown>) => void;
}

const ErrorUI: React.FC<IError> = ({ error, resetErrorBoundary }) => {
  console.log(error);
  return (
    <div className={styles.errorWrapper}>
      <p className={styles.errorMessage}>Some Error Occurred.</p>
      <AntDButton type="primary" onClick={resetErrorBoundary} text="Retry" />
    </div>
  );
};

export default ErrorUI;

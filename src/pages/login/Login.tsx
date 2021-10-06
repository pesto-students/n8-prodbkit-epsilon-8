import React from 'react';

import { Form, Input, Button, Divider } from 'antd';

import styles from './login.module.scss';
import { useDispatch } from 'react-redux';
import { showDrawer } from '../../redux-features/common';

const Login: React.FC = () => {
  const dispatch = useDispatch();

  const navigateToSignup = () => {
    // e.preventDefault();
    dispatch(showDrawer('signup'));
  };

  return (
    <div className={styles.loginWrapper}>
      <Form
        layout="vertical"
        // form={form}
        // onValuesChange={onFormLayoutChange}
      >
        <Form.Item label="Email id">
          <Input placeholder="Enter your email id" size="large" />
        </Form.Item>
        <Form.Item label="Password">
          <Input placeholder="Enter your password" size="large" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" size="large" className={styles.formBtn}>
            Submit
          </Button>
        </Form.Item>
        <Divider plain>OR</Divider>
        <Form.Item>
          <Button type="primary" size="large" className={styles.formBtn}>
            Login via google
          </Button>
        </Form.Item>
        <Divider orientation="right" plain>
          {"Don't have an account?"}
          <Button type="link" onClick={navigateToSignup}>
            Signup
          </Button>
          here.
        </Divider>
      </Form>
    </div>
  );
};

export default Login;

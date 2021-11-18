import { Form, Input, notification, Select, Space } from 'antd';
import React, { useEffect } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { hideDrawer } from 'redux-features/commonDrawer';
import { EnvironmentOptions, ModeOptions, PlatformOptions, RoleOptions } from 'shared/constants';

import AntDButton from '../../../../shared/components/atoms/button/Button';
import Loader from '../../../../shared/components/atoms/loader/Loader';
import { IGlobalState } from '../../../../shared/interfaces/globalState';
import {
  fetchUserCredentialsList,
  handleUserCredentialsSubmit,
  handleUserCredentialsUpdate,
} from '../../services/userCredentials.service';
import styles from './databaseForm.module.scss';
import { formatFormData } from './userCredentialsForm.helper';
const { Option } = Select;

const DatabaseForm: React.FC = () => {
  const [form] = Form.useForm();
  const commonStoreData = useSelector((state: IGlobalState) => state.common);
  const dispatch = useDispatch();
  const selectedUserCredentialsId = commonStoreData.id;
  const isReadOnly = commonStoreData.isDrawerFormReadOnly;
  const userCredentialsAPIResponse = useQuery('user-credentials', fetchUserCredentialsList, {
    retry: false,
  });
  const { data } = userCredentialsAPIResponse;

  const userCredentialsSubmit = useMutation(handleUserCredentialsSubmit, { retry: false });
  const userCredentialseUpdate = useMutation((data: any) => handleUserCredentialsUpdate(data), {
    retry: false,
  });

  useEffect(() => {
    form.setFieldsValue({
      name: '',
      description: '',
      connection_string: '',
      cluster_id: '',
      platform: '',
      environment: '',
      mode: '',
    });
    if (!!selectedUserCredentialsId) {
      if (data) {
        const dbData = data.data as any;
        const dataById = dbData.filter((item: any) => item.id === selectedUserCredentialsId);
        if (dataById.length) {
          const dataAtIndex0 = dataById[0];
          form.setFieldsValue({
            name: dataAtIndex0.name,
            description: dataAtIndex0.description,
            connection_string: dataAtIndex0.connection_string,
            cluster_id: dataAtIndex0.cluster_id,
            platform: dataAtIndex0.platform,
            environment: dataAtIndex0.environment,
            mode: dataAtIndex0.mode,
          });
        }
      }
    }
  }, []);

  const successCallback = (action: 'created' | 'updated' | 'deleted') => {
    dispatch(hideDrawer());
    notification.success({
      message: `User credential ${action} successfully`,
    });
  };

  const failureCallback = () => {
    notification.error({
      message: 'Something went wrong. Please try again',
    });
  };

  const handleFormSave = () => {
    if (!!selectedUserCredentialsId) {
      handleUpdateMember(selectedUserCredentialsId);
    } else {
      handleCreateDatabase();
    }
  };

  const handleCreateDatabase = () => {
    const formattedData = formatFormData(form.getFieldsValue()) as any;
    userCredentialsSubmit.mutate(formattedData, {
      onSuccess: () => successCallback('created'),
      onError: failureCallback,
    });
  };

  const handleUpdateMember = (id: string) => {
    const formattedData = formatFormData(form.getFieldsValue());
    userCredentialseUpdate.mutate(
      { data: formattedData, id: id },
      {
        onSuccess: () => {
          successCallback('updated');
        },
        onError: () => {
          failureCallback();
        },
      },
    );
  };

  const handleFormCancel = () => {
    dispatch(hideDrawer());
  };

  const handleFormChanges = (changedFields: any) => {
    form.setFieldsValue({
      ...form.getFieldsValue(),
      ...changedFields,
    });
  };

  if (userCredentialsAPIResponse.isLoading) {
    return <Loader />;
  }

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFormSave}
      onFieldsChange={handleFormChanges}
    >
      <Form.Item name="name" label="Database name" rules={[{ required: true, type: 'string' }]}>
        <Input placeholder="Enter Database name" size="large" disabled={isReadOnly} />
      </Form.Item>

      <Form.Item name="description" label="Description">
        <Input.TextArea placeholder="Enter a description" size="large" disabled={isReadOnly} />
      </Form.Item>

      <Form.Item name="cluster" label="Cluster name" rules={[{ required: true, type: 'string' }]}>
        <Input placeholder="Enter Cluster name" size="large" disabled={isReadOnly} />
      </Form.Item>

      <Form.Item
        name="connectionString"
        label="Connection string"
        rules={[{ required: true, type: 'string' }]}
      >
        <Input placeholder="Enter connection string" size="large" disabled={isReadOnly} />
      </Form.Item>

      <Form.Item name="platform" label="Platform" rules={[{ required: true }]}>
        <Select placeholder="Select a platform" allowClear disabled={isReadOnly}>
          {PlatformOptions.map((item: Record<string, string>, index: number) => (
            <Option key={`env${index}`} value={item.value}>
              {item.key}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="environment" label="Environment" rules={[{ required: true }]}>
        <Select placeholder="Select an environment" disabled={isReadOnly} allowClear>
          {EnvironmentOptions.map((item: Record<string, string>, index: number) => (
            <Option key={`env${index}`} value={item.value}>
              {item.key}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="mode" label="Mode" rules={[{ required: true }]}>
        <Select placeholder="Select a mode" disabled={isReadOnly} allowClear>
          {ModeOptions.map((item: Record<string, string>, index: number) => (
            <Option key={`mode${index}`} value={item.value}>
              {item.key}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="access" label="Access level" rules={[{ required: true }]}>
        <Select placeholder="Select access level" disabled={isReadOnly} allowClear>
          {RoleOptions.map((roleItem: Record<string, string>, index: number) => (
            <Option key={`role${index}`} value={roleItem.value}>
              {roleItem.key}
            </Option>
          ))}
        </Select>
      </Form.Item>
      {!isReadOnly && (
        <div className={styles.formFooterButtons}>
          <Space direction="horizontal" size={16}>
            <Form.Item>
              <AntDButton type="link" onClick={handleFormCancel} text="Cancel" />
            </Form.Item>
            <Form.Item>
              <AntDButton type="primary" htmlType="submit" text="Save" />
            </Form.Item>
          </Space>
        </div>
      )}
    </Form>
  );
};

export default DatabaseForm;

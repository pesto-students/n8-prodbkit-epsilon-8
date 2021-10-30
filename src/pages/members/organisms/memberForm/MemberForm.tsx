import { Form, Input, notification, Select, Space } from 'antd';
import React, { useEffect } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { hideDrawer } from 'redux-features/commonDrawer';
import { RoleOptions } from 'shared/constants';

import AntDButton from '../../../../shared/components/atoms/button/Button';
import { IGlobalState } from '../../../../shared/interfaces/globalState';
import {
  fetchMemberList,
  handleMemberDelete,
  handleMemberSubmit,
  // handleMemberUpdate,
} from '../../services/members.service';
import { formatFormData } from './memberForm.helper';
import styles from './memberForm.module.scss';
const { Option } = Select;

const MemberForm: React.FC = () => {
  const [form] = Form.useForm();
  const commonStoreData = useSelector((state: IGlobalState) => state.common);
  const dispatch = useDispatch();

  const { id, urlId, isDrawerFormReadOnly } = commonStoreData;
  const memberSubmit = useMutation(
    (formData: any) => handleMemberSubmit({ data: formData, id: urlId }),
    { retry: false },
  );

  // const memberUpdate = useMutation(
  //   (formData: any) => handleMemberUpdate({ data: formData, id: urlId }),
  //   { retry: false },
  // );

  const memberAPIResponse = useQuery(`member${urlId}`, () => fetchMemberList(urlId), {
    retry: false,
  });

  const { data, refetch } = memberAPIResponse;

  useEffect(() => {
    form.setFieldsValue({
      name: '',
      email: '',
      role: null,
    });
    if (!!id && data) {
      const memberData = data.data as any;
      const dataById = memberData.filter((item: any) => item.id === id);
      if (dataById.length) {
        const dataAtIndex0 = dataById[0];
        form.setFieldsValue({
          name: dataAtIndex0.name,
          email: dataAtIndex0.email,
          role: dataAtIndex0.role,
        });
      }
    }
  }, []);

  const successCallback = (action: 'created' | 'updated' | 'deleted') => {
    dispatch(hideDrawer());
    notification.success({
      message: `Member ${action} successfully`,
    });
    refetch();
  };

  const handleFailedToSave = () => {
    notification.error({
      message: 'Something went wrong. Please try again',
    });
  };

  const handleCreateMember = () => {
    const formattedData = formatFormData(form.getFieldsValue()) as any;
    memberSubmit.mutate(formattedData, {
      onSuccess: () => successCallback('created'),
      onError: handleFailedToSave,
    });
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

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleCreateMember}
      onFieldsChange={handleFormChanges}
    >
      <Form.Item name="name" label="Name" rules={[{ required: true, type: 'string' }]}>
        <Input placeholder="Enter member's name" disabled={isDrawerFormReadOnly} size="large" />
      </Form.Item>

      <Form.Item name="email" label="Email id" rules={[{ required: true, type: 'email' }]}>
        <Input placeholder="Enter your email id" disabled={isDrawerFormReadOnly} size="large" />
      </Form.Item>

      <Form.Item name="role" label="Role" rules={[{ required: true }]}>
        <Select placeholder="Select a role" disabled={isDrawerFormReadOnly} allowClear>
          {RoleOptions.map((roleItem: Record<string, string>, index: number) => (
            <Option key={`role${index}`} value={roleItem.value}>
              {roleItem.key}
            </Option>
          ))}
        </Select>
      </Form.Item>
      {!isDrawerFormReadOnly && (
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

export default MemberForm;

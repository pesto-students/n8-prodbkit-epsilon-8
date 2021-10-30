import { Form, Input, notification, Space } from 'antd';
import {
  fetchTeamsList,
  handleTeamSubmit,
  handleTeamUpdate,
} from 'pages/teams/services/teams.service';
import React, { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { hideDrawer } from 'redux-features/commonDrawer';

import AntDButton from '../../../../shared/components/atoms/button/Button';
import { IGlobalState } from '../../../../shared/interfaces/globalState';
import { formatFormData } from './teamForm.helper';
import styles from './teamForm.module.scss';

const MemberForm: React.FC = () => {
  const [form] = Form.useForm();
  const commonStoreData = useSelector((state: IGlobalState) => state.common);
  const dispatch = useDispatch();
  const selectedTeamId = commonStoreData.id;
  const isReadOnly = commonStoreData.isDrawerFormReadOnly;
  const teamSubmit = useMutation(handleTeamSubmit, { retry: false });
  const teamUpdate = useMutation((data: any) => handleTeamUpdate(data), { retry: false });
  const teamAPIResponse = useQuery('teams', fetchTeamsList, { retry: false, enabled: false });

  const { data, refetch } = teamAPIResponse;
  const queryClient = useQueryClient();

  useEffect(() => {
    form.setFieldsValue({
      name: '',
      description: null,
    });
    if (!!selectedTeamId) {
      if (data) {
        const teamsData = data.data as any;
        const dataById = teamsData.filter((item: any) => item.team_id === selectedTeamId);
        if (dataById.length) {
          const dataAtIndex0 = dataById[0];
          form.setFieldsValue({
            name: dataAtIndex0.name,
            description: dataAtIndex0.description,
          });
        }
      }
    }
  }, []);

  const successCallback = (action: 'created' | 'updated' | 'deleted') => {
    dispatch(hideDrawer());
    refetch();
    notification.success({
      message: `Team ${action} successfully`,
    });
  };

  const failureCallback = () => {
    notification.error({
      message: 'Something went wrong. Please try again',
    });
  };

  const handleFormSave = () => {
    if (!!selectedTeamId) {
      handleUpdateMember(selectedTeamId);
    } else {
      handleCreateMember();
    }
  };

  const handleCreateMember = () => {
    const formattedData = formatFormData(form.getFieldsValue()) as any;
    teamSubmit.mutate(formattedData, {
      onSuccess: (data: any) => {
        successCallback('created');
        queryClient.setQueryData(['teams'], data.data);
      },
      onError: failureCallback,
    });
  };

  const handleUpdateMember = (id: string) => {
    const formattedData = formatFormData(form.getFieldsValue());
    teamUpdate.mutate(
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

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFormSave}
      onFieldsChange={handleFormChanges}
    >
      <Form.Item name="name" label="Team name" rules={[{ required: true, type: 'string' }]}>
        <Input placeholder="Enter Team name" size="large" disabled={isReadOnly} />
      </Form.Item>

      <Form.Item name="description" label="Description" rules={[{ required: true }]}>
        <Input placeholder="Enter teams description" size="large" disabled={isReadOnly} />
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

export default MemberForm;

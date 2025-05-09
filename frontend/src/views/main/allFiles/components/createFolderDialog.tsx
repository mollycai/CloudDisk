import { Form, Input, Modal } from 'antd';
import React from 'react';
import { CreateFolderModalProps } from '../types';
import useValidateName from '@/hooks/useValidateName';

const CreateFolderModal: React.FC<CreateFolderModalProps> = ({ visible, onCancel, onCreate }) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        onCreate(values.folderName);
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      }).finally(() => { 
				form.resetFields();
			});
	};

  return (
    <Modal
      title="新建文件夹"
      open={visible}
      onOk={handleOk}
      onCancel={onCancel}
      width={400}
      okText="创建"
      cancelText="取消"
      destroyOnClose
    >
      <div className="w-100 mb-8 mt-8 flex h-24 justify-center">
        <img src="/src/assets/fileIcon/folder.png" alt="文件夹图标" />
      </div>
      <Form form={form} initialValues={{ folderName: '新建文件夹' }}>
        <Form.Item name="folderName" rules={[{ required: true, validator: useValidateName }]}>
          <Input placeholder="请输入文件夹名称" maxLength={50} allowClear />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateFolderModal;

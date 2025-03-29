import { Form, Input, Modal } from 'antd';
import React from 'react';
import { CreateFolderModalProps } from '../types';

const CreateFolderModal: React.FC<CreateFolderModalProps> = ({ visible, onCancel, onCreate }) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        onCreate(values.folderName);
        form.resetFields();
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
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
      <Input placeholder="请输入文件夹名称" defaultValue={'新建文件夹'} />
    </Modal>
  );
};

export default CreateFolderModal;

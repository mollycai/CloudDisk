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

  // 验证文件夹名称
  const validateFolderName = (_: any, value: string) => {
    if (!value || value.trim() === '') {
      return Promise.reject(new Error('文件夹名称不能为空'));
    }

    // 禁止的特殊字符
    const forbiddenChars = /[\\/*?"|.]/;
    if (forbiddenChars.test(value)) {
      return Promise.reject(new Error('不能包含 \\ / * ? " | . 等特殊字符'));
    }

    // 检查开头和结尾是否有空格
    if (value !== value.trim()) {
      return Promise.reject(new Error('名称开头或结尾不能有空格'));
    }

    return Promise.resolve();
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
        <Form.Item name="folderName" rules={[{ required: true, validator: validateFolderName }]}>
          <Input placeholder="请输入文件夹名称" maxLength={50} allowClear />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateFolderModal;

import useFileIcon from '@/hooks/useFileIcon';
import useValidateName from '@/hooks/useValidateName';
import { Form, Input, Modal, message } from 'antd';
import React from 'react';
import { RenameModalProps } from '../types';

const RenameDialog: React.FC<RenameModalProps> = ({ visible, file, setVisible }) => {
  // 获取图标URL
  const iconUrl = useFileIcon(file.fileName);

  const [form] = Form.useForm();

  const handleUpdateName = (fileName: string) => {
    // @TODO
    message.success(`文件 ${fileName} 修改成功`);
    setVisible(false);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        handleUpdateName(values.folderName);
        form.resetFields();
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  return (
    <Modal
      title="重命名"
      open={visible}
      onOk={handleOk}
      onCancel={() => setVisible(false)}
      width={400}
      okText="确定"
      cancelText="取消"
      destroyOnClose
    >
      <div className="w-100 mb-8 mt-8 flex h-24 justify-center">
        <img src={iconUrl} alt="文件图标" />
      </div>
      <Form form={form} initialValues={{ folderName: file.fileName }}>
        <Form.Item name="folderName" rules={[{ required: true, validator: useValidateName }]}>
          <Input placeholder="请输入名称" maxLength={50} allowClear />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default RenameDialog;

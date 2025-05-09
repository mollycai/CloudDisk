import useFileIcon from '@/hooks/useFileIcon';
import useValidateName from '@/hooks/useValidateName';
import { Form, Input, Modal, message } from 'antd';
import React, { useContext } from 'react';
import { RenameModalProps } from '../types';
import { renameFile } from '@/api/modules/allFiles';
import { FileContext } from '@/context/fileContext';

const RenameDialog: React.FC<RenameModalProps> = ({ visible, file, setVisible }) => {
  // 获取图标URL
  const iconUrl = useFileIcon(file.fileName);

	const [form] = Form.useForm();
	
	const { refreshFiles } = useContext(FileContext);

  const handleUpdateName = async (fileName: string) => {
    try {
			// 从原路径获取父目录
			const lastSlashIndex = file.url.lastIndexOf('/');
			const parentPath = file.url.substring(0, lastSlashIndex);
			const newPath = `${parentPath}/${fileName}`;
	
			// 调用重命名接口
			const res = await renameFile('/' + file.url, newPath); // 使用完整路径
			if (res.data.code === 200) {
				message.success(`文件 ${fileName} 修改成功`);
				setVisible(false);
				refreshFiles(parentPath)
			}
		} catch (error) {
			message.error('修改失败，请重试');
		}
  };

  const handleOk = () => {
		form
			.validateFields()
			.then((values) => {
				handleUpdateName(values.folderName);
			})
			.catch((info) => {
				message.error('Validate Failed:', info);
			}).finally(() => { 
				form.resetFields();
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

import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Modal, Upload, message, Progress } from 'antd';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { UploadFileModalProps } from '../types';

const { Dragger } = Upload;

const UploadFileModal: React.FC<UploadFileModalProps> = ({ visible, onCancel, onUpload }) => {
  const [fileList, setFileList] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const params = useParams();
  const folderPath = params['*'] || '';

  const handleUpload = async () => {
    if (fileList.length === 0) {
      message.warning('请选择要上传的文件');
      return;
    }

    setIsUploading(true);
		try {
      await onUpload(fileList[0], folderPath, (progress) => {
        setUploadProgress(Math.round(progress * 100));
      }); // 这里只处理第一个文件，如需多文件需调整
      message.success('文件上传成功');
      setFileList([]);
      setUploadProgress(0);
      onCancel();
    } catch (error) {
      message.error('文件上传失败');
    } finally {
      setIsUploading(false);
    }
  };

  const uploadProps: UploadProps = {
    name: 'image',
    multiple: false,
    showUploadList: false,
    beforeUpload: (file) => {
      setFileList([file]);
      return false;
    },
    customRequest: () => {
      // 空实现，实际由手动按钮触发
    },
  };

  return (
    <Modal
      title="上传文件"
      open={visible}
      onOk={handleUpload}
      onCancel={onCancel}
      confirmLoading={isUploading}
      okText="上传"
      cancelText="取消"
      width={600}
    >
      <div className="space-y-4">
        <Dragger {...uploadProps}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">点击或拖拽文件到此处</p>
          <p className="ant-upload-hint">支持单个文件上传</p>
        </Dragger>

        {fileList.length > 0 && (
          <div className="mt-4">
            <div>文件名：{fileList[0].name}</div>
            <Progress percent={uploadProgress} status="active" />
          </div>
        )}
      </div>
    </Modal>
  );
};

export default UploadFileModal;

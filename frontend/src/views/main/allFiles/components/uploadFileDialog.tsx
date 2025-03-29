import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Modal, Upload, message } from 'antd';
import React, { useState } from 'react';
import { UploadFileModalProps } from '../types';

const { Dragger } = Upload;

const UploadFileModal: React.FC<UploadFileModalProps> = ({ visible, onCancel, onUpload }) => {
  const [fileList, setFileList] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async () => {
    if (fileList.length === 0) {
      message.warning('请选择要上传的文件');
      return;
    }

    setIsUploading(true);
    try {
      await onUpload(fileList[0]); // 这里只处理第一个文件，如需多文件需调整
      message.success('文件上传成功');
      setFileList([]);
      onCancel();
    } catch (error) {
      message.error('文件上传失败');
    } finally {
      setIsUploading(false);
    }
  };

  const draggerProps: UploadProps = {
    multiple: false, // 单文件上传
    beforeUpload: (file) => {
      setFileList([file]);
      return false; // 阻止自动上传
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
    fileList: fileList.map((file) => ({
      uid: file.name,
      name: file.name,
      status: 'done',
    })),
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
        <Dragger {...draggerProps}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">点击或拖拽文件到此处</p>
          <p className="ant-upload-hint">支持单个文件上传</p>
        </Dragger>

        {fileList.length > 0 && (
          <div className="rounded border p-2">
            <p>已选择文件：</p>
            <p>
              {fileList[0].name} ({Math.round(fileList[0].size / 1024)} KB)
            </p>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default UploadFileModal;

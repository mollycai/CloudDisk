import useFileIcon from '@/hooks/useFileIcon';
import { Modal } from 'antd';
import { FileDetailModalProps } from '../types';

const FileInfoDialog: React.FC<FileDetailModalProps> = ({ visible, setVisible, file }) => {
  // 获取图标URL
  const iconUrl = useFileIcon(file.fileName);

  return (
    <Modal
      title={file.fileName}
      open={visible}
      width={400}
      footer={null}
      onCancel={() => setVisible(false)}
      destroyOnClose
    >
      <div className="flex flex-col items-center gap-4">
        <img src={iconUrl} alt={file.fileName} className="h-28 w-28 object-contain mt-4 mb-4" />
        <div className="w-full space-y-3">
          {[
            { label: '文件ID', value: file.id },
            { label: '文件名', value: file.fileName },
            { label: '修改时间', value: file.fileTime },
            { label: '文件大小', value: file.size || '未知' },
          ].map((item) => (
            <div key={item.label} className="flex">
              <span className="w-20 text-gray-500">{item.label}:</span>
              <span className="flex-1">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default FileInfoDialog;

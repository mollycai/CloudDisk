import { useEffect, useState } from 'react';
import NewFileViewer from 'react-file-viewer'
import './index.less';

interface FileViewerProps {
  fileUrl: string;
}

const FileViewer: React.FC<FileViewerProps> = ({ fileUrl }) => {
  const [type, setType] = useState<string>('');

  useEffect(() => {
    const type = fileUrl.split('.').pop();
    setType(type || '');
  }, [fileUrl]);

  return (
    <div className="file-view">
      {type ? (
        <NewFileViewer
          fileType={type}
          filePath={fileUrl}
          onError={(err: any) => console.log(err)}
        />
      ) : (
        <div className="file-view-warn">暂无文件预览</div>
      )}
    </div>
  );
};

export default FileViewer;

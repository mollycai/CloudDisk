import { DeleteOutlined, ReloadOutlined } from '@ant-design/icons';
import { Button, Checkbox, Space } from 'antd';

interface TrashBinControllerProps {
  selectedFiles: Set<number>;
  allFiles: any[];
  isAllSelected: boolean;
  onSelectAll: (checked: boolean) => void;
}

const TrashBinController: React.FC<TrashBinControllerProps> = ({
  selectedFiles,
  allFiles,
  isAllSelected,
  onSelectAll,
}) => {
  return (
    <div className="flex items-center justify-between p-2">
      <Checkbox
        checked={isAllSelected}
        indeterminate={selectedFiles.size > 0 && selectedFiles.size < allFiles.length}
        onClick={() => onSelectAll(!isAllSelected)}
      >
        {selectedFiles.size > 0 ? `已选 ${selectedFiles.size} 项` : `共 ${allFiles.length} 项`}
      </Checkbox>
      <Space>
				<Button color="primary" variant="filled" icon={<ReloadOutlined />} disabled={ selectedFiles.size === 0}>
          恢复
        </Button>
        <Button color="danger" variant="filled" icon={<DeleteOutlined />} disabled={ selectedFiles.size === 0}>
          永久删除
        </Button>
      </Space>
    </div>
  );
};

export default TrashBinController;

import FileItemGird from '@/components/fileItemGird';

interface FileTrashBinListProps {
  files: any[];
  selectedFiles: Set<number>;
  onSelect: (fileId: number, checked: boolean) => void;
}

const FileTrashBinList: React.FC<FileTrashBinListProps> = ({ files, selectedFiles, onSelect }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {files.map((file) => (
        <FileItemGird
          key={file.id}
          file={file}
          isSelected={selectedFiles.has(file.id)}
          onSelect={(checked) => onSelect(file.id, checked)}
          isInRecycleBin={true}
        />
      ))}
    </div>
  );
};

export default FileTrashBinList;

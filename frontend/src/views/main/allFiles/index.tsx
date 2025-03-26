import AddButton from './components/addButton';
import HeaderBreadcrumb from './components/headerBreadcrumb';
import FileList from './components/fileList';
import './index.less';

const AllFiles: React.FC = () => {
  return (
		<div>
			<HeaderBreadcrumb />
			<FileList />
			<AddButton />
		</div>
	);
};
export default AllFiles;

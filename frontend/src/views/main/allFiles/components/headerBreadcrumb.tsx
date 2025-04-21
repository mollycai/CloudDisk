import { Link } from 'react-router-dom';
import { HeaderBreadcrumbProps } from '../types';

const HeaderBreadcrumb: React.FC<HeaderBreadcrumbProps> = ({ folderBreadCrumb }) => {
  return (
    <div className="flex items-center space-x-2">
      <Link to="/allFiles" className="text-lg font-bold hover:text-blue-600">
        全部文件
      </Link>
      {folderBreadCrumb.map((item) => (
        <div key={item.id} className="flex items-center">
          <span className="mx-2">/</span>
          <Link 
            to={item.path}
            className="text-lg font-bold hover:text-blue-600"
          >
            {item.name}
          </Link>
        </div>
      ))}
    </div>
  );
};
export default HeaderBreadcrumb;

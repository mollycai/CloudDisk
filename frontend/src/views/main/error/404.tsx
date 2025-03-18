import { useNavigate } from 'react-router-dom';

import { Button, Result } from 'antd';

import { HOME_PATH } from '@/config/config';
import './index.less';

const NotFound = () => {
  const navigate = useNavigate();
  const goHome = () => {
    navigate(HOME_PATH);
  };
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={goHome}>
          Back Home
        </Button>
      }
    />
  );
};

export default NotFound;

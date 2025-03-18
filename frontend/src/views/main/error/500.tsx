import { useNavigate } from 'react-router-dom';

import { Button, Result } from 'antd';

import { HOME_PATH } from '@/config/config';
import './index.less';

const NotNetwork = () => {
  const navigate = useNavigate();
  const goHome = () => {
    navigate(HOME_PATH);
  };
  return (
    <Result
      status="500"
      title="500"
      subTitle="Sorry, something went wrong."
      extra={
        <Button type="primary" onClick={goHome}>
          Back Home
        </Button>
      }
    />
  );
};

export default NotNetwork;

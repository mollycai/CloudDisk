import { useNavigate } from 'react-router-dom';

import { Button, Result } from 'antd';

import './index.less';

const NotNetwork = () => {
  const navigate = useNavigate();
  const goHome = () => {
    navigate('/home');
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

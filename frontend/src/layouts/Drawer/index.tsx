import { Drawer } from 'antd';
import React from 'react';

interface InfoDrawerProps {
  open: boolean;
  onClose: () => void;
}

const InfoDrawer: React.FC<InfoDrawerProps> = ({ open, onClose }) => {
  return (
    <>
      <Drawer title="用户信息" onClose={onClose} open={open}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};

export default InfoDrawer;

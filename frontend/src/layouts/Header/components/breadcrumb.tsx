import { useSelector } from 'react-redux';

import { Breadcrumb } from 'antd';

import { RootState } from '@/redux/types';

const LayoutBreadcrumb = () => {
  const { items } = useSelector((state: RootState) => state.breadcrumb);

  return (
    <Breadcrumb
      className="text-sm leading-[64px]"
      items={items.map((item) => ({
        title: item.title,
      }))}
    />
  );
};

export default LayoutBreadcrumb;

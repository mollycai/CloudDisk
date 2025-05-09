import { BreadcrumbItem } from '@/redux/types/index';
import { SET_BREADCRUMB } from '@/redux/types/mutation-types';

export const setBreadcrumb = (items: BreadcrumbItem[]) => ({
  type: SET_BREADCRUMB,
  payload: items,
});

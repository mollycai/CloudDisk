import { BreadcrumbItem } from '@/redux/types/breadcrumb';

export const SET_BREADCRUMB = 'SET_BREADCRUMB';

export const setBreadcrumb = (items: BreadcrumbItem[]) => ({
  type: SET_BREADCRUMB,
  payload: items,
});

import { BreadcrumbItem, BreadcrumbState } from '@/redux/types/index';
import { SET_BREADCRUMB } from '@/redux/types/mutation-types';

type BreadcrumbAction = {
  type: typeof SET_BREADCRUMB;
  payload: BreadcrumbItem[];
};

export const breadcrumbReducer = (state: BreadcrumbState = [] as any, action: BreadcrumbAction): BreadcrumbState => {
  switch (action.type) {
    case SET_BREADCRUMB:
      return {
        ...state,
        items: action.payload,
      };
    default:
      return state;
  }
};

import { SET_BREADCRUMB } from './action';

import { BreadcrumbItem, BreadcrumbState, initialBreadcrumbState } from '@/redux/types/breadcrumb';

type BreadcrumbAction = {
  type: typeof SET_BREADCRUMB;
  payload: BreadcrumbItem[];
};

export const breadcrumbReducer = (
  state: BreadcrumbState = initialBreadcrumbState,
  action: BreadcrumbAction,
): BreadcrumbState => {
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

import { GlobalState } from '@/redux/types';
import * as types from '@/redux/types/mutation-types';
import { AnyAction } from 'redux';

const globalState: GlobalState = {
  token: '',
  userInfo: '',
  language: '',
};

// global reducer
export const globalReducer = (state: GlobalState = globalState, action: AnyAction) => {
  switch (action.type) {
    case types.SET_TOKEN:
      return { ...state, token: action.token };
    case types.SET_LANGUAGE:
      return { ...state, language: action.language };
    default:
      return state;
  }
};

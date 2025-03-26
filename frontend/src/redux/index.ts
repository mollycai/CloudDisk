import { Store, combineReducers, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { breadcrumbReducer } from './modules/breadcrumb/reducer';

// 创建reducer(拆分reducer)
const reducer = combineReducers({
  breadcrumb: breadcrumbReducer,
});

// redux 持久化配置
const persistConfig = {
  key: 'redux-state',
  storage: storage,
};

const persistReducerConfig = persistReducer(persistConfig, reducer);

// 创建 store
const store: Store = createStore(persistReducerConfig);

// 创建持久化 store
const persistor = persistStore(store);

export { persistor, store };

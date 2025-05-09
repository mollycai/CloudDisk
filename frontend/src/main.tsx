import { Provider } from 'react-redux';

import { ConfigProvider } from 'antd';
import { createRoot } from 'react-dom/client';
import { PersistGate } from 'redux-persist/integration/react';

import App from './App.tsx';

import { persistor, store } from '@/redux';
import './styles/index.less';
import './styles/tindwincss.css';

import { setToken } from '@/redux/modules/globals/action';

const token = localStorage.getItem('token');
if (token) {
  store.dispatch(setToken(token));
}

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#4d6bfe', // 修改主题色
          },
        }}
      >
        <App />
      </ConfigProvider>
    </PersistGate>
  </Provider>,
);

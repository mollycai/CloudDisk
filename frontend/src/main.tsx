// import { Provider } from "react-redux";
// import { persistor, store } from '@/redux';
// import { PersistGate } from "redux-persist/integration/react";
import { ConfigProvider } from 'antd';
import { createRoot } from 'react-dom/client';

import App from './App.tsx';
import './styles/index.less';
import './styles/tindwincss.css';

createRoot(document.getElementById('root')!).render(
  // <Provider store={store}>
  //   <PersistGate persistor={persistor}>
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: '#4d6bfe', // 修改主题色
      },
    }}
  >
    <App />
  </ConfigProvider>,
  //   </PersistGate>
  // </Provider>
);

import { HashRouter } from 'react-router-dom';

import Router from '@/routers/index';
// import AuthRouter from './routers/utils/authRouter';

function App() {
  return (
    <>
      {/* 解决控制台警告 */}
      <HashRouter
        future={{
          v7_relativeSplatPath: true,
          v7_startTransition: true,
        }}
      >
        {/* <AuthRouter> */}
        <Router />
        {/* </AuthRouter> */}
      </HashRouter>
    </>
  );
}

export default App;

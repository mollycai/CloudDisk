import { HashRouter } from 'react-router-dom';

import Router from '@/routers/index';

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
        <Router />
      </HashRouter>
    </>
  );
}

export default App;

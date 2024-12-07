import { useLaunchParams, } from "@telegram-apps/sdk-react";
import { AppRoot } from "@telegram-apps/telegram-ui";
import { FC } from "react";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { routes } from "./routes/routes";
import { ApiProvider } from "./api/ApiProvider";
import { AuthProvider } from "./api/Auth/AuthProvider";
import { UserProvider } from "./api/Auth/UserProvider";
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

export const App: FC = () => {
  const lp = useLaunchParams();

  return (
    <AppRoot
      appearance='dark'
      platform={['macos', 'ios'].includes(lp.platform) ? 'ios' : 'base'}>
        <UserProvider>
        <AuthProvider>
        <ApiProvider>
          <div className="app-main">
              <ToastContainer theme='dark' />
              <HashRouter>
                <Routes>
                  {routes.map((route) => <Route key={route.path} {...route} />)}
                  <Route path='*' element={<Navigate to='/'/>}/>
                </Routes>
              </HashRouter>
          </div>
        </ApiProvider>
        </AuthProvider>
        </UserProvider>
    </AppRoot>
  );
}

export default App;

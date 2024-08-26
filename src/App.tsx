import { useIntegration } from "@telegram-apps/react-router-integration";
import { bindMiniAppCSSVars, bindThemeParamsCSSVars, bindViewportCSSVars, initNavigator, parseThemeParams, serializeThemeParams, ThemeParams, useLaunchParams, useMiniApp, useThemeParams, useViewport, withThemeParams } from "@telegram-apps/sdk-react";
import { AppRoot } from "@telegram-apps/telegram-ui";
import { FC, useEffect, useMemo } from "react";
import { Navigate, Route, Router, Routes } from "react-router-dom";
import { routes } from "./routes/routes";
import { ApiProvider } from "./api/ApiProvider";

export const App: FC = () => {
  const lp = useLaunchParams();
  const miniApp = useMiniApp();
  // const themeParams = useThemeParams();
  const viewport = useViewport();
  const ss = parseThemeParams({
    "accent_text_color": "#6ab2f2",
    "bg_color": "#000000",
    "button_color": "#5288c1",
    "button_text_color": "#ffffff",
    "destructive_text_color": "#ec3942",
    "header_bg_color": "#000000",
    "hint_color": "#708499",
    "link_color": "#6ab3f3",
    "secondary_bg_color": "#232e3c",
    "section_bg_color": "#17212b",
    "section_header_text_color": "#6ab3f3",
    "subtitle_text_color": "#708499",
    "text_color": "#f5f5f5"
  });
  const themeParams = new ThemeParams(ss)

  useEffect(() => {
    return bindMiniAppCSSVars(miniApp, themeParams);
  }, [miniApp, themeParams]);

   useEffect(() => {
     return bindThemeParamsCSSVars(themeParams);
   }, [themeParams]);

  useEffect(() => {
    return viewport && bindViewportCSSVars(viewport);
  }, [viewport]);

  const navigator = useMemo(() => initNavigator('app-navigation-state'), []);
  const [location, reactNavigator] = useIntegration(navigator);

  useEffect(() => {
    navigator.attach();
    return () => navigator.detach();
  }, [navigator]);

  return (
    <AppRoot
      appearance='dark'
      platform={['macos', 'ios'].includes(lp.platform) ? 'ios' : 'base'}>
        <ApiProvider>
          <Router location={location} navigator={reactNavigator}>
            <Routes>
              {routes.map((route) => <Route key={route.path} {...route} />)}
              <Route path='*' element={<Navigate to='/'/>}/>
            </Routes>
          </Router>
        </ApiProvider>
    </AppRoot>
  );
}

export default App;

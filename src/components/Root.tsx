import { useLaunchParams } from "@telegram-apps/sdk-react";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { FC, useMemo } from "react";
import App from "../App";
import { init } from "@/init";
import '../mockEnv';

export const Root: FC = () => {
    const debug = useLaunchParams().startParam === 'debug';
    const manifestUrl = useMemo(() => {
      return new URL('tonconnect-manifest.json', window.location.href).toString();
    }, []);

    init(debug);

    return (
      <TonConnectUIProvider manifestUrl={manifestUrl}>
        <App/>
      </TonConnectUIProvider>
    );
}
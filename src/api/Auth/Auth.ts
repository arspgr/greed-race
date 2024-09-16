import { useEffect, useMemo, useState } from "react";
import { useAuthApi } from "../Api";
import { useTonConnectUI } from "@tonconnect/ui-react";

export interface Auth {
    isAuthorized: boolean;
    token?: string;
}

const tokenItemName = 'token';
const tokenTtl = 12 * 60 * 60 * 1000;

export function useAuth(): Auth {
    const [isAuthorized, setAuthorized] = useState(false);
    const [token, setToken] = useState<string | undefined>(undefined);
    const [tonConnectUI] = useTonConnectUI();
    const [connectionRestored, setConnectionRestored] = useState(false);

    const api = useAuthApi();

    useEffect(() => {
        tonConnectUI.connectionRestored.then(() => {
            setConnectionRestored(true);
        }).catch(() => setConnectionRestored(true));
    }, []);

    useEffect(() => {
        if (!connectionRestored) {
            return;
        }
        if (isAuthorized) {
            return;
        }

        const token = getToken();
        if (!token) {
            if (tonConnectUI.connected)
                tonConnectUI.disconnect();
            tonConnectUI.setConnectRequestParameters({
                state: 'loading'
            });
            api.getSession().then(session => {
                tonConnectUI.setConnectRequestParameters({
                    state: 'ready',
                    value: {
                        tonProof: session.data!,
                    }
                });
            }).catch(err => {
                tonConnectUI.setConnectRequestParameters(null);
                console.error(err);
            });
        } else {
            setAuthorized(true);
            setToken(token);
        }

        if (!token) {
            const testAuth = import.meta.env.VITE_TEST_AUTH;
            if (testAuth) {
                const testAuthObj = JSON.parse(testAuth);
                api.getToken({
                    domain: testAuthObj.proof.domain,
                    payload: testAuthObj.proof.payload,
                    signature: testAuthObj.proof.signature,
                    timestamp: testAuthObj.proof.timestamp,
                }, {
                    address: testAuthObj.address,
                    chain: testAuthObj.network,
                    walletStateInit: testAuthObj.proof.stateInit,
                    publicKey: testAuthObj.publicKey
                }).then(response => {
                    saveTokenToLocalStorage(response.token);
                    setAuthorized(true);
                    setToken(response.token);
                });
            }
        }

        return tonConnectUI.onStatusChange(wallet => {
            console.log("wallet status", wallet);
            if (wallet?.connectItems?.tonProof && 'proof' in wallet.connectItems.tonProof) {
                api.getToken(wallet.connectItems.tonProof.proof, wallet.account).then(response => {
                    saveTokenToLocalStorage(response.token);
                    setAuthorized(true);
                    setToken(response.token);
                });
            }
        });
    }, [connectionRestored]);

    return { isAuthorized, token };
}

function saveTokenToLocalStorage(token: string) {
    const date = new Date();
    localStorage.setItem(tokenItemName, JSON.stringify({ token, expires: date.getTime() + tokenTtl }));
}

function getToken(): string | undefined {
    const item = localStorage.getItem(tokenItemName);
    if (!item) {
        return undefined;
    }
    const token = JSON.parse(item);
    if (!token && !token.token && !token.expires) {
        return undefined;
    }
    const date = new Date();
    if (date.getTime() > token.expires) {
        return undefined;
    }

    return token.token;
}
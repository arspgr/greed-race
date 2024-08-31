import { createContext, FC, PropsWithChildren } from "react";
import { Auth, useAuth } from "./Auth";

export const AuthContext = createContext<Auth>(undefined!);

export const AuthProvider: FC<PropsWithChildren> = props => {
    const { children } = props;
    const auth = useAuth();

    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}
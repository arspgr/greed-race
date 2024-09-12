import { createContext, FC, PropsWithChildren, useContext } from "react";
import { Api, useGeneralApi, usePaymentApi } from "./Api";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./query/query-client";
import { AuthContext } from "./Auth/AuthProvider";
import { UserContext } from "./Auth/UserProvider";

export const ApiContext = createContext<Api>(undefined!);

export const ApiProvider: FC<PropsWithChildren> = props => {
    const { children } = props;
    const { token } = useContext(AuthContext);
    const user = useContext(UserContext);
    const generalApi = useGeneralApi(user?.id ?? 1123);
    const paymentApi = usePaymentApi(user?.id ?? 1123, token);
    const api = { paymentApi, generalApi };
    return (
        <QueryClientProvider client={queryClient}>
            <ApiContext.Provider value={api}>{children}</ApiContext.Provider>
        </QueryClientProvider>
    );
}
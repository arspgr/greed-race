import { createContext, FC, PropsWithChildren } from "react";
import { Api, useApi } from "./Api";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./query/query-client";
import { useAuth } from "./Auth/Auth";

export const ApiContext = createContext<Api>(undefined!);

export const ApiProvider: FC<PropsWithChildren> = props => {
    const { children } = props;
    const { token } = useAuth();
    const api = useApi(token);

    return (
        <QueryClientProvider client={queryClient}>
            <ApiContext.Provider value={api}>{children}</ApiContext.Provider>
        </QueryClientProvider>
    );
}
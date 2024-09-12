import { useInitData } from "@telegram-apps/sdk-react";
import { createContext, FC, PropsWithChildren } from "react";

export interface User {
    id: number;
}

export const UserContext = createContext<User>(undefined!);

export const UserProvider: FC<PropsWithChildren> = props => {
    const { children } = props;
    const initData = useInitData();

    if (!initData || !initData.user?.id) {
        throw new Error('InitData or user id is null');
    }
    return <UserContext.Provider value={{
        id: initData!.user!.id 
    }}>{children}</UserContext.Provider>
}
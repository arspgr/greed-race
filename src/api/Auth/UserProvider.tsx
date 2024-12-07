import { initData, useSignal } from "@telegram-apps/sdk-react";
import { createContext, FC, PropsWithChildren } from "react";

export interface User {
    id: number;
    avatarUrl?: string;
    name: string;
}

export const UserContext = createContext<User>(undefined!);

export const UserProvider: FC<PropsWithChildren> = props => {
    const { children } = props;
    const initDataState = useSignal(initData.state);

    if (!initData || !initDataState?.user?.id) {
        throw new Error('InitData or user id is null');
    }
    return <UserContext.Provider value={{
        id: initDataState!.user!.id,
        avatarUrl: initDataState?.user?.photoUrl,
        name: initDataState?.user?.username ?? ""
    }}>{children}</UserContext.Provider>
}
import { Avatar } from "@telegram-apps/telegram-ui";
import { FC, useContext, useMemo } from "react";
import { DisplayWalletAddress } from "../DisplayWallet/DisplayWallet";
import { UserContext } from "@/api/Auth/UserProvider";
import './DisplayUser.css';

export const DisplayUser: FC = () => {
    const user = useContext(UserContext);
    const acronym = useMemo(() => user.name.substring(0, 1), [user.name]);

    return (
        <div className="user-container">
            <div className="avatar">
                <Avatar size={48} src={user.avatarUrl} acronym={acronym} srcSet=""></Avatar>
                <div className="text-usual">{user.name}</div>
            </div>
            <DisplayWalletAddress></DisplayWalletAddress>
        </div>
    )
}
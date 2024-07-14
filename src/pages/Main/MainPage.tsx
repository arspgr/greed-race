import { Avatar, FixedLayout, Headline, List } from "@telegram-apps/telegram-ui";
import { FC } from "react";
import { useInitData } from "@telegram-apps/sdk-react";
import { Link } from "@/Link/Link";
import './Main.css'
import { DisplayWalletAddress } from "@/components/DisplayWallet/DisplayWallet";

export const MainPage: FC = () => {
    const initData = useInitData();
    const userAvatarUrl = initData?.user?.photoUrl;
    const username = initData?.user?.username;

    return (
        <FixedLayout style={{padding: 16}} vertical="top">
            <div className="main-list">
                <div className="main-wallet">
                    <DisplayWalletAddress></DisplayWalletAddress>
                </div>
                <div className="avatar">
                    <Avatar size={96} src={userAvatarUrl}></Avatar>
                    <Headline>{username}</Headline>
                </div>
            </div>
            <Link to='features'>Features</Link>
        </FixedLayout>


    )
}
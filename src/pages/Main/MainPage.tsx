import { Avatar, Image, Tabbar } from "@telegram-apps/telegram-ui";
import { FC, useMemo, useState } from "react";
import { useInitData } from "@telegram-apps/sdk-react";
import './Main.css'
import { DisplayWalletAddress } from "@/components/DisplayWallet/DisplayWallet";
import homeImage from '@/images/home.svg';
import questionImage from '@/images/question.svg';
import ticketImage from '@/images/ticket.svg';
import { DisplayGame } from "@/components/DisplayGame/DisplayGame";

export const MainPage: FC = () => {
    const initData = useInitData();
    const userAvatarUrl = initData?.user?.photoUrl;
    const username = initData?.user?.username;
    const acronym = useMemo(() => username?.substring(0, 1), [username]);

    const tabs = [{key: "home", text: "Home", image: homeImage},
         {key: "how", text: "How it works", image: questionImage, class: "inverted"}, 
         {key: "tickets", text: "My tickets", image: ticketImage}];
    const [currentTab, setCurrentTab] = useState(tabs[0].key);

    return (
        <div className="main-container">
            <div className="main-header">
                <div className="avatar">
                    <Avatar size={48} src={userAvatarUrl} acronym={acronym} srcSet=""></Avatar>
                    <div className="text-usual">{username}</div>
                </div>
                <DisplayWalletAddress></DisplayWalletAddress>
            </div>
            
            <div className="next-greed">
                <DisplayGame></DisplayGame>

                <Tabbar style={{ padding: '2.5vw 2.5vw 4vw 2.5vw', background: 'black' }}>
                    {tabs.map((t) => <Tabbar.Item key={t.key} text={t.text} selected={currentTab === t.text} onClick={() => setCurrentTab(t.text)}>
                        <Image src={t.image} size={48} className={t.class}></Image>
                    </Tabbar.Item>)}
                </Tabbar>

                {/* <Link to='features'>Features</Link> */}
            </div>
        </div>
    )
}

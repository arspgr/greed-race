import { Avatar, Cell, FixedLayout, Headline, Image, List, Section, Tabbar, Title } from "@telegram-apps/telegram-ui";
import { FC, useMemo, useState } from "react";
import { useInitData } from "@telegram-apps/sdk-react";
import { Link } from "@/Link/Link";
import './Main.css'
import { DisplayWalletAddress } from "@/components/DisplayWallet/DisplayWallet";
import greedRaceImage from '@/images/greed-race.png';
import homeImage from '@/images/home.svg';
import questionImage from '@/images/question.svg';
import ticketImage from '@/images/ticket.svg';

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
                    <div className="text-headline">{username}</div>
                </div>
                <DisplayWalletAddress></DisplayWalletAddress>
            </div>
            <div className="next-greed">
                <div className="text-headline">NEXT</div>
                <img src={greedRaceImage}></img>
                <div className="text-usual">starts in: 28:42:12:39 sec</div>
            </div>
            <Tabbar style={{ padding: '2.5vw' }}>
                {tabs.map((t) => <Tabbar.Item key={t.key} text={t.text} selected={currentTab === t.text} onClick={() => setCurrentTab(t.text)}>
                    <Image src={t.image} size={48} className={t.class}></Image>
                </Tabbar.Item>)}
            </Tabbar>
            <Link to='features'>Features</Link>

{/*             
            <List>
                <Section>

                    <Section header='Games'>
                        <List>
                            <Cell before={<Image src={tonSvg} style={{ backgroundColor: '#007AFF' }}/>} subtitle="Ticket cost is 1 TON">
                                Play TON
                            </Cell>
                            <Cell before={<Image src={gramImage}/>} subtitle="Ticket cost is 1000 GRAM">
                                Play GRAM
                            </Cell>
                        </List>
                    </Section>
                    <Section>
                        <Link to='features'>Features</Link>
                    </Section>
                </Section>
            </List> */}

        </div>
    )
}
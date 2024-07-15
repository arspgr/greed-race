import { Avatar, Cell, FixedLayout, Headline, Image, List, Section } from "@telegram-apps/telegram-ui";
import { FC } from "react";
import { useInitData } from "@telegram-apps/sdk-react";
import { Link } from "@/Link/Link";
import './Main.css'
import { DisplayWalletAddress } from "@/components/DisplayWallet/DisplayWallet";
import tonSvg from '@/images/ton.svg';
import gramImage from '@/images/gram.png';

export const MainPage: FC = () => {
    const initData = useInitData();
    const userAvatarUrl = initData?.user?.photoUrl;
    const username = initData?.user?.username;

    return (
        <div className="main-container">
            <List>
                <Section>
                    <div className="main-list">
                        <div className="main-wallet">
                            <DisplayWalletAddress></DisplayWalletAddress>
                        </div>
                        <div className="avatar">
                            <Avatar size={96} src={userAvatarUrl}></Avatar>
                            <Headline>{username}</Headline>
                        </div>
                    </div>
                </Section>
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
            </List>

        </div>
    )
}
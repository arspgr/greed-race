import { FC, useCallback, useEffect, useState } from "react";
import homeImage from '@/images/home.svg';
import questionImage from '@/images/question.svg';
import ticketImage from '@/images/ticket.svg';
import { Image, Tabbar } from "@telegram-apps/telegram-ui";
import { useNavigate } from "react-router-dom";

interface MenuItem {
    key: string;
    text: string;
    image: string;
    class?: string;
    url: string;
}

interface Props {
    activeTab?: string;
}

export const DisplayMenu: FC<Props> = props => {
    const { activeTab } = props;

    const tabs: MenuItem[] = [
        { key: "home", text: "Home", image: homeImage, url: "/" },
        { key: "how", text: "How it works", image: questionImage, url: "/how-it-works" },
        { key: "tickets", text: "My tickets", image: ticketImage, url: "/my-tickets" },
    ];

    const [currentTab, setCurrentTab] = useState(tabs[0].key);
    const navigate = useNavigate();

    const onTabClicked = useCallback((item: MenuItem) => {
        setCurrentTab(item.text);
        navigate(item.url);
    }, []);

    useEffect(() => {
        if (activeTab)
            setCurrentTab(activeTab);
    }, [activeTab]);

    return (
        <Tabbar style={{ padding: '1.5vh 2.5vw 4vh 2.5vw', background: 'black' }}>
            {tabs.map((t) => <Tabbar.Item key={t.key} text={t.text} selected={currentTab === t.text} onClick={() => onTabClicked(t)} style={{ padding: 0 }}>
                <Image src={t.image} size={20} className={t.class}></Image>
            </Tabbar.Item>)}
        </Tabbar>
    );
}

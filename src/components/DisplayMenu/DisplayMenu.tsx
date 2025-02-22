import { FC, useCallback, useEffect, useState } from "react";
import homeImageWhite from '@/images/Home_white.png';
import homeImagePink from '@/images/Home_pink.png';
import howItWorksWhite from '@/images/HowItWorks_white.png';
import howItWorksPink from '@/images/HowItWorks_pink.png';
import myTicketsWhite from '@/images/MyTickets_white.png';
import myTicketsPink from '@/images/MyTickets_pink.png';
import peopleWhite from '@/images/People.png';
import peoplePink from '@/images/PeoplePink.png';
import { Image, Tabbar } from "@telegram-apps/telegram-ui";
import { useNavigate } from "react-router-dom";
import './DisplayMenu.css';
import { simpleHaptic } from "@/utils/haptics";

interface MenuItem {
    key: string;
    text: string;
    image: string;
    selectedImage: string;
    class?: string;
    url: string;
}

interface Props {
    activeTab?: string;
}

export const DisplayMenu: FC<Props> = props => {
    const { activeTab } = props;

    const tabs: MenuItem[] = [
        { key: "home", text: "Home", image: homeImageWhite, selectedImage: homeImagePink, url: "/" },
        { key: "how", text: "How it works", image: howItWorksWhite, selectedImage: howItWorksPink, url: "/how-it-works" },
        { key: "players", text: "Players", image: peopleWhite, selectedImage: peoplePink, url: "/players" },
        { key: "tickets", text: "My tickets", image: myTicketsWhite, selectedImage: myTicketsPink, url: "/my-tickets" },
    ];

    const [currentTab, setCurrentTab] = useState(tabs[0].key);
    const navigate = useNavigate();

    const onTabClicked = useCallback((item: MenuItem) => {
        setCurrentTab(item.text);
        navigate(item.url);
        simpleHaptic();
    }, []);

    useEffect(() => {
        if (activeTab)
            setCurrentTab(activeTab);
    }, [activeTab]);

    return (
        <Tabbar style={{ padding: '1.5vh 2.5vw 4vh 2.5vw', background: 'black' }}>
            {tabs.map((t) => <Tabbar.Item key={t.key} text={t.text} selected={currentTab === t.text} onClick={() => onTabClicked(t)} style={{ padding: 0 }} className="tab-item">
                <Image src={currentTab === t.text ? t.selectedImage : t.image} size={20} className={t.class}></Image>
            </Tabbar.Item>)}
        </Tabbar>
    );
}

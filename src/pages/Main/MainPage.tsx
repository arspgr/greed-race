import { FC } from "react";
import './Main.css'
import { DisplayGame } from "@/components/DisplayGame/DisplayGame";
import { DisplayMenu } from "@/components/DisplayMenu/DisplayMenu";
import { DisplayUser } from "@/components/DisplayUser/DisplayUser";

export const MainPage: FC = () => {
    return (
        <div className="main-container">
            <DisplayUser></DisplayUser>
            
            <div className="next-greed">
                <DisplayGame></DisplayGame>

                <DisplayMenu activeTab="Home"></DisplayMenu>
                {/* <Link to='features'>Features</Link> */}
            </div>
        </div>
    )
}

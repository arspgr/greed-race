import { DisplayMenu } from "@/components/DisplayMenu/DisplayMenu";
import { DisplayUser } from "@/components/DisplayUser/DisplayUser";
import { FC } from "react";
import './HowItWorksPage.css';

export const HowItWorksPage: FC = () => {
    return (
        <div className="hiw-container">
            <DisplayUser></DisplayUser>

            <div className="hiw-main">
                <div className="text-headline-medium hiw-header">HOW IT WORKS</div>
                <div className="hiw-content">
                    <div className="blue-shadow hiw-content-header">
                        1 - draw
                    </div>
                    <div className="inter-font text-usual hiw-content-text">
                        Every now and then there is a draw. You can see next draw date on the main screen.
                    </div>
                    <div className="blue-shadow hiw-content-header hiw-text-right">
                        2 - tickets
                    </div>
                    <div className="inter-font text-usual hiw-content-text">
                        You can buy tickets to participate in the game. Buy button is on the main screen.
                        <br />All your tickets are on “My tickets” screen.
                    </div>
                    <div className="blue-shadow hiw-content-header">
                        3 - Prizes
                    </div>
                    <div className="inter-font text-usual hiw-content-text">
                        Every draw has 3 types of prizes: <br />
                        • Jackpot - 20% of all draw prize to 1 winner <br />
                        • Few of Major prizes (around 1-3 % of prize fund) <br />
                        • Lot of Minor prizes (double the ticket price) <br />
                        Prize fund = sum of all bought tickets.
                    </div>
                    <div className="blue-shadow hiw-content-header hiw-text-right">
                        4 - Payments
                    </div>
                    <div className="inter-font text-usual hiw-content-text">
                        Blockchain is sometimes slow, please be 
                        patient. Be aware of blockchain transaction
                        comissions. Every win has 10% fee for 
                        the organisators
                    </div>
                </div>
            </div>

            <DisplayMenu activeTab="How it works"></DisplayMenu>
        </div>
    );
}
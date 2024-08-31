import { FC, useContext } from "react";
import greedRaceImage from '@/images/greed-race.png';
import './DisplayGame.css';
import { useGameService } from "@/services/game-service";
import { Button, Spinner } from "@telegram-apps/telegram-ui";
import { DisplayTimer } from "../DisplayTimer/DisplayTimer";
import { useTonConnectUI } from "@tonconnect/ui-react";
import { buyTicket } from "@/services/ticket-service";
import { ApiContext } from "@/api/ApiProvider";

export const DisplayGame: FC = () => {
    const { activeGame, loading } = useGameService();
    const [ tonConnectUI ] = useTonConnectUI();
    const api = useContext(ApiContext);

    return (
        <>
        {
            loading ? (
                <Spinner size="l"></Spinner>
            ) : !!activeGame ? (
                <>
                    <div className="text-headline">NEXT</div>
                    <img src={greedRaceImage}></img>
                    <div className="text-usual">starts in: {<DisplayTimer expiryTimestamp={activeGame.endsAt}></DisplayTimer>}</div>
                    <div className="text-usual">Jackpot {activeGame.prize.jackpot.value.toString()} x {activeGame.prize.jackpot.cnt.toString()}</div>
                    <div className="text-usual">Major prizes {activeGame.prize.major.value.toString()} x {activeGame.prize.major.cnt.toString()}</div>
                    <div className="text-usual">Minor prizes {activeGame.prize.minor.value.toString()} x {activeGame.prize.minor.cnt.toString()}</div>
                    <Button onClick={() => buyTicket(tonConnectUI, activeGame.asset, api, activeGame._id)}>BUY TICKET FOR {activeGame.ticketPrice}</Button>
                </>
            ) : null
        }
        </>
    );
}




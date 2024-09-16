import { FC, useContext } from "react";
import greedRaceImage from '@/images/greed-race.png';
import crown from '@/images/crown.png';
import moneyBag from '@/images/money-bag.png';
import stackOfCoins from '@/images/stack-of-coins.png';
import './DisplayGame.css';
import { useGameService } from "@/services/game-service";
import { Button, Spinner } from "@telegram-apps/telegram-ui";
import { DisplayTimer } from "../DisplayTimer/DisplayTimer";
import { useTonConnectUI } from "@tonconnect/ui-react";
import { buyTicket } from "@/services/ticket-service";
import { ApiContext } from "@/api/ApiProvider";
import { AuthContext } from "@/api/Auth/AuthProvider";

export const DisplayGame: FC = () => {
    const { activeGame, loading } = useGameService();
    const [ tonConnectUI ] = useTonConnectUI();
    const { paymentApi } = useContext(ApiContext);
    const { isAuthorized } = useContext(AuthContext);

    return (
        <>
        {
            loading ? (
                <Spinner size="l"></Spinner>
            ) : !!activeGame ? (
                <>
                    <div className="text-headline welcome-to">WELCOME TO</div>
                    <img className="logo-img" src={greedRaceImage}></img>
                    <div className="next-draw">
                        <div className="text-usual blue-shadow">NEXT DRAW</div>
                        <div className="text-usual blue-shadow">comes in: {<DisplayTimer expiryTimestamp={activeGame.endsAt}></DisplayTimer>}</div>
                    </div>
                    <br></br>
                    <div className="text-usual blue-shadow prize-pool">PRIZE POOL:</div>
                    <div className="text-usual">{activeGame.prize.jackpot.value.toString()}x <img className="prize-icon" src={crown}></img> JACKPOT {activeGame.prize.jackpot.cnt.toString()}</div>
                    <div className="text-usual">{activeGame.prize.major.value.toString()}x <img className="prize-icon" src={moneyBag}></img> MAJOR PRIZES {activeGame.prize.major.cnt.toString()}</div>
                    <div className="text-usual">{activeGame.prize.minor.value.toString()}x <img className="prize-icon" src={stackOfCoins}></img> MINOR PRIZES {activeGame.prize.minor.cnt.toString()}</div>
                    <div className="text-usual blue-shadow total-racers">TOTAL RACERS</div>
                    <Button onClick={() => buyTicket(tonConnectUI, activeGame.asset, paymentApi, activeGame._id, isAuthorized)}>BUY TICKET FOR {activeGame.ticketPrice}</Button>
                </>
            ) : null
        }
        </>
    );
}




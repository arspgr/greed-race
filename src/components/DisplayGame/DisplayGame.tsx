import { FC, useCallback, useContext } from "react";
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
import { useNavigate } from "react-router-dom";
import { displayDrawDate } from "@/utils/formatDate";
import { toasterError } from "@/services/notification-service";
import { InsufficientFundsError } from "@/models/InsufficientFundsError";
import { useQueryClient } from "@tanstack/react-query";
import { userTicketsQueryKey } from "@/constants/queries";
import { notificationHaptic } from "@/utils/haptics";

export const DisplayGame: FC = () => {
    const { activeGame, loading } = useGameService();
    const [ tonConnectUI ] = useTonConnectUI();
    const { paymentApi } = useContext(ApiContext);
    const { isAuthorized } = useContext(AuthContext);
    const queryClient = useQueryClient();

    const navigate = useNavigate();

    const buy = useCallback(async () => {
        let bought = false;
        try {
            bought = await buyTicket(tonConnectUI, paymentApi, isAuthorized, activeGame!);
        } catch (error) {
            console.error(error);
            if (error instanceof InsufficientFundsError) {
                toasterError('Unable to buy a ticket - insufficient funds');
            } else {
                toasterError('Unable to buy a ticket, please try to run your request later');
            }
        }

        if (bought) {
            await queryClient.invalidateQueries({ queryKey: [userTicketsQueryKey] });
            await queryClient.refetchQueries({ queryKey: [userTicketsQueryKey] });
            notificationHaptic();
            navigate('/my-tickets');
        }
    }, [tonConnectUI, activeGame, paymentApi, isAuthorized]);

    return (
        <>
        {
            loading ? (
                <Spinner size="l"></Spinner>
            ) : !!activeGame ? (
                <>
                    <div className="text-headline welcome-to">WELCOME <br />TO</div>
                    <img className="logo-img" src={greedRaceImage}></img>
                    <div className="next-draw">
                        <div className="text-usual blue-shadow">NEXT DRAW {activeGame.name}</div>
                        <div className="text-mini blue-shadow">comes in: {<DisplayTimer expiryTimestamp={activeGame.endsAt}></DisplayTimer>}</div>
                        <div>{displayDrawDate(activeGame.endsAt)}</div>
                    </div>
                    <br></br>
                    <div className="text-medium blue-shadow prize-pool">PRIZE POOL:</div>
                    <table className="prize-table">
                        <tbody>
                            <tr>
                                <td><div className="text-mini"><img className="prize-icon" src={crown}></img> JACKPOT</div></td>
                                <td className='table-spacer'></td>
                                <td className='prize-cnt'>{activeGame.prize.jackpot.cnt.toString()}</td>
                                <td><span className='prize-x'>x</span></td>
                                <td>{activeGame.prize.jackpot.value.toString()}<span className='text-very-small'> {activeGame.asset.type}</span></td>
                            </tr>
                            <tr>
                                <td><div className="text-mini"><img className="prize-icon" src={moneyBag}></img> MAJOR PRIZES</div></td>
                                <td className='table-spacer'></td>
                                <td className='prize-cnt'>{activeGame.prize.major.cnt.toString()}</td>
                                <td><span className='prize-x'>x</span></td>
                                <td>{activeGame.prize.major.value.toString()}<span className='text-very-small'> {activeGame.asset.type}</span></td>
                            </tr>
                            <tr>
                                <td><div className="text-mini"><img className="prize-icon" src={stackOfCoins}></img> MINOR PRIZES</div></td>
                                <td className='table-spacer'></td>
                                <td className='prize-cnt'>{activeGame.prize.minor.cnt.toString()}</td>
                                <td><span className='prize-x'>x</span></td>
                                <td>{activeGame.prize.minor.value.toString()}<span className='text-very-small'> {activeGame.asset.type}</span></td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="text-usual blue-shadow total-racers">TOTAL RACERS: {activeGame.playersTotal}</div>
                    <Button className="buy-ticket text-medium" onClick={() => buy()}>BUY TICKET FOR {activeGame.ticketPrice} {activeGame.asset.type}</Button>
                </>
            ) : (
                <>
                    <div className="text-headline welcome-to">WELCOME <br />TO</div>
                    <img className="logo-img" src={greedRaceImage}></img>
                </>
            )
        }
        </>
    );
}

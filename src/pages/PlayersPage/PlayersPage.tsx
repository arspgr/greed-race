import { DisplayMenu } from "@/components/DisplayMenu/DisplayMenu";
import { DisplayUser } from "@/components/DisplayUser/DisplayUser";
import { useGameDetailsService, useGameService } from "@/services/game-service";
import { Spinner } from "@telegram-apps/telegram-ui";
import { FC } from "react";
import './PlayersPage.css';

export const PlayersPage: FC = () => {
    const { playerNames, loading } = useGameDetailsService();
    const { activeGame } = useGameService();

    return (
        <div>
            <DisplayUser></DisplayUser>
            {
                loading ? (
                    <Spinner size="l"></Spinner>
                ) : (
                    <div className="players-main">
                        <div className="text-headline-medium my-tickets-header">Players</div>
                        <div className="inter-font">Draw {activeGame?.name}</div>
                        <div className="inter-font">Total: {playerNames.length}</div>
                        <div className="players-list inter-font">
                        {
                            playerNames.map(name => {
                                return (
                                    <div className="blue-shadow" key={name}>&bull; &nbsp; &nbsp; @{name}</div>
                                );
                            })
                        }
                        </div>
                    </div>
                )
            }
            <DisplayMenu activeTab="Players"></DisplayMenu>
        </div>
    );
}
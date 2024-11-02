import { DisplayMenu } from "@/components/DisplayMenu/DisplayMenu";
import { FC } from "react";
import './MyTicketsPage.css';
import { DisplayUser } from "@/components/DisplayUser/DisplayUser";
import { useMyTicketsService } from "@/services/ticket-service";
import { Spinner } from "@telegram-apps/telegram-ui";
import circleEllipsis from '@/images/circle-ellipsis.svg';
import { useNavigate } from "react-router-dom";

export const MyTicketsPage: FC = () => {
    const { tickets, loading } = useMyTicketsService();

    const navigate = useNavigate();

    const goToTicketDetails = (id: string) => navigate(`/ticket/${id}`);

    return (
        <div className="my-tickets-container">
            <DisplayUser></DisplayUser>

            <div className="my-tickets-main">
                <div className="text-headline-medium my-tickets-header">MY TICKETS</div>
                {/* <div className="total-profit text-small inter-font">Total profit</div> */}
                {
                    loading ? (
                        <Spinner size="l"></Spinner>
                    ) : !!tickets && tickets.length > 0 ? (
                        <div className="ticket-items inter-font">
                            {
                                tickets.map(ticket => {
                                    return (
                                    <div key={ticket.id} className="ticket-item">
                                        <div>
                                            <div className="blue-shadow ticket-id">ID: {ticket.id}</div>
                                            <div className="draw-name">Draw {ticket.gameName}</div>
                                            <div className="ticket-result">
                                                Result: <span style={{ color: getResultColor(ticket.status), fontWeight: 700 }}>{mapResult(ticket.status, ticket.prize, ticket.asset)}</span>
                                            </div>
                                        </div>
                                        <div className="ticket-right-side">
                                            <div className="ticket-date">{new Date(ticket.createdAt).toLocaleString([], { dateStyle: 'short' })}</div>
                                            <img src={circleEllipsis} onClick={() => goToTicketDetails(ticket.id)}></img>
                                        </div>
                                    </div>
                                    )
                                })
                            }
                        </div>
                    ) : (
                        <div>You don't have tickets yet</div>
                    )
                }
            </div>
            <DisplayMenu activeTab="My tickets"></DisplayMenu>
        </div>
    );
}

function mapResult(status?: string, winValue?: number, asset?: string) {
    switch (status) {
        case 'NoPrize':
            return 'No Prize';
        case 'Win':
            return `Won! + ${winValue} ${asset}`;
        case 'Failed':
            return 'Failed';
        case 'Active':
        default:
            return 'Waiting for Draw'
    }
}

function getResultColor(status?: string) {
    const noResult = '#FE01AA';
    if (!status) {
        return noResult;
    }

    switch(status) {
        case 'Active':
            return noResult;
        case 'NoPrize':
            return 'gray';
        case 'PendingPayment':
            return 'cyan';
        case 'Win':
            return 'green';
        case 'Failed':
            return 'red';
        default:
            return 'white';
    }
    
}

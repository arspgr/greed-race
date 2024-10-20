import { DisplayMenu } from "@/components/DisplayMenu/DisplayMenu";
import { DisplayUser } from "@/components/DisplayUser/DisplayUser";
import { useTicketDetailsService } from "@/services/ticket-service";
import { Spinner } from "@telegram-apps/telegram-ui";
import { FC } from "react";
import './TicketDetailsPage.css';
import { useNavigate } from "react-router-dom";

export const TicketDetailsPage: FC = () => {
    const { ticketDetails, loading } = useTicketDetailsService();
    const navigate = useNavigate();

    const goToMyTickets = () => navigate('/my-tickets');

    return (
        <div className="ticket-details-container">
             <DisplayUser></DisplayUser>

            <div className="ticket-details-main">
                <div className="text-headline-medium ticket-details-header">TICKET DETAILS</div>
                {
                    loading ? (
                        <Spinner size="l"></Spinner>
                    ) : ticketDetails ? (
                        <div className="ticket-details-info">
                            <div className="blue-shadow ticket-details-status">{getHeader(ticketDetails.status)}</div>
                            <div className="inter-font ticket-props-container">
                                {
                                    ticketDetails.prize ? (
                                        <div className='ticket-prize-info'>
                                            Your prize: <span className='ticket-prize-value'>+ {ticketDetails.prize} {ticketDetails.asset}</span>
                                        </div>
                                    ) : null
                                }
                                <div className='ticket-props'>
                                    <div>Prize type: {ticketDetails.prizeType ?? 'None'}</div>
                                    <div className="details-ticket-id">Ticket ID: {ticketDetails.id}</div>
                                    <div>Draw {ticketDetails.gameName}</div>
                                    <div>Draw date {new Date(ticketDetails.drawDate!).toLocaleString([], { dateStyle: 'short' })}</div>
                                </div>
                                <div className='to-my-tickets' onClick={goToMyTickets}>To My Tickets</div>
                            </div>
                        </div>
                    ) : null
                }
            </div>

             <DisplayMenu activeTab="My tickets"></DisplayMenu>
        </div>
    );
}

function getHeader(status?: string) {
    switch (status) {
        case 'Win':
            return 'You won!';
        default:
            return 'Not this time';
    }
}
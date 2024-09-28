import { DisplayMenu } from "@/components/DisplayMenu/DisplayMenu";
import { FC } from "react";
import './MyTicketsPage.css';
import { DisplayUser } from "@/components/DisplayUser/DisplayUser";
import { useTicketService } from "@/services/ticket-service";
import { Spinner } from "@telegram-apps/telegram-ui";
import circleEllipsis from '@/images/circle-ellipsis.svg';

export const MyTicketsPage: FC = () => {
    const { tickets, loading } = useTicketService();

    return (
        <div className="my-tickets-container">
            <DisplayUser></DisplayUser>

            <div className="my-tickets-main">
                <div className="text-headline my-tickets-header">MY TICKETS</div>
                <div className="total-profit text-small inter-font">Total profit</div>
                <div>
                    {
                        loading ? (
                            <Spinner size="l"></Spinner>
                        ) : !!tickets && tickets.length > 0 ? (
                            <div className="ticket-items inter-font">
                                {
                                    tickets.map(ticket => {
                                        return (<div key={ticket.id} className="ticket-item">
                                            <div>
                                                <div className="blue-shadow ticket-id">ID: {ticket.id}</div>
                                                {/* <div>Date: {new Date(ticket.createdAt).toLocaleString()}</div> */}
                                                <div className="draw-name">Draw {ticket.gameName}</div>
                                                <div className="ticket-result">Result: <span style={{ color: getResultColor(ticket.result), fontWeight: 700 }}>{mapResult(ticket.result)}</span></div>
                                            </div>
                                            <div className="ticket-right-side">
                                                <div className="ticket-date">{new Date(ticket.createdAt).toLocaleString([], { dateStyle: 'short' })}</div>
                                                <img src={circleEllipsis}></img>
                                            </div>
                                        </div>)
                                    })
                                }
                            </div>
                        ) : (
                            <div>You don't have tickets yet</div>
                        )
                    }
                </div>
            </div>
            <DisplayMenu activeTab="My tickets"></DisplayMenu>
        </div>
    );
}

function mapResult(result?: string) {
    if (!result) {
        return 'Waiting for Draw';
    }
    return result;
}

function getResultColor(result?: string) {
    const noResult = '#FE01AA';
    if (!result) {
        return noResult;
    }

    switch(result) {
        case 'Not started':
            return noResult;
        case 'No prize':
            return 'gray';
        default:
            if (result.startsWith('+'))
                return 'green';
            return 'white';
    }
    
}

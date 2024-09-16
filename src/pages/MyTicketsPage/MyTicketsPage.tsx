import { DisplayMenu } from "@/components/DisplayMenu/DisplayMenu";
import { FC } from "react";
import './MyTicketsPage.css';
import { DisplayUser } from "@/components/DisplayUser/DisplayUser";
import { useTicketService } from "@/services/ticket-service";
import { Spinner } from "@telegram-apps/telegram-ui";

export const MyTicketsPage: FC = () => {
    const { tickets, loading } = useTicketService();

    return (
        <div className="my-tickets-container">
            <DisplayUser></DisplayUser>

            <div className="my-tickets-main">
                <div className="text-headline my-tickets-header">MY TICKETS</div>
                <div className="total-profit text-small">Total profit</div>
                <div>
                    {
                        loading ? (
                            <Spinner size="l"></Spinner>
                        ) : !!tickets && tickets.length > 0 ? (
                            <div className="ticket-items text-small">
                                {
                                    tickets.map(ticket => {
                                        return (<div key={ticket.id} className="ticket-item">
                                            <div>
                                                <div>ID: {ticket.id}</div>
                                                <div>Date: {new Date(ticket.createdAt).toLocaleString()}</div>
                                                <div>Game: {ticket.gameName}</div>
                                                <div> Price: {ticket.ticketPrice} {ticket.asset}</div>
                                            </div>
                                            <div className="ticket-result">
                                                <div>Result: <span style={{ color: getResultColor(ticket.result)}}>{mapResult(ticket.result)}</span></div>
                                                <div>(..)</div>
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
        return 'Not started';
    }
    return result;
}

function getResultColor(result?: string) {
    if (!result) {
        return 'gray';
    }

    switch(result) {
        case 'Not started':
        case 'No prize':
            return 'gray';
        default:
            if (result.startsWith('+'))
                return 'green';
            return 'white';
    }
    
}

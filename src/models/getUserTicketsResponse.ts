export interface GetUserTicketsResponse {
    tickets: UserTicket[];
}

export interface UserTicket {
    id: string;
    createdAt: string;
    gameId: string;
    gameName?: string;
    ticketPrice?: number;
    asset?: string;
    result?: string;
}
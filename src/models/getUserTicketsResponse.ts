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
    status?: string;
    prize?: number;
    prizeType?: string;
    drawDate?: Date;
}
export interface GetActiveGameResponse {
    id: string;
    name: string;
    asset: Asset;
    ticketPrice: number;
    createdAt: Date;
    status: 'pending' | 'completed';
    endsAt: Date;
    prize: PrizeInfo;
    playersTotal?: number;
}

export interface Asset {
    type: string;
    walletCode: string;
    masterAddress: string;
}

export interface PrizeInfo {
    jackpot: PrizeInfoItem;
    major: PrizeInfoItem;
    minor: PrizeInfoItem;
}

export interface PrizeInfoItem {
    value: bigint;
    cnt: bigint;
}

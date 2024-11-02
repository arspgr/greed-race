export interface GetWalletDataResponse {
    wallet: UserWalletData;
}

export interface UserWalletData {
    address: string;
    balance: number;
}
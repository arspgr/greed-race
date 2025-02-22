import { useCallback, useMemo } from "react";
import { axiosClient } from "./axios/axiosClient";
import { AxiosError } from "axios";
import { Account, TonProofItemReplySuccess } from "@tonconnect/ui-react";
import { GetSessionResponse } from "@/models/getSessionResponse";
import { GetTokenResponse } from "@/models/getTokenResponse";
import { GetActiveGameResponse } from "@/models/getActiveGameResponse";
import { GetUserTicketsResponse } from "@/models/getUserTicketsResponse";
import { GetTicketDetailsResponse } from "@/models/getTicketDetailsResponse";
import { GetWalletDataResponse, UserWalletData } from "@/models/getWalletDataResponse";
import { User } from "./Auth/UserProvider";
import { GetGameDetailsResponse } from "@/models/getGameDetailsResponse";

export interface PaymentApi {
    verifyTicket(gameId: string, boc: string): Promise<void>;
    getWalletData(): Promise<UserWalletData>;
}

export interface GeneralApi {
    getActiveGame(): Promise<GetActiveGameResponse | null>;
    getGameDetails(): Promise<GetGameDetailsResponse | null>;
    getUserTickets(): Promise<GetUserTicketsResponse>;
    getTicketDetails(id: string): Promise<GetTicketDetailsResponse>;
}

export interface Api {
    paymentApi: PaymentApi;
    generalApi: GeneralApi;
}

export interface AuthApi {
    getSession(): Promise<GetSessionResponse>;
    getToken(proof: TonProofItemReplySuccess['proof'], account: Account): Promise<GetTokenResponse>;
}

export function useAuthApi(): AuthApi {
    const getSession = useCallback(
         async () => {
            // return new Promise<string>(resolve => setTimeout(() => resolve((Math.random() + 1).toString(36).substring(7)), 500));
            try {
                const response = await axiosClient.post<GetSessionResponse>(`/api/auth/session`);
                if (!response.data) {
                    throw new Error('data is null');
                }
                return response.data;
            } catch (error) {
                throw wrapError(error);
            }
        },
        []
    );

    const getToken = useCallback(
        async (proof: TonProofItemReplySuccess['proof'], account: Account) => {
            try {
                const response = await axiosClient.post<GetTokenResponse>(`/api/auth/token`, { 
                    address: account.address,
                    network: account.chain,
                    publicKey: account.publicKey,
                    proof: {
                        timestamp: proof.timestamp,
                        signature: proof.signature,
                        payload: proof.payload,
                        domain: proof.domain,
                        stateInit: account.walletStateInit,
                    }
                });
                if (!response.data) {
                    throw new Error('data is null');
                }
                return response.data;
            } catch (error) {
                throw wrapError(error);
            }
        },
        []
    );

    return { getSession, getToken };
}

export function usePaymentApi(user: User, token?: string): PaymentApi {
    const headers = useMemo(
        () => ({
            User: user.id,
            Authorization: `Bearer ${token}`
        }),
        [user.id, token]
    );

    const verifyTicket = useCallback(
        async (gameId: string, boc: string) => {
            try {
                const response = await axiosClient.post<void>(`api/ticket/verify`, { gameId, boc, userName: user.name }, { headers });

                return response.data;
            } catch (error) {
                throw wrapError(error);
            }
        },
        [headers, user.name]
    );

    const getWalletData = useCallback(
        async () => {
            try {
                const response = await axiosClient.get<GetWalletDataResponse>(`api/user/wallet`, { headers });

                return response.data.wallet;
            } catch (error) {
                throw wrapError(error);
            }
        },
        [headers]
    )

    return { verifyTicket, getWalletData };
}

export function useGeneralApi(userId: number): GeneralApi {
    const headers = useMemo(
        () => ({
            User: userId
        }),
        [userId]
    );

    const getActiveGame = useCallback(
        async () => {
            try {
                const response = await axiosClient.get<GetActiveGameResponse>('/api/game/active', { headers });

                return response.data;
            } catch (error) {
                if (error instanceof AxiosError && error.response?.status === 404) {
                    return null;
                }
                throw wrapError(error);
            }
        },
        [headers]
    );

    const getUserTickets = useCallback(
        async () => {
            try {
                const response = await axiosClient.get<GetUserTicketsResponse>(`/api/user/tickets`, { headers });

                return response.data;
            } catch (error) {
                throw wrapError(error);
            }
        },
        [headers]
    );

    const getTicketDetails = useCallback(
        async (id: string) => {
            try {
                const response = await axiosClient.get<GetTicketDetailsResponse>(`/api/ticket/${id}`, { headers });

                return response.data;
            } catch (error) {
                throw wrapError(error);
            }
        },
        [headers]
    );

    const getGameDetails = useCallback(
        async () => {
            try {
                const response = await axiosClient.get<GetGameDetailsResponse>('api/game/players/names', { headers });

                return response.data;
            } catch (error) {
                throw wrapError(error);
            }
        },
        [headers]
    )

    return { getActiveGame, getUserTickets, getTicketDetails, getGameDetails };
}

function wrapError(error: unknown) {
    return new Error(error instanceof AxiosError ? error.message : String(error));
}
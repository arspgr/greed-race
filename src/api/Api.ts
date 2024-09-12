import { useCallback, useMemo } from "react";
import { axiosClient } from "./axios/axiosClient";
import { AxiosError } from "axios";
import { Account, TonProofItemReplySuccess } from "@tonconnect/ui-react";
import { GetSessionResponse } from "@/models/getSessionResponse";
import { GetTokenResponse } from "@/models/getTokenResponse";
import { GetActiveGameResponse } from "@/models/getActiveGameResponse";

export interface PaymentApi {
    verifyTicket(gameId: string, boc: string): Promise<void>;
}

export interface GeneralApi {
    getActiveGame(): Promise<GetActiveGameResponse>;
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

export function usePaymentApi(userId: number, token?: string): PaymentApi {
    const headers = useMemo(
        () => ({
            User: userId,
            Authorization: `Bearer ${token}`
        }),
        [userId, token]
    );

    const verifyTicket = useCallback(
        async (gameId: string, boc: string) => {
            try {
                const response = await axiosClient.post<void>(`api/ticket/verify`, { gameId, boc }, { headers });

                return response.data;
            } catch (error) {
                throw wrapError(error);
            }
        },
        [headers]
    );

    return { verifyTicket };
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
                throw wrapError(error);
            }
        },
        [headers]
    );

    return { getActiveGame };
}

function wrapError(error: unknown) {
    return new Error(error instanceof AxiosError ? error.message : String(error));
}
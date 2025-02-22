import { PaymentApi } from "@/api/Api";
import { ApiContext } from "@/api/ApiProvider";
import { sendJettonTransaction, sendTonTransaction } from "@/api/ton/ton";
import { UserTicket } from "@/models/getUserTicketsResponse";
import { useQuery } from "@tanstack/react-query";
import { TonConnectUI } from "@tonconnect/ui-react";
import { useContext, useEffect } from "react";
import { toasterError } from "./notification-service";
import { useParams } from "react-router-dom";
import { InsufficientFundsError } from "@/models/InsufficientFundsError";
import { userTicketsQueryKey } from "@/constants/queries";
import { GetActiveGameResponse } from "@/models/getActiveGameResponse";

export interface MyTicketsService {
    tickets?: UserTicket[];
    loading: boolean;
}

export function useMyTicketsService(): MyTicketsService {
    const { generalApi } = useContext(ApiContext);

    const result = useQuery({
        queryKey: [userTicketsQueryKey],
        queryFn: () => generalApi.getUserTickets(),
    });

    useEffect(() => {
        if (result.isError) {
            toasterError('Unable to load data');
        }
    }, [result.isError]);

    return {
        tickets: result.data?.tickets,
        loading: result.isLoading
    }
}

export async function buyTicket(tonConnectUI: TonConnectUI, api: PaymentApi, isAuthorized: boolean, game: GetActiveGameResponse) {
    if (!isAuthorized) {
        tonConnectUI.openModal();
        return false;
    }

    const walletData = await api.getWalletData();
    if (!walletData || walletData.balance <= 0)
        throw new InsufficientFundsError();

    const txResp = game.asset.type.toLowerCase() === 'ton' ? await sendTonTransaction(tonConnectUI, game.ticketPrice) : await sendJettonTransaction(tonConnectUI, game.ticketPrice, walletData.address);
    await api.verifyTicket(game.id, txResp.boc);

    return true;
}

export interface TicketDetailsService {
    ticketDetails?: UserTicket;
    loading: boolean;
}

export function useTicketDetailsService(): TicketDetailsService {
    const { generalApi } = useContext(ApiContext);
    const { id } = useParams();

    const result = useQuery({
        queryKey: ['ticketDetails', id],
        queryFn: () => generalApi.getTicketDetails(id!),
        enabled: !!id
    });

    useEffect(() => {
        if (result.isError) {
            toasterError('Unable to load data');
        }
    }, [result.isError]);

    
    return {
        ticketDetails: result.data?.ticket,
        loading: result.isLoading
    }
}
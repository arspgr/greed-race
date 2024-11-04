import { PaymentApi } from "@/api/Api";
import { ApiContext } from "@/api/ApiProvider";
import { sendTransaction } from "@/api/ton/ton";
import { UserTicket } from "@/models/getUserTicketsResponse";
import { useQuery } from "@tanstack/react-query";
import { TonConnectUI } from "@tonconnect/ui-react";
import { useContext, useEffect } from "react";
import { toasterError } from "./notification-service";
import { useParams } from "react-router-dom";
import { InsufficientFundsError } from "@/models/InsufficientFundsError";
import { userTicketsQueryKey } from "@/constants/queries";

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

export async function buyTicket(tonConnectUI: TonConnectUI, ticketPrice: number, api: PaymentApi, gameId: string, isAuthorized: boolean) {
    if (!isAuthorized) {
        tonConnectUI.openModal();
        return false;
    }

    const walletData = await api.getWalletData();
    if (!walletData || walletData.balance <= 0)
        throw new InsufficientFundsError();

    const txResp = await sendTransaction(tonConnectUI, ticketPrice, walletData.address);
    await api.verifyTicket(gameId, txResp.boc);

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
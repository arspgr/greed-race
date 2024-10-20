import { PaymentApi } from "@/api/Api";
import { ApiContext } from "@/api/ApiProvider";
import { sendTransaction } from "@/api/ton/ton";
import { Asset } from "@/models/getActiveGameResponse";
import { UserTicket } from "@/models/getUserTicketsResponse";
import { useQuery } from "@tanstack/react-query";
import { TonConnectUI } from "@tonconnect/ui-react";
import { useContext, useEffect } from "react";
import { toasterError } from "./notification-service";
import { NavigateFunction, useParams } from "react-router-dom";

export interface MyTicketsService {
    tickets?: UserTicket[];
    loading: boolean;
}

export function useMyTicketsService(): MyTicketsService {
    const { generalApi } = useContext(ApiContext);

    const result = useQuery({
        queryKey: ['userTickers'],
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

export async function buyTicket(tonConnectUI: TonConnectUI, asset: Asset, ticketPrice: number, api: PaymentApi, gameId: string, isAuthorized: boolean, navigate: NavigateFunction) {
    if (!isAuthorized) {
        tonConnectUI.openModal();
        return false;
    }

    const txResp = await sendTransaction(tonConnectUI, asset, ticketPrice);
    await api.verifyTicket(gameId, txResp.boc);
    navigate('/my-tickets');

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
import { PaymentApi } from "@/api/Api";
import { ApiContext } from "@/api/ApiProvider";
import { sendTransaction } from "@/api/ton/ton";
import { Asset } from "@/models/getActiveGameResponse";
import { UserTicket } from "@/models/getUserTicketsResponse";
import { useQuery } from "@tanstack/react-query";
import { TonConnectUI } from "@tonconnect/ui-react";
import { useContext, useEffect } from "react";
import { toasterError } from "./notification-service";

export interface TicketService {
    tickets?: UserTicket[];
    loading: boolean;
}

export function useTicketService(): TicketService {
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

export async function buyTicket(tonConnectUI: TonConnectUI, asset: Asset, api: PaymentApi, gameId: string, isAuthorized: boolean) {
    if (!isAuthorized) {
        tonConnectUI.openModal();
        return;
    }
    const txResp = await sendTransaction(tonConnectUI, asset);

    await api.verifyTicket(gameId, txResp.boc);
}
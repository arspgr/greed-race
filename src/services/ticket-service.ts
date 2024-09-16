import { PaymentApi } from "@/api/Api";
import { sendTransaction } from "@/api/ton/ton";
import { Asset } from "@/models/getActiveGameResponse";
import { TonConnectUI } from "@tonconnect/ui-react";

export async function buyTicket(tonConnectUI: TonConnectUI, asset: Asset, api: PaymentApi, gameId: string, isAuthorized: boolean) {
    if (!isAuthorized) {
        tonConnectUI.openModal();
        return;
    }
    const txResp = await sendTransaction(tonConnectUI, asset);

    await api.verifyTicket(gameId, txResp.boc);
}
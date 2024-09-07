import { Api } from "@/api/Api";
import { sendTransaction } from "@/api/ton/ton";
import { Asset } from "@/models/getActiveGameResponse";
import { TonConnectUI } from "@tonconnect/ui-react";

export async function buyTicket(tonConnectUI: TonConnectUI, asset: Asset, api: Api, gameId: string) {
    const txResp = await sendTransaction(tonConnectUI, asset);
    console.log(txResp.boc);

    await api.verifyTicket({ gameId, boc: txResp.boc });
}
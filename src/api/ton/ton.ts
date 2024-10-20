import { Asset } from '@/models/getActiveGameResponse';
import { Address, beginCell, storeStateInit, toNano, Cell } from '@ton/ton'
import { TonConnectUI } from '@tonconnect/ui-react';

const destination = 'UQAMFgj6n8LGovZ1FpD09Mhe0sAfwjAo2Lr1o2rwR1_8R6Hq';

export async function sendTransaction(tonConnectUI: TonConnectUI, asset: Asset, amount: number) {

    //const destGram = getJettonAddress(destination, gramWalletCode, gramMasterAddress);
    // const forwardPayload = beginCell()
    // .storeUint(0, 32) // 0 opcode means we have a comment
    // .storeStringTail('Greed race payment')
    // .endCell();

    const body = beginCell()
    .storeUint(0xf8a7ea5, 32)                 // jetton transfer op code
    .storeUint(0, 64)                         // query_id:uint64
    .storeCoins(toNano(amount))                      // amount:(VarUInteger 16) -  Jetton amount for transfer (decimals = 6 - jUSDT, 9 - default)
    .storeAddress(Address.parse(destination))  // destination:MsgAddress
    .storeAddress(Address.parse(destination))  // response_destination:MsgAddress
    .storeBit(0) // no custom payload
    .storeCoins(0)                 // forward_ton_amount:(VarUInteger 16) - if >0, will send notification message
    .storeUint(0,1)
    //.storeBit(1) // we store forwardPayload as a reference
    //.storeRef(forwardPayload)
    .endCell();

    // const endpoint = await getHttpEndpoint({
    //     network: "testnet",
    //   });
    // const client = new TonClient({
    //     endpoint
    // });

    // const jettonWalletAddress = Address.parse('Sender_Jetton_Wallet');
    // let jettonWalletDataResult = await client.runMethod(jettonWalletAddress, 'get_wallet_data');
    // jettonWalletDataResult.stack.readNumber();
    // const ownerAddress = jettonWalletDataResult.stack.readAddress();
    // const jettonMasterAddress = jettonWalletDataResult.stack.readAddress();
    // const jettonCode = jettonWalletDataResult.stack.readCell();
    // const jettonData = beginCell()
    //     .storeCoins(0)
    //     .storeAddress(ownerAddress)
    //     .storeAddress(jettonMasterAddress)
    //     .storeRef(jettonCode)
    //     .endCell();

    // const stateInit: StateInit = {
    //     code: jettonCode,
    //     data: jettonData
    // }

    // const stateInitCell = beginCell()
    //     .store(storeStateInit(stateInit))
    //     .endCell();

    // const senderAddress = new Address(0, stateInitCell.hash());

    const senderAddress = getJettonAddress(tonConnectUI.account?.address!, asset.walletCode, asset.masterAddress);

    const transaction = {
        validUntil: Math.floor(Date.now() / 1000) + 360,
        messages: [
            {
                address: senderAddress.toString(), // sender jetton wallet
                amount: toNano(0.04).toString(), // for commission fees, excess will be returned
                payload: body.toBoc().toString("base64") // payload with jetton transfer body
            }
        ],
    }

    return await tonConnectUI.sendTransaction(transaction);
}

function getJettonAddress(userAddress: string, jettonWalletCode: string, jettonMasterAddress: string) {
    const JETTON_WALLET_CODE = Cell.fromBoc(Buffer.from(jettonWalletCode, 'hex'))[0];
    const JETTON_MASTER_ADDRESS = Address.parse(jettonMasterAddress);
    const USER_ADDRESS = Address.parse(userAddress);

    const jettonWalletStateInit = beginCell().store(storeStateInit({
        code: JETTON_WALLET_CODE,
        data: beginCell()
            .storeCoins(0)
            .storeAddress(USER_ADDRESS)
            .storeAddress(JETTON_MASTER_ADDRESS)
            .storeRef(JETTON_WALLET_CODE)
            .endCell()
    }))
    .endCell();
    return new Address(0, jettonWalletStateInit.hash());
}
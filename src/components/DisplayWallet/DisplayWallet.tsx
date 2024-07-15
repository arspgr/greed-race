import { TonConnectButton, useTonAddress } from "@tonconnect/ui-react";
import { FC } from "react";

export const DisplayWalletAddress: FC = () => {
    const address = useTonAddress();

    if (!address) {
        return (
            <TonConnectButton className='ton-connect-page__button'/>
        );
    }

    return (
        <TonConnectButton className='ton-connect-page__button-connected'/>
    );
}
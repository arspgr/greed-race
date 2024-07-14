import { Text } from "@telegram-apps/telegram-ui";
import { TonConnectButton, useTonAddress, useTonWallet } from "@tonconnect/ui-react";
import { FC } from "react";

export const DisplayWalletAddress: FC = () => {
    const address = useTonAddress();

    if (!address) {
        return (
            <TonConnectButton className='ton-connect-page__button'/>
        );
    }

    return (
        <Text>{address}</Text>
    );
}
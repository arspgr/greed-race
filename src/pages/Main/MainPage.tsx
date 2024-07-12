import { Cell, Image, List, Section } from "@telegram-apps/telegram-ui";
import { FC } from "react";
import { Link } from "../../Link/Link";
import tonSvg from './ton.svg';

export const MainPage: FC = () => {
    return (
        <List>
            <Section header='Features'>
                <Link to='/ton-connect'>
                    <Cell
                        before={<Image src={tonSvg} style={{ backgroundColor: '#007AFF' }}/>}
                        subtitle='Connect your TON wallet'>
                        TON Connect
                    </Cell>
                </Link>
                <Link to='/init-data'><Cell>Init Data</Cell></Link>
            </Section>
        </List>
    )
}
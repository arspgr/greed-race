import { Link } from "@/Link/Link";
import { Cell, Image, List, Section } from "@telegram-apps/telegram-ui";
import { FC } from "react";
import tonSvg from './ton.svg';

export const FeaturesPage: FC = () => {
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
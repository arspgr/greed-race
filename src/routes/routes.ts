import type { ComponentType, JSX } from 'react';

import { MainPage } from '../pages/Main/MainPage';
import { TONConnectPage } from '@/pages/TONConnectPage/TONConnectPage';
import { InitDataPage } from '@/pages/InitDataPage/InitDataPage';
import { FeaturesPage } from '@/pages/FeaturesPage/FeaturesPage';
import { MyTicketsPage } from '@/pages/MyTicketsPage/MyTicketsPage';
import { TicketDetailsPage } from '@/pages/TicketDetails/TicketDetailsPage';
import { HowItWorksPage } from '@/pages/HowItWorksPage/HowItWorksPage';

interface Route {
  path: string;
  Component: ComponentType;
  title?: string;
  icon?: JSX.Element;
}

export const routes: Route[] = [
  { path: '/', Component: MainPage },
  {
    path: '/ton-connect',
    Component: TONConnectPage,
    title: 'TON Connect',
  },
  {
    path: '/init-data',
    Component: InitDataPage,
    title: 'Init data',
  },
  {
    path: '/features',
    Component: FeaturesPage,
    title: 'features'
  },
  {
    path: '/my-tickets',
    Component: MyTicketsPage,
    title: 'My tickets'
  },
  {
    path: '/ticket/:id',
    Component: TicketDetailsPage,
    title: 'Ticket details'
  },
  {
    path: '/how-it-works',
    Component: HowItWorksPage,
    title: 'How it works'
  },
];

import type { ComponentType, JSX } from 'react';

import { MainPage } from '../pages/Main/MainPage';
import { TONConnectPage } from '@/pages/TONConnectPage/TONConnectPage';
import { InitDataPage } from '@/pages/InitDataPage/InitDataPage';

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
];

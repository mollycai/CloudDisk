import { NonIndexRouteObject } from 'react-router-dom';

export interface MetaProps {
  title: string;
  key?: string;
  rank?: number;
}

export interface RouteObject extends NonIndexRouteObject {
  children?: RouteObject[];
  element?: React.ReactNode;
  path?: string;
  meta?: MetaProps;
}

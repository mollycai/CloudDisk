export interface MetaProps {
  title: string;
  key?: string;
  rank?: number;
}

export interface RouteObject {
	index?: boolean;
  children?: RouteObject[];
  element?: React.ReactNode;
  path?: string;
  meta?: MetaProps;
}

export interface RootState {
  breadcrumb: BreadcrumbState;
}

export interface BreadcrumbItem {
  title: string;
  path?: string;
}

export interface BreadcrumbState {
  items: BreadcrumbItem[];
}

export interface GlobalState {
  token: string;
  userInfo: any;
  language: string;
}

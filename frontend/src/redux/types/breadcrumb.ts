// types/breadcrumb.ts
export interface BreadcrumbItem {
  title: string;
  path?: string;
}

export interface BreadcrumbState {
  items: BreadcrumbItem[];
}

// 初始状态
export const initialBreadcrumbState: BreadcrumbState = {
  items: [],
};

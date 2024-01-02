
export type BreadcrumbType = {
    id: number;
    name?: string;
    path: string;
};
export type PageTitleDataType = {
    title: string,
    breadcrumbs: BreadcrumbType[],
};
export type LoadingType = {
    standart: boolean,
    lazy: boolean,
};
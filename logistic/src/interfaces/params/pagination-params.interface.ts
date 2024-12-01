export interface IPaginationParams {
    currentPage: number;
    pageSize: number;
    totalSize: number;
    totalPages: number;
    haveNext: boolean;
    havePrev: boolean;
}
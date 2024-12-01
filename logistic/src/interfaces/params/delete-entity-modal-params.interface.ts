export interface IDeleteEntityModalParams {
    isOpen: boolean;
    entityTitle: string;
    onClose: () => void;
    onDelete: () => Promise<void> | void;
    error?: string;
    wrapperStyles? : string;
    containerStyles? : string;
}
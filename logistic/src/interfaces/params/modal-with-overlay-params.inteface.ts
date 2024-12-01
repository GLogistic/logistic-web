export interface IModalWithOverlayParams {
    isOpen: boolean;
    children: React.ReactNode;
    onClose: () => void;
    wrapperStyles? : string;
    containerStyles? : string;
}
export interface IModalWithOverlayParams {
    children: React.ReactNode;
    onClose: () => void;
    wrapperStyles? : string;
    containerStyles? : string;
}
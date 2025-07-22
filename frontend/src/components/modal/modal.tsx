import React, { ReactNode } from 'react';
import { ModalOverlay, ModalContent, ModalHeader, ModalTitle, CloseButton, ModalFooter } from './modal-styles';

interface ModalProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
    footer?: ReactNode;
}
 const Modal: React.FC<ModalProps> = ({ open, onClose, title, children, footer }) => {
    if (!open) return null;
    return (
        <ModalOverlay onClick={onClose}>
            <ModalContent onClick={e => e.stopPropagation()}>
                <ModalHeader>
                    {title && <ModalTitle>{title}</ModalTitle>}
                    <CloseButton onClick={onClose} title="Fechar">×</CloseButton>
                </ModalHeader>
                {children}
                {footer && <ModalFooter>{footer}</ModalFooter>}
            </ModalContent>
        </ModalOverlay>
    );
};

export default Modal;
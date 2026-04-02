'use client'
import { ReactNode } from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black/60 flex backdrop-blur-xs items-center justify-center  z-50"
            onClick={onClose}
        >
            <div
                className="bg-white m-4 dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden max-w-3xl w-full"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            >
                {children}
            </div>
        </div>
    );
}
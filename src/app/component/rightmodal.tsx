'use client';
import { FC, ReactNode } from 'react';
import { IoClose } from 'react-icons/io5';

interface RightModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
}

const RightModal: FC<RightModalProps> = ({ isOpen, onClose, title, children }) => {
    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-end transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
        >
            {/* Background overlay */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Floating Modal Panel */}
            <div
                className={`relative w-full max-w-sm sm:max-w-md h-[90vh] m-4 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl transform transition-transform duration-300 flex flex-col overflow-hidden
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 px-5 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-200">
                        {title || 'Request Full Access'}
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition"
                    >
                        <IoClose className="w-6 h-6" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-4 px-5 flex-1 overflow-y-auto">{children}</div>

                
               
            </div>
        </div>
    );
};

export default RightModal;
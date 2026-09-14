import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
    message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
    if (!message) return null;

    return (
        <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 animate-in fade-in slide-in-from-top-2 duration-300">
            <AlertCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
            <div>
                <h3 className="font-bold mb-1">حدث خطأ</h3>
                <p className="text-sm leading-relaxed">{message}</p>
            </div>
        </div>
    );
};

export default ErrorMessage;

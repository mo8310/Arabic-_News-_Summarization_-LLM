import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingState: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl shadow-sm border border-slate-200 text-slate-500 animate-in fade-in duration-500">
            <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
            <p className="text-lg font-medium">جاري تحليل المقال واستخراج الملخص...</p>
            <p className="text-sm mt-2 opacity-75">قد يستغرق هذا بضع ثوانٍ</p>
        </div>
    );
};

export default LoadingState;

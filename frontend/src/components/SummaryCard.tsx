import React, { useState } from 'react';
import { FileText, Copy, Check } from 'lucide-react';
import clsx from 'clsx';

interface SummaryCardProps {
    summary: string[];
}

const SummaryCard: React.FC<SummaryCardProps> = ({ summary }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        const text = summary.map(point => `- ${point}`).join('\n');
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (!summary || summary.length === 0) return null;

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden transition-all hover:shadow-md animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-indigo-50 border-b border-indigo-100 p-4 flex justify-between items-center">
                <h2 className="text-lg font-bold text-indigo-900 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-indigo-600" />
                    الملخص
                </h2>
                <button
                    onClick={handleCopy}
                    className={clsx(
                        "flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors",
                        copied 
                            ? "bg-green-100 text-green-700" 
                            : "bg-white text-indigo-600 hover:bg-indigo-100 border border-indigo-200"
                    )}
                >
                    {copied ? (
                        <>
                            <Check className="w-3.5 h-3.5" />
                            تم النسخ
                        </>
                    ) : (
                        <>
                            <Copy className="w-3.5 h-3.5" />
                            نسخ الملخص
                        </>
                    )}
                </button>
            </div>
            
            <div className="p-6">
                <ul className="space-y-4">
                    {summary.map((point, index) => (
                        <li key={index} className="flex items-start gap-3 text-slate-700 leading-relaxed text-lg">
                            <span className="w-2 h-2 rounded-full bg-indigo-500 mt-2.5 flex-shrink-0" />
                            <span>{point}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SummaryCard;

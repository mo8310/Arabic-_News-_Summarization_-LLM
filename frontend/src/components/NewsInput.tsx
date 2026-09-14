import React, { useState } from 'react';
import { Send, Type } from 'lucide-react';
import clsx from 'clsx';

interface NewsInputProps {
    onSubmit: (article: string) => void;
    isLoading: boolean;
}

const NewsInput: React.FC<NewsInputProps> = ({ onSubmit, isLoading }) => {
    const [article, setArticle] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (article.trim().length > 10) {
            onSubmit(article);
        }
    };

    const handleClear = () => setArticle('');
    const handleExample = () => setArticle('أعلنت شركة أبل عن إطلاق الجيل الجديد من هواتف آيفون في مؤتمرها السنوي. الهاتف الجديد يتميز بمعالج أسرع بنسبة 30% وكاميرا متطورة تدعم التصوير الليلي بدقة عالية. كما تم تحسين عمر البطارية لتدوم طوال اليوم. وتتوقع الشركة أن يحقق الهاتف مبيعات قياسية في الربع الأخير من العام.');

    const wordCount = article.trim() === '' ? 0 : article.trim().split(/\s+/).length;
    const charCount = article.length;

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden transition-all hover:shadow-md">
            <div className="bg-slate-50 border-b border-slate-200 p-4 flex justify-between items-center">
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <Type className="w-5 h-5 text-indigo-600" />
                    النص الإخباري
                </h2>
                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={handleExample}
                        className="text-xs font-medium px-3 py-1.5 text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
                    >
                        مثال للتجربة
                    </button>
                    <button
                        type="button"
                        onClick={handleClear}
                        className="text-xs font-medium px-3 py-1.5 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                    >
                        مسح
                    </button>
                </div>
            </div>
            
            <form onSubmit={handleSubmit}>
                <textarea
                    value={article}
                    onChange={(e) => setArticle(e.target.value)}
                    placeholder="قم بلصق المقال الإخباري هنا..."
                    className="w-full h-64 p-5 resize-y focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 text-slate-700 leading-relaxed text-lg"
                    dir="rtl"
                    disabled={isLoading}
                />
                
                <div className="bg-slate-50 border-t border-slate-200 p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex gap-4 text-sm text-slate-500 font-medium">
                        <span>الكلمات: <span className="text-slate-800">{wordCount}</span></span>
                        <span>الحروف: <span className="text-slate-800">{charCount}</span></span>
                    </div>
                    
                    <button
                        type="submit"
                        disabled={isLoading || article.trim().length < 10}
                        className={clsx(
                            "flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-white transition-all shadow-sm",
                            isLoading || article.trim().length < 10
                                ? "bg-slate-300 cursor-not-allowed"
                                : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-md active:transform active:scale-95"
                        )}
                    >
                        {isLoading ? 'جاري التلخيص...' : 'لخّص المقال'}
                        {!isLoading && <Send className="w-4 h-4 rtl:-scale-x-100" />}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NewsInput;

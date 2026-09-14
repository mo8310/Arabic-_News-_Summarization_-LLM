import React, { useState } from 'react';
import Navbar from './components/Navbar';
import NewsInput from './components/NewsInput';
import SummaryCard from './components/SummaryCard';
import LoadingState from './components/LoadingState';
import ErrorMessage from './components/ErrorMessage';
import { summarizeArticle } from './services/api';

function App() {
    const [summary, setSummary] = useState<string[] | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>('');

    const handleSummarize = async (article: string) => {
        setIsLoading(true);
        setError('');
        setSummary(null);

        try {
            const response = await summarizeArticle({ article });
            setSummary(response.summary);
        } catch (err: any) {
            console.error(err);
            if (err.response && err.response.data && err.response.data.detail) {
                setError(err.response.data.detail);
            } else {
                setError('تعذر الاتصال بالخادم. يرجى التأكد من تشغيل الخادم والمحاولة مرة أخرى.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col font-arabic" dir="rtl">
            <Navbar />
            
            <main className="flex-grow">
                <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">
                    <div className="text-center space-y-4 mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold text-slate-800">
                            لخّص الأخبار الطويلة في ثوانٍ
                        </h2>
                        <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                            قم بلصق أي مقال إخباري باللغة العربية وسيقوم نموذج الذكاء الاصطناعي المخصص لدينا باستخراج أهم النقاط الأساسية لك.
                        </p>
                    </div>

                    <div className="space-y-8 relative">
                        <ErrorMessage message={error} />
                        
                        <NewsInput onSubmit={handleSummarize} isLoading={isLoading} />
                        
                        {isLoading && <LoadingState />}
                        
                        {summary && !isLoading && <SummaryCard summary={summary} />}
                    </div>
                </div>
            </main>

            <footer className="bg-white border-t border-slate-200 py-8 text-center text-slate-500 text-sm">
                <p>تطبيق تلخيص الأخبار العربية باستخدام الذكاء الاصطناعي (LoRA/PEFT)</p>
            </footer>
        </div>
    );
}

export default App;

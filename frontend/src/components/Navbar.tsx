import React from 'react';
import { Layers } from 'lucide-react';

const Navbar: React.FC = () => {
    return (
        <nav className="bg-white border-b border-slate-200 sticky top-0 z-10">
            <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="bg-indigo-600 text-white p-2 rounded-xl">
                        <Layers className="w-5 h-5" />
                    </div>
                    <div>
                        <h1 className="font-bold text-xl text-slate-800 tracking-tight">التلخيص الإخباري</h1>
                    </div>
                </div>
                <div className="hidden sm:flex text-sm text-slate-500 font-medium">
                    مدعوم بنموذج ذكاء اصطناعي
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

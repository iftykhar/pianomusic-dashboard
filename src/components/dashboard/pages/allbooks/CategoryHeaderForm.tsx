"use client";

import React, { useState } from "react";
import { Zap } from "lucide-react";

interface CategoryHeaderFormProps {
    initialTitle?: string;
    initialSubtitle?: string;
    onSubmit: (data: { title: string; subtitle: string }) => void;
    isPending: boolean;
}

export default function CategoryHeaderForm({
    initialTitle = "",
    initialSubtitle = "",
    onSubmit,
    isPending,
}: CategoryHeaderFormProps) {
    const [formState, setFormState] = useState({
        title: initialTitle,
        subtitle: initialSubtitle,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formState);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
            <div className="space-y-4">
                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        Global Title
                    </label>
                    <input
                        type="text"
                        value={formState.title}
                        onChange={(e) =>
                            setFormState({ ...formState, title: e.target.value })
                        }
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#ff7a00]/50 focus:ring-1 focus:ring-[#ff7a00]/50 transition-all text-sm font-medium"
                        placeholder="Enter system title..."
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        Sub-Protocol Description
                    </label>
                    <textarea
                        value={formState.subtitle}
                        onChange={(e) =>
                            setFormState({ ...formState, subtitle: e.target.value })
                        }
                        rows={3}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#ff7a00]/50 focus:ring-1 focus:ring-[#ff7a00]/50 transition-all text-sm font-medium resize-none"
                        placeholder="Enter description..."
                    />
                </div>
            </div>

            <button
                type="submit"
                disabled={isPending}
                className="w-full bg-[#ff7a00] hover:bg-[#ff8a00] text-white font-bold text-xs uppercase tracking-[0.15em] py-4 rounded-xl shadow-lg shadow-[#ff7a00]/20 hover:shadow-[#ff7a00]/40 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
                {isPending ? (
                    "Syncing..."
                ) : (
                    <>
                        <Zap size={14} /> Commit Update
                    </>
                )}
            </button>
        </form>
    );
}

"use client";

import React, { useState, useMemo } from "react";
import { useSetPricing } from "@/features/dashboard/hooks/useSetPricing";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Monitor, BookOpen, Layers, DollarSign, Loader2, Zap, ArrowUpRight, Calculator, ShieldCheck } from "lucide-react";
import { DeliveryType } from "@/features/dashboard/types/pricing.types";
import { toast } from "sonner";

type PricingFormState = {
    digital: string;
    print: string;
    both: string;
};

const SAMPLE_PAGE_COUNT = 100;

const PriceSet: React.FC = () => {
    const { createPricing, loading } = useSetPricing();

    const [form, setForm] = useState<PricingFormState>({
        digital: "",
        print: "",
        both: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (value === "" || /^\d*\.?\d*$/.test(value)) {
            setForm((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleUpdate = async (type: DeliveryType, name: keyof PricingFormState) => {
        const value = form[name];
        if (!value || isNaN(Number(value))) {
            toast.error("Precision Error: Enter a valid numerical rate.");
            return;
        }

        try {
            await createPricing({
                deliveryType: type,
                pricePerPage: Number(value),
                currency: "usd",
            });
            toast.success(`${type.toUpperCase()} Protocol Updated Successfully`, {
                description: `Global rate set to $${value}/page`,
                icon: <ArrowUpRight className="text-green-500" />
            });
        } catch (err) {
            toast.error("Synchronization Failure", {
                description: "The system could not commit these changes. Retry in 60s."
            });
        }
    };

    // Dynamic calculators for each tier
    const impacts = useMemo(() => {
        return {
            digital: (Number(form.digital) * SAMPLE_PAGE_COUNT).toFixed(2),
            print: (Number(form.print) * SAMPLE_PAGE_COUNT).toFixed(2),
            both: (Number(form.both) * SAMPLE_PAGE_COUNT).toFixed(2),
        };
    }, [form]);

    const tiers = [
        {
            type: "digital" as DeliveryType,
            name: "digital" as keyof PricingFormState,
            title: "Digital Forge",
            tag: "High Margin",
            desc: "Optimized for global distribution and zero-cost scaling.",
            icon: <Monitor className="w-8 h-8 text-blue-400" />,
            impact: impacts.digital,
            glow: "group-hover:shadow-blue-500/20",
            border: "focus-within:border-blue-500/50"
        },
        {
            type: "print" as DeliveryType,
            name: "print" as keyof PricingFormState,
            title: "Print Nexus",
            tag: "Production",
            desc: "Direct-to-consumer physical production and logistics.",
            icon: <BookOpen className="w-8 h-8 text-[#ff7a00]" />,
            impact: impacts.print,
            glow: "group-hover:shadow-orange-500/20",
            border: "focus-within:border-orange-500/50"
        },
        {
            type: "print&digital" as DeliveryType,
            name: "both" as keyof PricingFormState,
            title: "Hybrid Protocol",
            tag: "Maximum Value",
            desc: "Synergistic bundle offering for premium consumers.",
            icon: <Layers className="w-8 h-8 text-purple-400" />,
            impact: impacts.both,
            glow: "group-hover:shadow-purple-500/20",
            border: "focus-within:border-purple-500/50"
        }
    ];

    return (
        <div className="min-h-screen bg-transparent space-y-12 py-10 animate-in fade-in duration-1000">
            {/* Global Command Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 bg-gray-950 p-10 rounded-[2.5rem] shadow-3xl relative overflow-hidden ring-1 ring-white/10">
                <div className="space-y-4 relative z-10">
                    <div className="flex items-center gap-3">
                        <span className="flex h-3 w-3 rounded-full bg-green-500 animate-pulse ring-4 ring-green-500/20"></span>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Pricing Control Hub</span>
                    </div>
                    <h1 className="text-5xl font-black text-white tracking-tighter">
                        Revenue <span className="text-[#ff7a00]">Architect</span>
                    </h1>
                    <p className="text-gray-400 max-w-xl text-lg leading-relaxed">
                        Precision-engineered controls for your platform&apos;s base pricing. Adjust global page rates and visualize live market impacts instantly.
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4 relative z-10">
                    <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 space-y-1">
                        <div className="text-gray-500 text-xs font-bold uppercase tracking-tighter flex items-center gap-2">
                            <Calculator size={14} className="text-[#ff7a00]" /> Base Calculation
                        </div>
                        <div className="text-2xl font-mono text-white tracking-widest">{SAMPLE_PAGE_COUNT} Pages</div>
                    </div>
                    <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 space-y-1">
                        <div className="text-gray-500 text-xs font-bold uppercase tracking-tighter flex items-center gap-2 text-white">
                            <Zap size={14} className="text-[#ff7a00]" /> System Status
                        </div>
                        <div className="text-2xl font-mono text-green-400 tracking-widest italic">ACTIVE</div>
                    </div>
                </div>

                {/* Cyber Background Pattern */}
                <div className="absolute top-0 right-0 w-full h-full opacity-20 pointer-events-none">
                    <div className="absolute top-10 right-10 w-64 h-64 bg-[#ff7a00] rounded-full blur-[120px]"></div>
                    <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
                        <defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" /></pattern></defs>
                        <rect width="100" height="100" fill="url(#grid)" />
                    </svg>
                </div>
            </div>

            {/* Dynamic Pricing Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
                {tiers.map((tier) => (
                    <Card key={tier.type} className={`group bg-white border-2 border-gray-100 rounded-[2rem] transition-all duration-500 flex flex-col hover:border-[#ff7a00]/30 hover:shadow-2xl ${tier.glow} ${tier.border}`}>
                        <CardHeader className="space-y-6 flex-grow">
                            <div className="flex items-center justify-between">
                                <div className="p-4 rounded-2xl bg-gray-50 group-hover:bg-[#ff7a00]/10 transition-colors duration-500">
                                    {tier.icon}
                                </div>
                                <div className="text-right">
                                    <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-gray-900 text-white rounded-full">
                                        {tier.tag}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <CardTitle className="text-3xl font-black text-gray-900 tracking-tight">{tier.title}</CardTitle>
                                <CardDescription className="text-gray-500 text-md leading-snug">
                                    {tier.desc}
                                </CardDescription>
                            </div>
                        </CardHeader>

                        <CardContent className="space-y-8 px-8">
                            {/* Live Impact Display */}
                            <div className="bg-gray-50 rounded-2xl p-6 border-l-4 border-[#ff7a00] relative overflow-hidden group-hover:bg-white transition-all duration-500">
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 block flex items-center gap-2">
                                    <ArrowUpRight size={12} className="text-[#ff7a00]" /> 100pg Book Impact
                                </span>
                                <div className="flex items-baseline gap-1 text-gray-900 tracking-tighter">
                                    <span className="text-sm font-bold text-gray-400">$</span>
                                    <span className="text-4xl font-black">{tier.impact}</span>
                                    <span className="text-xs font-bold text-gray-400 ml-1">USD</span>
                                </div>
                                {/* Calculator Graphic */}
                                <Calculator className="absolute right-4 bottom-4 w-12 h-12 text-gray-200/50 -rotate-12 transition-transform group-hover:rotate-0" />
                            </div>

                            <div className="space-y-4">
                                <Label htmlFor={tier.name} className="text-xs font-bold text-gray-900 uppercase tracking-widest flex items-center justify-between">
                                    Set Global Page Rate
                                    <span className="text-[#ff7a00]">Precision Focus</span>
                                </Label>
                                <div className="relative">
                                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-[#ff7a00] transition-colors">
                                        <DollarSign size={20} />
                                    </div>
                                    <Input
                                        id={tier.name}
                                        name={tier.name}
                                        autoComplete="off"
                                        value={form[tier.name]}
                                        onChange={handleChange}
                                        placeholder="0.00"
                                        className="h-16 pl-12 text-2xl font-black border-2 border-gray-100 bg-gray-50/50 rounded-2xl focus:bg-white focus:ring-4 focus:ring-[#ff7a00]/10 focus:border-[#ff7a00] transition-all"
                                    />
                                </div>
                            </div>
                        </CardContent>

                        <CardFooter className="p-8 pb-10">
                            <Button
                                onClick={() => handleUpdate(tier.type, tier.name)}
                                disabled={loading || !form[tier.name]}
                                className="w-full h-16 bg-gray-900 hover:bg-black text-white text-lg font-black rounded-2xl shadow-xl hover:shadow-2xl transition-all active:scale-[0.98] group/btn overflow-hidden relative"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-3">
                                    {loading ? <Loader2 className="animate-spin h-6 w-6" /> : "Deploy Update"}
                                </span>
                                {/* Hover Effect Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-r from-[#ff7a00] to-[#ff9500] translate-x-[-100%] group-hover/btn:translate-x-0 transition-transform duration-500"></div>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {/* Bottom Trust/Info Bar */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-10 bg-gray-50 rounded-[2rem] border border-gray-200">
                <div className="flex items-center gap-6">
                    <div className="h-16 w-16 rounded-[1.25rem] bg-white shadow-md flex items-center justify-center border border-gray-100">
                        <ShieldCheck size={32} className="text-[#ff7a00]" />
                    </div>
                    <div>
                        <h4 className="text-xl font-bold text-gray-900">Security & Integrity</h4>
                        <p className="text-gray-500 text-sm">Every pricing change is logged, hashed, and synchronized across your global cluster within 200ms.</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="px-6 py-3 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center gap-3">
                        <span className="h-2 w-2 rounded-full bg-[#ff7a00]"></span>
                        <span className="text-xs font-black uppercase text-gray-900">v4.0 Pricing Engine</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PriceSet;
"use client";

interface HeaderTitleProps {
  title: string;
  subtitle?: string;
}

export default function HeaderTitle({ title, subtitle }: HeaderTitleProps) {
  return (
    <div className="flex flex-col gap-0.5">
      <h1 className="text-xl font-extrabold text-[#0F172A] tracking-tight">{title}</h1>
      {subtitle && <p className="text-sm font-medium text-slate-500">{subtitle}</p>}
    </div>
  );
}
"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useContent } from "@/features/category-page/hooks/use-content";
import HeroSkeleton from "@/features/category-page/components/hero.skeleton";
import { MoveRightIcon } from "lucide-react";
import { useDashboardStats } from "@/features/category-page/hooks/use-stats";
import Link from "next/link";

export function Hero({ type }: { type?: string }) {
  const { data, isLoading: isContentLoading, error } = useContent({ type });
  const { data: statsData, isLoading: isStatsLoading } = useDashboardStats();
  console.log(statsData);
  const heroContent = data?.data?.[0];
  const isLoading = isContentLoading || isStatsLoading;

  if (isLoading) {
    return <HeroSkeleton />;
  }

  if (error) {
    return (
      <div className="h-[600px] flex items-center justify-center text-red-500">
        Error loading content, Please try again later!!
      </div>
    );
  }

  return (
    <section className="relative px-6 py-10 md:py-12 lg:px-12 bg-accent">
      <div className="container mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="space-y-6">
          <h1 className="text-5xl md:text-6xl font-black tracking-tight text-secondary-foreground leading-tight">
            {heroContent?.title || "Turn Any Artwork Into Coloring Magic"}
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl leading-relaxed">
            {heroContent?.subtitle ||
              "Turn any photo or drawing into a clean coloring page with powerful AI technology, designed to capture every detail you love and transform it into creative outlines, ready for coloring, sharing, or printing instantly."}
          </p>
          <Link
            href={
              type
                ? `/create-book?type=${encodeURIComponent(type)}`
                : "/create-book"
            }
          >
            <Button
              size="lg"
              className="bg-primary text-white  px-8 h-12 text-base font-bold shadow-lg hover:shadow-primary/20 transition-all active:scale-[0.98]"
            >
              Create Your Coloring Book <MoveRightIcon />
            </Button>
          </Link>

          <div className="flex flex-wrap gap-8 pt-2">
            <div className="flex gap-3 items-center">
              <span className="text-4xl font-bold text-primary-foreground">
                {statsData?.totalUsersCount}+
              </span>
              <span className="text-xs font-semibold text-gray-500 leading-tight">
                Total
                <br />
                Users
              </span>
            </div>
            <div className="flex gap-3 items-center">
              <span className="text-4xl font-bold text-primary-foreground">
                {statsData?.paidOrdersCount}+
              </span>
              <span className="text-xs font-semibold text-gray-500 leading-tight">
                Total
                <br />
                Book Created
              </span>
            </div>
          </div>
        </div>

        <div className="relative max-h-full">
          <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] bg-white aspect-12/11">
            <Image
              src={heroContent?.image || "/images/heroImage.png"}
              alt={heroContent?.title || "Sketch transformation"}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-[radial-gradient(#FF7A3D_1px,transparent_1px)] bg-size-[16px_16px] opacity-20 -z-10" />
        </div>
      </div>
    </section>
  );
}

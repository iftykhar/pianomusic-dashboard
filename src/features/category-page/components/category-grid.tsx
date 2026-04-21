"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useContent } from "@/features/category-page/hooks/use-content";
import { useCategoryHeader } from "@/features/category-page/hooks/use-categoryheader";
import CategoryGridSkeleton from "./category-grid.skeleton";
import { CategoryContent } from "@/features/category-page/types";
import HeaderTitle from "@/components/website/Common/head-title";
import SubtitleCategory from "@/components/website/Common/SubtitleCategory";

export function CategoryGrid() {
  const { data: contentData, isLoading, error } = useContent({ limit: 10 });
  const { data: headerData } = useCategoryHeader();
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [showArrows, setShowArrows] = useState(false);

  const categories = contentData?.data || [];

  // Check if we need arrows/carousel behavior
  useEffect(() => {
    const checkScroll = () => {
      if (containerRef.current) {
        setShowArrows(
          containerRef.current.scrollWidth > containerRef.current.clientWidth,
        );
      }
    };
    // Check after data loads
    if (!isLoading) {
      // Small timeout to allow DOM to update
      setTimeout(checkScroll, 100);
    }
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [isLoading, categories.length]);

  const scroll = useCallback((direction: "left" | "right") => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const scrollAmount = container.clientWidth * 0.8;
    const targetScroll =
      direction === "left"
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    if (!showArrows || isHovered) return;

    const interval = setInterval(() => {
      if (!containerRef.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;

      if (scrollLeft + clientWidth >= scrollWidth - 10) {
        containerRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scroll("right");
      }
    }, 3500);

    return () => clearInterval(interval);
  }, [showArrows, isHovered, scroll]);

  if (isLoading) {
    return <CategoryGridSkeleton />;
  }

  if (error) {
    return (
      <section className="py-24 px-6 bg-secondary flex justify-center items-center">
        <div className="text-red-500">
          Failed to load categories. Please try again later.
        </div>
      </section>
    );
  }

  if (categories.length === 0) {
    return null; // Or specific empty state
  }

  console.log("headerdata", headerData);

  return (
    <section
      className="py-24 px-6 bg-secondary"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="container mx-auto relative space-y-6">
        <HeaderTitle title={headerData?.data?.data?.title || "Explore Categories"} />
        <SubtitleCategory subtitle={headerData?.data?.data?.subtitle || "Browse our collection of books and other reading materials."} />
        {showArrows && (
          <>
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-[55%] -translate-y-1/2 -translate-x-2 lg:-translate-x-6 z-20 bg-white shadow-xl rounded-full p-3 text-gray-800 hover:text-primary hover:scale-110 transition-all active:scale-95"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-[55%] -translate-y-1/2 translate-x-2 lg:translate-x-6 z-20 bg-white shadow-xl rounded-full p-3 text-gray-800 hover:text-primary hover:scale-110 transition-all active:scale-95"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        <div
          ref={containerRef}
          className="flex gap-6 lg:gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-12 -mx-4 px-4 scroll-smooth"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {categories.map((category: CategoryContent) => (
            <Link
              key={category._id}
              href={`/category/${category.type}`}
              className="group relative rounded-4xl overflow-hidden bg-white shadow-lg  transition-all duration-500 shrink-0 w-[85%] sm:w-[45%] lg:w-[calc(25%-1.5rem)] snap-start border border-transparent hover:border-primary"
            >
              <div className="aspect-4/5 relative bg-accent">
                {category.isSplit ? (
                  <div className="relative h-full overflow-hidden">
                    <Image
                      src={category.image || "/no-image.jpg"}
                      alt={`${category.title} Original`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                ) : (
                  <Image
                    src={category.image || "/no-image.jpg"}
                    alt={category.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                )}
                {/* Decorative overlay for better "book" feel */}
                <div className="absolute inset-0 bg-linear-to-t from-black/5 to-transparent pointer-events-none" />
              </div>
              <div className="bg-primary py-5 text-center transition-colors duration-300 group-hover:bg-[#e66a33]">
                <span className="text-white font-medium text-2xl tracking-tight uppercase">
                  {category.type}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

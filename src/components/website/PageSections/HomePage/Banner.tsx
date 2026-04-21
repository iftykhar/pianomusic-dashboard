import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Banner() {
  const images = [
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?auto=format&fit=crop&w=1920&q=80",
  ];

  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % images.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + images.length) % images.length);

  const stopAutoSlide = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startAutoSlide = useCallback(() => {
    stopAutoSlide();
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
  }, [images.length, stopAutoSlide]);

  // Start auto-slide on mount
  useEffect(() => {
    startAutoSlide();
    return stopAutoSlide;
  }, [startAutoSlide, stopAutoSlide]);

  // Restart auto-slide when manually changing slides
  const handlePrevClick = () => {
    prevSlide();
    startAutoSlide();
  };
  const handleNextClick = () => {
    nextSlide();
    startAutoSlide();
  };

  return (
    <section
      className="relative lg:grid lg:h-screen lg:place-content-center"
      onMouseEnter={stopAutoSlide}
      onMouseLeave={startAutoSlide}
    >
      {/* Background Images */}
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url('${img}')` }}
        ></div>
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 dark:bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-screen max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">
            Strength Meets Precision in Every Steel Solution for Your Projects
          </h1>
          <p className="mt-4 text-base text-gray-200 sm:text-lg/relaxed">
            Explore our premium iron and steel products with custom cutting,
            bending, and rebar services built for maximum performance, delivered
            with industrial precision, and tailored to your exact
            specifications.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <a
              className="inline-block rounded border border-indigo-600 bg-indigo-600 px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-indigo-700"
              href="#"
            >
              Get Started
            </a>
            <a
              className="inline-block rounded border border-gray-200 bg-white/10 px-5 py-3 font-medium text-gray-200 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900"
              href="#"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-2 z-20">
        {images.map((_, idx) => (
          <button
            key={idx}
            className={`h-3 w-3 rounded-full transition-colors ${
              idx === current ? "bg-white" : "bg-gray-400/50"
            }`}
            onClick={() => {
              setCurrent(idx);
              startAutoSlide();
            }}
          />
        ))}
      </div>

      {/* Left Arrow */}
      <button
        onClick={handlePrevClick}
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/30 p-3 text-white hover:bg-black/50 transition cursor-pointer"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Right Arrow */}
      <button
        onClick={handleNextClick}
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/30 p-3 text-white hover:bg-black/50 transition cursor-pointer"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </section>
  );
}

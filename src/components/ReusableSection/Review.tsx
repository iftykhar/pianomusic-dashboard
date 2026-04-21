"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import Image from "next/image";

export default function Review() {
  const testimonials: {
    name: string;
    location?: string;
    image?: string;
    text: string;
    rating: number;
  }[] = [
    {
      name: "P.S.",
      text: `“What a joy it’s been working with Madeline! She’s absolutely wonderful! She’s super kind, patient, and really knows what she’s doing. From the first day, she made me feel comfortable and cared for. I never felt silly just supported! Madeline not only listens to me but has actively helped me to feel great while always smiling with gentle words of encouragement! I would recommend Dr. May to anyone looking for a wonderful physical therapist!”`,
      rating: 5,
    },
    {
      name: "L.S.",
      text: `“I met with Kevin after I broke my ankle. He was kind, conscientious, and very helpful. His breadth of knowledge and experience is evident in the way He explains any exercises, the need for specific movements, and why long-term they are important. I highly recommend him to others, and credit Lolo Physical Therapy with their attention to detail. Because of them, I've regained my mobility and strength.”`,
      rating: 5,
    },
    {
      name: "K.M.",
      text: `“They truly care about each patient. The care is always very kind and compassionate. I've been to a lot of PT and this has been my best experience.”`,
      rating: 5,
    },
    {
      name: "M.G.",
      location: "Los Angeles, CA",
      text: `“Went in for a few visits with Madeline to fix my plantar faciitis. In the first ten minutes, she identified the root cause for the injury which I never would have thought as a contributor. During the consults she wrote down the home exercises in a way I could understand which helped me ensure I was doing them correctly. Its always worth the travel time to see Madeline. Its nice to feel like you're working with a PT whose goal is to treat patients not increase profits.”`,
      rating: 5,
    },
    {
      name: "M.G.",
      location: "Los Angeles, CA",
      text: `“Went in for a few visits with Madeline to with a PT whose goal is to treat patients not increase profits.”`,
      rating: 5,
    },
    {
      name: "M.G.",
      location: "Los Angeles, CA",
      text: `“Went in for a few visits with Madeline to fix my plantar faciiti me ensure I was doing them correctly. Its always worth the travel time to see Madeline. Its nice to feel like you're working with a PT whose goal is to treat patients not increase profits.”`,
      rating: 5,
    },
    {
      name: "M.G.",
      location: "Los Angeles, CA",
      text: `“Went in for a few visits with Madeline t ay I could understand which helped me ensure I was doing them correctly. Its always worth the travel time to see Madeline. Its nice to feel like you're working with a PT whose goal is to treat patients not increase profits.”`,
      rating: 5,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);

  // Responsive setup
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setItemsPerView(1);
      else if (window.innerWidth < 1024) setItemsPerView(2);
      else setItemsPerView(3);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = testimonials.length - itemsPerView;

  // Next/Prev button logic
  const handleNext = () => {
    if (currentIndex < maxIndex) setCurrentIndex((prev) => prev + 1);
  };
  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  const cardWidth = `calc((100% - ${(itemsPerView - 1) * 24}px) / ${itemsPerView})`;

  return (
    <section className="relative w-full py-16 px-4 text-center">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/car.jpg" // replace with your image
          alt="Testimonials Background"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/40"></div>{" "}
        {/* Dark overlay */}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <h2 className="text-3xl font-semibold text-white mb-2">
          What Our Patients Say
        </h2>
        <p className="text-gray-200 mb-10 max-w-2xl mx-auto">
          Voices of our patients&apos;s journeys.
        </p>

        {/* Slider */}
        <div className="relative overflow-hidden">
          <div
            className="flex gap-6"
            style={{
              transform: `translateX(calc(-${(currentIndex * 100) / itemsPerView}% - ${currentIndex * 24}px))`,
              transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            {testimonials.map((t, i) => (
              <Card
                key={i}
                className="shrink-0 rounded-2xl shadow-md border my-3 border-gray-100 hover:shadow-sm transition-all duration-300"
                style={{ width: cardWidth }}
              >
                <CardContent className="p-6 text-left flex flex-col h-full justify-start">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {t.image ? (
                        <Image
                          src={t.image}
                          alt={t.name}
                          width={48}
                          height={48}
                          className="rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center w-12 h-12 bg-blue-500 text-white rounded-full font-medium text-sm">
                          {t.name?.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div>
                        <p className="font-semibold text-gray-800">{t.name}</p>
                        {t.location && (
                          <p className="text-sm text-gray-500">{t.location}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, idx) => (
                        <Star
                          key={idx}
                          size={16}
                          className={`${
                            idx < t.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          } transition-all duration-200`}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-gray-600 italic text-sm leading-relaxed">
                    {t.text}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mt-10">
          <Button
            onClick={handlePrev}
            size="icon"
            variant="ghost"
            disabled={currentIndex === 0}
            className={`rounded-full w-10 h-10 transition-all duration-200 hover:scale-110 ${
              currentIndex === 0
                ? "opacity-40 cursor-not-allowed"
                : "hover:bg-gray-100 cursor-pointer"
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          <div className="flex gap-2">
            {testimonials.map((_, idx) => {
              const isActive =
                idx >= currentIndex && idx < currentIndex + itemsPerView;
              return (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(Math.min(idx, maxIndex))}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    isActive ? "bg-gray-900 w-8" : "bg-gray-300 w-2.5"
                  }`}
                ></button>
              );
            })}
          </div>

          <Button
            onClick={handleNext}
            size="icon"
            variant="ghost"
            disabled={currentIndex === maxIndex}
            className={`rounded-full w-10 h-10 transition-all duration-200 hover:scale-110 ${
              currentIndex === maxIndex
                ? "opacity-40 cursor-not-allowed"
                : "hover:bg-gray-100 cursor-pointer"
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}

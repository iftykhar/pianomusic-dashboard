"use client";
import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CirclePlus, CircleMinus } from "lucide-react";

// Define a type for FAQ items
interface FaqItem {
  _id: string;
  question: string;
  answer: string;
  createdAt: string;
  updatedAt: string;
}

// Fake FAQ data
const fakeFaqData: FaqItem[] = [
  {
    _id: "1",
    question: "What services do you offer?",
    answer:
      "We offer a variety of services including web development, mobile app development, and digital marketing.",
    createdAt: "2025-01-01T10:00:00Z",
    updatedAt: "2025-01-01T10:00:00Z",
  },
  {
    _id: "2",
    question: "How can I contact support?",
    answer:
      "You can contact our support team via email at support@example.com or by calling 123-456-7890.",
    createdAt: "2025-01-02T11:00:00Z",
    updatedAt: "2025-01-02T11:00:00Z",
  },
  {
    _id: "3",
    question: "Do you offer refunds?",
    answer:
      "Yes, we offer a 30-day refund policy for all our services. Please contact support for assistance.",
    createdAt: "2025-01-03T12:00:00Z",
    updatedAt: "2025-01-03T12:00:00Z",
  },
  {
    _id: "4",
    question: "Do you offer refunds?",
    answer:
      "Yes, we offer a 30-day refund policy for all our services. Please contact support for assistance.",
    createdAt: "2025-01-03T12:00:00Z",
    updatedAt: "2025-01-03T12:00:00Z",
  }
];

const FAQ = () => {
  const [openItem, setOpenItem] = useState<string | null>(null);

  return (
    <div className="bg-[#F8F9FA] bg-cover">
      <div className="container mx-auto space-y-4 lg:space-y-16 py-10 px-4 sm:py-12 sm:px-6 md:py-16 md:px-8 lg:py-20 lg:px-12 xl:p-20">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-6xl md:mb-8 font-bold leading-tight font-playfair text-gray-900 mb-4">
            Frequently <span className="text-green-600">Asked Questions</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed px-2 sm:px-0">
            Find quick answers to the most common questions about our facilities
            and services.
          </p>
        </div>

        {/* Accordion */}
        <div className="w-full px-2 sm:px-4 md:px-6">
          <Accordion
            type="single"
            collapsible
            className="w-full"
            value={openItem ?? ""}
            onValueChange={(value) => setOpenItem(value)}
          >
            {fakeFaqData.map((faqItem: FaqItem) => (
              <AccordionItem
                key={faqItem._id}
                value={faqItem._id}
                className="border-b border-gray-300 relative"
              >
                <AccordionTrigger className="flex justify-between items-center cursor-pointer w-full text-left py-3 sm:py-4 hover:no-underline group [&>svg]:hidden pr-6 sm:pr-8">
                  <span className="font-medium text-base sm:text-[18px] text-gray-900 pr-4 sm:pr-6 text-left">
                    {faqItem.question}
                  </span>
                  <div className="absolute right-2 sm:right-4 top-3 cursor-pointer sm:top-4">
                    {openItem === faqItem._id ? (
                      <CircleMinus className="h-4 w-4 sm:h-5 sm:w-5 text-primary transition-transform duration-200" />
                    ) : (
                      <CirclePlus className="h-4 w-4 sm:h-5 sm:w-5 text-primary transition-transform duration-200" />
                    )}
                  </div>
                </AccordionTrigger>

                <AccordionContent className="text-gray-600 text-start pb-3 sm:pb-4 pt-1 sm:pt-2 text-sm sm:text-base">
                  {faqItem.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default FAQ;

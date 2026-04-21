import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import HeaderTitle from "./head-title";
import Link from "next/link";

const FAQS = [
  {
    question: "Is there a free trial available?",
    answer:
      "Yes, you can try us for free for 30 days. If you want, we'll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.",
  },
  {
    question: "Can I change my plan later?",
    answer:
      "You can change your plan at any time through your account settings.",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "Our cancellation policy is flexible. You can cancel your subscription at any time.",
  },
  {
    question: "Can other info be added to an invoice?",
    answer: "Yes, you can add your company name and address to your invoices.",
  },
  {
    question: "How does billing work?",
    answer: "We bill monthly or annually based on your chosen plan.",
  },
  {
    question: "How do I change my account email?",
    answer:
      "You can change your email address in the account security settings.",
  },
];

export function FAQ() {
  return (
    <section className=" py-24 px-6 bg-secondary">
      <div className="  mx-auto max-w-4xl ">
        <div className="text-center space-y-4 mb-16">
          <HeaderTitle title="Frequently asked questions" />

          <p className="text-gray-600 text-lg">
            Everything you need to know about the product and billing.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {FAQS.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-b border-gray-200"
            >
              <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline py-6 data-[state=open]:text-primary transition-colors">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 text-base leading-relaxed pb-6">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-24 p-12 bg-white rounded-3xl text-center space-y-8">
          <div className="flex justify-center -space-x-4">
            <Avatar className="w-12 h-12 border-4 border-[#FAF7F2] shrink-0">
              <AvatarImage src="/diverse-person.png" />
              <AvatarFallback>U1</AvatarFallback>
            </Avatar>
            <Avatar className="w-12 h-12 border-4 border-[#FAF7F2] shrink-0">
              <AvatarImage src="/diverse-group-two.png" />
              <AvatarFallback>U2</AvatarFallback>
            </Avatar>
            <Avatar className="w-12 h-12 border-4 border-[#FAF7F2] shrink-0">
              <AvatarImage src="/diverse-group-outdoors.png" />
              <AvatarFallback>U3</AvatarFallback>
            </Avatar>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-gray-900">
              Still have questions?
            </h3>
            <p className="text-gray-600">
              Can&apos;t find the answer you&apos;re looking for? Please chat to
              our friendly team.
            </p>
          </div>
          <Link href="/contact-us">
            <Button className="bg-primary hover:bg-primary/90 text-white rounded-lg px-8 h-12 font-semibold">
              Get in touch
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

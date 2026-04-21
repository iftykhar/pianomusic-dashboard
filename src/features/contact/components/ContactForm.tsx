"use client";

import * as z from "zod";
import Image from "next/image";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useContactMutation } from "../hooks/use-contact-mutation";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number is too long"),
  message: z.string().min(1, "Message is required"),
  privacyPolicy: z.boolean().refine((val) => val === true, {
    message: "You must agree to the privacy policy",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export const ContactForm = memo(() => {
  const { mutate, isPending } = useContactMutation();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
      privacyPolicy: false,
    },
  });

  async function onSubmit(values: FormValues) {
    const payload = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phone: values.phone,
      message: values.message,
    };
    mutate(payload, {
      onSuccess: () => {
        form.reset();
      },
    });
  }

  return (
    <div className="bg-white py-16 md:py-24 ">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Left side: Form */}
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl md:text-4xl font-semibold mb-3 text-slate-900">
              Get in touch
            </h2>
            <p className="text-slate-600 mb-10 text-lg">
              Our friendly team would love to hear from you.
            </p>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* First Name */}
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 font-medium">
                          First name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="First name"
                            {...field}
                            className="h-11 rounded-lg border-slate-200 focus:ring-orange-500 focus:border-orange-500"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Last Name */}
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 font-medium">
                          Last name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Last name"
                            {...field}
                            className="h-11 rounded-lg border-slate-200 focus:ring-orange-500 focus:border-orange-500"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-medium">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="you@company.com"
                          {...field}
                          className="h-11 rounded-lg border-slate-200 focus:ring-orange-500 focus:border-orange-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Phone Number */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-medium">
                        Phone number
                      </FormLabel>
                      <div className="flex gap-0">
                        <Select defaultValue="US">
                          <SelectTrigger className="w-24 rounded-r-none border-r-0 border-slate-200 bg-white focus:ring-0 focus:ring-offset-0">
                            <SelectValue placeholder="US" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="US">US</SelectItem>
                            <SelectItem value="UK">UK</SelectItem>
                            <SelectItem value="CA">CA</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormControl>
                          <Input
                            placeholder="+1 (555) 000-0000"
                            {...field}
                            className="flex-1 rounded-l-none border-slate-200 focus:ring-orange-500 focus:border-orange-500"
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Message */}
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-medium">
                        Message
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Leave us a message..."
                          {...field}
                          className="min-h-[128px] rounded-lg border-slate-200 focus:ring-orange-500 focus:border-orange-500 resize-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Privacy Policy */}
                <FormField
                  control={form.control}
                  name="privacyPolicy"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="mt-1 border-slate-200 data-[state=checked]:bg-orange-600 data-[state=checked]:border-orange-600"
                        />
                      </FormControl>
                      <div className="leading-none">
                        <FormLabel className="text-slate-600 font-normal">
                          You agree to our friendly{" "}
                          <a
                            href="/privacy-policy"
                            className="underline hover:text-orange-600 transition-colors"
                          >
                            privacy policy
                          </a>
                          .
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full bg-[#FF8C38] hover:bg-[#e67a29] text-white rounded-lg h-12 text-base font-semibold shadow-sm transition-all duration-200"
                >
                  {isPending ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending...
                    </div>
                  ) : (
                    "Send message"
                  )}
                </Button>
              </form>
            </Form>
          </div>

          {/* Right side: Image */}
          <div className="order-1 lg:order-2 relative h-[400px] md:h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/images/contact_woman_camera.png"
              alt="Contact us"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
});

ContactForm.displayName = "ContactForm";

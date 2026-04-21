// "use client";

// import { useEffect, useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { CheckCircle2, Loader2, ArrowRight } from "lucide-react";
// import { useBookStore } from "@/features/book-creation/store/book-store";

// export default function PaymentSuccessPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const sessionId = searchParams.get("session_id");
//   const {
//     setStep,
//     setHasPaid,
//     pendingPageCount,
//     setPageCount,
//     setPendingPageCount,
//     step,
//   } = useBookStore();
//   const [countdown, setCountdown] = useState(3);

//   useEffect(() => {
//     if (sessionId) {
//       setHasPaid(true);

//       if (pendingPageCount) {
//         setPageCount(pendingPageCount);
//         setPendingPageCount(null);

//         // If we were in setup, go to images. Otherwise (extra pages), return to where we were.
//         if (step === "setup") {
//           setStep("images");
//         } else {
//           // If they added pages from finalize or images, stay there
//           setStep(step);
//         }
//       } else {
//         setStep("images");
//       }
//     }

//     const timer = setInterval(() => {
//       setCountdown((prev) => prev - 1);
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [
//     sessionId,
//     setHasPaid,
//     setStep,
//     pendingPageCount,
//     setPageCount,
//     setPendingPageCount,
//     step,
//   ]);

//   useEffect(() => {
//     if (countdown <= 0) {
//       router.push("/create-book");
//     }
//   }, [countdown, router]);

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
//       <div className="max-w-md w-full">
//         <div className="bg-white rounded-[32px] shadow-[0px_20px_50px_rgba(0,0,0,0.05)] p-10 text-center relative overflow-hidden">
//           {/* Decorative background element */}
//           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-2 bg-linear-to-r from-green-400 to-emerald-500" />

//           <div className="mb-8 flex justify-center">
//             <div className="relative">
//               <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-25" />
//               <div className="relative bg-green-500 rounded-full p-4">
//                 <CheckCircle2 className="w-12 h-12 text-white" />
//               </div>
//             </div>
//           </div>

//           <h1 className="text-[32px] font-bold text-gray-900 mb-3 font-inter tracking-tight">
//             Payment Successful!
//           </h1>
//           <p className="text-gray-500 text-lg mb-8 font-inter">
//             Your payment has been processed successfully. We&apos;re getting
//             your book ready.
//           </p>

//           <div className="bg-gray-50 rounded-2xl p-6 mb-10 border border-gray-100">
//             <div className="flex items-center justify-center gap-3 text-gray-600 mb-2">
//               <Loader2 className="w-5 h-5 animate-spin text-green-500" />
//               <span className="font-medium">Redirecting to images step...</span>
//             </div>
//             <p className="text-sm text-gray-400">
//               Taking you back in{" "}
//               <span className="text-green-600 font-bold font-mono">
//                 {countdown}s
//               </span>
//             </p>
//           </div>

//           <button
//             onClick={() => router.push("/create-book")}
//             className="group w-full bg-[#ff8b36] hover:bg-orange-600 text-white font-semibold py-4 px-8 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-lg shadow-orange-500/20"
//           >
//             <span>Continue Now</span>
//             <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
//           </button>

//           <p className="mt-6 text-xs text-gray-400 uppercase tracking-widest font-bold">
//             Hinkle Creek Studio
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useAllOrders, Order } from "@/features/dashboard/hooks/useAllOrders";
// import { useStatusUpdate } from "@/features/dashboard/hooks/useStatusUpdate";
// import { ChevronDown, Loader2, Package } from "lucide-react";
// import Image from "next/image";
// import React, { useState } from "react";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Button } from "../ui/button";

// const getStatusStyles = (status: string) => {
//   const base = "px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-2 w-fit transition-all";
//   switch (status.toLowerCase()) {
//     case "paid":
//     case "delivered":
//       return `${base} bg-[#ECFDF5] text-[#10B981]`;
//     case "pending":
//       return `${base} bg-[#FFF7ED] text-[#F97316]`;
//     case "processing":
//       return `${base} bg-[#EFF6FF] text-[#3B82F6]`;
//     case "cancelled":
//     case "canceled":
//       return `${base} bg-red-100 text-red-600`;
//     default:
//       return `${base} bg-gray-100 text-gray-700`;
//   }
// };

// const getInitials = (name?: string) => {
//   if (!name) return "??";
//   return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
// };
// const RecentOrdersTable = () => {
//   const { orders, loading, error, refetch } = useAllOrders();
//   const { updateStatus } = useStatusUpdate();
//   const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
//   const [activeUpdatingId, setActiveUpdatingId] = useState<string | null>(null);

//   const handleStatusChange = async (orderId: string, newStatus: string) => {
//     setActiveUpdatingId(orderId);
//     try {
//       await updateStatus(orderId, newStatus);
//       refetch();
//     } catch (err) {
//       console.error("Failed to update status", err);
//     } finally {
//       setActiveUpdatingId(null);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="w-full overflow-hidden bg-white rounded-xl border border-gray-100">
//         <div className="p-4 space-y-4">
//           <Skeleton className="h-8 w-full" />
//           <div className="space-y-2">
//             {[1, 2, 3, 4, 5].map((i) => (
//               <Skeleton key={i} className="h-16 w-full" />
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error) return <div className="p-6 text-center text-red-500">Failed to load orders.</div>;

//   return (
//     <div className="w-full overflow-hidden bg-white rounded-xl border border-gray-100">
//       <table className="w-full text-left">
//         <thead>
//           <tr className="bg-[#F8FAFC] border-b border-gray-100">
//             <th className="py-4 px-6 text-[13px] font-semibold text-gray-500 uppercase tracking-wider">
//               <input type="checkbox" className="rounded border-gray-300" />
//             </th>
//             <th className="py-4 px-4 text-[13px] font-semibold text-gray-500 uppercase tracking-wider">Order ID</th>
//             <th className="py-4 px-4 text-[13px] font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
//             <th className="py-4 px-4 text-[13px] font-semibold text-gray-500 uppercase tracking-wider">Date</th>
//             <th className="py-4 px-4 text-[13px] font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
//             <th className="py-4 px-4 text-[13px] font-semibold text-gray-500 uppercase tracking-wider">Status</th>
//             <th className="py-4 px-4 text-[13px] font-semibold text-gray-500 uppercase tracking-wider text-right">Action</th>
//           </tr>
//         </thead>
//         <tbody className="divide-y divide-gray-100">
//           {orders.map((order) => (
//             <tr key={order._id} className="hover:bg-gray-50/50 transition-colors group">
//               <td className="py-4 px-6">
//                 <input type="checkbox" className="rounded border-gray-300" />
//               </td>
//               <td className="py-4 px-4 text-sm text-gray-500 font-medium">
//                 #{order._id.slice(-4).toUpperCase()}
//               </td>
//               <td className="py-4 px-4">
//                 <div className="flex items-center gap-3">
//                   <Avatar className="h-10 w-10 border border-[#FF8B36]/10">
//                     <AvatarFallback className="bg-[#FFF7ED] text-[#FF8B36] font-bold">
//                       {getInitials(order?.userId?.name)}
//                     </AvatarFallback>
//                   </Avatar>
//                   <div className="flex flex-col">
//                     <span className="text-sm font-bold text-gray-900">{order?.userId?.name}</span>
//                     <span className="text-xs text-gray-500">{order?.userId?.email}</span>
//                   </div>
//                 </div>
//               </td>
//               <td className="py-4 px-4 text-sm text-gray-500">
//                 {new Date(order.createdAt).toLocaleDateString()}
//               </td>
//               <td className="py-4 px-4 text-sm font-bold text-[#FF8B36]">
//                 ${(order.totalAmount / 100).toFixed(2)}
//               </td>
//               <td className="py-4 px-4">
//                 <div className="relative inline-block">
//                   {activeUpdatingId === order._id ? (
//                     <div className="px-3 py-1.5 flex items-center gap-2 text-xs text-gray-400">
//                       <Loader2 className="h-3 w-3 animate-spin" /> Updating...
//                     </div>
//                   ) : (
//                     <div className="group/select relative">
//                       <select
//                         value={order.deliveryStatus || "pending"}
//                         onChange={(e) => handleStatusChange(order._id, e.target.value)}
//                         className={`appearance-none cursor-pointer outline-none border-none pr-8 ${getStatusStyles(order.deliveryStatus || "pending")}`}
//                       >
//                         <option value="pending">Pending</option>
//                         <option value="approved">Approved</option>
//                         <option value="rejected">Rejected</option>
//                       </select>
//                       <ChevronDown className="h-3 w-3 absolute right-2 top-1/2 -translate-y-1/2 text-current pointer-events-none opacity-50" />
//                     </div>
//                   )}
//                 </div>
//               </td>
//               <td className="py-4 px-4 text-right">
//                 <Button
//                   onClick={() => setSelectedOrder(order)}
//                   className="text-sm font-bold text-primary bg-transparent border border-primary hover:bg-primary hover:text-white"
//                 >
//                   Details
//                 </Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
//         <DialogContent className="sm:max-w-[500px]">
//           <DialogHeader>
//             <DialogTitle className="text-2xl font-bold text-[#343A40]">Order Details</DialogTitle>
//           </DialogHeader>
//           {selectedOrder && (
//             <div className="space-y-6 pt-4">
//               <div className="flex justify-between items-start border-b border-gray-100 pb-4">
//                 <div>
//                   <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Order ID</p>
//                   <p className="text-lg font-bold text-gray-900">#{selectedOrder._id.toUpperCase()}</p>
//                 </div>
//                 <div className="flex gap-4">
//                   <div className="text-right">
//                     <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Payment</p>
//                     <div className={getStatusStyles(selectedOrder.status)}>
//                       {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Delivery</p>
//                     <div className={getStatusStyles(selectedOrder.deliveryStatus || "pending")}>
//                       {(selectedOrder.deliveryStatus || "pending").charAt(0).toUpperCase() + (selectedOrder.deliveryStatus || "pending").slice(1)}
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="grid grid-cols-2 gap-6">
//                 <div>
//                   <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-2">Customer Info</p>
//                   <div className="flex items-center gap-3">
//                     <Avatar className="h-10 w-10 border border-[#FF8B36]/10">
//                       <AvatarFallback className="bg-[#FFF7ED] text-[#FF8B36] font-bold">
//                         {getInitials(selectedOrder?.userId?.name)}
//                       </AvatarFallback>
//                     </Avatar>
//                     <div>
//                       <p className="text-sm font-bold text-gray-900">{selectedOrder?.userId?.name}</p>
//                       <p className="text-xs text-gray-500">{selectedOrder?.userId?.email}</p>
//                     </div>
//                   </div>
//                 </div>
//                 <div>
//                   <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-2">Order Date</p>
//                   <p className="text-sm font-medium text-gray-900">
//                     {new Date(selectedOrder.createdAt).toLocaleString()}
//                   </p>
//                 </div>
//               </div>

//               {(selectedOrder.book || selectedOrder.title) && (
//                 <div className="flex gap-4 p-4 bg-orange-50/50 rounded-xl border border-orange-100">
//                   <div className="relative h-20 w-16 flex-shrink-0 bg-white rounded-lg overflow-hidden border border-orange-200 flex items-center justify-center text-orange-200">
//                     {selectedOrder.book ? (
//                       <Image
//                         src={selectedOrder.book}
//                         alt={selectedOrder.title || "Book cover"}
//                         fill
//                         className="object-cover"
//                       />
//                     ) : (
//                       <Package size={32} />
//                     )}
//                   </div>
//                   <div className="flex flex-col justify-center">
//                     <p className="text-xs text-orange-600 uppercase font-bold tracking-wider mb-1">Purchased Book</p>
//                     <p className="text-sm font-bold text-gray-900 line-clamp-2">
//                       {selectedOrder.title || "Untitled Book"}
//                     </p>
//                     <p className="text-xs text-gray-500 mt-1 italic">{selectedOrder.deliveryType}</p>
//                   </div>
//                 </div>
//               )}

//               <div className="bg-gray-50 rounded-xl p-4 space-y-3">
//                 <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Product Details</p>
//                 <div className="flex justify-between items-center text-sm">
//                   <span className="text-gray-600 font-medium">{selectedOrder.pageCount} Pages Book</span>
//                   <span className="font-bold text-gray-900">${(selectedOrder.totalAmount / 100).toFixed(2)}</span>
//                 </div>
//                 <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between items-center">
//                   <span className="text-base font-bold text-gray-900">Total Amount</span>
//                   <span className="text-lg font-bold text-[#FF8B36]">
//                     ${(selectedOrder.totalAmount / 100).toFixed(2)}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           )}
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default RecentOrdersTable;
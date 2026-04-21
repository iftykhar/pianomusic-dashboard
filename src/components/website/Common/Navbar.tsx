// "use client";
// import Image from "next/image";
// import Link from "next/link";
// import { useState, useEffect, useRef } from "react";
// import { usePathname } from "next/navigation";
// import { Menu, X } from "lucide-react";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import { Button } from "@/components/ui/button";
// import { useSession, signOut } from "next-auth/react";
// import { cn } from "@/lib/utils";
// import { useContent } from "@/features/category-page/hooks/use-content";
// import { ChevronDown } from "lucide-react";
// import { CategoryContent } from "@/features/category-page/types";

// const menuItems = [
//   { href: "/", label: "Home" },
//   { href: "/products", label: "Products" },
//   // { href: "/services", label: "Services" },
//   { href: "/about-us", label: "About" },
//   { href: "/contact-us", label: "Contact Us" },
// ];

// export default function Navbar() {
//   const [open, setOpen] = useState(false);
//   // const [scrolled, setScrolled] = useState(false);
//   const { status } = useSession();
//   const pathname = usePathname();
//   const [showDropdown, setShowDropdown] = useState(false);
//   const { data: contentData } = useContent({ limit: 12 });
//   const categories = contentData?.data || [];

//   const dropdownRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node)
//       ) {
//         setShowDropdown(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // useEffect(() => {
//   //   const handleScroll = () => {
//   //     setScrolled(window.scrollY > 50);
//   //   };

//   //   window.addEventListener("scroll", handleScroll);
//   //   return () => window.removeEventListener("scroll", handleScroll);
//   // }, []);

//   const isActive = (href: string) => {
//     if (href === "/") {
//       return pathname === href;
//     }
//     return pathname.startsWith(href);
//   };

//   const handleMobileMenuClick = () => {
//     setOpen(false);
//   };

//   return (
//     <nav className="sticky top-0 z-50 transition-all duration-300 backdrop-blur-md bg-blue-100 border-b border-gray-100">
//       <div className="container mx-auto px-4 sm:px-8 flex justify-between items-center py-4">
//         {/* Logo */}
//         <Link href="/" className="flex items-center">
//           <Image
//             src="/images/logo.png"
//             alt="Company Logo"
//             width={120}
//             height={120}
//             className="cursor-pointer"
//             priority
//           />
//         </Link>

//         {/* Desktop Menu Items */}
//         <ul className="hidden md:flex space-x-8 font-medium items-center">
//           {menuItems.map((item) => (
//             <li key={item.href} className="relative">
//               {item.label === "Products" ? (
//                 <div ref={dropdownRef}>
//                   <button
//                     onClick={() => setShowDropdown(!showDropdown)}
//                     className={cn(
//                       "flex items-center gap-1 transition-all duration-200 hover:text-primary relative pb-1",
//                       isActive(item.href) || showDropdown
//                         ? "text-primary font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary"
//                         : "text-primary-foreground",
//                     )}
//                   >
//                     {item.label}
//                     <ChevronDown
//                       className={cn(
//                         "w-4 h-4 transition-transform duration-200",
//                         showDropdown && "rotate-180",
//                       )}
//                     />
//                   </button>

//                   {/* Dropdown Menu */}
//                   {showDropdown && (
//                     <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[600px] bg-white/95 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-6 grid grid-cols-3 gap-4 z-50 animate-in fade-in slide-in-from-top-2 duration-300">
//                       {categories.map((category: CategoryContent) => (
//                         <Link
//                           key={category._id}
//                           href={`/category/${category.type}`}
//                           onClick={() => setShowDropdown(false)}
//                           className="group flex items-center gap-3 p-2 rounded-xl hover:bg-primary/5 transition-colors"
//                         >
//                           <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-accent shrink-0 border border-black/5">
//                             <Image
//                               src={category.image || "/no-image.jpg"}
//                               alt={category.title}
//                               fill
//                               className="object-cover transition-transform duration-300 group-hover:scale-110"
//                             />
//                           </div>
//                           <div className="flex flex-col">
//                             <span className="text-sm font-semibold text-gray-900 group-hover:text-primary transition-colors line-clamp-1">
//                               {category.title}
//                             </span>
//                             <span className="text-[10px] uppercase tracking-wider text-gray-500 font-medium">
//                               {category.type}
//                             </span>
//                           </div>
//                         </Link>
//                       ))}
//                       {categories.length === 0 && (
//                         <div className="col-span-3 text-center py-4 text-gray-500 text-sm">
//                           No categories found
//                         </div>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               ) : (
//                 <Link
//                   href={item.href}
//                   className={cn(
//                     "transition-all duration-200 hover:text-primary relative pb-1",
//                     isActive(item.href)
//                       ? "text-primary font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary"
//                       : "text-primary-foreground",
//                   )}
//                 >
//                   {item.label}
//                 </Link>
//               )}
//             </li>
//           ))}
//         </ul>

//         {/* Desktop Auth Buttons */}
//         <div className="hidden md:flex items-center space-x-4">
//           {status === "unauthenticated" ? (
//             <>
//               <Link href="/login">
//                 <Button
//                   variant="outline"
//                   className="border-primary text-primary-foreground hover:bg-primary/10 px-8 rounded-lg font-semibold transition-all duration-300"
//                 >
//                   Log In
//                 </Button>
//               </Link>
//               {/* <Link href="/register">
//                 <Button className="bg-primary text-white hover:bg-primary/90 px-8 rounded-lg font-semibold transition-all duration-300">
//                   Sign Up
//                 </Button>
//               </Link> */}
//             </>
//           ) : (
//             <div className="flex items-center space-x-4">
//               {/* <Link href="/contact-us">
//                 <Button className="bg-primary text-white hover:bg-primary/90 px-8 rounded-lg font-semibold transition-all duration-300">
//                   Contact Us
//                 </Button>
//               </Link> */}
//               <Button
//                 variant="outline"
//                 onClick={() => signOut({ callbackUrl: "/" })}
//                 className="border-primary text-primary-foreground hover:bg-primary/10 px-8 rounded-lg font-semibold transition-all duration-300"
//               >
//                 Log Out
//               </Button>
//             </div>
//           )}
//         </div>

//         {/* Mobile Menu */}
//         <div className="md:hidden">
//           <Sheet open={open} onOpenChange={setOpen}>
//             <SheetTrigger asChild>
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="text-gray-500 hover:text-primary"
//                 aria-label="Toggle menu"
//               >
//                 {open ? <X size={28} /> : <Menu size={28} />}
//               </Button>
//             </SheetTrigger>
//             <SheetContent side="right" className="w-[300px] sm:w-[400px]">
//               <nav className="flex flex-col space-y-2 mt-8">
//                 {menuItems.map((item) => (
//                   <Link
//                     key={item.href}
//                     href={item.href}
//                     onClick={handleMobileMenuClick}
//                     className={cn(
//                       "px-5 py-3 rounded-lg font-medium text-lg transition-all duration-200",
//                       isActive(item.href)
//                         ? "text-primary bg-primary/10 font-semibold"
//                         : "text-gray-700 hover:text-primary hover:bg-gray-50",
//                     )}
//                   >
//                     {item.label}
//                   </Link>
//                 ))}
//                 {status === "unauthenticated" ? (
//                   <div className="flex flex-col space-y-3 px-5 pt-6 mt-4 border-t">
//                     <Link href="/login" onClick={handleMobileMenuClick}>
//                       <Button
//                         variant="outline"
//                         className="w-full border-primary text-primary hover:bg-primary/10"
//                       >
//                         Log In
//                       </Button>
//                     </Link>
//                     {/* <Link href="/register" onClick={handleMobileMenuClick}>
//                       <Button className="w-full bg-primary text-white hover:bg-primary/90">
//                         Sign Up
//                       </Button>
//                     </Link> */}
//                   </div>
//                 ) : (
//                   <div className="flex flex-col space-y-3 px-5 pt-6 mt-4 border-t">
//                     <Button
//                       variant="outline"
//                       onClick={() => {
//                         handleMobileMenuClick();
//                         signOut({ callbackUrl: "/" });
//                       }}
//                       className="w-full border-primary text-primary hover:bg-primary/10"
//                     >
//                       Log Out
//                     </Button>
//                   </div>
//                 )}
//               </nav>
//             </SheetContent>
//           </Sheet>
//         </div>
//       </div>
//     </nav>
//   );
// }
"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, User, LogOut, Package, Key } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import { useContent } from "@/features/category-page/hooks/use-content";
import { CategoryContent } from "@/features/category-page/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const menuItems = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about-us", label: "About" },
  { href: "/contact-us", label: "Contact Us" },
];

import { Session } from "next-auth";

// Reusable User Profile Dropdown Component
const UserProfile = ({ session }: { session: Session | null }) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" className="relative h-10 w-10 rounded-full border border-primary/20 p-0 hover:bg-primary/10">
        <Avatar className="h-9 w-9">
          <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || "User"} />
          <AvatarFallback className="bg-primary/10 text-primary">
            {session?.user?.name?.charAt(0) || <User size={18} />}
          </AvatarFallback>
        </Avatar>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56 mt-2" align="end" forceMount>
      <DropdownMenuLabel className="font-normal">
        <div className="flex flex-col space-y-1">
          <p className="text-sm font-medium leading-none">{session?.user?.name}</p>
          <p className="text-xs leading-none text-muted-foreground">{session?.user?.email}</p>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <Link href="/profile/orders">
        <DropdownMenuItem className="cursor-pointer">
          <Package className="mr-2 h-4 w-4" />
          <span>Order History</span>
        </DropdownMenuItem>
      </Link>
      <Link href="/profile/change-password">
        <DropdownMenuItem className="cursor-pointer">
          <Key className="mr-2 h-4 w-4" />
          <span>Change Password</span>
        </DropdownMenuItem>
      </Link>
      <DropdownMenuSeparator />
      <DropdownMenuItem
        className="text-red-600 cursor-pointer focus:bg-red-50 focus:text-red-600"
        onClick={() => signOut({ callbackUrl: "/" })}
      >
        <LogOut className="mr-2 h-4 w-4" />
        <span>Log Out</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [showDropdown, setShowDropdown] = useState(false);
  const { data: contentData } = useContent({ limit: 12 });
  const categories = contentData?.data || [];
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (href: string) => (href === "/" ? pathname === href : pathname.startsWith(href));

  return (
    <nav className="sticky top-0 z-50 transition-all duration-300 backdrop-blur-md bg-blue-100 border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-8 flex justify-between items-center py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image src="/images/logo.png" alt="Logo" width={120} height={120} className="cursor-pointer" priority />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 font-medium items-center">
          {menuItems.map((item) => (
            <li key={item.href} className="relative">
              {item.label === "Products" ? (
                <div ref={dropdownRef}>
                  <button onClick={() => setShowDropdown(!showDropdown)} className={cn("flex items-center gap-1 transition-all duration-200 hover:text-primary relative pb-1", isActive(item.href) || showDropdown ? "text-primary font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary" : "text-primary-foreground")}>
                    {item.label}
                    <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", showDropdown && "rotate-180")} />
                  </button>
                  {showDropdown && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[600px] bg-white/95 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-6 grid grid-cols-3 gap-4 z-50 animate-in fade-in slide-in-from-top-2 duration-300">
                      {categories.map((category: CategoryContent) => (
                        <Link key={category._id} href={`/category/${category.type}`} onClick={() => setShowDropdown(false)} className="group flex items-center gap-3 p-2 rounded-xl hover:bg-primary/5 transition-colors">
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-accent shrink-0 border border-black/5">
                            <Image src={category.image || "/no-image.jpg"} alt={category.title} fill className="object-cover transition-transform duration-300 group-hover:scale-110" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-semibold text-gray-900 group-hover:text-primary transition-colors line-clamp-1">{category.title}</span>
                            <span className="text-[10px] uppercase tracking-wider text-gray-500 font-medium">{category.type}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link href={item.href} className={cn("transition-all duration-200 hover:text-primary relative pb-1", isActive(item.href) ? "text-primary font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary" : "text-primary-foreground")}>
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          {status === "unauthenticated" ? (
            <Link href="/login">
              <Button variant="outline" className="border-primary text-primary-foreground hover:bg-primary/10 px-8 rounded-lg font-semibold transition-all">Log In</Button>
            </Link>
          ) : (
            <UserProfile session={session} />
          )}
        </div>

        {/* Mobile Menu */}
        <div className="flex md:hidden items-center space-x-4">
          {status === "authenticated" && <UserProfile session={session} />}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-gray-500 hover:text-primary">
                {open ? <X size={28} /> : <Menu size={28} />}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <nav className="flex flex-col space-y-2 mt-8">
                {menuItems.map((item) => (
                  <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className={cn("px-5 py-3 rounded-lg font-medium text-lg", isActive(item.href) ? "text-primary bg-primary/10 font-semibold" : "text-gray-700")}>
                    {item.label}
                  </Link>
                ))}
                {status === "unauthenticated" && (
                  <div className="flex flex-col px-5 pt-6 mt-4 border-t">
                    <Link href="/login" onClick={() => setOpen(false)}>
                      <Button variant="outline" className="w-full border-primary text-primary">Log In</Button>
                    </Link>
                  </div>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
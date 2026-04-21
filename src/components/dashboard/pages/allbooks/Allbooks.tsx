import Link from "next/link";
import { CategoryShow } from "./CategoryShow";
import OrderedBooks from "./OrderedBooks";
import { Button } from "@/components/ui/button";

const Allbooks = () => {
  return (
    <div>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#FF8B36] mb-1">
              All Books
            </h1>
          </div>
          <div className="relative w-full max-w-[320px]">
            <Link href="/create-book">
              <Button
                className="text-lg font-bold text-primary bg-transparent border border-primary
             px-8 py-4 rounded-lg hover:bg-primary hover:text-white"
              >
                Add New Book
              </Button>
            </Link>

          </div>
        </div>
        <OrderedBooks />
      </div>
    </div>
  );
};

export default Allbooks;

import { Search } from 'lucide-react'
import React from 'react'
import Overview from './Overview'
import RecentOrders from './RecentOrders'

const Dashboardpage = () => {
  return (
    <div>
      <div className="space-y-8 py-5">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#FF8B36] mb-1">Welcome!</h1>
            <p className="text-gray-500 font-medium">
              Manage your orders, track shipments, and configure products easily.
            </p>
          </div>

          {/* <div className="relative w-full max-w-[320px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary shadow-sm text-sm"
            />
          </div> */}
        </div>

        {/* Main Content Sections */}
        <Overview />
        <RecentOrders />
      </div>
    </div>
  )
}

export default Dashboardpage
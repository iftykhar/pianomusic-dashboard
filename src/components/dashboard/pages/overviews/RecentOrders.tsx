
// import RecentOrdersTable from '@/components/Table/RecentOrdersTable'
import React from 'react'

const RecentOrders = () => {
    return (


        <div className="bg-white rounded-xl p-6 ">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
                <div>
                    <h2 className="text-lg font-semibold text-[#FF6A00]">
                        Recent Orders
                    </h2>
                    <p className="text-sm text-gray-500">
                        Register your pet&apos;s information and activate the tag for your pretty
                        pet just in a second.
                    </p>
                </div>

                <select
                    className="border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-300"
                >
                    <option>All Status</option>
                    <option>Pending</option>
                    <option>Paid</option>
                    <option>Cancelled</option>
                </select>
            </div>

            {/* Table */}
            {/* <RecentOrdersTable /> */}
        </div>

    )
}

export default RecentOrders
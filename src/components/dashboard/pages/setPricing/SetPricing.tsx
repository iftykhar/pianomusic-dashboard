import React from 'react'
import PriceSet from './PriceSet'

const SetPricing = () => {
    return (
        <div>
            <div className="space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-[#FF8B36] mb-1">Set Pricing</h1>
                        <p className="text-gray-500 font-medium">
                            Set pricing for your products.
                        </p>
                    </div>
                </div>
                <PriceSet />
            </div>
        </div>
    )
}

export default SetPricing
// SubtitleCategory.tsx
import React from 'react'

interface SubtitleCategoryProps {
    subtitle: string;
}

const SubtitleCategory = ({ subtitle }: SubtitleCategoryProps) => {
    return (
        <div>
            <h2 className="text-center text-gray-600 text-xl">
                {subtitle}
            </h2>
        </div>
    )
}

export default SubtitleCategory
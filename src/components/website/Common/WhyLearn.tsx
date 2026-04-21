// import React from 'react'

// interface WhyLearnProps {
//   title: string;
//   description: string;
//   className?: string;
//   icon: React.ReactNode;
//   iconContainerClassName?: string;
//   titleClassName?: string;
//   descriptionClassName?: string;
// }

// const WhyLearn: React.FC<WhyLearnProps> = ({
//   title,
//   description,
//   className = "",
//   icon,
//   iconContainerClassName = "",
//   titleClassName = "",
//   descriptionClassName = ""
// }) => {
//   return (
//     <div className={`text-center py-12 px-4 ${className} w-[80%] mx-auto md:w-[40%] lg:w-[25%]`}>
//       <div className={`flex justify-center mb-4 bg-primary shadow-2xl w-12 h-12 items-center text-[#0694A2] rounded-full mx-auto ${iconContainerClassName}`}>
//         {icon}
//       </div>
//       <h2 className={`text-[24px] font-medium text-[#27303F] leading-[150%] ${titleClassName}`}>
//         {title}
//       </h2>
//       <p className={`text-[16px] text-[#6B7280] font-normal pt-2 leading-[150%] w-[90%]  mx-auto ${descriptionClassName}`}>
//         {description}
//       </p>
//     </div>
//   )
// }

// export default WhyLearn

import React from "react";

interface WhyLearnProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const WhyLearn: React.FC<WhyLearnProps> = ({
  title,
  description,
  icon,
}) => {
  return (
    <div className="text-center py-12">
      {/* Icon */}
      <div className="w-14 h-14 bg-[#FB923C] rounded-full flex items-center justify-center mx-auto mb-6">
        {icon}
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-[#1F2937] mb-3">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm text-[#6B7280] leading-relaxed max-w-[360px] mx-auto">
        {description}
      </p>
    </div>
  );
};

export default WhyLearn;

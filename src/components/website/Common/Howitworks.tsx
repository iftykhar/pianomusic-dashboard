import React from "react";
import { BookOpen, Download, Upload, WandSparkles } from "lucide-react";
import WhyLearn from "./WhyLearn";

const Howitworks = () => {
    return (
        <div className="bg-secondary">
            <div className=" mx-auto container py-12">
                <div className="mb-[30px]  text-center">
                    <h2 className="text-[#252F3F] text-5xl font-bold  leading-[120%] pb-2">
                        How it works
                    </h2>
                    <p className="text-[16px] max-w-[500px] text-[#6B7280] text-center w-[90%] mx-auto leading-6 font-normal">
                        Create your personalized coloring book in minutes with our simple 4-step process
                    </p>
                </div>
                <div className="flex flex-wrap justify-between">
                    <WhyLearn
                        title="Upload Your Photos"
                        description="Simply upload your photos-pets, family, memories, or anything meaningful."
                        icon={<Upload size={24} color="white" />}


                    />
                    <WhyLearn
                        title="Download or Print"
                        description="Get instant digital PDF or order a professionally printed book delivered to your door."
                        icon={<Download size={24} color="white" />}

                    />
                    <WhyLearn
                        title="Al Magic Conversion"
                        description="Our Al transforms your photos into beautiful, clean line art perfect for coloring."
                        icon={<WandSparkles size={24} color="white" />}

                    />

                    <WhyLearn
                        title="Customize Your Book"
                        description="Choose your page count, add a dedication, and select the perfect cover design."
                        icon={<BookOpen size={24} color="white" />}

                    />
                </div>
            </div>
        </div>
    );
};

export default Howitworks;

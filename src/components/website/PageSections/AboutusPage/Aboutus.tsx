import React from "react";

const Aboutus = () => {
  const audiences = [
    { label: "Children", desc: "for creativity, learning, and fun" },
    { label: "Pet lovers", desc: "to celebrate beloved pets" },
    { label: "Seniors & memory care", desc: "for relaxation and cognitive engagement" },
    { label: "Adults & novelty users", desc: "for stress relief, hobbies, and unique gifts" }
  ];

  return (
    <section className="min-h-screen bg-secondary flex justify-center px-6 py-16">
      <div className="max-w-4xl w-full text-gray-700">
        <div className="flex justify-center mb-8 ">
          <span className="px-4 py-1 text-sm rounded-full bg-[#FFE5D2] text-gray-600">
            About Us
          </span>
        </div>

        <h1 className="text-center text-3xl md:text-4xl font-semibold text-gray-600 mb-8">
          Turning Your Photos Into Personalized Coloring Books
        </h1>

        <p className="text-lg leading-relaxed mb-6">
          We are a creative platform that helps people transform their personal photos into beautiful, black-and-white coloring book illustrations using AI technology. Our goal is to make custom coloring books easy, meaningful, and accessible for everyone—whether for fun, relaxation, learning, or gifting.
        </p>

        <p className="text-lg leading-relaxed mb-8">
          Our platform allows users to upload their own images, which are carefully converted into coloring-page style artwork. These illustrations are then compiled into a print-ready PDF or prepared for professional printing through services like Amazon KDP. We proudly serve multiple customer groups, including:
        </p>

        <ul className="space-y-3 text-lg mb-10">
          {audiences.map(({ label, desc }) => (
            <li key={label}>
              <span className="font-semibold">{label}</span> – {desc}
            </li>
          ))}
        </ul>

        <p className="text-lg leading-relaxed">
          We believe coloring is more than just an activity it&pos;s a way to relax, connect with memories, and express creativity. By combining technology with personalization, we help turn everyday photos into something truly special.
        </p>
      </div>
    </section>
  );
};

export default Aboutus;
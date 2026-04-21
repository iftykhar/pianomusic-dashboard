"use client";

import Image from "next/image";

const images = [
  "https://img.freepik.com/free-photo/shiraito-waterfall-autumn-japan_335224-193.jpg",
  "https://img.freepik.com/free-photo/beautiful-view-mesmerizing-nature-traditional-styled-japanese-adelaide-himeji-gardens_181624-46195.jpg",
  "https://img.freepik.com/free-photo/autumn-river-ordesa-national-park-pyrenees-huesca-aragon-spain_1301-6980.jpg",
  "https://img.freepik.com/free-photo/mustard-field-with-beautiful-snow-covered-mountains-landscape-kashmir-state-india_1232-4824.jpg",
  "https://img.freepik.com/free-photo/fictitious-floating-island_1048-2899.jpg",
  "https://img.freepik.com/free-photo/scenic-view-mountains-lake_53876-138187.jpg",
  "https://img.freepik.com/free-photo/sunset-with-silhoutte-birds-flying_335224-915.jpg",
  "https://img.freepik.com/free-photo/landscape-rocks-surrounded-by-forests-covered-fog-cloudy-sky_181624-6475.jpg",
];

const Gallery = () => {
  return (
    <div className="mx-auto container py-10">
        <div className="text-5xl text-center py-10 font-bold">
            This is Gallery Component
        </div>
      <div className="grid grid-cols-4 gap-2">
        {images.map((src, index) => (
          <div
            key={index}
            className="relative w-full h-64 sm:h-72 md:h-80 lg:h-96"
          >
            <Image
              src={src}
              alt={`Gallery image ${index + 1}`}
              fill
              className="object-cover rounded-3xl"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;

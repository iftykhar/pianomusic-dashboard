import HeaderTitle from "@/components/website/Common/head-title"
import Image from "next/image"

const FEATURES = [
  {
    title: "Children Coloring Books",
    description:
      "Create fun and personalized coloring books for children using their own photos, favorite moments, or characters. Our AI transforms images into simple, kid-friendly line art that encourages creativity, imagination, and screen-free fun. Perfect for birthdays, learning activities, and gifts.",
    image: "/images/kids-playing.png",
    imageLeft: true,
  },
  {
    title: "Pets Coloring Books",
    description:
      "Turn your beloved pets into adorable coloring pages. Upload photos of dogs, cats, or any pet, and we'll create detailed yet playful illustrations that pet lovers of all ages will enjoy coloring. A unique gift for pet parents and animal lovers.",
    image: "/images/golden-retriever.png",
    imageLeft: false,
  },
  {
    title: "Seniors & Memory Care Coloring Books",
    description:
      "Design calming and meaningful coloring books using familiar faces, places, and memories. Our high-contrast, easy-to-color illustrations are ideal for seniors, supporting relaxation, creativity, and memory engagement in care homes or at home.",
    image: "/images/thoughtful-senior-woman.png",
    imageLeft: true,
  },
  {
    title: "Adult & Novelty Coloring Books",
    description:
      "Create unique and personalized coloring books for adults—from travel memories and portraits to fun novelty designs. Perfect for relaxation, stress relief, creative hobbies, or one-of-a-kind gifts made from your own photos.",
    image: "/images/heroImage.png",
    imageLeft: false,
  },
]

export function Features() {
  return (
    <section className="py-24 px-6 bg-secondary">
      <div className="container mx-auto">
        <div className="text-center space-y-6 max-w-3xl mx-auto mb-32">
         <HeaderTitle title="Custom Coloring Books Made From Your Photos"/>
          <p className="text-gray-500 text-lg md:text-lg font-medium max-w-2xl mx-auto leading-relaxed">
            Turn your favorite memories into beautiful black-and-white coloring pages. Upload photos, let AI do the
            magic, and receive a print-ready coloring book perfect for all ages.
          </p>
        </div>

        <div className="space-y-48">
          {FEATURES.map((feature, index) => (
            <div
              key={index}
              className={`flex flex-col ${feature.imageLeft ? "md:flex-row" : "md:flex-row-reverse"} gap-16 lg:gap-24 items-center`}
            >
              <div className="w-full md:w-1/2 rounded-lg overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.08)] bg-white aspect-[1.8/1] relative border border-primary group">
                <Image
                  src={feature.image || "/placeholder.svg"}
                  alt={feature.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="w-full md:w-1/2 space-y-8 px-4">
                <h3 className="text-3xl font-bold text-gray-900 tracking-tight">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed text-xl font-medium">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

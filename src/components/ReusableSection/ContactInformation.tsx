// components/ContactInformation.tsx
import { MapPin, Phone, Mail, Printer } from "lucide-react";

export default function ContactInformation() {
  return (
    <div className="container mx-auto p-4 my-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg-[48px]">
        {/* Left Side - Google Map */}
        <div className="bg-muted rounded-lg overflow-hidden h-96 lg:h-auto">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2733.102601001974!2d-114.07953601130696!3d46.76287404898452!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x535c2ca57f03a8d1%3A0x98718849421012b6!2sLolo%20Physical%20Therapy!5e0!3m2!1sen!2sbd!4v1761416054761!5m2!1sen!2sbd"
            width="100%"
            height="100%"
            className="border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Map Showing Our Location"
          ></iframe>
        </div>

        {/* Right Side - Contact Information */}
        <div className="">
          {/* Header */}

          {/* Contact Information Section */}
          <div className="">
            <h2 className="text-xl lg:text-[32px] leading-[128%]  mb-2 font-bold text-gray-900">
              Contact Information
            </h2>
            <p className="text-[#6C757D] leading-relaxed mb-10 ">
              Find all the ways to reach us, including email, phone, and our
              office address, so you can get the support and answers you need
              quickly and easily.
            </p>

            {/* Contact Details */}
            <div className="">
              {/* Email */}
              <div className="flex items-start gap-1.5 rounded-lg my-6 transition-colors">
                <Mail className="w-5 h-5 text-blue-600 mt-0.5" />
                <a
                  href="mailto:info@lolophysicaltherapy.com"
                  className="text-blue-600 hover:underline"
                >
                  info@example.com
                </a>
              </div>

              {/* Phone 1 */}
              <div className="flex items-start gap-1.5 rounded-lg my-6 transition-colors">
                <Phone className="w-5 h-5 text-[#1256A9] mt-0.5" />
                <a
                  href="tel:406-273-3730"
                  className="text-[#1256A9] hover:underline"
                >
                  406-273-3730
                </a>
              </div>

              {/* Phone 2 */}
              <div className="flex items-start gap-1.5 rounded-lg my-6 transition-colors">
                <Printer className="w-5 h-5 text-[#1256A9] mt-0.5" />
                <a
                  href="tel:406-273-9088"
                  className="text-[#1256A9] hover:underline"
                >
                  406-273-9088
                </a>
              </div>

              {/* Address */}
              <div className="flex items-start gap-1.5 rounded-lg my-6">
                <MapPin className="w-5 h-5 text-[#1256A9] mt-0.5" />
                <a
                  href="https://www.google.com/maps?q=Labo+Physical+Therapy,+198+Tyler+Way+Lab,+MT+69947"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:underline"
                >
                  Lolo Physical Therapy 106 Tyler Way Lolo, MT 59847
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

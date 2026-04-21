
// export default function page() {
//   return (
//     <div>
//       <h1>Create account</h1>
//     </div>
//   );
// }


import Image from "next/image";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <div className=" max-w-3xl bg-white rounded-xl shadow-md px-10 py-12">
        
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image
            src="/images/logo.png"
            alt="sktchLABS"
            width={160}
            height={40}
            className="object-contain"
          />
        </div>

        {/* Heading */}
        <h2 className="text-center text-2xl font-semibold text-orange-500 mb-1">
          Create Your Account
        </h2>
        <p className="text-center text-sm text-gray-500 mb-8">
          Create your account to start booking, hosting, and sharing kitchens
        </p>

        {/* Form */}
        <form className="space-y-5">
          {/* First & Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                placeholder="Lorem"
                className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                placeholder="Ipsum"
                className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="hello@example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="************"
              className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-md transition"
          >
            Sign Up
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <a href="#" className="text-orange-500 font-medium hover:underline">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}

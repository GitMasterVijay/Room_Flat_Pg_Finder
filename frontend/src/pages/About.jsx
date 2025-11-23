import { Zap, Target, ShieldCheck, PhoneCall, Users, Home } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-white">

      {/* 1. HERO SECTION (High Impact Header) */}
      <section className="relative h-96 bg-gray-800 flex items-center justify-center p-4">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1554995207-c18c6926e548?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1500&q=80')" }}></div>

        {/* Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <p className="text-indigo-300 font-semibold text-lg mb-3 flex items-center justify-center gap-2">
            <Zap className="w-5 h-5" /> Trusted since 2020
          </p>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight">
            The Future of <span className="text-cyan-400">Home Finding</span>
          </h1>
          <p className="mt-4 text-gray-300 text-xl max-w-3xl mx-auto">
            RoomFinder is built on a foundation of transparency and simplicity, connecting you directly to verified accommodations.
          </p>
        </div>
      </section>

      {/* --- */}

      {/* 2. WHO WE ARE (Image + Text Section) */}
      <section className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Text Content */}
          <div className="order-2 lg:order-1">
            <h2 className="text-sm font-semibold text-indigo-600 uppercase tracking-wider mb-2">
              Our Story
            </h2>
            <h3 className="text-4xl font-bold text-gray-900 mb-6 border-l-4 border-cyan-400 pl-4">
              Making Room Hunting Human Again
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              RoomFinder was founded to **disrupt the traditional broker-heavy market**. We realized that finding a simple room, PG, or flat should be a direct, affordable, and transparent process—not a stressful commission chase.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Our platform empowers both **property owners** and **seekers** by eliminating intermediaries, reducing costs, and verifying every listing. We are more than just a search engine; we are a community dedicated to hassle-free living.
            </p>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition duration-500 ease-in-out">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
              alt="Modern interior design"
              className="w-full h-80 lg:h-[450px] object-cover"
            />
          </div>

        </div>
      </section>

      {/* --- */}

      {/* 3. WHY CHOOSE US (Stats & Trust Signals - NEW) */}
      <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-12">
            Trusted By The Numbers
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

            <div className="p-6 bg-white rounded-xl shadow-lg border-b-4 border-indigo-500">
              <Users className="w-10 h-10 text-indigo-600 mx-auto mb-3" />
              <p className="text-4xl font-bold text-gray-900">45K+</p>
              <p className="text-gray-500 mt-1 font-medium">Active Users</p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow-lg border-b-4 border-cyan-500">
              <Home className="w-10 h-10 text-cyan-600 mx-auto mb-3" />
              <p className="text-4xl font-bold text-gray-900">12,500+</p>
              <p className="text-gray-500 mt-1 font-medium">Verified Listings</p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow-lg border-b-4 border-indigo-500">
              <ShieldCheck className="w-10 h-10 text-indigo-600 mx-auto mb-3" />
              <p className="text-4xl font-bold text-gray-900">0%</p>
              <p className="text-gray-500 mt-1 font-medium">Brokerage Fees</p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow-lg border-b-4 border-cyan-500">
              <PhoneCall className="w-10 h-10 text-cyan-600 mx-auto mb-3" />
              <p className="text-4xl font-bold text-gray-900">24/7</p>
              <p className="text-gray-500 mt-1 font-medium">Support Available</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- */}

      {/* 4. CORE VALUES (Replaced Mission Section) */}
      <section className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-sm font-semibold text-indigo-600 uppercase tracking-wider mb-2">
            Our Foundation
          </h2>
          <h3 className="text-4xl font-bold text-gray-900">Core Values That Drive Us</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Value 1 */}
          <div className="p-8 bg-white border border-gray-100 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300">
            <Target className="w-10 h-10 text-indigo-600 mb-4" />
            <h4 className="text-xl font-bold text-gray-900 mb-2">Transparency</h4>
            <p className="text-gray-600">
              We ensure all listing details, pricing, and owner information are clear and accurate. No hidden fees, no surprises.
            </p>
          </div>

          {/* Value 2 */}
          <div className="p-8 bg-white border border-gray-100 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300">
            <ShieldCheck className="w-10 h-10 text-cyan-600 mb-4" />
            <h4 className="text-xl font-bold text-gray-900 mb-2">Verification</h4>
            <p className="text-gray-600">
              Every property owner is vetted to guarantee you are dealing with genuine landlords, protecting you from scams.
            </p>
          </div>

          {/* Value 3 */}
          <div className="p-8 bg-white border border-gray-100 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300">
            <Zap className="w-10 h-10 text-indigo-600 mb-4" />
            <h4 className="text-xl font-bold text-gray-900 mb-2">Simplicity</h4>
            <p className="text-gray-600">
              Our interface is designed for quick navigation, powerful filtering, and direct communication, making search easy.
            </p>
          </div>

        </div>
      </section>

      {/* --- */}

      {/* 5. TEAM SECTION (Improved Layout) */}
      <section className="bg-gray-900 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-3">Meet The Innovators</h2>
          <p className="mt-2 text-gray-400 max-w-3xl mx-auto">
            Dedicated professionals working hard to deliver the best platform for property owners and seekers.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mt-12">

            {/* Team Card */}
            <div className="bg-gray-800 shadow-xl rounded-xl p-6 transform hover:scale-[1.02] transition duration-300 border-t-4 border-indigo-500">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Vijay Hiwale"
                className="w-28 h-28 mx-auto rounded-full object-cover border-4 border-cyan-400 p-1"
              />
              <h3 className="mt-4 text-xl font-semibold text-white">Vijay Hiwale</h3>
              <p className="text-indigo-400 text-sm font-medium">Frontend Lead</p>
              <p className="text-gray-400 text-sm mt-2">Focus on user experience and responsive design.</p>
            </div>

            <div className="bg-gray-800 shadow-xl rounded-xl p-6 transform hover:scale-[1.02] transition duration-300 border-t-4 border-indigo-500">
              <img
                src="https://randomuser.me/api/portraits/men/41.jpg"
                alt="Rushikesh"
                className="w-28 h-28 mx-auto rounded-full object-cover border-4 border-cyan-400 p-1"
              />
              <h3 className="mt-4 text-xl font-semibold text-white">Rushikesh</h3>
              <p className="text-indigo-400 text-sm font-medium">Backend Architect</p>
              <p className="text-gray-400 text-sm mt-2">Ensures high performance and data security.</p>
            </div>

            <div className="bg-gray-800 shadow-xl rounded-xl p-6 transform hover:scale-[1.02] transition duration-300 border-t-4 border-indigo-500">
              <img
                src="https://randomuser.me/api/portraits/men/64.jpg"
                alt="Om Murhe"
                className="w-28 h-28 mx-auto rounded-full object-cover border-4 border-cyan-400 p-1"
              />
              <h3 className="mt-4 text-xl font-semibold text-white">Om Murhe</h3>
              <p className="text-indigo-400 text-sm font-medium">Product Designer</p>
              <p className="text-gray-400 text-sm mt-2">Creating intuitive flows and visual identity.</p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
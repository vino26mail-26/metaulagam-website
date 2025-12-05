import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="font-sans">
      {/* HERO SECTION */}
      <section className="bg-gradient-to-b from-black via-gray-900 to-gray-950 text-white py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <p className="uppercase tracking-[0.25em] text-xs text-orange-400 mb-3">
            MetaUlagam Academy
          </p>

          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">
            Learn VR, Film Making & AI  
            <span className="text-orange-400"> with Real Projects</span>
          </h1>

          <p className="text-sm md:text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
            Build production-style projects like the MetaUlagam platform,
            VR storytelling experiences, and cinematic content – step by step.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <Link
              to="/courses"
              className="bg-orange-600 hover:bg-orange-700 px-6 py-3 rounded text-white font-semibold text-sm md:text-base"
            >
              Explore Courses
            </Link>

            <Link
              to="/enquiry"
              className="border border-orange-400 px-6 py-3 rounded text-orange-400 font-semibold text-sm md:text-base hover:bg-orange-400 hover:text-black"
            >
              Talk to Mentor
            </Link>
          </div>

          <p className="text-xs md:text-sm text-gray-400">
            No fake promises. You’ll actually ship a full-stack app like this site.
          </p>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="max-w-5xl mx-auto px-4 py-12 grid gap-6 md:grid-cols-3">
        <div className="bg-white shadow-sm rounded-lg p-5 border border-gray-100">
          <h3 className="font-bold mb-2 text-gray-900">VR & Unity Basics</h3>
          <p className="text-sm text-gray-700">
            Understand VR pipelines, Unity scene setup, and how to turn ideas into
            immersive environments.
          </p>
        </div>

        <div className="bg-white shadow-sm rounded-lg p-5 border border-gray-100">
          <h3 className="font-bold mb-2 text-gray-900">Film & Story Structure</h3>
          <p className="text-sm text-gray-700">
            Learn how to break a story into shots, sequences, and scenes
            that work in both film and VR.
          </p>
        </div>

        <div className="bg-white shadow-sm rounded-lg p-5 border border-gray-100">
          <h3 className="font-bold mb-2 text-gray-900">Full-Stack Skills</h3>
          <p className="text-sm text-gray-700">
            Build real tools like this platform – React frontend, Node/Express backend,
            MongoDB, authentication, and admin dashboard.
          </p>
        </div>
      </section>

      {/* WHO IS THIS FOR */}
      <section className="bg-white border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-bold mb-3">
              Designed for Visual Communication & Creative Students
            </h2>
            <p className="text-sm text-gray-700 mb-3">
              If you are a VisCom student, aspiring filmmaker, or someone who loves
              storytelling and tech, this academy is built for you.
            </p>
            <p className="text-sm text-gray-700 mb-4">
              You’ll combine creativity with modern tools – VR, AI, React, Node.js,
              and more – to create work that actually impresses studios and companies.
            </p>
            <Link
              to="/enquiry"
              className="inline-block text-sm font-semibold text-orange-600 hover:text-orange-700"
            >
              Send an enquiry →
            </Link>
          </div>

          <div className="bg-gray-900 text-gray-100 rounded-xl p-5 text-sm space-y-2">
            <p className="font-semibold text-orange-300">
              What you’ll be able to say after the course:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>I built and deployed a full-stack app (like this one).</li>
              <li>I understand how VR scenes, cameras, and storytelling work.</li>
              <li>I can talk to both tech teams and creative teams.</li>
              <li>I’m not just watching tutorials – I shipped real work.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;

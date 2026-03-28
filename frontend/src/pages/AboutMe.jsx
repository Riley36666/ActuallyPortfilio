import { motion } from "framer-motion";
import Background from "../components/Background";
export default function About() {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <Background />
      <AboutSection />
    </div>
  );
}


function AboutSection() {
  return (
    <div className="relative z-10 px-6 py-20 max-w-5xl mx-auto">
      
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-teal-200 to-teal-400 text-transparent bg-clip-text"
      >
        About Me
      </motion.h2>

      {/* Main card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-10 bg-slate-900/60 backdrop-blur rounded-2xl p-8 shadow-lg"
      >
        <p className="text-gray-300 leading-relaxed text-lg">
          I’m <span className="text-teal-300 font-semibold">Riley Knowles</span>, 
          an aspiring Software Engineer and Cyber Security enthusiast with a deep passion 
          for coding, problem-solving, and building things that actually work.
        </p>

        <p className="mt-4 text-gray-400 leading-relaxed">
          As an A-Level student, I spend most of my time learning, experimenting, and 
          creating projects that push me to grow as a developer.
        </p>

        <p className="mt-4 text-gray-400 leading-relaxed">
          I enjoy exploring algorithms, JavaScript, databases, and anything that 
          challenges me to think differently.
        </p>
      </motion.div>

      {/* Highlights */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="grid md:grid-cols-3 gap-6 mt-10"
      >
        <div className="bg-slate-800 rounded-xl p-6 text-center hover:scale-105 transition">
          <h3 className="text-teal-300 font-semibold">💻 Development</h3>
          <p className="text-gray-400 mt-2 text-sm">
            Building web apps, experimenting with new tech, and improving daily.
          </p>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 text-center hover:scale-105 transition">
          <h3 className="text-teal-300 font-semibold">🔐 Cyber Security</h3>
          <p className="text-gray-400 mt-2 text-sm">
            Interested in security, systems, and understanding how things work underneath.
          </p>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 text-center hover:scale-105 transition">
          <h3 className="text-teal-300 font-semibold">⚡ Growth</h3>
          <p className="text-gray-400 mt-2 text-sm">
            Constantly learning, building, and pushing my limits as a developer.
          </p>
        </div>
      </motion.div>
    </div>
  );
}

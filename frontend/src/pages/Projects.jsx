import { motion } from "framer-motion";
import "./Project.css";

export default function Project() {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <Background />

      <div className="flex flex-col items-center justify-center pt-20 relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold text-teal-300 mb-10"
        >
          Projects
        </motion.h1>

        <div className="flex flex-col gap-6 w-full max-w-xl">
          <ProjectCard
            title="Password Manager"
            link="https://github.com/Riley36666/MyOwnPassManager"
          />

          <ProjectCard
            title="Project 2 (WIP)"
            link="#"
          />
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ title, link }) {
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      className="block bg-gray-900/40 border border-teal-300/40 p-6 rounded-xl 
                 hover:border-teal-300 hover:bg-gray-900/60 transition"
    >
      <h2 className="text-xl font-semibold text-teal-200">{title}</h2>
    </motion.a>
  );
}



function Background() {
  return (
    <div className="absolute inset-0 z-0">
      <div className="absolute w-[600px] h-[600px] bg-teal-500/20 blur-3xl rounded-full 
                      top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="absolute inset-0 opacity-30">
        {Array.from({ length: 40 }).map((_, i) => (
          <span
            key={i}
            className="absolute w-1 h-1 bg-teal-300 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

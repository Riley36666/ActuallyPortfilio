import { motion } from "framer-motion";

export default function Projects() {
  const repos = [
    {
      name: "MyOwnPassManager",
      lang: "Python",
      desc: "Custom password manager built from scratch.",
      link: "https://github.com/Riley36666/MyOwnPassManager"
    },
    {
      name: "ActuallyPortfolio",
      lang: "JavaScript",
      desc: "My personal portfolio website.",
      link: "https://github.com/Riley36666/ActuallyPortfolio"
    },
    {
      name: "PasswordManagerWebintegration",
      lang: "TypeScript",
      desc: "Web integration for password manager.",
      link: "https://github.com/Riley36666/PasswordManagerWebintegration"
    },
    {
      name: "JavaGame",
      lang: "Java",
      desc: "Game built using Java fundamentals.",
      link: "https://github.com/Riley36666/JavaGame"
    },
    {
      name: "Sideproject",
      lang: "JavaScript",
      desc: "Experimental full-stack side project.",
      link: "https://github.com/Riley36666/Sideproject"
    },
    {
      name: "ImposterRemake",
      lang: "TypeScript",
      desc: "Among Us-style remake project.",
      link: "https://github.com/Riley36666/ImposterRemake"
    }
  ];

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <Background />

      <div className="relative z-10 px-6 pt-32 max-w-6xl mx-auto">

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-bold text-center bg-gradient-to-r from-teal-200 to-teal-400 text-transparent bg-clip-text"
        >
          My Projects
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 text-center mt-6 max-w-2xl mx-auto"
        >
          A collection of projects I’ve built while learning and experimenting
          with different technologies.
        </motion.p>

        {/* Grid */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16"
        >
          {repos.map((repo) => (
            <motion.a
              key={repo.name}
              href={repo.link}
              target="_blank"
              rel="noopener noreferrer"
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 }
              }}
              whileHover={{ scale: 1.04 }}
              className="group bg-slate-900/60 border border-white/10 rounded-2xl p-6 backdrop-blur-xl 
              hover:border-teal-300/40 hover:shadow-[0_0_25px_rgba(45,212,191,0.2)] transition"
            >
              {/* Title */}
              <h3 className="text-lg font-semibold group-hover:text-teal-300 transition">
                {repo.name}
              </h3>

              {/* Description */}
              <p className="text-gray-400 text-sm mt-3 leading-relaxed">
                {repo.desc}
              </p>

              {/* Language */}
              <div className="flex items-center gap-2 mt-4 text-sm text-gray-400">
                <span className="w-2 h-2 rounded-full bg-teal-400"></span>
                {repo.lang}
              </div>
            </motion.a>
          ))}
        </motion.div>

      </div>
    </div>
  );
}

function Background() {
  return (
    <div className="absolute inset-0 z-0">
      <div className="absolute w-[500px] h-[500px] bg-teal-500/20 blur-3xl rounded-full 
                      top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />

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
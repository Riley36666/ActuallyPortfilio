import { motion } from "framer-motion";

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
    <div className="flex flex-col items-center justify-center text-center h-[80vh] relative z-10 px-6">
      
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-4xl md:text-5xl font-semibold text-teal-200 tracking-wide"
      >
        About Me
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-6 text-gray-400 text-lg max-w-2xl leading-relaxed"
      >
        I’m <span className="text-teal-300 font-semibold">Riley Knowles</span>, 
        an aspiring Software Engineer and Cyber Security enthusiast with a deep passion 
        for coding, problem‑solving, and building things that actually work.  
        As an A‑Level student, I spend most of my time learning, experimenting, and 
        creating projects that push me to grow as a developer.
        <br /><br />
        I love exploring topics like algorithms, JavaScript, databases, and anything 
        that challenges me to think differently. Whether it’s developing web apps, 
        designing interfaces, or experimenting with small games, I’m always looking 
        for ways to improve and expand my skills.
        <br /><br />
        Outside of coding, you’ll find me playing football, designing websites, or 
        picking up new skills just for the fun of it. I’m driven, curious, and excited 
        to build a future in software engineering.
      </motion.p>

    </div>
  );
}

function Background() {
  return (
    <div className="absolute inset-0 z-0">
      <div className="absolute w-150 h-150 bg-teal-500/20 blur-3xl rounded-full 
                      top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      {/* particles */}
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

import { motion } from "framer-motion";
import "./Home.css"
export default function Home() {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <Background />
      <Hero />
    </div>
  );
}



function Hero() {
  return (
    <div className="flex flex-col items-center justify-center text-center h-[80vh] relative z-10">
      <motion.h2
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.3 }}
  className="mt-6 text-4xl md:text-5xl font-semibold text-teal-200 tracking-wide"
>
  Riley Knowles
</motion.h2>


      <motion.p
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.3 }}
  className="mt-6 text-gray-400 text-lg max-w-2xl leading-relaxed"
>
  Aspiring Software Engineer & Cyber Security enthusiast.  
</motion.p>


    
    </div>
  );
}

function Background() {
  return (
    <div className="absolute inset-0 z-0">
      <div className="absolute w-150 h-150 bg-teal-500/20 blur-3xl rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      {/* fake particles */}
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

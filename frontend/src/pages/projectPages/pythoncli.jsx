import Background from "../../components/Background"
import { motion } from "framer-motion";

export default function pythoncli() {
    return(
        <div className="relative min-h-screen bg-black text-white overflow-hidden">
          <Background />
          <CliProject />
        </div>
)}


function CliProject() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="relative min-h-screen bg-black text-red-600 overflow-hidden flex items-center justify-center"
    >
      <h1 className="text-cyan-300 font-semibold text-xl">
        Python 
      </h1>
    </motion.div>
  );
}
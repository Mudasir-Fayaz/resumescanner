import { motion } from "framer-motion"

export default function CheckMark() {
  return (
    <div className="flex flex-col items-center justify-center">
      <motion.div
        className="relative flex items-center justify-center w-24 h-24 mb-4"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.div
          className="absolute w-full h-full bg-green-500 rounded-full"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
        />
        <motion.svg
          className="absolute w-16 h-16 text-white"
          viewBox="0 0 24 24"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ delay: 1, duration: 0.5, ease: "easeInOut" }}
        >
          <motion.path
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20 6L9 17l-5-5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 1, duration: 0.5, ease: "easeInOut" }}
          />
        </motion.svg>
        <motion.div
          className="absolute w-full h-full rounded-full bg-green-500 opacity-30"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ delay: 1.5, duration: 1.5, repeat: Infinity, repeatType: "loop" }}
        />
      </motion.div>
      <motion.h2
        className="text-2xl font-bold"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        ATS-Friendly Resume
      </motion.h2>
      <motion.p
        className="mt-2 text-center max-w-xs"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.7, duration: 0.5 }}
      >
        Follow these tips to optimize your resume for Applicant Tracking Systems (ATS) and increase your chances of getting noticed by recruiters.
          
      </motion.p>
    </div>
  )
}
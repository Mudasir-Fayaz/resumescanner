'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle,  } from 'lucide-react'
import {Card,  CardContent} from '@/components/ui/card'
import { useTheme } from 'next-themes'
import { getHighlightColor } from '@/util/util'
import { AtsStats, BenchMark } from '@/types'



 const ATSResumeScanner: React.FC<AtsStats> = ({atsStats}) => {
 const {theme} = useTheme()
 

    const getScoreColor = (score: number) => {
        if (score >= 80) return "text-green-500"
        if (score >= 60) return "text-yellow-500"
        return "text-red-500"
      }

  return (
    <Card className="w-full max-w-3xl mx-auto mb-8">
   
    <CardContent>
        <AnimatePresence>
          {atsStats?.score !== null && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              className=""
            >
                              <h2 className="text-2xl font-semibold text-center mt-4 mb-6">ATS Compatibility Score</h2>

              <div className="relative w-48 h-48 mx-auto">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    className="text-gray-200 stroke-current"
                    strokeWidth="10"
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                  ></circle>
                  <motion.circle
                    className={getScoreColor(atsStats.score)+" stroke-current"}
                    strokeWidth="10"
                    strokeLinecap="round"
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: atsStats.score / 100 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    style={{
                      transformOrigin: "center",
                      transform: "rotate(-90deg)",
                    }}
                  ></motion.circle>
                </svg>
                <div className={"absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-bold "+getScoreColor(atsStats.score)}>
                  {atsStats.score}%
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Benchmarks</h3>
                <motion.ul className="space-y-2">
                  {atsStats.benchmarks.map((benchmark:BenchMark, index:number) => (
                    <motion.li
                      key={benchmark.id}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex items-center space-x-2 p-2 rounded-lg ${
                        benchmark.passed ? getHighlightColor(theme || '','green') : getHighlightColor(theme || '','red')
                      }`}
                    >
                      {benchmark.passed ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600" />
                      )}
                      <span>{benchmark.name}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
      </Card>
    
  )
}

export default ATSResumeScanner;
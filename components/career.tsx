'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Briefcase, Clock, DollarSign, TrendingUp, ChevronDown, ChevronUp } from 'lucide-react'
import { CareerItemProp, CareerProp, DifficultyProp } from '@/types'


const CareersPath:React.FC<CareerProp> = ({careerPaths}) => {
  return (
    <div className="min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {careerPaths.map((career, index) => (
            <CareerCard key={index} career={career} index={index} />
          ))}
        </div>
     
    </div>
  )
}

const CareerCard:React.FC<CareerItemProp> = ({ career, index }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className=" rounded-lg shadow-lg overflow-hidden"
    >
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">{career.title}</h2>
          <Briefcase className="text-blue-500" />
        </div>
        <p className=" mb-4">{career.description}</p>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <Clock className=" mr-2" size={18} />
            <span className="text-sm ">{career.timeline}</span>
          </div>
          <div className="flex items-center">
            <DollarSign className="text-green-500 mr-1" size={18} />
            <span className="text-sm font-semibold ">${career.salary.toLocaleString()}</span>
          </div>
        </div>
        <h2>Difficulty:</h2>
        <DifficultyMeter difficulty={career.difficulty} />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md flex items-center justify-center"
        >
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </motion.button>
      </div>
      <motion.div
        initial={false}
        animate={{ height: isExpanded ? 'auto' : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden bg-gray-50"
      >
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-2">Career Progression</h3>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-blue-300" />
            {career.progress.map((c, i) => (
              <div key={i} className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center font-bold mr-4 relative z-10 text-white">
                  {i + 1}
                </div>
                <span className="text-gray-700">{c}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
const DifficultyMeter:React.FC<DifficultyProp> = ({ difficulty }) => {
  return (
    <div className="flex items-center">
      <TrendingUp className="text-orange-500 mr-2" size={18} />
      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(difficulty / 5) * 100}%` }}
          transition={{ duration: 1, delay: 0.5 }}
          className="h-full bg-orange-500"
        />
      </div>
      <span className="ml-2 text-sm font-medium ">{difficulty}/5</span>
    </div>
  )
}

export default CareersPath;
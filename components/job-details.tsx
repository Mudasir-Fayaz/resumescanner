'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Select, {ActionMeta} from 'react-select'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid'
import { predefinedJobs } from '@/variables/constant'
import { Job } from '@/types'


export default function JobSelectionScreen() {
  const [selectedJob, setSelectedJob] = useState<Job | null>()
 
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)

  const handleJobChange = (selected:Job | null, actionMeta: ActionMeta<Job>) => {
    
      setSelectedJob(selected)
      
    
  }


  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  const descriptionVariants = {
    collapsed: { height: 0, opacity: 0 },
    expanded: { height: 'auto', opacity: 1, transition: { duration: 0.3 } }
  }

  return (
    <motion.div
      className="max-w-2xl mx-auto p-6 rounded-lg shadow-lg"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <h1 className="text-3xl font-bold mb-6">Job Selection</h1>

      <div className="mb-6">
        <label htmlFor="job-select" className="block text-sm font-medium mb-2">
          Select Job Role
        </label>
        <Select
          id="job-select"
          options={predefinedJobs}
          onChange={handleJobChange}
          placeholder="Choose a job role"
          className="basic-single"
          classNamePrefix="select"
        />
      </div>

      {selectedJob && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-6 p-4 rounded-lg"
        >
          <h2 className="text-xl font-semibold mb-2">{selectedJob.label}</h2>
          <motion.div
            variants={descriptionVariants}
            initial="collapsed"
            animate={isDescriptionExpanded ? "expanded" : "collapsed"}
          >
            <p className=" mb-4">{selectedJob.description}</p>
          </motion.div>
          <button
            onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
          >
            {isDescriptionExpanded ? (
              <>
                <ChevronUpIcon className="w-5 h-5 mr-1" />
                Hide Description
              </>
            ) : (
              <>
                <ChevronDownIcon className="w-5 h-5 mr-1" />
                Show Description
              </>
            )}
          </button>
          <div className="mt-4">
            <h3 className="font-medium mb-2">Required Skills:</h3>
            <div className="flex flex-wrap gap-2">
              {selectedJob.skills.map((skill, index) => (
                <motion.span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-8 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200"
      >
        Continue
      </motion.button>
    </motion.div>
  )
}
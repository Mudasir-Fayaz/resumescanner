"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useTheme } from "next-themes"
import { getHighlightColor } from "@/util/util"
import { ScannerAnimProp } from "@/types"

const scanStates = [
    { id: 1, label: "Intializing" },
    
  { id: 2, label: "Validating" },
  { id: 3, label: "Extracting" },

  { id: 4, label: "Processing" },
  { id: 5, label: "Analyzing" },
  { id: 6, label: "Generating" },
  { id: 7, label: "Completed" },
]

const ScannerAnim:React.FC<ScannerAnimProp> = ({data, setLoading}) => {
  const {theme} = useTheme()
  const [scanning, setScanning] = useState(true)
  const [completedStates, setCompletedStates] = useState<number[]>([])
  const [scanComplete, setScanComplete] = useState(false)
const [scanCount, setScanCount] = useState(1)
const changeLoading = () => setLoading(false);
  useEffect(() => {
    if (scanning && !scanComplete) {
      const interval = setInterval(() => {
        if(!completedStates.some(v=> v == scanCount))
          setCompletedStates(prev => [...prev, scanCount])
          if(scanCount < 6){
            if(!completedStates.some(v=> v == scanCount + 1))
          setScanCount(prev => prev + 1);

        }else if(data){
            setScanCount(7);}
        else{
        }
        
      }, 2000)

      return () => clearInterval(interval)
    }
  }, [scanning, completedStates, scanComplete,data, scanCount])

  const resetScan = () => {
    setCompletedStates([])
    setScanComplete(false)
    setScanning(true)
  }

  useEffect(() => {
    if (completedStates.length == 7 && !scanComplete) {
      setScanComplete(true)
      setScanning(false)
      setTimeout(() => {
        changeLoading() 
        resetScan()},500)
    }
   
    
   
  }, [completedStates, scanComplete, changeLoading])

  return (
    <Card className="w-full max-w-2xl mx-auto my-4">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
            Scanning & Analyzing
        </CardTitle>
      </CardHeader>
      <CardContent>
       <div className="w-full flex flex-col items-center justify-center">

      
      <motion.div
        className="relative flex items-center justify-center w-24 h-24 mb-4"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.div
          className="absolute w-full h-full bg-blue-500 rounded-full"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
        {scanning ? (
          <motion.div
            className="absolute w-16 h-16 border-4 border-white rounded-full border-t-transparent"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        ) : (
          <motion.svg
            className="absolute w-16 h-16 text-white"
            viewBox="0 0 24 24"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
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
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </motion.svg>
        )}
        <motion.div
          className="absolute w-full h-full rounded-full bg-blue-500 opacity-30"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
        />
      </motion.div></div>
      <div className="grid grid-cols-3 gap-4 mb-8">
        {scanStates.map((state) => (
          <motion.div
            key={state.id}
            className={`p-4 rounded-lg shadow-md ${
              completedStates.includes(state.id) ? getHighlightColor(theme || '', 'green') : getHighlightColor(theme || '', 'red')
            }`}
            animate={{
              scale: completedStates.includes(state.id) ? [1, 1.05, 1] : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="font-semibold mb-2">{state.label}</h3>
            <div className="flex items-center">
              <div
                className={`w-3 h-3 rounded-full mr-2 ${
                  completedStates.includes(state.id) ? "bg-green-500" : "bg-gray-300"
                }`}
              />
              <span className="text-sm">
                {completedStates.includes(state.id) ? "Complete" : "Pending"}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    
    </CardContent>
    </Card>
  )
}

export default ScannerAnim;
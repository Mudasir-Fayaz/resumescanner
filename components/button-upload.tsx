import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { Upload,Check, X } from "lucide-react"

 const ButtonUpload:React.FC<{handleClick:() => void}> = ({handleClick}) => {
    
    const [isHovered, setIsHovered] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const [uploadProgress, setUploadProgress] = useState(0)
    const [uploadComplete, setUploadComplete] = useState(false)
    const [uploadError, setUploadError] = useState(false)
  
    const handleUpload = () => {
      setIsUploading(true)
      setUploadProgress(0)
      setUploadComplete(false)
      setUploadError(false)
  
      const interval = setInterval(() => {
        setUploadProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(interval)
            handleClick()
            setIsUploading(false)
            setUploadComplete(true)
            return 100
          }
          return prevProgress + 10
        })
      }, 500)
      // Simulating a potential upload error
      if (Math.random() < 0.1) {
        setTimeout(() => {
          clearInterval(interval)
          setIsUploading(false)
          setUploadError(true)
        }, 2000)
      }
    }
  
    const resetButton = () => {
      setIsUploading(false)
      setUploadProgress(0)
      setUploadComplete(false)
      setUploadError(false)
    }
  
    return (
     <div className="flex justify-right">
        <motion.button
          className="flex justify-center w-full mb-3 relative overflow-hidden px-6 py-3 rounded-xl bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          onClick={handleUpload}
          disabled={isUploading}
         
        >
          <motion.div
            className="absolute inset-0 bg-white"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: isHovered ? 1.5 : 0, opacity: isHovered ? 0.2 : 0 }}
            transition={{ duration: 0.3 }}
          />
  
          <motion.div className="relative flex items-center space-x-2">
            <AnimatePresence mode="wait">
              {isUploading ? (
                <motion.div
                  key="uploading"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center space-x-2"
                  
                >
                  <Upload className="w-5 h-5 animate-bounce" />
                  <span>Uploading... {uploadProgress}%</span>
                </motion.div>
              ) : uploadComplete ? (
                <motion.div
                  key="complete"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center space-x-2"
                >
                  <Check className="w-5 h-5" />
                  <span>Upload Complete!</span>
                </motion.div>
              ) : uploadError ? (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center space-x-2"
                >
                  <X className="w-5 h-5" />
                  <span>Upload Failed</span>
                </motion.div>
              ) : (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center space-x-2"
                >
                  <Upload className="w-5 h-5" />
                  <span>Upload File</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
  
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1 bg-white"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isUploading ? uploadProgress / 100 : 0 }}
            transition={{ duration: 0.5, ease: "linear" }}
          />
        </motion.button>
  
       
      </div>
    )
  }

  export default ButtonUpload;
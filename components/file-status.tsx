'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { File, X } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface FileCardProps {
  fileName: string | undefined
  onReset: () => void
}

export default function FileStatus({ fileName = 'example.pdf', onReset = () => {} }: FileCardProps) {
  const [isVisible, setIsVisible] = useState(true)

  const handleReset = () => {
    setIsVisible(false)
    setTimeout(() => {
      onReset()
      
    }, 300)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
      transition={{ duration: 0.3 }}
      className="w-md max-w-md mx-auto m-5 fixed bottom-10 right-5 z-10"
    >
      <Card className="overflow-hidden bg-white">
        <CardContent className="p-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <File className="h-8 w-8 text-blue-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate text-black">
                  {fileName}
                </p>
                <p className="text-sm text-gray-500">
                  {(fileName.split('.').pop() || '').toUpperCase()}
                </p>
              </div>
            </div>
            <div className="flex-shrink-0">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleReset}
                className="text-gray-400 hover:text-gray-500"
                aria-label="Reset file"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
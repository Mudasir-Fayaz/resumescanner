"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, CheckCircle, XCircle } from "lucide-react"
import { ResumeStatsProp} from "@/types"


 const ResumeScore:React.FC<ResumeStatsProp> = ({resumeOverview}) => {
  const [showDetails, setShowDetails] = useState(false)

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500"
    if (score >= 60) return "text-yellow-500"
    return "text-red-500"
  }

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Resume Score</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className={`text-6xl font-bold ${getScoreColor(resumeOverview.resumeScore)}`}
          >
            {resumeOverview.resumeScore}%
          </motion.div>
          <p className="text-sm mt-2">Match with Job Requirements</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Progress value={resumeOverview.resumeScore} className="h-2 mb-4" />
        </motion.div>

        <div className="flex justify-between text-sm mb-6">
          <span>Needs Improvement</span>
          <span>Good Match</span>
          <span>Excellent Match</span>
        </div>

        <Button
          variant="outline"
          onClick={() => setShowDetails(!showDetails)}
          className="w-full"
        >
          {showDetails ? (
            <>
              Hide Details
              <ChevronUp className="ml-2 h-4 w-4" />
            </>
          ) : (
            <>
              Show Details
              <ChevronDown className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>

        {showDetails && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4"
          >
            <h3 className="font-semibold mb-2">Job Requirement Breakdown:</h3>
            <ul className="space-y-2">
              {resumeOverview.skillsMatched?.map((req, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between"
                >
                  <span>{req.skill}</span>
                  {req.match ? (
                    <Badge variant="success" className="flex items-center">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      Match
                    </Badge>
                  ) : (
                    <Badge variant="destructive" className="flex items-center">
                      <XCircle className="mr-1 h-3 w-3" />
                      Missing
                    </Badge>
                  )}
                </motion.li>
              ))}
            </ul>
            <p className="mt-4 text-sm">
              Your resume matches {resumeOverview.resumeScore}% of the job requirements. Consider adding skills or experiences related to the missing requirements to improve your match score.
            </p>
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}

export default ResumeScore;
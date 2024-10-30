"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Briefcase, FolderOpen, FileText, BookOpen, ChevronDown, ChevronUp } from "lucide-react"
import { SkillBarProp, SkillLearnProp, SkillOverviewProp } from "@/types"

const SkillBar:React.FC<SkillBarProp> = ({ skill, level, color }) => (
  <div className="mb-4">
    <div className="flex justify-between mb-1">
      <span className="text-sm font-medium">{skill}</span>
      <span className="text-sm font-medium">{level}%</span>
    </div>
    <motion.div
      className="h-2 bg-gray-200 rounded-full overflow-hidden"
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className={`h-full ${color} rounded-full`}
        initial={{ width: 0 }}
        animate={{ width: `${level}%` }}
        transition={{ duration: 0.8, delay: 0.1 }}
      />
    </motion.div>
  </div>
)
const SkillToLearn:React.FC<SkillLearnProp> = ({ skill, description, index }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="mb-4"
    >
      <Button
        variant="outline"
        className="w-full justify-between"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span>{skill}</span>
        {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </Button>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-2 p-4 rounded-md"
          >
            <p className="text-sm">{description}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

 const SkillAssessment:React.FC<SkillOverviewProp> = ({skillOverview}) => {
  return (
    <div className="container w-full max-w-3xl mx-auto mb-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Skill Assessment</h1>
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Your Skills Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="work" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="work">Work Experience</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="job">Job Description</TabsTrigger>
            </TabsList>
            <TabsContent value="work">
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Briefcase className="mr-2" /> Skills from Work Experience
                </h3>
                {skillOverview && skillOverview.workExperience?.map((skill) => (
                  <SkillBar key={skill.skill} skill={skill.skill} level={skill.level} color="bg-blue-500" />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="projects">
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <FolderOpen className="mr-2" /> Skills from Projects
                </h3>
                {skillOverview && skillOverview.projects?.map((skill) => (
                  <SkillBar key={skill.skill} skill={skill.skill} level={skill.level} color="bg-green-500" />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="job">
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <FileText className="mr-2" /> Skills from Job Description
                </h3>
                {skillOverview && skillOverview.jobDescription?.map((skill) => (
                  <SkillBar key={skill.skill} skill={skill.skill} level={skill.level} color="bg-purple-500" />
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <BookOpen className="mr-2" /> Recommended Skills to Learn
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {skillOverview && skillOverview.skillsToLearn?.map((skill, index) => (
                <SkillToLearn
                  key={skill.name}
                  skill={skill.name}
                  description={skill.description}
                  index={index}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default SkillAssessment;
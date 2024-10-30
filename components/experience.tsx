"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Briefcase, Folder, Award, GraduationCap, ChevronDown, ChevronUp } from "lucide-react"
import { ExperienceProp, SectionCardProp } from "@/types"

// Mock data (replace with actual data from scanned resume)


const SectionCard:React.FC<SectionCardProp> = ({ title, icon, children }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Card className="w-full mb-6">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            {icon}
            <span className="ml-2">{title}</span>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </CardTitle>
      </CardHeader>
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial="collapsed"
            animate="expanded"
            exit="collapsed"
            variants={{
              expanded: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 }
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <CardContent>{children}</CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}

const ResumeSection:React.FC<ExperienceProp> = ({achievements}) => {
  return (
    <div className="w-full max-w-3xl mx-auto mb-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Achievements</h1>

      <SectionCard title="Work Experience" icon={<Briefcase className="h-5 w-5" />}>
        {achievements.workExperience.map((job, index) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="mb-4 last:mb-0"
          >
            <h3 className="text-lg font-semibold">{job.title}</h3>
            <p className="text-sm text-gray-600">{job.company} | {job.duration}</p>
            <p className="mt-2">{job.description}</p>
          </motion.div>
        ))}
      </SectionCard>

      <SectionCard title="Projects" icon={<Folder className="h-5 w-5" />}>
        {achievements.projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="mb-4 last:mb-0"
          >
            <h3 className="text-lg font-semibold">{project.title}</h3>
            <p className="mt-2">{project.description}</p>
          </motion.div>
        ))}
      </SectionCard>

      <SectionCard title="Certifications" icon={<Award className="h-5 w-5" />}>
        {achievements.certifications.map((cert, index) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="mb-4 last:mb-0"
          >
            <h3 className="text-lg font-semibold">{cert.title}</h3>
            <p className="text-sm text-gray-600">{cert.issuer} | {cert.date}</p>
            <p className="mt-2">{cert.description}</p>
          </motion.div>
        ))}
      </SectionCard>

      <SectionCard title="Education" icon={<GraduationCap className="h-5 w-5" />}>
        {achievements.education.map((edu, index) => (
          <motion.div
            key={edu.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="mb-4 last:mb-0"
          >
            <h3 className="text-lg font-semibold">{edu.degree}</h3>
            <p className="text-sm text-gray-600">{edu.institution} | {edu.year}</p>
            <p className="mt-2">{edu.description}</p>
          </motion.div>
        ))}
      </SectionCard>
    </div>
  )
}

export default ResumeSection;
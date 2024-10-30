"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {PieChart, Briefcase, Award, Target, Lightbulb, Map } from "lucide-react"
import CareersPath from "./career"
import ResumeBenchmarks from "./ats-best-practices"
import ATSResumeScanner from "./ats-score"
import ResumeSection from "./experience"
import SkillAssessment from "./skills-overview"
import ResumeScore from "./score"
import { ActiveTab, MenuItem, MenuItemProp, ResumeDataProp, ViewComponents } from "@/types"

const menuItems:MenuItem[] = [
  { id: "score", icon: PieChart, label: "Resume Score" },
  { id: "skills", icon: Briefcase, label: "Skill Assessment" },
  { id: "achievements", icon: Award, label: "Achievements" },
  { id: "ats-score", icon: Target, label: "ATS Score" },
  { id: "ats-tips", icon: Lightbulb, label: "ATS Tips" },
  { id: "career-map", icon: Map, label: "Career Path" },
]


const NavigationMenu:React.FC<ResumeDataProp> = ({resumeData}) => {
    const viewComponents: ViewComponents = {
        score: <ResumeScore resumeOverview={resumeData.resumeOverview} />,
        skills: <SkillAssessment skillOverview={resumeData.skillOverview} />,
        achievements: <ResumeSection achievements={resumeData.achievements} />,
        "ats-score": <ATSResumeScanner atsStats={resumeData.atsOverview} />,
        "ats-tips": <ResumeBenchmarks />,
        "career-map": <CareersPath careerPaths={resumeData.careerPaths} />,
      }

  const [activeTab, setActiveTab] = useState<ActiveTab>("score")
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (scrollContainer) {
      const activeButton = scrollContainer.querySelector(`[data-active="true"]`)
      if (activeButton) {
        activeButton.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" })
      }
    }

  }, [activeTab])

  const MenuButton:React.FC<MenuItemProp> = ({ item }) => (
    <motion.button
      key={item.id}
      data-active={activeTab === item.id}
      className={`flex items-center space-x-2 w-full px-3 py-2 rounded-lg transition-colors duration-200 ${
        activeTab === item.id
          ? "bg-blue-600 text-white"
          : " hover:bg-gray-200"
      } `}
      onClick={() => setActiveTab(item.id)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <item.icon className="w-5 h-5" />
      <span className="hidden sm:inline">{item.label}</span>
    </motion.button>
  )

  return (
    <div className="h-[95vh] w-[99vw]">
      <div className="rounded-xl shadow-lg overflow-hidden w-full h-full">
        <div className="flex flex-col md:flex-row gap-2 h-full">
          {/* Mobile menu */}
          <div ref={scrollContainerRef} className="w-full md:hidden p-4 overflow-x-auto whitespace-nowrap">
            <nav className="flex space-x-2">
              {menuItems.map((item) => (
                <MenuButton key={item.id} item={item} />
              ))}
            </nav>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:block p-6 h-screen w-[25vw]">
            <h1 className="text-xl font-bol mb-6">Resume Scanner</h1>
            <nav className="space-y-2">
              {menuItems.map((item) => (
                <MenuButton key={item.id} item={item} />
              ))}
            </nav>
          </div>

          {/* Content area */}
          <div className="w-full h-full overflow-y-auto scroll-smooth py-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {viewComponents[activeTab]}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavigationMenu;
"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CheckCircle, AlertTriangle, Info } from "lucide-react"
import { resumeTips } from "@/variables/constant"
import CheckMark from "./check-mark"
import { Tip, TipItemProps } from "@/types"



const TipItem: React.FC<TipItemProps>  = ({ tip, index }) => {
    const [isHovered, setIsHovered] = useState(false)
  
    return (
      <motion.li
        className="flex items-start space-x-2 mb-2"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {tip.important ? (
          <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-1" />
        ) : (
          <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1" />
        )}
        <span>{tip.text}</span>
        {tip.important && (
          <motion.span
            className="text-yellow-500 text-sm"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
            transition={{ duration: 0.2 }}
          >
            (Important!)
          </motion.span>
        )}
      </motion.li>
    )
  }
  
  export default function ResumeBenchmarks() {
    const [activeCategory, setActiveCategory] = useState("")
  
    return (
      <div className="container w-full max-w-3xl mx-auto mb-8">
        <Card className="w-full max-w-3xl mx-auto">
          <CardHeader>
              <CheckMark />
            
          </CardHeader>
          <CardContent>
         
          
            <Accordion type="single" collapsible className="w-full">
              {resumeTips.map((category, index) => (
                <AccordionItem value={category.category} key={category.category}>
                  <AccordionTrigger
                    onClick={() => setActiveCategory(category.category)}
                    className="text-lg font-semibold"
                  >
                    <motion.div
                      className="flex items-center space-x-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>{category.category}</span>
                    </motion.div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <AnimatePresence>
                      {activeCategory === category.category && (
                        <motion.ul
                          className="mt-2 space-y-2"
                          initial="collapsed"
                          animate="open"
                          exit="collapsed"
                          variants={{
                            open: { opacity: 1, height: "auto" },
                            collapsed: { opacity: 0, height: 0 }
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          {category.tips.map((tip:Tip, tipIndex:number) => (
                            <TipItem key={tipIndex} tip={tip} index={tipIndex} />
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
           
          </CardContent>
        </Card>
      </div>
    )
  }
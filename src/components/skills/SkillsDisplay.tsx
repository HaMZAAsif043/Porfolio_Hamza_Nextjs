import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, Code, Database, Brain, Box } from "lucide-react";

import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Skill {
  name: string;
  level: number;
  description: string;
  years: number;
}

interface SkillsDisplayProps {
  activeCategory?: string;
  skills?: Record<string, Skill[]>;
}

const defaultSkills: Record<string, Skill[]> = {
  frontend: [
    {
      name: "React",
      level: 75,
      description:
        "Component-based architecture, hooks, basic state management",
      years: 0.8, // ~8 months
    },
    {
      name: "Next.js",
      level: 65,
      description: "Basic SSR, API routes, and static site generation",
      years: 0.8, // ~8 months
    },
    {
      name: "TypeScript",
      level: 55,
      description: "Basic types, interfaces, and props handling",
      years: 0.2, // ~2 months
    },
    {
      name: "Tailwind CSS",
      level: 85,
      description:
        "Utility-first CSS, responsive design, and styling components",
      years: 0.8, // ~8 months
    },
    {
      name: "Redux",
      level: 60,
      description:
        "Worked on 2 projects, basic understanding of reducers and actions",
      years: 0.6, // ~6 months
    },
  ],
  backend: [
    {
      name: "Node.js",
      level: 70,
      description: "Express.js, basic RESTful API development",
      years: 0.8, // ~8 months
    },
    {
      name: "Django",
      level: 70,
      description: "auth, basic RESTful API development",
      years: 0.8, // ~8 months
    },
  ],
  ai: [
    {
      name: "Python",
      level: 70,
      description: "Data preprocessing, automation, scripting",
      years: 0.6, // ~6 months
    },
    {
      name: "Data Preprocessing",
      level: 75,
      description: "Feature engineering, data cleaning, and transformation",
      years: 0.6, // ~6 months
    },
  ],
  "3d": [
    {
      name: "Three.js",
      level: 65,
      description: "Basic 3D scene composition and rendering",
      years: 0.7,
    },
    {
      name: "React Three Fiber",
      level: 60,
      description: "React integration with Three.js",
      years: 0.6,
    },
    {
      name: "WebGL",
      level: 55,
      description: "Fundamental shader programming concepts",
      years: 0.5,
    },
  ],
};

const categoryIcons = {
  frontend: <Code className="h-5 w-5" />,
  backend: <Database className="h-5 w-5" />,
  ai: <Brain className="h-5 w-5" />,
  "3d": <Box className="h-5 w-5" />,
};

const getLevelLabel = (level: number): string => {
  if (level >= 90) return "Expert";
  if (level >= 75) return "Advanced";
  if (level >= 55) return "Intermediate";
  return "Beginner";
};

const SkillsDisplay = ({
  activeCategory = "frontend",
  skills = defaultSkills,
}: SkillsDisplayProps) => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const activeSkills = skills[activeCategory] || [];

  return (
    <div className="w-full bg-background p-6 rounded-lg">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {activeSkills.map((skill) => (
          <motion.div
            key={skill.name}
            variants={itemVariants}
            onMouseEnter={() => setHoveredSkill(skill.name)}
            onMouseLeave={() => setHoveredSkill(null)}
            className="relative"
          >
            <Card
              className={`h-full transition-all duration-300 ${hoveredSkill === skill.name ? "shadow-lg border-primary/50" : "shadow-sm"}`}
            >
              <CardContent className="p-5">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-md bg-primary/10 text-primary">
                      {
                        categoryIcons[
                          activeCategory as keyof typeof categoryIcons
                        ]
                      }
                    </div>
                    <h3 className="text-lg font-medium">{skill.name}</h3>
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Badge
                          variant="outline"
                          className="flex items-center gap-1"
                        >
                          <span>{getLevelLabel(skill.level)}</span>
                          {skill.level >= 80 && <Check className="h-3 w-3" />}
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          {skill.years} {skill.years === 1 ? "year" : "years"}{" "}
                          of experience
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                <div className="mb-3">
                  <Progress value={skill.level} className="h-2" />
                </div>

                <p className="text-sm text-muted-foreground">
                  {skill.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default SkillsDisplay;

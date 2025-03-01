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
      description: "Component architecture, hooks, context API",
      years: 0.7,
    },
    {
      name: "Next.js",
      level: 70,
      description: "Server-side rendering, API routes, static site generation",
      years: 0.7,
    },
    {
      name: "TypeScript",
      level: 65,
      description: "Type systems, interfaces, generics",
      years: 0.5,
    },
    {
      name: "Tailwind CSS",
      level: 80,
      description: "Utility-first CSS, responsive design, custom themes",
      years: 0.7,
    },
    {
      name: "HTML/CSS",
      level: 85,
      description: "Semantic markup, responsive layouts, animations",
      years: 1,
    },
    {
      name: "JavaScript",
      level: 80,
      description: "ES6+, DOM manipulation, async programming",
      years: 1,
    },
  ],
  backend: [
    {
      name: "Node.js",
      level: 60,
      description: "Express, RESTful APIs, basic middleware",
      years: 0.5,
    },
    {
      name: "Python",
      level: 75,
      description: "Data processing, automation, scripting",
      years: 1,
    },
    {
      name: "MongoDB",
      level: 60,
      description: "Document databases, CRUD operations",
      years: 0.5,
    },
    {
      name: "Firebase",
      level: 65,
      description: "Authentication, Firestore, real-time database",
      years: 0.5,
    },
    {
      name: "RESTful APIs",
      level: 70,
      description: "API design, integration, consumption",
      years: 0.7,
    },
    {
      name: "Git/GitHub",
      level: 75,
      description: "Version control, collaboration, CI/CD",
      years: 1,
    },
  ],
  ai: [
    {
      name: "Python",
      level: 80,
      description: "Data processing, automation, scripting",
      years: 1,
    },
    {
      name: "TensorFlow",
      level: 65,
      description: "Neural networks, basic model training",
      years: 0.5,
    },
    {
      name: "NLP",
      level: 60,
      description: "Text processing, chatbot development",
      years: 0.5,
    },
    {
      name: "Computer Vision",
      level: 60,
      description: "Image recognition, basic object detection",
      years: 0.5,
    },
    {
      name: "Machine Learning",
      level: 70,
      description: "Classification, regression, clustering",
      years: 0.7,
    },
    {
      name: "Data Science",
      level: 65,
      description: "Data analysis, visualization, pandas",
      years: 0.7,
    },
  ],
  "3d": [
    {
      name: "Three.js",
      level: 80,
      description: "3D scene composition, lighting, materials",
      years: 1,
    },
    {
      name: "React Three Fiber",
      level: 75,
      description: "React integration with Three.js",
      years: 0.7,
    },
    {
      name: "WebGL",
      level: 65,
      description: "Basic shader programming, rendering",
      years: 0.7,
    },
    {
      name: "3D Model Configuration",
      level: 85,
      description: "Interactive 3D product customization",
      years: 0.8,
    },
    {
      name: "Animation",
      level: 70,
      description: "Keyframe animation, model animation",
      years: 0.7,
    },
    {
      name: "3D Asset Management",
      level: 75,
      description: "Model optimization, texture management",
      years: 0.8,
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
  if (level >= 60) return "Intermediate";
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

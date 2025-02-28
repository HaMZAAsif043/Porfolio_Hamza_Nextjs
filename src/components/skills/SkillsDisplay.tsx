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
      level: 95,
      description: "Advanced component architecture, hooks, context API",
      years: 5,
    },
    {
      name: "Next.js",
      level: 90,
      description: "Server-side rendering, API routes, static site generation",
      years: 4,
    },
    {
      name: "TypeScript",
      level: 85,
      description: "Type systems, interfaces, generics, utility types",
      years: 4,
    },
    {
      name: "Tailwind CSS",
      level: 90,
      description: "Utility-first CSS, responsive design, custom themes",
      years: 3,
    },
    {
      name: "Redux",
      level: 80,
      description: "State management, middleware, selectors",
      years: 4,
    },
    {
      name: "Three.js",
      level: 75,
      description: "WebGL rendering, scene management, animations",
      years: 2,
    },
  ],
  backend: [
    {
      name: "Node.js",
      level: 85,
      description: "Express, RESTful APIs, middleware",
      years: 4,
    },
    {
      name: "Django",
      level: 80,
      description: "ORM, authentication, admin interface",
      years: 3,
    },
    {
      name: "PostgreSQL",
      level: 75,
      description: "Query optimization, indexing, transactions",
      years: 3,
    },
    {
      name: "GraphQL",
      level: 70,
      description: "Schema design, resolvers, Apollo Server",
      years: 2,
    },
    {
      name: "Docker",
      level: 65,
      description: "Containerization, Docker Compose, deployment",
      years: 2,
    },
    {
      name: "AWS",
      level: 60,
      description: "S3, EC2, Lambda, CloudFront",
      years: 2,
    },
  ],
  ai: [
    {
      name: "Python",
      level: 85,
      description: "Data processing, automation, scripting",
      years: 5,
    },
    {
      name: "TensorFlow",
      level: 70,
      description: "Neural networks, model training, inference",
      years: 2,
    },
    {
      name: "NLP",
      level: 65,
      description: "Text processing, sentiment analysis, chatbots",
      years: 2,
    },
    {
      name: "Computer Vision",
      level: 60,
      description: "Image recognition, object detection",
      years: 1,
    },
    {
      name: "LangChain",
      level: 75,
      description: "AI agent development, prompt engineering",
      years: 1,
    },
    {
      name: "Hugging Face",
      level: 65,
      description: "Transformer models, fine-tuning",
      years: 1,
    },
  ],
  "3d": [
    {
      name: "WebGL",
      level: 80,
      description: "Shader programming, performance optimization",
      years: 3,
    },
    {
      name: "Three.js",
      level: 85,
      description: "3D scene composition, lighting, materials",
      years: 3,
    },
    {
      name: "React Three Fiber",
      level: 80,
      description: "React integration with Three.js",
      years: 2,
    },
    {
      name: "Blender",
      level: 60,
      description: "3D modeling, texturing, animation",
      years: 2,
    },
    {
      name: "GLSL",
      level: 70,
      description: "Shader programming, visual effects",
      years: 2,
    },
    {
      name: "Animation",
      level: 75,
      description: "Keyframe animation, procedural animation",
      years: 2,
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

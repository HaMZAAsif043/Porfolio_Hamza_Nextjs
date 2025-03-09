import React, { useState } from "react";
import { motion } from "framer-motion";
import { Code, Server, Brain, Box } from "lucide-react";

import SkillsCategories from "../skills/SkillsCategories";
import SkillsDisplay from "../skills/SkillsDisplay";
import { Separator } from "@/components/ui/separator";

interface SkillsSectionProps {
  id?: string;
}

const SkillsSection = ({ id = "skills" }: SkillsSectionProps) => {
  const [activeCategory, setActiveCategory] = useState("frontend");

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  return (
    <section id={id} className="w-full py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Technical Skills
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Specialized in frontend development, 3D rendering, AI integration,
            and backend systems. Here's a breakdown of my technical expertise
            and experience.
          </p>
        </motion.div>

        <div className="space-y-8">
          <SkillsCategories
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
            categories={[
              {
                id: "frontend",
                name: "Frontend",
                icon: <Code className="h-5 w-5" />,
                count: 5,
              },
              {
                id: "backend",
                name: "Backend",
                icon: <Server className="h-5 w-5" />,
                count: 2,
              },
              {
                id: "ai",
                name: "AI/ML",
                icon: <Brain className="h-5 w-5" />,
                count: 2,
              },
              {
                id: "3d",
                name: "3D Rendering",
                icon: <Box className="h-5 w-5" />,
                count: 3,
              },
            ]}
          />

          <Separator className="my-8" />

          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <SkillsDisplay activeCategory={activeCategory} />
          </motion.div>

          <div className="mt-16 text-center">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-muted-foreground italic"
            >
              Always learning and expanding my skillset with new technologies
              and frameworks.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Code, Server, Brain, Box, ChevronRight } from "lucide-react";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface SkillsCategoriesProps {
  activeCategory?: string;
  onCategoryChange?: (category: string) => void;
  categories?: {
    id: string;
    name: string;
    icon: React.ReactNode;
    count?: number;
  }[];
}

const SkillsCategories = ({
  activeCategory = "frontend",
  onCategoryChange = () => {},
  categories = [
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
    { id: "ai", name: "AI/ML", icon: <Brain className="h-5 w-5" />, count: 2 },
    {
      id: "3d",
      name: "3D Rendering",
      icon: <Box className="h-5 w-5" />,
      count: 3,
    },
  ],
}: SkillsCategoriesProps) => {
  const [selectedCategory, setSelectedCategory] = useState(activeCategory);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    onCategoryChange(category);
  };

  return (
    <div className="w-full bg-background py-4">
      <div className="container mx-auto">
        {/* Desktop view - Tabs */}
        <div className="hidden md:block">
          <Tabs
            defaultValue={selectedCategory}
            value={selectedCategory}
            onValueChange={handleCategoryChange}
            className="w-full"
          >
            <TabsList className="w-full grid grid-cols-4 h-16">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="flex items-center justify-center gap-2 h-full data-[state=active]:bg-primary/10"
                >
                  <motion.div
                    initial={{ scale: 1 }}
                    animate={{
                      scale: selectedCategory === category.id ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-2"
                  >
                    {category.icon}
                    <span className="font-medium">{category.name}</span>
                    {category.count && (
                      <Badge variant="secondary" className="ml-1">
                        {category.count}
                      </Badge>
                    )}
                  </motion.div>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Mobile view - Buttons */}
        <div className="md:hidden space-y-2">
          <h3 className="text-lg font-medium mb-3">Skill Categories</h3>
          <div className="flex flex-col space-y-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={
                  selectedCategory === category.id ? "default" : "outline"
                }
                className="w-full justify-between"
                onClick={() => handleCategoryChange(category.id)}
              >
                <div className="flex items-center gap-2">
                  {category.icon}
                  <span>{category.name}</span>
                  {category.count && (
                    <Badge variant="secondary" className="ml-1">
                      {category.count}
                    </Badge>
                  )}
                </div>
                {selectedCategory === category.id && (
                  <ChevronRight className="h-4 w-4" />
                )}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsCategories;

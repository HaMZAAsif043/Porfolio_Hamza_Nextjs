import React, { useState } from "react";
import { Search, Filter, X } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ProjectFilterProps {
  onFilterChange?: (filters: {
    search: string;
    technologies: string[];
    categories: string[];
  }) => void;
  availableTechnologies?: string[];
  availableCategories?: string[];
}

const ProjectFilter = ({
  onFilterChange = () => {},
  availableTechnologies = [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Three.js",
    "WebGL",
    "Redux",
    "Tailwind CSS",
    "Node.js",
    "Express",
    "MongoDB",
    "Shopify API",
    "REST API",
    "GraphQL",
  ],
  availableCategories = [
    "Web Development",
    "Frontend",
    "Backend",
    "3D Rendering",
    "E-commerce",
    "Portfolio",
    "AI Integration",
    "Full Stack",
  ],
}: ProjectFilterProps) => {
  const [search, setSearch] = useState("");
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>(
    [],
  );
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    onFilterChange({
      search: e.target.value,
      technologies: selectedTechnologies,
      categories: selectedCategories,
    });
  };

  const handleTechnologyToggle = (tech: string) => {
    const newSelection = selectedTechnologies.includes(tech)
      ? selectedTechnologies.filter((t) => t !== tech)
      : [...selectedTechnologies, tech];

    setSelectedTechnologies(newSelection);
    onFilterChange({
      search,
      technologies: newSelection,
      categories: selectedCategories,
    });
  };

  const handleCategoryToggle = (category: string) => {
    const newSelection = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];

    setSelectedCategories(newSelection);
    onFilterChange({
      search,
      technologies: selectedTechnologies,
      categories: newSelection,
    });
  };

  const clearFilters = () => {
    setSearch("");
    setSelectedTechnologies([]);
    setSelectedCategories([]);
    onFilterChange({
      search: "",
      technologies: [],
      categories: [],
    });
  };

  const hasActiveFilters =
    search || selectedTechnologies.length > 0 || selectedCategories.length > 0;

  return (
    <div className="w-full bg-background p-4 rounded-lg shadow-sm border border-border">
      <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:space-x-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={handleSearchChange}
            className="pl-10 w-full"
          />
        </div>

        <div className="flex space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                Technologies
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 max-h-[300px] overflow-y-auto">
              {availableTechnologies.map((tech) => (
                <DropdownMenuCheckboxItem
                  key={tech}
                  checked={selectedTechnologies.includes(tech)}
                  onCheckedChange={() => handleTechnologyToggle(tech)}
                >
                  {tech}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                Categories
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              {availableCategories.map((category) => (
                <DropdownMenuCheckboxItem
                  key={category}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={() => handleCategoryToggle(category)}
                >
                  {category}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="icon"
              onClick={clearFilters}
              className="text-muted-foreground hover:text-foreground"
              title="Clear all filters"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Active filters display */}
      {hasActiveFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-3 flex flex-wrap gap-2"
        >
          {selectedTechnologies.map((tech) => (
            <Badge
              key={tech}
              variant="secondary"
              className="flex items-center gap-1 px-2 py-1"
            >
              {tech}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => handleTechnologyToggle(tech)}
              />
            </Badge>
          ))}
          {selectedCategories.map((category) => (
            <Badge
              key={category}
              variant="outline"
              className="flex items-center gap-1 px-2 py-1"
            >
              {category}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => handleCategoryToggle(category)}
              />
            </Badge>
          ))}
          {search && (
            <Badge
              variant="default"
              className="flex items-center gap-1 px-2 py-1"
            >
              Search: {search}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => {
                  setSearch("");
                  onFilterChange({
                    search: "",
                    technologies: selectedTechnologies,
                    categories: selectedCategories,
                  });
                }}
              />
            </Badge>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default ProjectFilter;

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Filter, Search } from "lucide-react";

import ProjectCard from "./ProjectCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  category: string;
}

interface ProjectGridProps {
  projects?: Project[];
  onProjectClick?: (project: Project) => void;
  selectedCategory?: string;
  searchQuery?: string;
}

const ProjectGrid = ({
  projects = [
    {
      id: "1",
      title: "Promptopia",
      description:
        "Full-stack Next.js application for sharing AI prompts with the community. Features user authentication, CRUD operations, and search functionality.",
      imageUrl: "https://i.ibb.co/Qj1bLWM/promptopia-screenshot.png",
      technologies: ["Next.js", "MongoDB", "NextAuth", "Tailwind CSS"],
      liveUrl:
        "https://promtopia-main-l8hyo03va-hamzaasif043s-projects.vercel.app/",
      githubUrl: "https://github.com/HaMZAAsif043/promtopia-main",
      category: "Web Development",
    },
    {
      id: "2",
      title: "Jarvis AI Assistant",
      description:
        "Python-based AI agent for personal tasks, featuring voice recognition, natural language processing, and task automation capabilities.",
      imageUrl:
        "https://images.unsplash.com/photo-1589254065878-42c9da997008?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      technologies: ["Python", "Speech Recognition", "NLP", "APIs"],
      liveUrl: "#",
      githubUrl:
        "https://github.com/HaMZAAsif043/jarvis_AI_Assistance_usingPython",
      category: "AI/ML",
    },
    {
      id: "3",
      title: "Recipe Finder",
      description:
        "React application for finding recipes using external API integration. Features search functionality, recipe details, and favorites saving.",
      imageUrl:
        "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      technologies: ["React", "REST API", "CSS", "JavaScript"],
      liveUrl: "https://hamzaasif043.github.io/Recipe_Finder/",
      githubUrl: "https://github.com/HaMZAAsif043/Recipe_Finder",
      category: "Web Development",
    },
    {
      id: "4",
      title: "Contact List App",
      description:
        "Full-stack CRUD application for managing contacts, built with React frontend and Python backend. Features contact creation, editing, and deletion.",
      imageUrl:
        "https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      technologies: ["React", "Python", "REST API", "CRUD"],
      liveUrl: "#",
      githubUrl: "https://github.com/HaMZAAsif043/Contact-List-CRUD-APP-",
      category: "Web Development",
    },
    {
      id: "5",
      title: "3D Car Configurator",
      description:
        "Interactive Toyota Corolla 3D configurator with color customization, animated doors and hood, and 360° viewing angle.",
      imageUrl:
        "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      technologies: ["React", "Canvas API", "JavaScript", "Tailwind CSS"],
      liveUrl: "https://car-configurator-demo.vercel.app",
      githubUrl: "https://github.com/HaMZAAsif043/car-configurator",
      category: "3D Development",
    },
    {
      id: "6",
      title: "AI Chatbot Integration",
      description:
        "Intelligent conversational interface with natural language processing capabilities for customer support and information retrieval.",
      imageUrl:
        "https://images.unsplash.com/photo-1677442135968-6db3b0025e95?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      technologies: ["Python", "TensorFlow", "React", "NLP"],
      liveUrl: "https://ai-chatbot-demo.vercel.app",
      githubUrl: "https://github.com/HaMZAAsif043/ai-chatbot",
      category: "AI/ML",
    },
  ],
  onProjectClick = () => {},
  selectedCategory = "",
  searchQuery = "",
}: ProjectGridProps) => {
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  // Filter projects based on category and search query
  const filteredProjects = projects.filter((project) => {
    const matchesCategory = selectedCategory
      ? project.category === selectedCategory
      : true;
    const matchesSearch = localSearchQuery
      ? project.title.toLowerCase().includes(localSearchQuery.toLowerCase()) ||
        project.description
          .toLowerCase()
          .includes(localSearchQuery.toLowerCase()) ||
        project.technologies.some((tech) =>
          tech.toLowerCase().includes(localSearchQuery.toLowerCase()),
        )
      : true;

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full bg-background">
      <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Search projects..."
            className="pl-10 w-full"
            value={localSearchQuery}
            onChange={(e) => setLocalSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            Showing {filteredProjects.length} of {projects.length} projects
          </span>
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      {filteredProjects.length > 0 ? (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectCard
                title={project.title}
                description={project.description}
                imageUrl={project.imageUrl}
                technologies={project.technologies}
                liveUrl={project.liveUrl}
                githubUrl={project.githubUrl}
                onClick={() => onProjectClick(project)}
              />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="rounded-full bg-muted p-6 mb-4">
            <Search className="h-10 w-10 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No projects found</h3>
          <p className="text-muted-foreground max-w-md">
            We couldn't find any projects matching your search criteria. Try
            adjusting your filters or search query.
          </p>
        </div>
      )}
    </div>
  );
};

export default ProjectGrid;

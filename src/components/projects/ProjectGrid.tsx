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
      title: "E-Commerce Platform",
      description:
        "A modern e-commerce platform built with React, Redux, and Shopify Storefront API. Features include product filtering, cart management, and checkout.",
      imageUrl:
        "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      technologies: ["React", "Redux", "Shopify API", "Tailwind CSS"],
      liveUrl: "https://example.com/ecommerce",
      githubUrl: "https://github.com/example/ecommerce",
      category: "Web Development",
    },
    {
      id: "2",
      title: "3D Product Configurator",
      description:
        "Interactive 3D product configurator using Three.js and React Three Fiber. Allows users to customize products in real-time with different colors and materials.",
      imageUrl:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      technologies: ["Three.js", "React Three Fiber", "WebGL", "React"],
      liveUrl: "https://example.com/configurator",
      githubUrl: "https://github.com/example/configurator",
      category: "3D Development",
    },
    {
      id: "3",
      title: "AI Content Generator",
      description:
        "A content generation tool powered by AI that creates blog posts, social media content, and marketing copy based on user prompts.",
      imageUrl:
        "https://images.unsplash.com/photo-1677442135968-6db3b0025e95?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      technologies: ["Python", "TensorFlow", "React", "FastAPI"],
      liveUrl: "https://example.com/ai-generator",
      githubUrl: "https://github.com/example/ai-generator",
      category: "AI/ML",
    },
    {
      id: "4",
      title: "Portfolio CMS",
      description:
        "A headless CMS specifically designed for developer portfolios, with custom fields for projects, skills, and experience.",
      imageUrl:
        "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      technologies: ["Next.js", "Supabase", "Tailwind CSS", "TypeScript"],
      liveUrl: "https://example.com/portfolio-cms",
      githubUrl: "https://github.com/example/portfolio-cms",
      category: "Web Development",
    },
    {
      id: "5",
      title: "Virtual Reality Gallery",
      description:
        "A VR art gallery experience built with A-Frame and WebXR, allowing users to explore 3D artwork in virtual reality.",
      imageUrl:
        "https://images.unsplash.com/photo-1626379953822-baec19c3accd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      technologies: ["A-Frame", "WebXR", "Three.js", "JavaScript"],
      liveUrl: "https://example.com/vr-gallery",
      githubUrl: "https://github.com/example/vr-gallery",
      category: "3D Development",
    },
    {
      id: "6",
      title: "Real-time Dashboard",
      description:
        "A real-time analytics dashboard for monitoring system performance, user activity, and business metrics.",
      imageUrl:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      technologies: ["React", "Socket.io", "D3.js", "Node.js"],
      liveUrl: "https://example.com/dashboard",
      githubUrl: "https://github.com/example/dashboard",
      category: "Web Development",
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

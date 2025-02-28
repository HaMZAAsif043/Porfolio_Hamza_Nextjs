import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

import ProjectFilter from "../projects/ProjectFilter";
import ProjectGrid from "../projects/ProjectGrid";
import ProjectModal from "../projects/ProjectModal";

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  imageUrl: string;
  screenshots?: string[];
  technologies: string[];
  features?: string[];
  liveUrl: string;
  githubUrl: string;
  category: string;
}

interface ProjectsSectionProps {
  title?: string;
  subtitle?: string;
  projects?: Project[];
}

const defaultProjects: Project[] = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description:
      "A modern e-commerce platform built with React, Redux, and Shopify Storefront API. Features include product filtering, cart management, and checkout.",
    longDescription:
      "This comprehensive e-commerce solution leverages React for the frontend, Redux for state management, and integrates with the Shopify Storefront API for product data and checkout functionality. The application features responsive design, advanced filtering options, cart management, user authentication, and a streamlined checkout process.",
    imageUrl:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1572584642822-6f8de0243c93?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1612422656768-d5e4ec31fac0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    ],
    technologies: [
      "React",
      "Redux",
      "Shopify API",
      "Tailwind CSS",
      "Node.js",
      "Express",
    ],
    features: [
      "Responsive product catalog with filtering and search",
      "User authentication and profile management",
      "Shopping cart with persistent storage",
      "Integration with Shopify Storefront API",
      "Secure checkout process",
      "Order history and tracking",
    ],
    liveUrl: "https://example.com/ecommerce",
    githubUrl: "https://github.com/example/ecommerce",
    category: "Web Development",
  },
  {
    id: "2",
    title: "3D Product Configurator",
    description:
      "Interactive 3D product configurator using Three.js and React Three Fiber. Allows users to customize products in real-time with different colors and materials.",
    longDescription:
      "This advanced 3D product configurator leverages Three.js and React Three Fiber to create an immersive customization experience. Users can modify product colors, materials, and components in real-time with instant visual feedback. The application includes optimized 3D model loading, custom shader materials, and a user-friendly interface.",
    imageUrl:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1633356122412-55c39fc6b6c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    ],
    technologies: [
      "Three.js",
      "React Three Fiber",
      "WebGL",
      "React",
      "JavaScript",
    ],
    features: [
      "Real-time 3D model customization",
      "Multiple material and color options",
      "Optimized 3D model loading",
      "Custom shader materials",
      "Camera controls for viewing from different angles",
      "Screenshot and sharing capabilities",
    ],
    liveUrl: "https://example.com/configurator",
    githubUrl: "https://github.com/example/configurator",
    category: "3D Development",
  },
  {
    id: "3",
    title: "AI Content Generator",
    description:
      "A content generation tool powered by AI that creates blog posts, social media content, and marketing copy based on user prompts.",
    longDescription:
      "This AI-powered content generation platform uses advanced natural language processing models to create high-quality written content from simple user prompts. The system can generate blog posts, social media updates, marketing copy, and more, with controls for tone, style, and length. Built with a Python backend and React frontend.",
    imageUrl:
      "https://images.unsplash.com/photo-1677442135968-6db3b0025e95?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1677442135968-6db3b0025e95?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1673187648775-950fb7698b29?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1664575599736-c5197c684128?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    ],
    technologies: ["Python", "TensorFlow", "React", "FastAPI", "NLP"],
    features: [
      "AI-powered content generation",
      "Multiple content types (blog, social, marketing)",
      "Tone and style customization",
      "Content length controls",
      "Export to various formats",
      "Content history and favorites",
    ],
    liveUrl: "https://example.com/ai-generator",
    githubUrl: "https://github.com/example/ai-generator",
    category: "AI/ML",
  },
  {
    id: "4",
    title: "Portfolio CMS",
    description:
      "A headless CMS specifically designed for developer portfolios, with custom fields for projects, skills, and experience.",
    longDescription:
      "This specialized headless CMS is built specifically for developers to showcase their portfolios. It features custom content types for projects, skills, work experience, and education. The system uses Next.js for the frontend, Supabase for the backend, and includes a custom admin interface for content management.",
    imageUrl:
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1591522810850-58128c5fb089?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    ],
    technologies: [
      "Next.js",
      "Supabase",
      "Tailwind CSS",
      "TypeScript",
      "PostgreSQL",
    ],
    features: [
      "Custom content types for developer portfolios",
      "Admin dashboard for content management",
      "Markdown support for rich content",
      "Image optimization and management",
      "SEO optimization tools",
      "Theme customization options",
    ],
    liveUrl: "https://example.com/portfolio-cms",
    githubUrl: "https://github.com/example/portfolio-cms",
    category: "Web Development",
  },
  {
    id: "5",
    title: "Virtual Reality Gallery",
    description:
      "A VR art gallery experience built with A-Frame and WebXR, allowing users to explore 3D artwork in virtual reality.",
    longDescription:
      "This immersive virtual reality art gallery provides a platform for artists to showcase their work in a 3D environment. Built with A-Frame and WebXR, it offers a fully navigable virtual space with support for both VR headsets and desktop browsing. Features include interactive exhibits, spatial audio, and customizable gallery spaces.",
    imageUrl:
      "https://images.unsplash.com/photo-1626379953822-baec19c3accd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1626379953822-baec19c3accd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1638188498798-70b6e6ace8a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    ],
    technologies: [
      "A-Frame",
      "WebXR",
      "Three.js",
      "JavaScript",
      "Spatial Audio",
    ],
    features: [
      "Immersive VR art gallery experience",
      "Support for VR headsets and desktop browsing",
      "Interactive 3D artwork exhibits",
      "Spatial audio environment",
      "Customizable gallery spaces",
      "Artist information and artwork details",
    ],
    liveUrl: "https://example.com/vr-gallery",
    githubUrl: "https://github.com/example/vr-gallery",
    category: "3D Development",
  },
  {
    id: "6",
    title: "Real-time Dashboard",
    description:
      "A real-time analytics dashboard for monitoring system performance, user activity, and business metrics.",
    longDescription:
      "This comprehensive real-time dashboard provides instant visibility into system performance, user activity, and key business metrics. Built with React for the frontend and Socket.io for real-time updates, it features customizable widgets, interactive data visualizations using D3.js, and exportable reports.",
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1543286386-713bdd548da4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    ],
    technologies: [
      "React",
      "Socket.io",
      "D3.js",
      "Node.js",
      "Express",
      "MongoDB",
    ],
    features: [
      "Real-time data updates via WebSockets",
      "Interactive data visualizations",
      "Customizable dashboard widgets",
      "User activity monitoring",
      "System performance metrics",
      "Exportable reports and analytics",
    ],
    liveUrl: "https://example.com/dashboard",
    githubUrl: "https://github.com/example/dashboard",
    category: "Web Development",
  },
];

const ProjectsSection = ({
  title = "My Projects",
  subtitle = "Explore my recent work across web development, 3D rendering, and AI integration.",
  projects = defaultProjects,
}: ProjectsSectionProps) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [filters, setFilters] = useState({
    search: "",
    technologies: [] as string[],
    categories: [] as string[],
  });

  const categories = [
    { id: "", name: "All" },
    { id: "Web Development", name: "Web Dev" },
    { id: "3D Development", name: "3D Dev" },
    { id: "AI/ML", name: "AI/ML" },
  ];

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  const handleFilterChange = (newFilters: {
    search: string;
    technologies: string[];
    categories: string[];
  }) => {
    setFilters(newFilters);
  };

  // Get all unique technologies from projects for filter dropdown
  const allTechnologies = Array.from(
    new Set(projects.flatMap((project) => project.technologies)),
  ).sort();

  // Get all unique categories from projects for filter dropdown
  const allCategories = Array.from(
    new Set(projects.map((project) => project.category)),
  ).sort();

  // Filter projects based on active category and search filters
  const filteredProjects = projects.filter((project) => {
    // Filter by category tab
    const matchesCategory = activeCategory
      ? project.category === activeCategory
      : true;

    // Filter by search text
    const matchesSearch = filters.search
      ? project.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        project.description.toLowerCase().includes(filters.search.toLowerCase())
      : true;

    // Filter by selected technologies
    const matchesTechnologies =
      filters.technologies.length > 0
        ? filters.technologies.every((tech) =>
            project.technologies.includes(tech),
          )
        : true;

    // Filter by selected categories from dropdown (different from tabs)
    const matchesFilterCategories =
      filters.categories.length > 0
        ? filters.categories.includes(project.category)
        : true;

    return (
      matchesCategory &&
      matchesSearch &&
      matchesTechnologies &&
      matchesFilterCategories
    );
  });

  return (
    <section className="w-full py-16 bg-background" id="projects">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
          <div className="flex justify-center mt-8">
            <Button
              variant="outline"
              size="lg"
              className="flex items-center gap-2 group"
              onClick={() =>
                document
                  .getElementById("project-filters")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Browse Projects
              <ArrowDown className="h-4 w-4 group-hover:translate-y-1 transition-transform" />
            </Button>
          </div>
        </motion.div>

        <div id="project-filters" className="mb-8">
          <div className="flex flex-col space-y-6">
            {/* Category Tabs */}
            <Tabs
              defaultValue=""
              value={activeCategory}
              onValueChange={setActiveCategory}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-4">
                {categories.map((category) => (
                  <TabsTrigger key={category.id} value={category.id}>
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <Separator className="my-2" />

            {/* Advanced Filters */}
            <ProjectFilter
              onFilterChange={handleFilterChange}
              availableTechnologies={allTechnologies}
              availableCategories={allCategories}
            />
          </div>
        </div>

        {/* Projects Grid */}
        <ProjectGrid
          projects={filteredProjects}
          onProjectClick={handleProjectClick}
          selectedCategory={activeCategory}
          searchQuery={filters.search}
        />

        {/* Load More Button - shown if there are many projects */}
        {filteredProjects.length > 6 && (
          <div className="flex justify-center mt-12">
            <Button variant="outline" size="lg">
              Load More Projects
            </Button>
          </div>
        )}

        {/* Project Modal */}
        <ProjectModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          project={selectedProject || undefined}
        />
      </div>
    </section>
  );
};

export default ProjectsSection;

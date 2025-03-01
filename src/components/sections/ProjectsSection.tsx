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
    title: "Promptopia",
    description:
      "Full-stack Next.js application for sharing AI prompts with the community. Features user authentication, CRUD operations, and search functionality.",
    longDescription:
      "Promptopia is a full-stack Next.js application that allows users to share, discover, and use AI prompts. The platform features Google authentication, a responsive design, and comprehensive CRUD functionality for managing prompts. Users can search for prompts by content, tag, or username, and copy prompts with a single click.",
    imageUrl: "https://i.ibb.co/Qj1bLWM/promptopia-screenshot.png",
    screenshots: [
      "https://i.ibb.co/Qj1bLWM/promptopia-screenshot.png",
      "https://i.ibb.co/Qj1bLWM/promptopia-screenshot.png",
      "https://i.ibb.co/Qj1bLWM/promptopia-screenshot.png",
    ],
    technologies: ["Next.js", "MongoDB", "NextAuth", "Tailwind CSS"],
    features: [
      "User authentication with Google OAuth",
      "Create, read, update, and delete prompts",
      "Search functionality by content, tag, or username",
      "User profiles with personalized prompt collections",
      "One-click prompt copying",
      "Responsive design for all devices",
    ],
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
    longDescription:
      "Jarvis is a personal AI assistant built with Python that can perform various tasks through voice commands. It features speech recognition, natural language processing, and integration with multiple APIs for weather updates, web searches, and more. The assistant can open applications, play music, tell jokes, and provide information in response to user queries.",
    imageUrl:
      "https://images.unsplash.com/photo-1589254065878-42c9da997008?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1589254065878-42c9da997008?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1591808216268-ce0b82787efe?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    ],
    technologies: ["Python", "Speech Recognition", "NLP", "APIs"],
    features: [
      "Voice command recognition",
      "Natural language understanding",
      "Application control (open/close programs)",
      "Web search functionality",
      "Weather updates and forecasts",
      "Task automation for common activities",
    ],
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
    longDescription:
      "Recipe Finder is a React application that helps users discover new recipes based on ingredients, cuisine types, or dietary preferences. The app integrates with a recipe API to fetch detailed cooking instructions, ingredient lists, and nutritional information. Users can save their favorite recipes, create shopping lists, and share recipes with friends.",
    imageUrl:
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1495521821757-a1efb6729352?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    ],
    technologies: ["React", "REST API", "CSS", "JavaScript"],
    features: [
      "Recipe search by ingredients or keywords",
      "Detailed recipe instructions and ingredient lists",
      "Nutritional information display",
      "Save favorite recipes",
      "Filter by dietary restrictions",
      "Responsive design for mobile and desktop",
    ],
    liveUrl: "https://hamzaasif043.github.io/Recipe_Finder/",
    githubUrl: "https://github.com/HaMZAAsif043/Recipe_Finder",
    category: "Web Development",
  },
  {
    id: "4",
    title: "Contact List App",
    description:
      "Full-stack CRUD application for managing contacts, built with React frontend and Python backend. Features contact creation, editing, and deletion.",
    longDescription:
      "This Contact List application provides a complete contact management system with a React frontend and Python backend. Users can create, view, update, and delete contacts with details such as name, email, phone number, and address. The app includes search and filter functionality, contact categorization, and data persistence.",
    imageUrl:
      "https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1423666639041-f56000c27a9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1596524430615-b46475ddff6e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    ],
    technologies: ["React", "Python", "REST API", "CRUD"],
    features: [
      "Create, read, update, and delete contacts",
      "Search and filter functionality",
      "Contact categorization",
      "Form validation",
      "Responsive design",
      "Data persistence",
    ],
    liveUrl: "#",
    githubUrl: "https://github.com/HaMZAAsif043/Contact-List-CRUD-APP-",
    category: "Web Development",
  },
  {
    id: "5",
    title: "3D Car Configurator",
    description:
      "Interactive Toyota Corolla 3D configurator with color customization, animated doors and hood, and 360° viewing angle.",
    longDescription:
      "This interactive car configurator allows users to customize a Toyota Corolla model with different colors and view it from any angle. The application features real-time color changes, animated doors and hood that can be opened and closed with a click, and intuitive camera controls for a complete 360° viewing experience.",
    imageUrl:
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    ],
    technologies: [
      "React",
      "Canvas API",
      "JavaScript",
      "Tailwind CSS",
      "Framer Motion",
    ],
    features: [
      "Interactive 3D car visualization",
      "Real-time color customization",
      "Multiple color presets",
      "Animated doors and hood",
      "360° viewing angle",
      "Zoom and rotation controls",
    ],
    liveUrl: "https://car-configurator-demo.vercel.app",
    githubUrl: "https://github.com/HaMZAAsif043/car-configurator",
    category: "3D Development",
  },
  {
    id: "6",
    title: "AI Chatbot Integration",
    description:
      "Intelligent conversational interface with natural language processing capabilities for customer support and information retrieval.",
    longDescription:
      "This AI-powered chatbot uses advanced natural language processing to understand user queries and provide relevant responses. The system can handle customer support inquiries, provide product information, and assist with common tasks, all while maintaining context throughout the conversation.",
    imageUrl:
      "https://images.unsplash.com/photo-1677442135968-6db3b0025e95?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1677442135968-6db3b0025e95?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1673187648775-950fb7698b29?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1664575599736-c5197c684128?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    ],
    technologies: ["Python", "TensorFlow", "React", "NLP", "Flask"],
    features: [
      "Natural language understanding",
      "Context-aware conversations",
      "Multi-language support",
      "Integration with knowledge base",
      "Sentiment analysis",
      "Conversation history",
    ],
    liveUrl: "https://ai-chatbot-demo.vercel.app",
    githubUrl: "https://github.com/HaMZAAsif043/ai-chatbot",
    category: "AI/ML",
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

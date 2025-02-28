import React from "react";
import {
  X,
  ExternalLink,
  Github,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface ProjectModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  project?: {
    title: string;
    description: string;
    longDescription?: string;
    imageUrl: string;
    screenshots?: string[];
    technologies: string[];
    features?: string[];
    liveUrl: string;
    githubUrl: string;
  };
}

const ProjectModal = ({
  open = true,
  onOpenChange = () => {},
  project = {
    title: "E-Commerce Platform",
    description:
      "A modern e-commerce platform built with React, Redux, and Shopify Storefront API.",
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
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example/project",
  },
}: ProjectModalProps) => {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const screenshots = project.screenshots || [project.imageUrl];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % screenshots.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + screenshots.length) % screenshots.length,
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-background p-0">
        <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm">
          <DialogHeader className="p-6 pb-2">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-2xl font-bold">
                {project.title}
              </DialogTitle>
              <DialogClose asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <X className="h-4 w-4" />
                </Button>
              </DialogClose>
            </div>
            <DialogDescription className="text-muted-foreground mt-2">
              {project.description}
            </DialogDescription>
          </DialogHeader>
          <Separator />
        </div>

        <div className="p-6">
          {/* Image Gallery */}
          <div className="relative overflow-hidden rounded-lg mb-6 h-[400px]">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImageIndex}
                src={screenshots[currentImageIndex]}
                alt={`${project.title} screenshot ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            </AnimatePresence>

            {screenshots.length > 1 && (
              <>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 rounded-full bg-background/80 hover:bg-background"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full bg-background/80 hover:bg-background"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>

                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                  {screenshots.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full ${index === currentImageIndex ? "bg-primary" : "bg-muted"}`}
                      onClick={() => setCurrentImageIndex(index)}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Project Details */}
          <div className="space-y-6">
            {/* Long Description */}
            <div>
              <h3 className="text-lg font-semibold mb-2">About the Project</h3>
              <p className="text-muted-foreground">{project.longDescription}</p>
            </div>

            {/* Features */}
            {project.features && project.features.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Key Features</h3>
                <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                  {project.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Technologies */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <Badge key={index} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="p-6 pt-2 border-t">
          <div className="flex w-full justify-between items-center">
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
            <div className="flex space-x-2">
              <Button variant="outline" asChild>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <Github className="mr-2 h-4 w-4" /> View Code
                </a>
              </Button>
              <Button asChild>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                </a>
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectModal;

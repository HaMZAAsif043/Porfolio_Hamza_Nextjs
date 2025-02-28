import React from "react";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ProjectCardProps {
  title?: string;
  description?: string;
  imageUrl?: string;
  technologies?: string[];
  liveUrl?: string;
  githubUrl?: string;
  onClick?: () => void;
}

const ProjectCard = ({
  title = "E-Commerce Platform",
  description = "A modern e-commerce platform built with React, Redux, and Shopify Storefront API. Features include product filtering, cart management, and checkout.",
  imageUrl = "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  technologies = ["React", "Redux", "Shopify API", "Tailwind CSS"],
  liveUrl = "https://example.com",
  githubUrl = "https://github.com/example/project",
  onClick = () => {},
}: ProjectCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card className="h-full flex flex-col overflow-hidden bg-card border-card-foreground/20 hover:border-primary/50 transition-all duration-300">
        <div className="relative overflow-hidden h-48">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Button
              variant="outline"
              size="sm"
              onClick={onClick}
              className="text-white border-white hover:bg-white/20"
            >
              View Details <ArrowUpRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>

        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-bold">{title}</CardTitle>
          <CardDescription className="line-clamp-2 text-sm text-muted-foreground">
            {description}
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-0 flex-grow">
          <div className="flex flex-wrap gap-1 mt-2">
            {technologies.map((tech, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tech}
              </Badge>
            ))}
          </div>
        </CardContent>

        <CardFooter className="pt-2 flex justify-between">
          <Button variant="ghost" size="sm" asChild>
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
            >
              <ExternalLink className="mr-1 h-4 w-4" /> Live
            </a>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
            >
              <Github className="mr-1 h-4 w-4" /> Code
            </a>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;

import React from "react";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, FileText } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface HeroSectionProps {
  name?: string;
  title?: string;
  description?: string;
  socialLinks?: {
    github?: string;
    linkedin?: string;
    email?: string;
  };
  resumeUrl?: string;
}

const HeroSection = ({
  name = "Hamza Asif",
  title = "React & 3D Developer",
  description = "I build interactive web experiences with React, Three.js, and modern web technologies. Specializing in 3D model configuration, AI integration, and full-stack development.",
  socialLinks = {
    github: "https://github.com/HaMZAAsif043",
    linkedin: "https://linkedin.com/in/hamzaasif043",
    email: "mailto:hamzaasif043@gmail.com",
  },
  resumeUrl = "/resume.pdf",
}: HeroSectionProps) => {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Animated background gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[10%] opacity-30 blur-3xl">
          <motion.div
            animate={{
              background: [
                "radial-gradient(circle at 50% 50%, rgba(76, 29, 149, 0.3) 0%, rgba(15, 23, 42, 0) 50%)",
                "radial-gradient(circle at 30% 70%, rgba(56, 189, 248, 0.3) 0%, rgba(15, 23, 42, 0) 50%)",
                "radial-gradient(circle at 70% 30%, rgba(249, 115, 22, 0.3) 0%, rgba(15, 23, 42, 0) 50%)",
                "radial-gradient(circle at 50% 50%, rgba(76, 29, 149, 0.3) 0%, rgba(15, 23, 42, 0) 50%)",
              ],
            }}
            transition={{ duration: 15, repeat: Infinity }}
            className="absolute inset-0"
          />
        </div>
      </div>

      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge
              variant="outline"
              className="mb-4 px-4 py-1 text-sm border-primary/20 bg-primary/5"
            >
              Portfolio
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70"
          >
            Hi, I'm {name}
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-3xl font-medium mb-6 text-muted-foreground"
          >
            {title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="max-w-2xl text-lg text-muted-foreground mb-8"
          >
            {description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap gap-4 justify-center mb-12"
          >
            <Button size="lg" className="gap-2">
              View My Work
            </Button>
            <Button size="lg" variant="outline" asChild className="gap-2">
              <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                <FileText className="h-4 w-4" /> Resume
              </a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex gap-4"
          >
            {socialLinks.github && (
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
            )}
            {socialLinks.linkedin && (
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            )}
            {socialLinks.email && (
              <a
                href={socialLinks.email}
                className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            )}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center"
        >
          <span className="text-sm text-muted-foreground mb-2">
            Scroll Down
          </span>
          <ArrowDown className="h-4 w-4 text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;

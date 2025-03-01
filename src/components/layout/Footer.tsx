import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, ExternalLink } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface FooterProps {
  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
}

const Footer = ({
  socialLinks = {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    twitter: "https://twitter.com/yourusername",
    email: "mailto:your.email@example.com",
  },
}: FooterProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-background border-t border-border/40 py-8 px-4 md:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo and tagline */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex items-center space-x-2"
            >
              <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl">
                D
              </div>
              <span className="text-xl font-bold">DevCraft</span>
            </motion.div>
            <p className="text-muted-foreground text-sm">
              Crafting immersive digital experiences with React, Three.js, and
              cutting-edge web technologies.
            </p>
          </div>

          {/* Quick links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <a
                href="#home"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Home
              </a>
              <a
                href="#showcase"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                3D Showcase
              </a>
              <a
                href="#projects"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Projects
              </a>
              <a
                href="#skills"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Skills
              </a>
              <a
                href="#about"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                About
              </a>
              <a
                href="#contact"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact
              </a>
            </nav>
          </div>

          {/* Contact info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Get In Touch</h3>
            <p className="text-muted-foreground text-sm">
              Interested in working together? Feel free to reach out through any
              of these channels.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="icon" asChild>
                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href={socialLinks.email} aria-label="Email">
                  <Mail className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} DevCraft. All rights reserved.</p>
          <div className="flex items-center mt-4 md:mt-0">
            <a
              href="/privacy"
              className="hover:text-foreground transition-colors"
            >
              Privacy Policy
            </a>
            <Separator orientation="vertical" className="mx-2 h-4" />
            <a
              href="/terms"
              className="hover:text-foreground transition-colors"
            >
              Terms of Service
            </a>
            <Separator orientation="vertical" className="mx-2 h-4" />
            <a
              href="https://github.com/yourusername/portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center hover:text-foreground transition-colors"
            >
              <span className="mr-1">Source Code</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

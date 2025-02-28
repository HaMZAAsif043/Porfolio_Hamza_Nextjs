import React from "react";
import { motion } from "framer-motion";
import { Download, FileText, Github, Linkedin, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import ExperienceTimeline from "@/components/about/ExperienceTimeline";

interface AboutSectionProps {
  bio?: string;
  resumeUrl?: string;
  socialLinks?: {
    github?: string;
    linkedin?: string;
    email?: string;
  };
  skills?: string[];
  interests?: string[];
}

const AboutSection = ({
  bio = "I'm a passionate developer specializing in React, Next.js, and 3D web technologies. With over 5 years of experience building interactive web applications, I focus on creating immersive user experiences that combine cutting-edge frontend technologies with robust backend systems. My background in computer graphics and AI allows me to develop unique solutions that push the boundaries of what's possible on the web.",
  resumeUrl = "/resume.pdf",
  socialLinks = {
    github: "https://github.com/example",
    linkedin: "https://linkedin.com/in/example",
    email: "contact@example.com",
  },
  skills = [
    "React",
    "Next.js",
    "TypeScript",
    "Three.js",
    "WebGL",
    "Redux",
    "Node.js",
    "Python",
    "Django",
    "AI/ML",
    "3D Modeling",
    "Responsive Design",
  ],
  interests = [
    "3D Graphics",
    "AI Development",
    "Open Source",
    "Game Development",
    "Interactive Experiences",
    "Teaching",
  ],
}: AboutSectionProps) => {
  return (
    <section className="w-full py-16 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            About Me
          </h2>
          <div className="w-20 h-1 bg-primary rounded mb-8"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Bio Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="bg-card rounded-lg p-6 shadow-sm border border-border/50 h-full">
              <h3 className="text-xl font-semibold mb-4">Biography</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {bio}
              </p>

              <div className="flex flex-wrap gap-3">
                <Button asChild>
                  <a href={resumeUrl} download className="flex items-center">
                    <Download className="mr-2 h-4 w-4" /> Download Resume
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center"
                  >
                    <FileText className="mr-2 h-4 w-4" /> View Resume
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Skills & Contact Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-card rounded-lg p-6 shadow-sm border border-border/50 h-full">
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-4">Connect With Me</h3>
                <div className="flex flex-col space-y-3">
                  {socialLinks.github && (
                    <Button variant="outline" asChild className="justify-start">
                      <a
                        href={socialLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center"
                      >
                        <Github className="mr-2 h-4 w-4" /> GitHub
                      </a>
                    </Button>
                  )}
                  {socialLinks.linkedin && (
                    <Button variant="outline" asChild className="justify-start">
                      <a
                        href={socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center"
                      >
                        <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
                      </a>
                    </Button>
                  )}
                  {socialLinks.email && (
                    <Button variant="outline" asChild className="justify-start">
                      <a
                        href={`mailto:${socialLinks.email}`}
                        className="flex items-center"
                      >
                        <Mail className="mr-2 h-4 w-4" /> Email Me
                      </a>
                    </Button>
                  )}
                </div>
              </div>

              <Separator className="my-6" />

              <div>
                <h3 className="text-xl font-semibold mb-4">Skills</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>

                <h3 className="text-xl font-semibold mb-4">Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {interests.map((interest, index) => (
                    <Badge key={index} variant="outline">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Experience Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <ExperienceTimeline />
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;

import React from "react";
import { motion } from "framer-motion";
import { Calendar, Briefcase, GraduationCap, Award } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface TimelineItemProps {
  date?: string;
  title?: string;
  organization?: string;
  description?: string;
  skills?: string[];
  type?: "work" | "education" | "achievement";
}

const TimelineItem = ({
  date = "Jan 2022 - Present",
  title = "Senior Frontend Developer",
  organization = "Tech Company",
  description = "Led development of interactive web applications using React, Three.js, and modern frontend technologies.",
  skills = ["React", "TypeScript", "Three.js"],
  type = "work",
}: TimelineItemProps) => {
  const icons = {
    work: <Briefcase className="h-5 w-5 text-primary" />,
    education: <GraduationCap className="h-5 w-5 text-primary" />,
    achievement: <Award className="h-5 w-5 text-primary" />,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mb-8 flex gap-4"
    >
      <div className="flex flex-col items-center">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
          {icons[type]}
        </div>
        <div className="mt-2 h-full w-0.5 bg-border"></div>
      </div>

      <Card className="flex-1 bg-card">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold">{title}</h3>
            <Badge variant="outline" className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {date}
            </Badge>
          </div>
          <h4 className="text-md font-medium text-muted-foreground mb-3">
            {organization}
          </h4>
          <p className="text-sm text-muted-foreground mb-4">{description}</p>
          <div className="flex flex-wrap gap-1">
            {skills.map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

interface ExperienceTimelineProps {
  items?: TimelineItemProps[];
}

const ExperienceTimeline = ({
  items = [
    {
      date: "Jan 2022 - Present",
      title: "Senior Frontend Developer",
      organization: "Tech Innovations Inc.",
      description:
        "Leading development of interactive 3D web applications using React, Three.js, and WebGL. Implemented performant rendering techniques for complex 3D models.",
      skills: ["React", "Three.js", "WebGL", "TypeScript", "Redux"],
      type: "work",
    },
    {
      date: "Jun 2020 - Dec 2021",
      title: "Frontend Developer",
      organization: "Digital Solutions Ltd.",
      description:
        "Developed responsive web applications and e-commerce platforms using React and Redux. Integrated with Shopify Storefront API for product management.",
      skills: ["React", "Redux", "Shopify API", "JavaScript", "CSS"],
      type: "work",
    },
    {
      date: "Sep 2018 - May 2020",
      title: "MSc Computer Science",
      organization: "University of Technology",
      description:
        'Specialized in Computer Graphics and AI. Thesis on "Real-time 3D Rendering Techniques for Web Applications".',
      skills: ["Computer Graphics", "AI/ML", "Research", "Python"],
      type: "education",
    },
    {
      date: "Mar 2019",
      title: "Best Web Innovation Award",
      organization: "Tech Conference 2019",
      description:
        "Received award for developing an interactive 3D visualization tool for educational purposes.",
      skills: ["Innovation", "Web Development", "3D Graphics"],
      type: "achievement",
    },
  ],
}: ExperienceTimelineProps) => {
  return (
    <div className="w-full max-w-3xl mx-auto bg-background p-4">
      <div className="flex items-center gap-2 mb-8">
        <h2 className="text-2xl font-bold">Experience & Education</h2>
        <Separator className="flex-grow" />
      </div>

      <div className="relative">
        {items.map((item, index) => (
          <TimelineItem key={index} {...item} />
        ))}
        <motion.div
          className="absolute bottom-0 left-5 h-4 w-4 rounded-full bg-primary"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        />
      </div>
    </div>
  );
};

export default ExperienceTimeline;

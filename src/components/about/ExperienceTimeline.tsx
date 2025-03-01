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
      date: "Sep 2023 - Present",
      title: "React & 3D Developer",
      organization: "Blenspark",
      description:
        "Developing interactive 3D configurators and web applications using React, Three.js, and WebGL. Implemented 3D model customization and animation features.",
      skills: ["React", "Next.js", "Three.js", "WebGL", "TypeScript"],
      type: "work",
    },
    {
      date: "Sep 2023 - Oct 2023",
      title: "Frontend Developer Intern",
      organization: "Blenspark",
      description:
        "Worked on developing responsive web applications and travel websites. Integrated chatbots and interactive features for enhanced user experience.",
      skills: ["React", "JavaScript", "CSS", "HTML", "UI/UX"],
      type: "work",
    },
    {
      date: "2021 - Present",
      title: "BS in Artificial Intelligence",
      organization: "University of Management and Technology, Lahore",
      description:
        "Currently in 6th semester, focusing on AI, machine learning, and computer vision applications.",
      skills: ["Python", "AI/ML", "Computer Vision", "Data Science"],
      type: "education",
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

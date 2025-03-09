import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Layout components
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";

// Section components
import HeroSection from "./sections/HeroSection";
import ThreeDConfiguratorSection from "./sections/ThreeDConfigurator";
import ProjectsSection from "./sections/ProjectsSection";
import SkillsSection from "./sections/SkillsSection";
import AboutSection from "./sections/AboutSection";
import ContactSection from "./sections/ContactSection";

const Home = () => {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [scrollProgress, setScrollProgress] = useState(0);

  // Handle theme toggle
  const handleThemeToggle = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "dark" | "light" | null;
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    const initialTheme = savedTheme || systemTheme;

    setTheme(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
  }, []);

  // Track scroll progress for animations
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Social links shared across components
  const socialLinks = {
    github: "https://github.com/HaMZAAsif043",
    linkedin: "https://www.linkedin.com/in/hamza-asif043/",
    twitter: "https://twitter.com/yourusername",
    email: "hamza.asif0087@gmail.com",
    portfolio: "https://yourportfolio.com",
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Fixed progress bar at the top of the page */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50"
        style={{ width: `${scrollProgress}%`, transformOrigin: "left" }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
      />

      {/* Navigation */}
      <Navbar
        theme={theme}
        onThemeToggle={handleThemeToggle}
        socialLinks={socialLinks}
      />

      {/* Main content */}
      <main>
        {/* Hero Section */}
        <section id="home">
          <HeroSection
            name="Hamza Asif"
            title="React & 3D Developer"
            description="I build interactive web experiences with React, Three.js, and modern web technologies. Specializing in 3D rendering, AI integration, and full-stack development."
            socialLinks={{
              github: socialLinks.github,
              linkedin: socialLinks.linkedin,
              email: `mailto:${socialLinks.email}`,
            }}
            resumeUrl="/resume.pdf"
          />
        </section>

        {/* 3D Configurator Section */}
        {/* <section id="showcase">
          <ThreeDConfiguratorSection />
        </section> */}

        {/* Projects Section */}
        <section id="projects">
          <ProjectsSection />
        </section>

        {/* Skills Section */}
        <section id="skills">
          <SkillsSection />
        </section>

        {/* About Section */}
        <section id="about">
          <AboutSection
            socialLinks={{
              github: socialLinks.github,
              linkedin: socialLinks.linkedin,
              email: socialLinks.email,
            }}
          />
        </section>

        {/* Contact Section */}
        <section id="contact">
          <ContactSection
            email={socialLinks.email}
            phone="0321-9519624"
            location="Lahore, Pakistan"
            socialLinks={[
              { name: "LinkedIn", url: socialLinks.linkedin },
              { name: "GitHub", url: socialLinks.github },
            ]}
          />
        </section>
      </main>

      {/* Footer */}
      <Footer socialLinks={socialLinks} />

      {/* Scroll to top button */}
      <motion.button
        className="fixed bottom-8 right-8 p-3 rounded-full bg-primary text-primary-foreground shadow-lg z-40"
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: scrollProgress > 20 ? 1 : 0,
          y: scrollProgress > 20 ? 0 : 20,
        }}
        transition={{ duration: 0.3 }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll to top"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m18 15-6-6-6 6" />
        </svg>
      </motion.button>
    </div>
  );
};

export default Home;

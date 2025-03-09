import React, { useState } from "react";
import { motion } from "framer-motion";
import { Info, Box, Palette, Layers, Download } from "lucide-react";
import SimpleThreeDConfigurator from "../3d/SimpleThreeDConfigurator";
import { Minimize2, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ThreeDConfiguratorSectionProps {
  models?: {
    id: string;
    name: string;
    description: string;
    modelPath: string;
    presets: {
      id: string;
      name: string;
      colors: Record<string, string>;
      description?: string;
    }[];
    parts: {
      id: string;
      name: string;
      description?: string;
    }[];
    features: string[];
    downloadUrl?: string;
  }[];
}

const ThreeDConfiguratorSection = ({
  models = [
    {
      id: "model1",
      name: "Toyota Corolla Configurator",
      description:
        "An interactive 3D car configurator that allows you to customize the Toyota Corolla with different colors and open/close doors and hood.",
      modelPath: "/ccl3-transformed.glb",
      presets: [
        {
          id: "preset1",
          name: "Classic Red",
          colors: { body: "#e53935", top: "#e53935", bottom: "#e53935" },
          description: "A classic red color scheme for a sporty look.",
        },
        {
          id: "preset2",
          name: "Midnight Blue",
          colors: { body: "#1a237e", top: "#1a237e", bottom: "#1a237e" },
          description: "A deep blue color scheme for an elegant appearance.",
        },
        {
          id: "preset3",
          name: "Silver",
          colors: { body: "#9e9e9e", top: "#9e9e9e", bottom: "#9e9e9e" },
          description: "A sleek silver color scheme for a modern look.",
        },
      ],
      parts: [
        {
          id: "body",
          name: "Car Body",
          description: "The main body of the car.",
        },
        {
          id: "doors",
          name: "Doors",
          description: "Click on the doors to open and close them.",
        },
        {
          id: "hood",
          name: "Hood",
          description: "Click on the hood to open and close it.",
        },
      ],
      features: [
        "Interactive 3D car visualization",
        "Real-time color customization",
        "Animated doors and hood",
        "Multiple color presets",
        "360° viewing angle",
      ],
      downloadUrl: "#",
    },
    {
      id: "model2",
      name: "Product Showcase",
      description:
        "A product visualization model that allows customers to customize colors and features before purchase. Great for e-commerce applications.",
      modelPath: "/models/product.glb",
      presets: [
        {
          id: "preset1",
          name: "Standard",
          colors: { body: "#546e7a", top: "#90a4ae", bottom: "#263238" },
          description:
            "The standard product color scheme with professional tones.",
        },
        {
          id: "preset2",
          name: "Premium",
          colors: { body: "#212121", top: "#ffd700", bottom: "#212121" },
          description:
            "A premium black and gold color scheme for a luxury feel.",
        },
        {
          id: "preset3",
          name: "Modern",
          colors: { body: "#ffffff", top: "#2196f3", bottom: "#ffffff" },
          description: "A clean, modern white and blue color scheme.",
        },
      ],
      parts: [
        {
          id: "body",
          name: "Main",
          description: "The main body of the product.",
        },
        {
          id: "top",
          name: "Accent",
          description: "The accent or highlight areas.",
        },
        {
          id: "bottom",
          name: "Base",
          description: "The base or bottom section.",
        },
      ],
      features: [
        "Product visualization",
        "Customer customization",
        "Pre-purchase configuration",
        "Multiple color options",
        "Realistic rendering",
      ],
      downloadUrl: "#",
    },
    {
      id: "model3",
      name: "Architectural Visualizer",
      description:
        "An architectural model configurator that allows users to customize building materials, colors, and features. Ideal for real estate and architectural presentations.",
      modelPath: "/models/architecture.glb",
      presets: [
        {
          id: "preset1",
          name: "Modern",
          colors: { body: "#e0e0e0", top: "#757575", bottom: "#9e9e9e" },
          description:
            "A modern architectural style with clean lines and neutral colors.",
        },
        {
          id: "preset2",
          name: "Classic",
          colors: { body: "#a1887f", top: "#8d6e63", bottom: "#5d4037" },
          description: "A classic architectural style with warm, earthy tones.",
        },
        {
          id: "preset3",
          name: "Contemporary",
          colors: { body: "#b3e5fc", top: "#29b6f6", bottom: "#0288d1" },
          description:
            "A contemporary style with blue glass and steel elements.",
        },
      ],
      parts: [
        {
          id: "body",
          name: "Walls",
          description: "The main walls of the building.",
        },
        {
          id: "top",
          name: "Roof",
          description: "The roof and upper elements.",
        },
        {
          id: "bottom",
          name: "Foundation",
          description: "The foundation and ground floor.",
        },
      ],
      features: [
        "Architectural visualization",
        "Material customization",
        "Lighting simulation",
        "Interior and exterior views",
        "Real estate presentation tool",
      ],
      downloadUrl: "#",
    },
  ],
}: ThreeDConfiguratorSectionProps) => {
  const [activeModelIndex, setActiveModelIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const activeModel = models[activeModelIndex];

  const handleToggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const handleToggleInfo = () => {
    setShowInfo(!showInfo);
  };

  return (
    <section className="w-full min-h-screen bg-background py-16 px-4 md:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            3D Model Configurator
          </motion.h2>
          <motion.p
            className="text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Explore my 3D modeling and configuration capabilities. Customize
            colors, materials, and features of these interactive models in
            real-time.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-3">
            <div className="relative rounded-lg overflow-hidden border border-border">
              <SimpleThreeDConfigurator
                modelPath={activeModel.modelPath}
                presets={activeModel.presets}
                parts={activeModel.parts}
                isFullScreen={isFullScreen}
                onToggleFullScreen={handleToggleFullScreen}
              />
            </div>
          </div>
        </div>

        {/* Model selection and info */}
        <div className="mt-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-2/3">
              <h3 className="text-xl font-bold mb-4">{activeModel.name}</h3>
              <p className="text-muted-foreground mb-6">
                {activeModel.description}
              </p>

              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-2">Features</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {activeModel.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Box className="h-4 w-4 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={handleToggleFullScreen}
                >
                  {isFullScreen ? (
                    <>
                      <Minimize2 className="h-4 w-4" /> Exit Fullscreen
                    </>
                  ) : (
                    <>
                      <Maximize2 className="h-4 w-4" /> Fullscreen Mode
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                  asChild
                >
                  <a href={activeModel.downloadUrl} download>
                    <Download className="h-4 w-4" /> Download Model
                  </a>
                </Button>
              </div>
            </div>

            <div className="w-full md:w-1/3">
              <Card>
                <CardContent className="p-4">
                  <h4 className="text-lg font-semibold mb-2">How to Use</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="bg-primary/10 text-primary p-1 rounded">
                        1
                      </span>
                      <span>Select a part by clicking on the model</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-primary/10 text-primary p-1 rounded">
                        2
                      </span>
                      <span>Choose a color preset or pick a custom color</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-primary/10 text-primary p-1 rounded">
                        3
                      </span>
                      <span>
                        Rotate the model by dragging, zoom with scroll
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-primary/10 text-primary p-1 rounded">
                        4
                      </span>
                      <span>Save your configuration or export the model</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Model selection tabs */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Available Models</h3>
          <Tabs
            defaultValue={models[0].id}
            value={activeModel.id}
            onValueChange={(value) => {
              const index = models.findIndex((model) => model.id === value);
              if (index !== -1) {
                setActiveModelIndex(index);
                setShowInfo(false);
              }
            }}
          >
            <TabsList className="grid w-full grid-cols-3">
              {models.map((model) => (
                <TabsTrigger key={model.id} value={model.id}>
                  {model.name}
                </TabsTrigger>
              ))}
            </TabsList>
            {models.map((model) => (
              <TabsContent key={model.id} value={model.id}>
                <div className="flex items-center gap-2 mt-2">
                  {model.presets.map((preset) => (
                    <Badge key={preset.id} variant="outline">
                      {preset.name}
                    </Badge>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-muted-foreground">
            These configurators showcase my expertise in 3D modeling, WebGL
            rendering, and interactive web applications using Three.js and React
            Three Fiber.
            <br />
            The configurators demonstrate how 3D product visualization can
            enhance user experience and engagement on modern websites.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ThreeDConfiguratorSection;

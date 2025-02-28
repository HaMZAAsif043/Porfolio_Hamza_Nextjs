import React, { useState } from "react";
import { motion } from "framer-motion";
import { Info, Box } from "lucide-react";

import ModelViewer from "../3d/ModelViewer";
import ModelDetails from "../3d/ModelDetails";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface ThreeDShowcaseProps {
  models?: {
    id: string;
    name: string;
    description: string;
    modelUrl: string;
    creator: string;
    dateCreated: string;
    polygons: number;
    fileSize: string;
    fileFormat: string;
    tags: string[];
    downloadUrl: string;
    externalUrl: string;
  }[];
}

const ThreeDShowcase = ({
  models = [
    {
      id: "model1",
      name: "Low Poly Spaceship",
      description:
        "A detailed low-poly spaceship model perfect for games and interactive 3D applications. Features modular components and PBR textures.",
      modelUrl: "/models/spaceship.glb",
      creator: "John Doe",
      dateCreated: "2023-05-15",
      polygons: 12500,
      fileSize: "15.2 MB",
      fileFormat: "glTF/GLB",
      tags: ["Sci-Fi", "Low-Poly", "Vehicle", "Game Asset"],
      downloadUrl: "#",
      externalUrl: "#",
    },
    {
      id: "model2",
      name: "Futuristic City",
      description:
        "A futuristic cityscape with detailed buildings, flying vehicles, and animated elements. Optimized for real-time rendering.",
      modelUrl: "/models/city.glb",
      creator: "Jane Smith",
      dateCreated: "2023-06-22",
      polygons: 45000,
      fileSize: "32.7 MB",
      fileFormat: "glTF/GLB",
      tags: ["City", "Futuristic", "Environment", "Animated"],
      downloadUrl: "#",
      externalUrl: "#",
    },
    {
      id: "model3",
      name: "Sci-Fi Character",
      description:
        "A fully rigged and animated sci-fi character with customizable armor and weapons. Includes multiple animation sequences.",
      modelUrl: "/models/character.glb",
      creator: "Alex Johnson",
      dateCreated: "2023-07-10",
      polygons: 28000,
      fileSize: "24.5 MB",
      fileFormat: "glTF/GLB",
      tags: ["Character", "Sci-Fi", "Rigged", "Animated"],
      downloadUrl: "#",
      externalUrl: "#",
    },
  ],
}: ThreeDShowcaseProps) => {
  const [activeModelIndex, setActiveModelIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const activeModel = models[activeModelIndex];

  const handleModelClick = () => {
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
  };

  const handleToggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
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
            Interactive 3D Showcase
          </motion.h2>
          <motion.p
            className="text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Explore my 3D modeling and rendering capabilities with these
            interactive WebGL models. Click and drag to rotate, scroll to zoom,
            and click for more details.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <div className="relative h-[500px] md:h-[600px] rounded-lg overflow-hidden border border-border">
              <ModelViewer
                modelUrl={activeModel.modelUrl}
                onModelClick={handleModelClick}
                isFullScreen={isFullScreen}
                onToggleFullScreen={handleToggleFullScreen}
                backgroundColor="#1a1a2e"
              />
            </div>
          </div>

          <div className="lg:col-span-1">
            {showDetails ? (
              <div className="h-[500px] md:h-[600px] rounded-lg overflow-hidden border border-border">
                <ModelDetails
                  isOpen={showDetails}
                  onClose={handleCloseDetails}
                  model={{
                    name: activeModel.name,
                    description: activeModel.description,
                    creator: activeModel.creator,
                    dateCreated: activeModel.dateCreated,
                    polygons: activeModel.polygons,
                    fileSize: activeModel.fileSize,
                    fileFormat: activeModel.fileFormat,
                    tags: activeModel.tags,
                    downloadUrl: activeModel.downloadUrl,
                    externalUrl: activeModel.externalUrl,
                  }}
                />
              </div>
            ) : (
              <div className="h-[500px] md:h-[600px] rounded-lg overflow-hidden border border-border bg-card p-6 flex flex-col">
                <h3 className="text-2xl font-bold mb-4">{activeModel.name}</h3>
                <p className="text-muted-foreground mb-6">
                  {activeModel.description}
                </p>

                <div className="mt-auto">
                  <Button
                    onClick={handleModelClick}
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <Info className="h-4 w-4" />
                    View Model Details
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8">
          <Tabs
            defaultValue={models[0].id}
            onValueChange={(value) => {
              const index = models.findIndex((model) => model.id === value);
              if (index !== -1) {
                setActiveModelIndex(index);
                setShowDetails(false);
              }
            }}
          >
            <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto">
              {models.map((model) => (
                <TabsTrigger
                  key={model.id}
                  value={model.id}
                  className="flex items-center gap-2"
                >
                  <Box className="h-4 w-4" />
                  <span className="hidden sm:inline">
                    {model.name.split(" ")[0]}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
            {/* TabsContent is not visible but needed for Tabs component to work properly */}
            {models.map((model) => (
              <TabsContent key={model.id} value={model.id}></TabsContent>
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
            These models showcase my expertise in 3D modeling, texturing, and
            real-time rendering using WebGL and Three.js.
            <br />
            The interactive viewer demonstrates the integration of 3D content
            with modern web technologies.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ThreeDShowcase;

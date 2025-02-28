import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  Environment,
  ContactShadows,
} from "@react-three/drei";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HexColorPicker } from "react-colorful";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Download,
  Palette,
  Maximize2,
  Minimize2,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Camera,
  Layers,
  Save,
  Share2,
} from "lucide-react";

// Model component that handles the 3D model rendering and configuration
function Model({
  modelPath,
  position = [0, 0, 0],
  scale = 1,
  rotation = [0, 0, 0],
  colors,
  setColors,
  selectedPart,
  setSelectedPart,
}) {
  const group = useRef();
  const { nodes, materials } = useGLTF(modelPath);
  const { camera } = useThree();

  // Set initial camera position
  useEffect(() => {
    camera.position.set(0, 0, 5);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  // Animate the model
  useFrame((state) => {
    if (group.current) {
      // Gentle floating animation
      group.current.position.y =
        Math.sin(state.clock.getElapsedTime() * 0.5) * 0.05;
    }
  });

  // This is a placeholder for the actual model rendering
  // In a real implementation, you would map through the model's meshes
  // and apply the appropriate colors and materials
  return (
    <group
      ref={group}
      position={position}
      rotation={rotation}
      scale={[scale, scale, scale]}
    >
      {/* This is a placeholder cube - replace with your actual model */}
      <mesh
        onClick={(e) => {
          e.stopPropagation();
          setSelectedPart("body");
        }}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={colors.body || "#1e88e5"} />
      </mesh>

      {/* Additional parts would be added here */}
      <mesh
        position={[0, 0.8, 0]}
        onClick={(e) => {
          e.stopPropagation();
          setSelectedPart("top");
        }}
        castShadow
      >
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color={colors.top || "#e53935"} />
      </mesh>

      <mesh
        position={[0, -0.8, 0]}
        onClick={(e) => {
          e.stopPropagation();
          setSelectedPart("bottom");
        }}
        castShadow
      >
        <cylinderGeometry args={[0.5, 0.5, 0.2, 32]} />
        <meshStandardMaterial color={colors.bottom || "#43a047"} />
      </mesh>
    </group>
  );
}

// Scene component that sets up the 3D environment
function Scene({
  modelPath,
  colors,
  setColors,
  selectedPart,
  setSelectedPart,
}) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        intensity={1}
        castShadow
      />
      <Model
        modelPath={modelPath}
        colors={colors}
        setColors={setColors}
        selectedPart={selectedPart}
        setSelectedPart={setSelectedPart}
      />
      <ContactShadows
        position={[0, -1.5, 0]}
        opacity={0.4}
        scale={10}
        blur={1.5}
        far={1.5}
      />
      <Environment preset="city" />
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={2}
        maxDistance={10}
      />
    </>
  );
}

// Main configurator component
interface ThreeDConfiguratorProps {
  modelPath?: string;
  presets?: {
    id: string;
    name: string;
    colors: Record<string, string>;
    description?: string;
  }[];
  parts?: {
    id: string;
    name: string;
    description?: string;
  }[];
  isFullScreen?: boolean;
  onToggleFullScreen?: () => void;
}

const ThreeDConfigurator = ({
  modelPath = "/models/default-model.glb", // Default model path
  presets = [
    {
      id: "preset1",
      name: "Classic",
      colors: { body: "#1e88e5", top: "#e53935", bottom: "#43a047" },
      description:
        "The classic color scheme with blue body, red top, and green base.",
    },
    {
      id: "preset2",
      name: "Monochrome",
      colors: { body: "#212121", top: "#616161", bottom: "#9e9e9e" },
      description: "A sleek monochrome design with varying shades of gray.",
    },
    {
      id: "preset3",
      name: "Vibrant",
      colors: { body: "#6200ea", top: "#00c853", bottom: "#ffd600" },
      description: "Bold and vibrant colors that make your model stand out.",
    },
  ],
  parts = [
    {
      id: "body",
      name: "Main Body",
      description: "The main body of the model.",
    },
    {
      id: "top",
      name: "Top Section",
      description: "The top section or head of the model.",
    },
    {
      id: "bottom",
      name: "Base",
      description: "The base or bottom section of the model.",
    },
  ],
  isFullScreen = false,
  onToggleFullScreen = () => {},
}: ThreeDConfiguratorProps) => {
  const [colors, setColors] = useState(presets[0].colors);
  const [selectedPart, setSelectedPart] = useState(parts[0].id);
  const [currentColor, setCurrentColor] = useState(
    colors[selectedPart] || "#ffffff",
  );
  const [activePreset, setActivePreset] = useState(presets[0].id);
  const [cameraPosition, setCameraPosition] = useState({ x: 0, y: 0, z: 5 });
  const [showColorPicker, setShowColorPicker] = useState(false);

  // Update current color when selected part changes
  useEffect(() => {
    setCurrentColor(colors[selectedPart] || "#ffffff");
  }, [selectedPart, colors]);

  // Apply color to the selected part
  const handleColorChange = (color) => {
    setCurrentColor(color);
    setColors({
      ...colors,
      [selectedPart]: color,
    });
  };

  // Apply preset colors
  const applyPreset = (presetId) => {
    const preset = presets.find((p) => p.id === presetId);
    if (preset) {
      setColors(preset.colors);
      setActivePreset(presetId);
    }
  };

  // Get the current selected part info
  const selectedPartInfo =
    parts.find((part) => part.id === selectedPart) || parts[0];

  return (
    <div
      className={`w-full ${isFullScreen ? "fixed inset-0 z-50" : "relative h-[600px]"}`}
    >
      <div className="w-full h-full flex flex-col md:flex-row">
        {/* 3D Canvas */}
        <div className="flex-grow relative bg-black/10 dark:bg-black/30 rounded-lg overflow-hidden">
          <Canvas
            shadows
            dpr={[1, 2]}
            camera={{ position: [0, 0, 5], fov: 50 }}
          >
            <Scene
              modelPath={modelPath}
              colors={colors}
              setColors={setColors}
              selectedPart={selectedPart}
              setSelectedPart={setSelectedPart}
            />
          </Canvas>

          {/* Camera controls overlay */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-black/30 backdrop-blur-sm p-2 rounded-lg">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={() => {}}>
                    <RotateCcw className="h-5 w-5 text-white" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Reset View</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={() => {}}>
                    <ZoomOut className="h-5 w-5 text-white" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Zoom Out</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={() => {}}>
                    <ZoomIn className="h-5 w-5 text-white" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Zoom In</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={() => {}}>
                    <Camera className="h-5 w-5 text-white" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Take Screenshot</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onToggleFullScreen}
                  >
                    {isFullScreen ? (
                      <Minimize2 className="h-5 w-5 text-white" />
                    ) : (
                      <Maximize2 className="h-5 w-5 text-white" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isFullScreen ? "Exit" : "Enter"} Fullscreen</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          {/* Part selection indicator */}
          <div className="absolute top-4 left-4 bg-black/30 backdrop-blur-sm p-2 rounded-lg text-white text-sm">
            <p>Click on a part to select it for customization</p>
          </div>
        </div>

        {/* Configuration panel */}
        <div
          className={`w-full md:w-80 ${isFullScreen ? "md:w-96" : ""} bg-card border-l border-border`}
        >
          <div className="h-full flex flex-col overflow-auto">
            <div className="p-4 border-b border-border">
              <h2 className="text-xl font-bold">3D Model Configurator</h2>
              <p className="text-sm text-muted-foreground">
                Customize your 3D model by selecting parts and changing colors
              </p>
            </div>

            {/* Presets */}
            <div className="p-4 border-b border-border">
              <h3 className="text-md font-semibold mb-2">Color Presets</h3>
              <Tabs
                defaultValue={activePreset}
                value={activePreset}
                onValueChange={applyPreset}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-3">
                  {presets.map((preset) => (
                    <TabsTrigger key={preset.id} value={preset.id}>
                      {preset.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
              <p className="text-xs text-muted-foreground mt-2">
                {presets.find((p) => p.id === activePreset)?.description}
              </p>
            </div>

            {/* Part selection */}
            <div className="p-4 border-b border-border">
              <h3 className="text-md font-semibold mb-2">Selected Part</h3>
              <div className="grid grid-cols-3 gap-2">
                {parts.map((part) => (
                  <Button
                    key={part.id}
                    variant={selectedPart === part.id ? "default" : "outline"}
                    className="w-full"
                    onClick={() => setSelectedPart(part.id)}
                  >
                    {part.name}
                  </Button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {selectedPartInfo.description}
              </p>
            </div>

            {/* Color picker */}
            <div className="p-4 border-b border-border">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-md font-semibold">Color</h3>
                <div
                  className="w-8 h-8 rounded-full border border-border"
                  style={{ backgroundColor: currentColor }}
                />
              </div>

              <Popover open={showColorPicker} onOpenChange={setShowColorPicker}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <Palette className="h-4 w-4" />
                    Choose Color
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-3">
                  <HexColorPicker
                    color={currentColor}
                    onChange={handleColorChange}
                  />
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-sm">{currentColor}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setShowColorPicker(false)}
                    >
                      Apply
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            {/* Actions */}
            <div className="p-4 mt-auto">
              <div className="flex flex-col gap-2">
                <Button className="w-full flex items-center justify-center gap-2">
                  <Save className="h-4 w-4" />
                  Save Configuration
                </Button>
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2"
                >
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Export Model
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreeDConfigurator;

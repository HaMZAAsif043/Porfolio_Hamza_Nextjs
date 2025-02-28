import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  Maximize2,
  Minimize2,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Camera,
  Palette,
  Save,
  Share2,
  Download,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HexColorPicker } from "react-colorful";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SimpleConfiguratorProps {
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

const SimpleConfigurator = ({
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
}: SimpleConfiguratorProps) => {
  const [colors, setColors] = useState(presets[0].colors);
  const [selectedPart, setSelectedPart] = useState(parts[0].id);
  const [currentColor, setCurrentColor] = useState(
    colors[selectedPart] || "#ffffff",
  );
  const [activePreset, setActivePreset] = useState(presets[0].id);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Update current color when selected part changes
  React.useEffect(() => {
    setCurrentColor(colors[selectedPart] || "#ffffff");
  }, [selectedPart, colors]);

  // Apply color to the selected part
  const handleColorChange = (color: string) => {
    setCurrentColor(color);
    setColors({
      ...colors,
      [selectedPart]: color,
    });
  };

  // Apply preset colors
  const applyPreset = (presetId: string) => {
    const preset = presets.find((p) => p.id === presetId);
    if (preset) {
      setColors(preset.colors);
      setActivePreset(presetId);
    }
  };

  // Draw a simple 3D-like visualization
  React.useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#1a1a2e";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw a simple 3D model representation
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Draw bottom part (cylinder)
    ctx.beginPath();
    ctx.ellipse(centerX, centerY + 80, 50, 20, 0, 0, Math.PI * 2);
    ctx.fillStyle = colors.bottom || "#43a047";
    ctx.fill();
    ctx.strokeStyle = "#ffffff20";
    ctx.stroke();

    // Draw body part (cube)
    ctx.beginPath();
    ctx.fillStyle = colors.body || "#1e88e5";
    ctx.fillRect(centerX - 50, centerY - 50, 100, 100);
    ctx.strokeStyle = "#ffffff20";
    ctx.strokeRect(centerX - 50, centerY - 50, 100, 100);

    // Draw top part (sphere)
    ctx.beginPath();
    ctx.arc(centerX, centerY - 80, 40, 0, Math.PI * 2);
    ctx.fillStyle = colors.top || "#e53935";
    ctx.fill();
    ctx.strokeStyle = "#ffffff20";
    ctx.stroke();

    // Add text
    ctx.fillStyle = "#ffffff";
    ctx.font = "14px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Click on parts to select", centerX, canvas.height - 40);
    ctx.fillText(
      "(Simple visualization - no 3D libraries)",
      centerX,
      canvas.height - 20,
    );
  }, [colors]);

  // Handle canvas click to select parts
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Check if click is on top part (sphere)
    const distToTop = Math.sqrt(
      Math.pow(x - centerX, 2) + Math.pow(y - (centerY - 80), 2),
    );
    if (distToTop < 40) {
      setSelectedPart("top");
      return;
    }

    // Check if click is on body part (cube)
    if (
      x >= centerX - 50 &&
      x <= centerX + 50 &&
      y >= centerY - 50 &&
      y <= centerY + 50
    ) {
      setSelectedPart("body");
      return;
    }

    // Check if click is on bottom part (cylinder)
    const distToBottomCenter = Math.sqrt(
      Math.pow(x - centerX, 2) + Math.pow(y - (centerY + 80), 2),
    );
    if (distToBottomCenter < 50) {
      setSelectedPart("bottom");
      return;
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
        {/* Canvas instead of 3D */}
        <div className="flex-grow relative bg-black/10 dark:bg-black/30 rounded-lg overflow-hidden">
          <canvas
            ref={canvasRef}
            width={800}
            height={600}
            className="w-full h-full cursor-pointer"
            onClick={handleCanvasClick}
          />

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
            <p>Selected: {selectedPartInfo.name}</p>
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

export default SimpleConfigurator;

import React, { useState, useEffect, useRef } from "react";
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

// Main configurator component
interface SimpleThreeDConfiguratorProps {
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

const SimpleThreeDConfigurator = ({
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
}: SimpleThreeDConfiguratorProps) => {
  const [colors, setColors] = useState(presets[0].colors);
  const [selectedPart, setSelectedPart] = useState(parts[0].id);
  const [currentColor, setCurrentColor] = useState(
    colors[selectedPart] || "#ffffff",
  );
  const [activePreset, setActivePreset] = useState(presets[0].id);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
  const [zoom, setZoom] = useState(1);
  const [isRotating, setIsRotating] = useState(true);

  // Update current color when selected part changes
  useEffect(() => {
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
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#1a1a2e";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw a simple car representation
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Draw car body (main rectangle)
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate((rotation.y * Math.PI) / 180);

    // Car body
    ctx.beginPath();
    ctx.fillStyle = colors.body || "#e53935";
    ctx.fillRect(-80 * zoom, -30 * zoom, 160 * zoom, 60 * zoom);
    ctx.strokeStyle = "#ffffff20";
    ctx.strokeRect(-80 * zoom, -30 * zoom, 160 * zoom, 60 * zoom);

    // Car roof
    ctx.beginPath();
    ctx.fillStyle = colors.top || "#e53935";
    ctx.fillRect(-60 * zoom, -60 * zoom, 120 * zoom, 30 * zoom);
    ctx.strokeStyle = "#ffffff20";
    ctx.strokeRect(-60 * zoom, -60 * zoom, 120 * zoom, 30 * zoom);

    // Car wheels
    ctx.beginPath();
    ctx.fillStyle = colors.bottom || "#212121";
    ctx.arc(-50 * zoom, 30 * zoom, 20 * zoom, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.fillStyle = colors.bottom || "#212121";
    ctx.arc(50 * zoom, 30 * zoom, 20 * zoom, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Car windows
    ctx.beginPath();
    ctx.fillStyle = "#84ffff80";
    ctx.fillRect(-55 * zoom, -55 * zoom, 40 * zoom, 25 * zoom);
    ctx.strokeStyle = "#ffffff20";
    ctx.strokeRect(-55 * zoom, -55 * zoom, 40 * zoom, 25 * zoom);

    ctx.beginPath();
    ctx.fillStyle = "#84ffff80";
    ctx.fillRect(15 * zoom, -55 * zoom, 40 * zoom, 25 * zoom);
    ctx.strokeStyle = "#ffffff20";
    ctx.strokeRect(15 * zoom, -55 * zoom, 40 * zoom, 25 * zoom);

    ctx.restore();

    // Add text
    ctx.fillStyle = "#ffffff";
    ctx.font = "14px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Toyota Corolla Configurator", centerX, canvas.height - 40);
    ctx.fillText(
      `Rotation: ${rotation.y.toFixed(0)}° | Zoom: ${zoom.toFixed(1)}x`,
      centerX,
      canvas.height - 20,
    );
  }, [colors, rotation, zoom]);

  // Handle canvas resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current && canvasRef.current.parentElement) {
        canvasRef.current.width = canvasRef.current.parentElement.clientWidth;
        canvasRef.current.height = canvasRef.current.parentElement.clientHeight;
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isFullScreen]);

  // Animation loop for rotation
  useEffect(() => {
    let animationId: number;
    const animate = () => {
      if (isRotating) {
        setRotation((prev) => ({
          ...prev,
          y: (prev.y + 0.5) % 360,
        }));
      }
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isRotating]);

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.1, 2));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.1, 0.5));
  };

  const handleResetRotation = () => {
    setRotation({ x: 0, y: 0, z: 0 });
  };

  const handleToggleRotation = () => {
    setIsRotating((prev) => !prev);
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
            className="w-full h-full cursor-pointer"
            onClick={() => {}}
          />

          {/* Camera controls overlay */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-black/30 backdrop-blur-sm p-2 rounded-lg">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleToggleRotation}
                  >
                    <RotateCcw
                      className={`h-5 w-5 text-white ${isRotating ? "text-primary" : "text-muted-foreground"}`}
                    />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isRotating ? "Stop" : "Start"} Rotation</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={handleZoomOut}>
                    <ZoomOut className="h-5 w-5 text-white" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Zoom Out</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <div className="w-32">
              <Slider
                value={[zoom * 50]}
                min={25}
                max={100}
                step={1}
                onValueChange={(value) => setZoom(value[0] / 50)}
              />
            </div>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={handleZoomIn}>
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
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleResetRotation}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-white"
                    >
                      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
                      <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
                      <path d="M12 3v6" />
                    </svg>
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

export default SimpleThreeDConfigurator;

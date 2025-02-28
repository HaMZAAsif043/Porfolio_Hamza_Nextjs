import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Maximize2, Minimize2, RotateCcw, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ModelViewerProps {
  modelUrl?: string;
  initialRotation?: { x: number; y: number; z: number };
  onModelClick?: () => void;
  backgroundColor?: string;
  isFullScreen?: boolean;
  onToggleFullScreen?: () => void;
}

const ModelViewer = ({
  modelUrl = "/models/default-model.glb",
  initialRotation = { x: 0, y: 0, z: 0 },
  onModelClick = () => {},
  backgroundColor = "#1a1a2e",
  isFullScreen = false,
  onToggleFullScreen = () => {},
}: ModelViewerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState<number>(1);
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [rotation, setRotation] = useState(initialRotation);

  // This would normally initialize Three.js
  useEffect(() => {
    if (!canvasRef.current) return;

    // In a real implementation, this is where you would:
    // 1. Initialize Three.js scene, camera, renderer
    // 2. Load the 3D model using GLTFLoader
    // 3. Set up lighting and environment
    // 4. Add event listeners for interaction
    // 5. Set up animation loop

    const mockInitThreeJs = () => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!ctx) return;

      // For the scaffolding, we'll just draw a placeholder
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw a wireframe cube as placeholder
      ctx.strokeStyle = "#4f46e5";
      ctx.lineWidth = 2;
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const size = 100 * zoom;

      // Simple cube wireframe
      ctx.beginPath();
      // Front face
      ctx.moveTo(centerX - size, centerY - size);
      ctx.lineTo(centerX + size, centerY - size);
      ctx.lineTo(centerX + size, centerY + size);
      ctx.lineTo(centerX - size, centerY + size);
      ctx.lineTo(centerX - size, centerY - size);

      // Back face connections
      ctx.moveTo(centerX - size + 40, centerY - size - 40);
      ctx.lineTo(centerX + size + 40, centerY - size - 40);
      ctx.lineTo(centerX + size + 40, centerY + size - 40);
      ctx.lineTo(centerX - size + 40, centerY + size - 40);
      ctx.lineTo(centerX - size + 40, centerY - size - 40);

      // Connect front to back
      ctx.moveTo(centerX - size, centerY - size);
      ctx.lineTo(centerX - size + 40, centerY - size - 40);
      ctx.moveTo(centerX + size, centerY - size);
      ctx.lineTo(centerX + size + 40, centerY - size - 40);
      ctx.moveTo(centerX + size, centerY + size);
      ctx.lineTo(centerX + size + 40, centerY + size - 40);
      ctx.moveTo(centerX - size, centerY + size);
      ctx.lineTo(centerX - size + 40, centerY + size - 40);

      ctx.stroke();

      // Add text to indicate this is a placeholder
      ctx.fillStyle = "#ffffff";
      ctx.font = "16px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(
        `3D Model Viewer (${modelUrl})`,
        centerX,
        centerY + size + 40,
      );
      ctx.fillText(
        `Rotation: X:${rotation.x.toFixed(0)}° Y:${rotation.y.toFixed(0)}° Z:${rotation.z.toFixed(0)}°`,
        centerX,
        centerY + size + 70,
      );
      ctx.fillText(`Zoom: ${zoom.toFixed(1)}x`, centerX, centerY + size + 100);
    };

    mockInitThreeJs();

    // Animation loop for rotation
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
  }, [modelUrl, zoom, isRotating, rotation, backgroundColor]);

  // Handle canvas resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current && containerRef.current) {
        canvasRef.current.width = containerRef.current.clientWidth;
        canvasRef.current.height = containerRef.current.clientHeight;
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isFullScreen]);

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.1, 2));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.1, 0.5));
  };

  const handleResetRotation = () => {
    setRotation(initialRotation);
  };

  const handleToggleRotation = () => {
    setIsRotating((prev) => !prev);
  };

  return (
    <div
      ref={containerRef}
      className={`relative bg-[${backgroundColor}] rounded-lg overflow-hidden ${isFullScreen ? "fixed inset-0 z-50" : "w-full h-full"}`}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        onClick={onModelClick}
      />

      {/* Controls overlay */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-black/30 backdrop-blur-sm p-2 rounded-lg">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleToggleRotation}
                className={`${isRotating ? "text-primary" : "text-muted-foreground"}`}
              >
                <RotateCcw className="h-5 w-5" />
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
                <ZoomOut className="h-5 w-5" />
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
                <ZoomIn className="h-5 w-5" />
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
              <Button variant="ghost" size="icon" onClick={handleResetRotation}>
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
              <Button variant="ghost" size="icon" onClick={onToggleFullScreen}>
                {isFullScreen ? (
                  <Minimize2 className="h-5 w-5" />
                ) : (
                  <Maximize2 className="h-5 w-5" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isFullScreen ? "Exit" : "Enter"} Fullscreen</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Loading indicator - would be shown when model is loading */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      >
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin" />
          <p className="mt-4 text-white font-medium">Loading 3D Model...</p>
        </div>
      </motion.div>
    </div>
  );
};

export default ModelViewer;

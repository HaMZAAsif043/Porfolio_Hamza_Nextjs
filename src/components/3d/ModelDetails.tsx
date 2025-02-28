import React from "react";
import { motion } from "framer-motion";
import { Info, Download, ExternalLink, X } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ModelDetailsProps {
  isOpen?: boolean;
  onClose?: () => void;
  model?: {
    name?: string;
    description?: string;
    creator?: string;
    dateCreated?: string;
    polygons?: number;
    fileSize?: string;
    fileFormat?: string;
    tags?: string[];
    downloadUrl?: string;
    externalUrl?: string;
  };
}

const ModelDetails = ({
  isOpen = true,
  onClose = () => {},
  model = {
    name: "Low Poly Spaceship",
    description:
      "A detailed low-poly spaceship model perfect for games and interactive 3D applications. Features modular components and PBR textures.",
    creator: "John Doe",
    dateCreated: "2023-05-15",
    polygons: 12500,
    fileSize: "15.2 MB",
    fileFormat: "glTF/GLB",
    tags: ["Sci-Fi", "Low-Poly", "Vehicle", "Game Asset"],
    downloadUrl: "#",
    externalUrl: "#",
  },
}: ModelDetailsProps) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.3 }}
      className="w-full h-full bg-card"
    >
      <Card className="h-full flex flex-col border-none shadow-none rounded-none bg-card">
        <CardHeader className="relative pb-2">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>

          <CardTitle className="text-2xl font-bold">{model.name}</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Created by {model.creator} on {model.dateCreated}
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-grow overflow-y-auto py-2">
          <p className="text-sm mb-4">{model.description}</p>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Technical Details</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center">
                  <span className="text-muted-foreground">Polygons:</span>
                  <span className="ml-2">
                    {model.polygons?.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-muted-foreground">File Size:</span>
                  <span className="ml-2">{model.fileSize}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-muted-foreground">Format:</span>
                  <span className="ml-2">{model.fileFormat}</span>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-sm font-medium mb-2">Tags</h3>
              <div className="flex flex-wrap gap-1">
                {model.tags?.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-sm font-medium mb-2">Interaction Tips</h3>
              <ul className="text-sm list-disc list-inside space-y-1 text-muted-foreground">
                <li>Click and drag to rotate the model</li>
                <li>Scroll to zoom in and out</li>
                <li>Double-click to reset the view</li>
                <li>Right-click and drag to pan</li>
              </ul>
            </div>
          </div>
        </CardContent>

        <CardFooter className="pt-2 flex justify-between border-t">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center"
                >
                  <Info className="mr-1 h-4 w-4" /> Info
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>View more information about this model</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild>
              <a
                href={model.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <ExternalLink className="mr-1 h-4 w-4" /> View
              </a>
            </Button>
            <Button variant="default" size="sm" asChild>
              <a
                href={model.downloadUrl}
                download
                className="flex items-center"
              >
                <Download className="mr-1 h-4 w-4" /> Download
              </a>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ModelDetails;

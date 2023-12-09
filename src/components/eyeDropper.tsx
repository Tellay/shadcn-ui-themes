"use client";

import useEyeDropper from "use-eye-dropper";
import { hexToHsva, HsvaColor } from "@uiw/react-color";

import { Button } from "@/components/ui/button";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

import { PipetteIcon } from "./icons";

interface EyeDropperProps {
  handleChangeStyles: (color: HsvaColor) => void;
}

export function EyeDropper({ handleChangeStyles }: EyeDropperProps) {
  const { open, isSupported } = useEyeDropper();

  const handleEyeDropper = async () => {
    try {
      const color = await open();
      if (!color) return;
      const hsvaColor = hexToHsva(color.sRGBHex);
      handleChangeStyles({ ...hsvaColor });
    } catch (e) {
      return;
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className="h-6 w-6"
            variant={"ghost"}
            size={"icon"}
            disabled={!isSupported()}
            onClick={handleEyeDropper}
          >
            <PipetteIcon />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {isSupported() ? (
            <p>Pick a color</p>
          ) : (
            <p>Eye dropper not supported</p>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

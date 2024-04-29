"use client";

import useEyeDropper from "use-eye-dropper";
import { hexToHsva, HslColor, hsvaToHsla } from "@uiw/react-color";

import { PipetteIcon } from "@/components/icons";

import { Button } from "@/components/ui/button";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

interface EyeDropperProps {
  handleChangeStyles: (color: HslColor) => void;
}

export function EyeDropper({ handleChangeStyles }: EyeDropperProps) {
  const { open, isSupported } = useEyeDropper();

  const handleEyeDropper = async () => {
    try {
      const color = await open();
      if (!color) return;
      const hsvaColor = hexToHsva(color.sRGBHex);
      handleChangeStyles(hsvaToHsla(hsvaColor));
    } catch (e) {
      return;
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className="hidden h-6 w-6 sm:inline-flex"
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

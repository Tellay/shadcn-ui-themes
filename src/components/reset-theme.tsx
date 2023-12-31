"use client";

import { ResetIcon } from "@/components/icons";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function ResetTheme() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className="group h-6 w-6"
            variant={"ghost"}
            size="icon"
            onClick={() => window.location.reload()}
          >
            <ResetIcon className="transition-transform duration-500 group-hover:rotate-[360deg]" />
            <span className="sr-only">Reset theme</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent className="hidden sm:block">
          <p>Reset to the default theme</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

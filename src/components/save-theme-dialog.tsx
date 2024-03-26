"use client";

import { useState } from "react";

import { SaveIcon } from "./icons";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SaveThemeForm } from "./save-theme-form";

export function SaveThemeDialog() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <TooltipProvider>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <SaveIcon className="h-3 w-3" />
                <span className="sr-only">
                  Save current theme to local storage
                </span>
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Save current theme to local storage</p>
          </TooltipContent>
        </Tooltip>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save current theme to local storage</DialogTitle>
            <DialogDescription>
              This allows you to save the current theme to your browser's local
              storage so you can easily load it again later.
            </DialogDescription>
          </DialogHeader>

          <SaveThemeForm handleClose={() => setIsOpen(false)} />
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
}

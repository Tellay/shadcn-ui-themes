"use client";

import { KeyboardEvent, useEffect, useState } from "react";

import { DeleteThemeIcon, ThemesIcon } from "./icons";

import { useRadius } from "@/stores/use-radius";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { ScrollArea } from "@/components/ui/scroll-area";

interface ISavedTheme {
  name: string;
  colors: { title: string; variable: string; color: string }[];
  radius: string;
}

const SAVED_THEMES_KEY = "saved_themes";

export function SavedThemes() {
  const [isOpen, setIsOpen] = useState(false);
  const [savedThemes, setSavedThemes] = useState<ISavedTheme[]>([]);
  const { setRadius } = useRadius();

  const updateThemes = () => {
    const themes = JSON.parse(localStorage.getItem(SAVED_THEMES_KEY) || "[]");
    setSavedThemes(themes);
  };

  useEffect(() => {
    updateThemes();
  }, [isOpen]);

  const handleChangeTheme = (theme: ISavedTheme) => {
    theme.colors.forEach((item) => {
      (document.querySelector(":root") as HTMLElement)?.style.setProperty(
        item.variable,
        item.color,
      );
    });

    document.documentElement.style.setProperty("--radius", theme.radius);

    setRadius(parseFloat(theme.radius));
    setIsOpen(false);
  };

  const handleDeleteTheme = (theme: ISavedTheme) => {
    const newSavedThemes = savedThemes.filter(
      (savedTheme) => savedTheme.name !== theme.name,
    );
    localStorage.setItem(SAVED_THEMES_KEY, JSON.stringify(newSavedThemes));
    window.location.reload();
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLDivElement>,
    theme: ISavedTheme,
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      handleChangeTheme(theme);
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <TooltipTrigger asChild>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="ml-auto h-6 w-6">
                <ThemesIcon className="h-3 w-3" />
                <span className="sr-only">Open saved themes</span>
              </Button>
            </SheetTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Open saved themes</p>
          </TooltipContent>
          <SheetContent className="flex flex-col gap-0" side="right">
            <SheetHeader className="text-left">
              <SheetTitle>Saved themes</SheetTitle>
              <SheetDescription>
                Select a theme by clicking on it. The theme will be
                automatically applied to the website.
              </SheetDescription>
            </SheetHeader>

            <ScrollArea className="px-2 py-4 lg:py-8">
              <div className="grid grid-flow-row auto-rows-max gap-6 overflow-y-auto pb-4 text-sm">
                {!savedThemes.length && (
                  <p className="text-center">No saved themes!</p>
                )}
                {savedThemes.map((item) => (
                  <div
                    key={item.name}
                    className="cursor-pointer flex-col space-y-4 rounded-md px-2 py-1 text-left"
                    tabIndex={0}
                    onKeyDown={(event) => handleKeyDown(event, item)}
                    onClick={() => handleChangeTheme(item)}
                  >
                    <h4 className="mb-1 flex items-center justify-between rounded-md text-sm font-semibold">
                      <span className="w-[15ch] cursor-pointer truncate hover:underline sm:w-[25ch]">
                        {item.name}
                      </span>

                      <Button
                        variant="secondary"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => handleDeleteTheme(item)}
                      >
                        <DeleteThemeIcon className="h-3 w-3" />
                      </Button>
                    </h4>

                    <div className="flex flex-wrap gap-2">
                      {item.colors.map(({ title, color }) => (
                        <div
                          key={title}
                          className="h-4 w-4 shrink-0 rounded-sm border p-0"
                          style={{
                            backgroundColor: `hsl(${color})`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </Tooltip>
    </TooltipProvider>
  );
}

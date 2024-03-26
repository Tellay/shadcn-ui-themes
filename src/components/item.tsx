"use client";

import {
  HslColor,
  HsvaColor,
  Hue,
  Saturation,
  hexToHsva,
  hslaToHsva,
  hsvaToHex,
  hsvaToHsla,
  validHex,
} from "@uiw/react-color";
import { useEffect, useState } from "react";

import { Theme } from "@/lib/theme";

import { EyeDropper } from "@/components/eyeDropper";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ItemProps {
  theme: Theme;
}

export function Item({ theme }: ItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hsva, setHsva] = useState({ h: 0, s: 0, v: 68, a: 1 });
  const [hexValue, setHexValue] = useState("#000000");

  useEffect(() => {
    const rootStyles = window.getComputedStyle(document.documentElement);
    const defaultColor = rootStyles.getPropertyValue(theme.variable).split(" ");

    const hsvaColor = hslaToHsva({
      h: parseFloat(defaultColor[0]),
      s: parseFloat(defaultColor[1]),
      l: parseFloat(defaultColor[2]),
      a: hsva.a,
    });

    setHsva(hsvaColor);
    setHexValue(hsvaToHex(hsvaColor));
  }, [isOpen]);

  const updateColors = (color: HslColor) => {
    (document.querySelector(":root") as HTMLElement)?.style.setProperty(
      theme.variable,
      `${color.h.toFixed(2)} ${color.s.toFixed(2)}% ${color.l.toFixed(2)}%`,
    );
  };

  const handleEyeDropper = (color: HslColor) => {
    const hsvaColor = hslaToHsva({ ...color, a: 1 });
    setHexValue(hsvaToHex(hsvaColor));
    setHsva(hsvaColor);
    updateColors(color);
  };

  const handleSaturation = (color: HsvaColor) => {
    setHsva(color);
    setHexValue(hsvaToHex(color));
    updateColors(hsvaToHsla(color));
  };

  const handleHue = (color: { h: number }) => {
    setHsva({ ...hsva, h: color.h });
    setHexValue(hsvaToHex({ ...hsva, h: color.h }));
    updateColors(hsvaToHsla({ ...hsva }));
  };

  const handleHex = (color: string) => {
    setHexValue(color);

    if (validHex(color)) {
      setHsva(hexToHsva(color));
      updateColors(hsvaToHsla(hexToHsva(color)));
    }
  };

  return (
    <div>
      <div className="relative flex w-full items-center justify-between rounded-md border border-transparent px-2 py-1 text-muted-foreground">
        {theme.title}

        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="secondary"
              className="ml-2 h-6 w-6 shrink-0 border p-0 transition-colors hover:opacity-90 sm:ml-0"
              style={{ backgroundColor: `hsla(var(${theme.variable}))` }}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[224px]">
            <DropdownMenuLabel className="flex items-center justify-between">
              {theme.title}
              <EyeDropper handleChangeStyles={handleEyeDropper} />
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="flex flex-col p-2">
              <Saturation
                className="border"
                radius="var(--radius)"
                hsva={hsva}
                onChange={handleSaturation}
              />

              <Hue
                className="mt-1 border"
                radius="var(--radius)"
                hue={hsva.h}
                onChange={handleHue}
              />

              <div className="mt-0.5">
                <Label className="text-xs">Hex</Label>
                <Input
                  className="h-7 px-1 pb-1.5 text-xs"
                  value={hexValue}
                  onChange={(e) => handleHex(e.target.value)}
                />
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

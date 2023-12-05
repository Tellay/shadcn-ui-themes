"use client";

import { Theme } from "@/lib/theme";
import {
  hexToHsva,
  hslaToHsva,
  HsvaColor,
  hsvaToHex,
  hsvaToHsla,
  Hue,
  Saturation,
} from "@uiw/react-color";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface ItemProps {
  theme: Theme;
}

export function Item({ theme }: ItemProps) {
  const [hsva, setHsva] = useState({ h: 0, s: 0, v: 68, a: 1 });
  const [hex, setHex] = useState("#000000");

  useEffect(() => {
    const rootStyles = window.getComputedStyle(document.documentElement);
    const defaultColor = rootStyles.getPropertyValue(theme.variable).split(" ");

    const hsvaColor = hslaToHsva({
      h: parseFloat(defaultColor[0]),
      s: parseFloat(defaultColor[1]),
      l: parseFloat(defaultColor[2]),
      a: hsva.a,
    });
    const hexColor = hsvaToHex(hsvaColor);

    setHex(hexColor);
    setHsva(hsvaColor);
  }, [theme]);

  const handleChangeStyles = (color: HsvaColor) => {
    setHsva(color);
    setHex(hsvaToHex(color));

    const newColor = hsvaToHsla(color);
    (document.querySelector(":root") as HTMLElement)?.style.setProperty(
      theme.variable,
      `${newColor.h.toFixed(2)} ${newColor.s.toFixed(2)}% ${newColor.l.toFixed(
        2,
      )}%`,
    );
  };

  const refreshColors = (newColor: { h: number }) => {
    const color = hsvaToHsla({
      h: newColor.h,
      s: hsva.s,
      v: hsva.v,
      a: hsva.a,
    });

    setHsva({ h: newColor.h, s: hsva.s, v: hsva.v, a: hsva.a });
    setHex(hsvaToHex({ h: newColor.h, s: hsva.s, v: hsva.v, a: hsva.a }));

    (document.querySelector(":root") as HTMLElement)?.style.setProperty(
      theme.variable,
      `${color.h.toFixed(2)} ${color.s.toFixed(2)}% ${color.l.toFixed(2)}%`,
    );
  };

  return (
    <div>
      <div className="relative flex w-full items-center justify-between rounded-md border border-transparent px-2 py-1 text-muted-foreground">
        {theme.title}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant={"secondary"}
              className="ml-2 h-6 w-6 shrink-0 p-0 transition-colors hover:opacity-90 sm:ml-0"
              style={{ backgroundColor: `hsla(var(${theme.variable}))` }}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[224px]">
            <DropdownMenuLabel>{theme.title}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="flex flex-col p-2">
              <Saturation
                className="border"
                radius="var(--radius)"
                hsva={hsva}
                onChange={(color) => handleChangeStyles(color)}
              />

              <Hue
                className="mt-1 border"
                radius="var(--radius)"
                hue={hsva.h}
                onChange={(newHue) => {
                  setHsva({ ...hsva, ...newHue });
                  refreshColors(newHue);
                }}
              />

              <div>
                <div>
                  <Label className="text-xs">Hex</Label>
                  <Input
                    className="h-7 px-1 pb-1.5 text-xs"
                    value={hex}
                    onChange={(e) => {
                      if (e.target.value.length > 1) {
                        setHex(e.target.value);
                        handleChangeStyles(hexToHsva(e.target.value));
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
